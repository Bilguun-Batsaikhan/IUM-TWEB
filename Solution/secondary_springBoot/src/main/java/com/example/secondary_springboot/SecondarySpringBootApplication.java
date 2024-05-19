package com.example.secondary_springboot;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan({"com.example.secondary_springboot.competitions", "com.example.secondary_springboot.players"})
public class SecondarySpringBootApplication {
    public static void main(String[] args) {
        SpringApplication.run(SecondarySpringBootApplication.class, args);
    }

}
