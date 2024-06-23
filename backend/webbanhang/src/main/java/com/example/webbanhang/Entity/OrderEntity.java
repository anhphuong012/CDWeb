package com.example.webbanhang.Entity;

import jakarta.persistence.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
public class OrderEntity {
    @Id
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id",nullable = false)
    private UserEntity user;

    private int totalPrice;

    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime dateCreate;

    private String typePayment;

    private boolean isPay;
    private int status;


    private String address;


    @OneToMany(cascade = CascadeType.ALL,mappedBy="order", orphanRemoval = true)
    private List<OrderItemEntity> orderItems = new ArrayList<>();
    @OneToOne(fetch = FetchType.LAZY,mappedBy = "order")
    private VNPayEntity pay;

    public OrderEntity(){

    }

    public OrderEntity(Long id, UserEntity user, int totalPrice, LocalDateTime dateCreate, String typePayment, int status) {
        this.id = id;
        this.user = user;
        this.totalPrice = totalPrice;
        this.dateCreate = dateCreate;
        this.typePayment = typePayment;
        this.status = status;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public int getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(int totalPrice) {
        this.totalPrice = totalPrice;
    }

    public LocalDateTime getDateCreate() {
        return dateCreate;
    }

    public void setDateCreate(LocalDateTime dateCreate) {
        this.dateCreate = dateCreate;
    }

    public String getTypePayment() {
        return typePayment;
    }

    public void setTypePayment(String typePayment) {
        this.typePayment = typePayment;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public boolean isPay() {
        return isPay;
    }

    public void setIsPay(boolean pay) {
        isPay = pay;
    }

    public VNPayEntity getPay() {
        return pay;
    }



    public void setPay(VNPayEntity pay) {
        this.pay = pay;
    }

    public List<OrderItemEntity> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItemEntity> orderItems) {
        this.orderItems = orderItems;
    }

    public void setPay(boolean pay) {
        isPay = pay;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
