package com.example.webbanhang.service;

import com.example.webbanhang.Entity.CartEntity;

public interface ICartService {
	boolean add(Long userId, Long productId, int quanlity, String size);
	CartEntity findCartByUser(Long userId);
}
