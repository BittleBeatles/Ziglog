package com.ziglog.ziglog.global.kafka.service;

import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KafkaProducer {
    //북마크를 추가하는 경우(내 글 제외)
    //인용을 추가하는 경우(내 글 제외)

    private final KafkaTemplate<String, String> kafkaTemplate;
    String topicName = "test";

    public void sendMessage(String message){
        kafkaTemplate.send(topicName, message);
    }
}
