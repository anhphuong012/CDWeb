package com.example.webbanhang.service;

import com.example.webbanhang.Entity.UserEntity;
import com.example.webbanhang.dto.UserDTO;
import com.example.webbanhang.dto.request.PasswordChangeRequest;
import com.example.webbanhang.dto.request.UserCreationRequest;
import com.example.webbanhang.model.UserModel;

import java.util.List;

public interface UserService {

    UserEntity addUser(UserCreationRequest request);
    boolean  changePassword(Long id, PasswordChangeRequest request);
    List<UserModel> getAllUsers();

    UserModel getUserById(Long id);
    boolean updateUserRole(Long userId, int newRole);

}
