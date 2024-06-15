package com.example.webbanhang.model;

import com.example.webbanhang.Entity.CartEntity;
import com.example.webbanhang.Entity.UserEntity;
import jakarta.persistence.OneToOne;

import java.io.Serializable;

public class UserModel implements Serializable {

    private Long id;

    private String username;
    private String fullname;
    private String phone;
    private String email;
    private String ward;
    private String district;
    private String city;
    private String address;
    private int role;

    private CartModel cart;

    public UserModel(){

    }



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }


    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getWard() {
        return ward;
    }

    public void setWard(String ward) {
        this.ward = ward;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getRole() {
        return role;
    }

    public void setRole(int role) {
        this.role = role;
    }

    public CartModel getCart() {
        return cart;
    }

    public void setCart(CartModel cart) {
        this.cart = cart;
    }

    public UserModel(Long id, String username, String fullname, String phone, String email, String ward, String district, String city, String address, int role) {
        this.id = id;
        this.username = username;
        this.fullname = fullname;
        this.phone = phone;
        this.email = email;
        this.ward = ward;
        this.district = district;
        this.city = city;
        this.address = address;
        this.role = role;
        this.cart = cart;
    }
    public static UserModel convert(UserEntity userEntity){
        UserModel model = new UserModel(userEntity.getId(),userEntity.getUsername(), userEntity.getFullname(), userEntity.getPhone(), userEntity.getEmail(), userEntity.getWard(), userEntity.getDistrict(),  userEntity.getCity(), userEntity.getAddress(),userEntity.getRole());

        System.out.println("Toi cart");
        if( userEntity.getCart() == null){
            model.setCart(new CartModel());
        }else {
            model.setCart(CartModel.convert(userEntity.getCart()));
        }
        return model;
    }
}
