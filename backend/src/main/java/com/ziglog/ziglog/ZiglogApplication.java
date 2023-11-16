package com.ziglog.ziglog;

import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.TimeZone;

@SpringBootApplication
public class ZiglogApplication {

	@PostConstruct
	public void init() {
		TimeZone.setDefault(TimeZone.getTimeZone("KST"));
	}
	public static void main(String[] args) {
		SpringApplication.run(ZiglogApplication.class, args);
	}
}
