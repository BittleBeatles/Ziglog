package com.ziglog.ziglog.domain.notification.service;

import com.nimbusds.jose.shaded.gson.Gson;
import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.member.exception.exceptions.UserNotFoundException;
import com.ziglog.ziglog.domain.member.repository.MemberRepository;
import com.ziglog.ziglog.domain.note.repository.NoteRepository;
import com.ziglog.ziglog.domain.notification.dto.NotificationKafkaDto;
import com.ziglog.ziglog.domain.notification.dto.NotificationListDto;
import com.ziglog.ziglog.domain.notification.dto.NotificationResponseDto;
import com.ziglog.ziglog.domain.notification.entity.Notification;
import com.ziglog.ziglog.domain.notification.exception.exceptions.AlreadyRemovedNotificationException;
import com.ziglog.ziglog.domain.notification.exception.exceptions.InconsistentNotificationOwnerException;
import com.ziglog.ziglog.domain.notification.repository.SseRepository;
import com.ziglog.ziglog.domain.notification.repository.NotificationRdbRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.Acknowledgment;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;
import java.util.Map;


@Service
@Slf4j
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    //RDB에서의 알림 관리
    private final NotificationRdbRepository notificationRepository;
    private final SseRepository emitterRepository;
    private final MemberRepository memberRepository;
    private final NoteRepository noteRepository;

//    @Value("${jwt.access.expiration}")
    private Long TIMEOUT = 1000L * 60 & 30;// 30분 => 따로 yml 파일에 넣기

    @Override
    @Transactional
    public NotificationListDto getNotificationList(Member member){
        return new NotificationListDto(getNotifications(member).stream()
                .map(notification -> new NotificationResponseDto(NotificationKafkaDto.toDto(notification))).toList());
    }

    @Override
    public SseEmitter subscribe(Member member) throws Exception {

        SseEmitter emitter = createEmitter(member);
        sendMessage(member.getId(), "Event stream created");

        return emitter;
    }

    @Override
    public void sendMessage(Long id, Object event) throws Exception {
        SseEmitter emitter = emitterRepository.findById(id).orElse(null);
        if (emitter == null) return;//연결되지 않은 상태면 그냥 리턴

        try {
            Gson gson = new Gson();
            String eventToSend = gson.toJson(event);
            log.info("eventToSend: {}", eventToSend);
            emitter.send(SseEmitter.event()
                    .id(String.valueOf(id))
                    .name("sse")
                    .data(eventToSend));
            log.info("sent");
        } catch (Exception e){
            emitterRepository.remove(id);
            emitter.completeWithError(new IOException("서버로부터 이벤트를 보낼 수 없습니다."));
        }
    }

    private SseEmitter createEmitter(Member member) {
        log.info("create new Emitter");

        Long memberId = member.getId();
        SseEmitter prevEmitter = emitterRepository.findById(memberId).orElse(null);

        if (prevEmitter != null) prevEmitter.complete();


        SseEmitter emitter = new SseEmitter(TIMEOUT);

        emitter.onCompletion(() -> emitterRepository.remove(memberId));
        emitter.onTimeout(() -> emitterRepository.remove(memberId));

        emitterRepository.save(memberId, emitter);
        log.info("put new Emitter");
        return emitter;
    }

    @Override
    @KafkaListener(topics="${kafka.topic.name}", groupId = "${kafka.consumer.group.send}",
            properties = {ConsumerConfig.AUTO_OFFSET_RESET_CONFIG + ":earliest"},
            containerFactory = "kafkaEventListenerContainerFactorySse")
    public void consumeKafkaEvent(NotificationKafkaDto notification, Acknowledgment ack) throws Exception {
        log.info("ConsumeKafkaEvent");
        sendMessage(notification.getMemberId(), new NotificationResponseDto(notification));
        ack.acknowledge();
    }

    @Override
    @KafkaListener(topics="${kafka.topic.name}", groupId = "${kafka.consumer.group.save}",
            properties = {ConsumerConfig.AUTO_OFFSET_RESET_CONFIG + ":earliest"},
            containerFactory = "kafkaEventListenerContainerFactoryRdb")
    public void saveKafkaEventIntoRDB(NotificationKafkaDto notification, Acknowledgment ack) throws Exception {
        log.info("SaveKafkaEventIntoRDB");
        Notification notificationEntity = Notification.builder()
                .id(notification.getId())
                .receiver(memberRepository.findById(notification.getMemberId()).orElseThrow(UserNotFoundException::new))
                .sender(memberRepository.findByNickname(notification.getSenderNickname()).orElseThrow(UserNotFoundException::new))
                .title(notification.getTitle())
                .type(notification.getType())
                .isRead(notification.getIsRead())
                .note(noteRepository.findNoteById(notification.getNoteId()).orElse(null))
                .dateTime(notification.getDateTime())
                .build();

        notificationRepository.save(notificationEntity);
        ack.acknowledge();
    }

    @Override // 주어진 아이디의 알림을 DB에서 삭제
    @Transactional
    public void delete(Member member, String notificationId) throws AlreadyRemovedNotificationException, InconsistentNotificationOwnerException {
        Notification notification = getVerified(member, notificationId);
        notificationRepository.delete(notification);
    }

    @Override //현재 로그인한 사용자의 모든 알림을 조회
    @Transactional
    public List<Notification> getNotifications (Member member) {
        return notificationRepository.findAllByReceiver(member);
    }

    @Override
    @Transactional
    public void readNotification(Member member, String notificationId) throws InconsistentNotificationOwnerException, AlreadyRemovedNotificationException{
        Notification notification = getVerified(member, notificationId);
        notification.read();
    }

    @Override
    @Transactional
    public Notification getVerified(Member member, String notificationId) throws InconsistentNotificationOwnerException, AlreadyRemovedNotificationException {
        Notification notification = notificationRepository.findById(notificationId).orElseThrow(AlreadyRemovedNotificationException::new);
        if (!notification.getReceiver().getId().equals(member.getId())) throw new InconsistentNotificationOwnerException();
        return notification;
    }
}
