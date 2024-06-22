package com.example.webbanhang.service.imp;

import com.example.webbanhang.Entity.UserEntity;
import com.example.webbanhang.dto.request.PasswordChangeRequest;
import com.example.webbanhang.dto.request.UserCreationRequest;
import com.example.webbanhang.exception.AppException;
import com.example.webbanhang.exception.ErrorCode;
import com.example.webbanhang.model.UserModel;
import com.example.webbanhang.repository.UserEntityRepository;
import com.example.webbanhang.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

@Service
public class UserImp implements UserService {

    @Autowired
    private UserEntityRepository userRepository;

    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);

    @Override
    public UserEntity addUser(UserCreationRequest request) {
        if (userRepository.existsByEmail(request.getEmail()))
            throw new AppException(ErrorCode.EMAIL_EXISTED);
        UserEntity userEntity = new UserEntity(
                request.getUsername(),
               request.getPassword(),
               request.getFullname(),
               request.getPhone(),
               request.getEmail(),
                request.getWard(),
               request.getDistrict(),
               request.getCity(),
               request.getAddress(),
               request.getRole()
        );
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        userEntity.setPassword(passwordEncoder.encode(request.getPassword()));
        return userRepository.save(userEntity);

    }

    public UserEntity getUser(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("1"));
    }

    public boolean changePassword(Long userId, PasswordChangeRequest request) {
        UserEntity user = userRepository.findById(userId).orElseThrow();

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
           return false;
        }

        user.setPassword(passwordEncoder.encode(request.getRePassword()));
        userRepository.save(user);
        return true;

    }

}
