package com.example.webbanhang.controller;

import com.example.webbanhang.Entity.UserEntity;
import com.example.webbanhang.dto.Respone.ApiResponsee;
import com.example.webbanhang.dto.Respone.PasswordChangeResponse;
import com.example.webbanhang.dto.UserDTO;
import com.example.webbanhang.dto.request.PasswordChangeRequest;
import com.example.webbanhang.dto.request.UserCreationRequest;
import com.example.webbanhang.dto.request.UserUpdateRequest;
import com.example.webbanhang.model.ReposeOject;
import com.example.webbanhang.model.UserModel;
import com.example.webbanhang.repository.UserEntityRepository;
import com.example.webbanhang.service.UserService;
import com.example.webbanhang.service.imp.UserImp;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import com.example.webbanhang.model.UserModel;

import java.util.List;

@RestController
@RequestMapping("api/user")
public class UserController {

    @Autowired
    private UserService userService;



    @PostMapping("/register")
    public ApiResponsee<UserEntity> createUser(@RequestBody @Valid UserCreationRequest user) {
        ApiResponsee<UserEntity> apiResponse = new ApiResponsee<>();
        apiResponse.setResult((userService.addUser(user)));

        return apiResponse;
    }

    @PostMapping("/changePass/{userId}")
    public ResponseEntity<PasswordChangeResponse> changePassword(@PathVariable Long userId, @RequestBody @Valid PasswordChangeRequest request) {
        boolean pass = userService.changePassword(userId, request);
        if (!pass)
             return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new PasswordChangeResponse("Mật khẩu xác nhận không khớp."));
        return ResponseEntity.ok(new PasswordChangeResponse("Thay đổi mật khẩu thành công ."));

    }


    @GetMapping("/all")
    public @ResponseBody ResponseEntity<ReposeOject> getAllUser(){
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ReposeOject("OK", " Success",userService.getAllUsers() ));
    }

    @GetMapping("/{id}")
    public @ResponseBody ResponseEntity<ReposeOject> getUserById(@PathVariable Long id){
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ReposeOject("OK", " Success",userService.getUserById(id) ));
    }

    @PutMapping("/{userId}")
    public ResponseEntity<ReposeOject> updateUserRole(@PathVariable Long userId, @RequestBody UserUpdateRequest request) {
        boolean check = userService.updateUserRole(userId, request.getRole());
        if(check){
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ReposeOject("OK", " Success",true ));
        }else {
            return ResponseEntity.status(HttpStatus.FAILED_DEPENDENCY)
                    .body(new ReposeOject("Failed", " Failed",false ));
        }
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