package com.example.webbanhang.service;

import com.example.webbanhang.Entity.UserEntity;
import com.example.webbanhang.dto.Respone.AuthenticationResponse;
import com.example.webbanhang.dto.Respone.IntrospectResponse;
import com.example.webbanhang.dto.request.AuthenticationRequest;
import com.example.webbanhang.dto.request.IntrospectRequest;
import com.nimbusds.jose.JOSEException;

import java.text.ParseException;

public interface AuthenticationService {
    AuthenticationResponse authenticate(AuthenticationRequest request);
     String generateToken(UserEntity user);
     IntrospectResponse introspect(IntrospectRequest request) throws ParseException, JOSEException;
}
