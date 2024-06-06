package com.example.webbanhang.dto.request;

import jakarta.validation.constraints.*;
import lombok.Getter;


@Getter
public class UserCreationRequest {

    @NotNull(message = "Username is required")
    private String username;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "PASSWORD_INVALID")
    private String password;

    @NotBlank(message = "Full name is required")
    private String fullname;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp="(^$|[0-9]{10,12})", message = "Phone number must be between 10 and 12 digits")
    private String phone;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Ward is required")
    private String ward;

    @NotBlank(message = "District is required")
    private String district;

    @NotBlank(message = "City is required")
    private String city;

    @NotBlank(message = "Address is required")
    private String address;
    private int role;
}
