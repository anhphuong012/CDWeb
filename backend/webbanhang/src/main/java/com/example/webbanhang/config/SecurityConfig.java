package com.example.webbanhang.config;

import lombok.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;

import javax.crypto.spec.SecretKeySpec;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final String [] PUBLIC_POST_ENDPOINT = {"/auth/token", "/auth/introspect", "/api/user/register"};
    private final String [] PUBLIC_GET_ENDPOINT = { "/api/products/**","/api/file/**","/api/categories","/api/order/**"};

    private String signerKey = "fEu/rrsgAbh+C9njm/UkISfYRFfGGC8jUvhYXe265ukwV/b7T1Fguw8yP+PJ1cb3";

    @Bean
    public SecurityFilterChain filterChain( HttpSecurity  httpSecurity) throws Exception {
        httpSecurity
                .csrf(csrf -> csrf.disable()) // Tắt bảo vệ CSRF nếu không cần thiết
                .sessionManagement(sessionManagement ->
                        sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests((authorize) -> authorize
                        .requestMatchers(HttpMethod.GET, PUBLIC_GET_ENDPOINT).permitAll() // Cho phép tất cả các yêu cầu GET đến các điểm cuối công khai
                        .requestMatchers(HttpMethod.POST, PUBLIC_POST_ENDPOINT).permitAll() // Cho phép tất cả các yêu cầu POST đến các điểm cuối công khai
                        .requestMatchers(HttpMethod.GET, "/api/user/all").hasAuthority("SCOPE_ADMIN") // Chỉ cho phép yêu cầu GET đến /api/user/all với quyền hạn SCOPE_ADMIN
                        .anyRequest().hasAnyAuthority("SCOPE_USER", "SCOPE_ADMIN") // Yêu cầu các yêu cầu khác phải có quyền hạn ROLE_USER hoặc ROLE_ADMIN
                )
                ;

        httpSecurity.oauth2ResourceServer(oauth2 ->
                oauth2.jwt(jwtConfigurer -> jwtConfigurer.decoder(jwtDecoder()))
        );

        httpSecurity.csrf(AbstractHttpConfigurer::disable);

        return httpSecurity.build();
    }

    @Bean
    JwtDecoder jwtDecoder() {
        SecretKeySpec secretKeySpec =  new SecretKeySpec(signerKey.getBytes(), "HS512");


        return NimbusJwtDecoder
                .withSecretKey(secretKeySpec)
                .macAlgorithm(MacAlgorithm.HS512)
                .build();
    }

}
