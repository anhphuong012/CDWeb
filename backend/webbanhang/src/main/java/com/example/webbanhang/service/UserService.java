package com.example.webbanhang.service;

import com.example.webbanhang.Entity.UserEntity;
import com.example.webbanhang.dto.UserDTO;
import com.example.webbanhang.dto.request.UserCreationRequest;

public interface UserService {

    UserEntity addUser(UserCreationRequest request);

}
