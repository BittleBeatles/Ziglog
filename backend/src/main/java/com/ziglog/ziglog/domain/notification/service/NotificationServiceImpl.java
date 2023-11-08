package com.ziglog.ziglog.domain.notification.service;

import com.ziglog.ziglog.domain.bookmark.entity.Bookmark;
import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.note.entity.Quotation;
import com.ziglog.ziglog.domain.notification.entity.Notification;
import com.ziglog.ziglog.domain.notification.exception.exceptions.AlreadyRemovedNotificationException;
import com.ziglog.ziglog.domain.notification.exception.exceptions.InconsistentNotificationOwnerException;
import com.ziglog.ziglog.domain.notification.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {
    //RDB에서의 알림 관리

    private final NotificationRepository notificationRepository;

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
                .isRead(false)
                .message(member.getNickname() + "님이 회원님의 글을 북마크했습니다.")
                .build();

        return notificationRepository.save(notification);
    }

    @Override
    public Notification saveQuotationNotification(Member member, Quotation quotation){
        if (quotation.getEndNote().getAuthor().getId().equals(member.getId())) return null; //내 자신의 글을 인용한 경우에는 알림 발생시키지 않음
        Notification notification = Notification.builder()
                .owner(quotation.getStartNote().getAuthor())
                .isRead(false)
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
