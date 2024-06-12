package com.example.webbanhang.service;

import com.example.webbanhang.Entity.CartEntity;

public interface ICartService {

	public static  final  int INCREAMENT = 1;
	public  static  final  int DECREAMENT = -1;
	boolean add(Long userId, Long productId, int quanlity, String size);
	CartEntity findCartByUser(Long userId);
	boolean changeQuanlity(Long userId, Long productId, String size,int type);

	boolean delete(Long userId, Long productId, String size);
}
