package com.ziglog.ziglog.global.kafka.service;

import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class KafkaConsumer {

    @KafkaListener(topics = "test", groupId = ConsumerConfig.GROUP_ID_CONFIG)
    public void consume(String message) throws IOException{

    }
}
