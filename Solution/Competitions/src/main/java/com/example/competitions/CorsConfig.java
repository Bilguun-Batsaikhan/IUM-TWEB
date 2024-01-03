package com.example.competitions;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/*If you don't have the CORS configuration in your code, the browser may complain about the "Cross-Origin Resource Sharing" policy. This policy is enforced by browsers to restrict web pages from making requests to a different domain than the one that served the page. Without the proper CORS configuration, the browser may block certain requests, resulting in errors such as "Access-Control-Allow-Origin" or "No 'Access-Control-Allow-Origin' header is present on the requested resource". */

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000") // frontend server address
                .allowedMethods("GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}