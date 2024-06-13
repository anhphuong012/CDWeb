package com.example.webbanhang.service;

public interface IOrderService {
    boolean order(Long userId,Long orderId,String vnpayId);
}
