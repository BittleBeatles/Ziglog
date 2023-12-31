package com.ziglog.ziglog.domain.notification.repository;

import com.ziglog.ziglog.domain.member.entity.Member;
import com.ziglog.ziglog.domain.notification.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NotificationRdbRepository extends JpaRepository<Notification, String> {

    //RDB에 들어감
    void deleteById(String id);
    List<Notification> findAllByReceiver(Member owner);
    Optional<Notification> findById(String notificationId);
}
