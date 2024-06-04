package com.example.webbanhang.service.imp;

import com.example.webbanhang.Entity.UserEntity;
import com.example.webbanhang.dto.UserDTO;
import com.example.webbanhang.repository.UserEntityRepository;
import com.example.webbanhang.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserImp implements UserService {

    @Autowired
    private UserEntityRepository userRepository;

    @Override
    public String addUser(UserDTO userDTO) {
        UserEntity userEntity = new UserEntity(
                userDTO.getUsername(),
                userDTO.getPassword(),
                userDTO.getFullname(),
                userDTO.getEmail(),
                userDTO.getPhone(),
                userDTO.getDistrict(),
                userDTO.getWard(),
                userDTO.getCity(),
                userDTO.getAddress(),
                userDTO.getRole()
        );
        userRepository.save(userEntity);
        return userEntity.getFullname();
    }
//    UserDTO userDTO;


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
