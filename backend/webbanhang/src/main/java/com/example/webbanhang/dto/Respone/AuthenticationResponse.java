package com.example.webbanhang.dto.Respone;


import com.example.webbanhang.model.UserModel;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuthenticationResponse {
    String token;
    boolean authenticated;
    UserModel user;
//    Long userId;
//    String fullName;

}
