package com.example.webbanhang.service.imp;

import com.example.webbanhang.Entity.UserEntity;
import com.example.webbanhang.dto.request.UserCreationRequest;
import com.example.webbanhang.exception.AppException;
import com.example.webbanhang.exception.ErrorCode;
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
//    UserCreationRequest UserCreationRequest;


//    public LoginMesage  loginEmployee(LoginDTO loginDTO) {
//        String msg = "";
//        Employee employee1 = employeeRepo.findByEmail(loginDTO.getEmail());
//        if (employee1 != null) {
//            String password = loginDTO.getPassword();
//            String encodedPassword = employee1.getPassword();
//            Boolean isPwdRight = passwordEncoder.matches(password, encodedPassword);
//            if (isPwdRight) {
//                Optional<Employee> employee = employeeRepo.findOneByEmailAndPassword(loginDTO.getEmail(), encodedPassword);
//                if (employee.isPresent()) {
//                    return new LoginMesage("Login Success", true);
//                } else {
//                    return new LoginMesage("Login Failed", false);
//                }
//            } else {
//                return new LoginMesage("password Not Match", false);
//            }
//        }else {
//            return new LoginMesage("Email not exits", false);
//        }
//    }
}
