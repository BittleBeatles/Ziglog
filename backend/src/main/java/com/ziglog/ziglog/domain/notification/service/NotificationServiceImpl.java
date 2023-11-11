package com.ziglog.ziglog.domain.notification.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ziglog.ziglog.domain.bookmark.entity.Bookmark;
import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.note.entity.Quotation;
import com.ziglog.ziglog.domain.notification.entity.Notification;
import com.ziglog.ziglog.domain.notification.exception.exceptions.AlreadyRemovedNotificationException;
import com.ziglog.ziglog.domain.notification.exception.exceptions.InconsistentNotificationOwnerException;
import com.ziglog.ziglog.domain.notification.repository.EmitterRedisRepository;
import com.ziglog.ziglog.domain.notification.repository.NotificationRdbRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class NotificationServiceImpl implements NotificationService {

    //RDB에서의 알림 관리
    private final NotificationRdbRepository notificationRepository;
    private final EmitterRedisRepository emitterRepository;
    private final KafkaTemplate<String, String> kafkaTemplate;

    @Value("${jwt.access.expiration}")
    private Long TIMEOUT;// 30분 => 따로 yml 파일에 넣기

    @Override
    public SseEmitter subscribe(Member member, String lastEventId) throws Exception {
        SseEmitter emitter = createEmitter(member);
        sendMessage(member, "Event stream created");
        log.info("member nickname : {} subscribed for sse", member.getNickname());
        return emitter;
    }

    @Override
    public void sendMessage(Member target, String event) throws Exception {
        SseEmitter emitter = emitterRepository.findById(target.getId()).orElseThrow(Exception::new);

        try {
            log.info("send event");
            emitter.send(SseEmitter.event().id(String.valueOf(target.getId())).name("sse").data(event));

        } catch (Exception e){
            emitterRepository.remove(target.getId());
            emitter.completeWithError(new IOException("서버로부터 이벤트를 보낼 수 없습니다."));
        }
    }

    private SseEmitter createEmitter(Member member) {
        log.info("create new Emitter");

        Long memberId = member.getId();

        SseEmitter emitter = new SseEmitter(TIMEOUT);
        emitter.onCompletion(() -> {
            log.info("onCompletion callback");
            emitterRepository.remove(memberId);    // 만료되면 리스트에서 삭제
        });

        emitter.onTimeout(() -> {
            log.info("onTimeout callback");
            emitter.complete();
        });

        emitterRepository.save(memberId, emitter);
        log.info("put new Emitter");
        return emitter;
    }

    @Override
    public void produceKafkaEvent(Notification notification) throws Exception{
        log.info("produce KafkaEvent : {}", notification.serialize());
        kafkaTemplate.send("sse", notification.serialize());
    }

    @Override
    @KafkaListener(topics="sse")
    public void consumeKafkaEvent(String message) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        Notification notification = mapper.readValue(message, Notification.class);
        sendMessage(notification.getOwner(), notification.getMessage());
    }

    @Override // 주어진 아이디의 알림을 DB에서 삭제
    public void delete(Member member, Long notificationId) throws AlreadyRemovedNotificationException, InconsistentNotificationOwnerException {
        Notification notification = getVerified(member, notificationId);
        notificationRepository.delete(notification);
    }

    @Override //현재 로그인한 사용자의 모든 알림을 조회
    public List<Notification> getNotifications (Member member) {
        return notificationRepository.findAllByOwner(member);
    }

    @Override
    public Notification saveBookmarkNotification(Member member, Bookmark bookmark) {
        if (bookmark.getMember().getId().equals(member.getId())) return null; //자기 자신의 글을 북마크 한 경우에는 알림을 발생시키지 않음
        Notification notification = Notification.builder()
                .owner(bookmark.getMember())
                .message(member.getNickname() + "님이 회원님의 글을 북마크했습니다.")
                .build();

        return notificationRepository.save(notification);
    }

    @Override
    public Notification saveQuotationNotification(Member member, Quotation quotation){
        if (quotation.getEndNote().getAuthor().getId().equals(member.getId())) return null; //내 자신의 글을 인용한 경우에는 알림 발생시키지 않음
        Notification notification = Notification.builder()
                .owner(quotation.getStartNote().getAuthor())
                .message(member.getNickname() + "님이 회원님의 글을 인용했습니다.")
                .build();
        return notificationRepository.save(notification);
    }

    @Override
    public void readNotification(Member member, Long notificationId) throws InconsistentNotificationOwnerException, AlreadyRemovedNotificationException{
        Notification notification = getVerified(member, notificationId);
        notification.read();
    }

    private Notification getVerified(Member member, Long notificationId) throws InconsistentNotificationOwnerException, AlreadyRemovedNotificationException {
        Notification notification = notificationRepository.findById(notificationId).orElseThrow(AlreadyRemovedNotificationException::new);
        if (!notification.getOwner().getId().equals(member.getId())) throw new InconsistentNotificationOwnerException();
        return notification;
    }
}
