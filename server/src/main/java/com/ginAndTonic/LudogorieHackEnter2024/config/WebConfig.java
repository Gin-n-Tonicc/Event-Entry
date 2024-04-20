package com.ginAndTonic.LudogorieHackEnter2024.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// Configuration class for web-related configurations
@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {
    private final FrontendConfig frontendConfig;

    // Method to configure CORS mappings
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry
                .addMapping("/**") // Allow CORS for all endpoints
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Allowed HTTP methods
                .allowedOrigins(frontendConfig.getBaseUrl()) // Allowed origins (frontend URL)
                .allowCredentials(true); // Allow credentials (cookies, authorization headers)
    }
}