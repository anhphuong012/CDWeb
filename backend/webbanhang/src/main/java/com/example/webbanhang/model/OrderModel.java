package com.example.webbanhang.model;

import com.example.webbanhang.Entity.OrderEntity;
import com.example.webbanhang.Entity.OrderItemEntity;
import com.example.webbanhang.Entity.UserEntity;
import com.example.webbanhang.Entity.VNPayEntity;
import jakarta.persistence.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class OrderModel {
    private Long id;


//    private UserEntity user;

    private int totalPrice;

    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime dateCreate;

    private String typePayment;

    private boolean isPay;
    private int status;

    private UserModel user;

    private List<OrderItemModel> orderItems = new ArrayList<>();

    private VNPayModel pay;


    public OrderModel() {
    }


    public OrderModel(Long id, int totalPrice, LocalDateTime dateCreate, String typePayment, boolean isPay, int status, List<OrderItemModel> orderItems, VNPayModel pay) {
        this.id = id;
        this.totalPrice = totalPrice;
        this.dateCreate = dateCreate;
        this.typePayment = typePayment;
        this.isPay = isPay;
        this.status = status;
        this.orderItems = orderItems;
        this.pay = pay;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public boolean isPay() {
        return isPay;
    }

    public void setPay(boolean pay) {
        isPay = pay;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public List<OrderItemModel> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItemModel> orderItems) {
        this.orderItems = orderItems;
    }

    public VNPayModel getPay() {
        return pay;
    }

    public void setPay(VNPayModel pay) {
        this.pay = pay;
    }

    public UserModel getUser() {
        return user;
    }

    public void setUser(UserModel user) {
        this.user = user;
    }

    public static OrderModel orderModel(OrderEntity entity){
        OrderModel model = new OrderModel();

        List<OrderItemModel> result = new ArrayList<>();
        List<OrderItemEntity> orderItemEntityList = entity.getOrderItems();

        model.setId(entity.getId());
        if(entity.getPay() != null){
            model.setPay(VNPayModel.convert(entity.getPay()));
        }
        model.setStatus(entity.getStatus());
        model.setDateCreate(entity.getDateCreate());
        model.setTypePayment(entity.getTypePayment());
        model.setTotalPrice(entity.getTotalPrice());
        OrderItemModel temp;
        for (OrderItemEntity item: orderItemEntityList
             ) {
            temp = OrderItemModel.convert(item);
            temp.getProduct().setImage("http://localhost:8081" + "/api/file/" + temp.getProduct().getImage() + ".jpg");
            result.add(temp);
        }
        model.setOrderItems(result);
        model.setUser(UserModel.convert(entity.getUser()));
        return model;
    }
}
