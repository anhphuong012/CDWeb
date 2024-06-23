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

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
    public List<UserModel> getAllUsers() {
        List<UserEntity> userEntities = userRepository.findAll();
        List<UserModel> userModels = new ArrayList<>();

        for (UserEntity userEntity : userEntities) {
            UserModel userModel = UserModel.convert(userEntity); // Convert UserEntity sang UserModel nếu cần thiết
            userModels.add(userModel);
        }

        return userModels;
    }


    public UserModel getUserById(Long id)  {
        Optional<UserEntity> user = userRepository.findById(id);

        UserEntity userEntity = user.orElseThrow(() -> new RuntimeException("User not found"));

        return UserModel.convert(userEntity);
    }

    public boolean updateUserRole(Long userId, int newRole) {
        UserEntity userEntity = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        userEntity.setRole(newRole);
        userRepository.save(userEntity);
        if (userEntity.getRole() == newRole)
            return true;
        return false;
    }
}
