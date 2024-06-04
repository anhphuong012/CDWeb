package com.example.webbanhang.controller;

import com.example.webbanhang.Entity.UserEntity;
import com.example.webbanhang.dto.UserDTO;
import com.example.webbanhang.repository.UserEntityRepository;
import com.example.webbanhang.service.UserService;
import com.example.webbanhang.service.imp.UserImp;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public String  createUser(@RequestBody @Valid UserDTO user) {
        String id = userService.addUser(user);
        return id;
    }

//    @PostMapping("/login")
//    public String loginUser(@ModelAttribute("user") UserLoginRequest loginRequest, Model model) {
//        // Tìm kiếm user với email được cung cấp
//        UserEntity user = userRepository.findByEmail(loginRequest.getEmail());
//
//        // Nếu không tìm thấy user hoặc mật khẩu không khớp, trả về trang đăng nhập với thông báo lỗi
//        if (user == null || !passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
//            model.addAttribute("errorMessage", "Invalid email or password");
//            return "login";
//        }
//
//        // Nếu xác thực thành công, chuyển hướng đến trang chủ
//        return "redirect:/";
//    }
}