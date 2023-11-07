package com.ziglog.ziglog.global.notification.repository;

import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.global.notification.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    //RDB에 들어감
    void deleteById(Long id);
    List<Notification> findAllByOwner(Member owner);
}
