package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;


@SpringBootApplication
@ComponentScan({"com.example.competitions", "com.example.players"})
public class CompetitionsApplication {

    public static void main(String[] args) {
        SpringApplication.run(CompetitionsApplication.class, args);
    }

}
