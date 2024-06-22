package com.example.webbanhang.config;

import lombok.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
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
    private final String [] PUBLIC_GET_ENDPOINT = { "/api/**"};

    private String signerKey = "fEu/rrsgAbh+C9njm/UkISfYRFfGGC8jUvhYXe265ukwV/b7T1Fguw8yP+PJ1cb3";

    @Bean
    public SecurityFilterChain filterChain( HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .authorizeHttpRequests(request ->

                request.requestMatchers(HttpMethod.GET,PUBLIC_GET_ENDPOINT).permitAll()
                        .requestMatchers(HttpMethod.POST,PUBLIC_POST_ENDPOINT).permitAll()
//                        .requestMatchers(HttpMethod.PUT,PUBLIC_POST_ENDPOINT).permitAll()
//                        .requestMatchers(HttpMethod.DELETE,PUBLIC_POST_ENDPOINT).permitAll()
                        .anyRequest().authenticated());

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
