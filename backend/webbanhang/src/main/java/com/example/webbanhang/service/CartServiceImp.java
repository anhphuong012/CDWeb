package com.example.webbanhang.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.webbanhang.Entity.CartEntity;
import com.example.webbanhang.Entity.CartItemEntity;
import com.example.webbanhang.Entity.ProductEntity;
import com.example.webbanhang.Entity.UserEntity;
import com.example.webbanhang.dto.ProductDTO;
import com.example.webbanhang.repository.CartEntityRepository;
import com.example.webbanhang.repository.CartItemEntityRepository;
import com.example.webbanhang.repository.ProductEntiryRepository;
import com.example.webbanhang.repository.UserEntityRepository;

@Service
public class CartServiceImp implements ICartService {

	@Autowired
	CartEntityRepository cartEntityRepository;

	@Autowired
	CartItemEntityRepository cartItemEntityRepository;

	@Autowired
	ProductEntiryRepository productEntiryRepository;

	@Autowired
	UserEntityRepository userEntityRepository;

	public boolean add(Long userId, Long productId, int quanlity, String size) {
		ProductEntity productEntity = productEntiryRepository.findById(productId).get();

		UserEntity user = userEntityRepository.findById(userId).get();
		CartItemEntity cartItem = new CartItemEntity();
		boolean check = false;

		CartEntity cart = cartEntityRepository.findByUser(user);
		if (cart == null) {
			cart = new CartEntity();
			cart.setUser(user);
			cartEntityRepository.save(cart);
			System.out.println("ddax vao");
		}

		cartItem.setCart(cart);

		for (CartItemEntity item : cart.getCartItems()) {
			if (item.getProduct().getId() == productId && item.getSize().equals(size)) {
				item.setQuanlity(item.getQuanlity() + quanlity);
				cartItem = item;
				check = true;
				System.out.println();
				break;
			}
		}
		if (!check) {
			cartItem.setProduct(productEntity);
			cartItem.setQuanlity(quanlity);
			cartItem.setSize(size);
		}
//		List<CartItemEntity> cartItems = cart.getCartItems();
//		cartItems.add(cartItem);
//
//		cartEntityRepository.save(cart);

		cartItemEntityRepository.save(cartItem);
		return true;

	}

	public CartEntity findCartByUser(Long userId) {
		UserEntity user = userEntityRepository.findById(userId).get();
		CartEntity cart = cartEntityRepository.findByUser(user);

		return cart;
	}

	@Override
	public boolean changeQuanlity(Long userId, Long productId, String size,int type) {
		CartEntity cart = findCartByUser(userId);
		ProductEntity productEntity = productEntiryRepository.findById(productId).get();
		CartItemEntity cartItem = cartItemEntityRepository.findByCartAndProductAndSize(cart,productEntity,size);
		if(type == ICartService.INCREAMENT){
			cartItem.setQuanlity(cartItem.getQuanlity() + 1);
		}else if(type == ICartService.DECREAMENT){
			cartItem.setQuanlity(cartItem.getQuanlity() - 1);
		}
		cartItemEntityRepository.save(cartItem);
		return true;
	}

	@Override
	public boolean delete(Long userId, Long productId, String size) {
		CartEntity cart = findCartByUser(userId);
		ProductEntity productEntity = productEntiryRepository.findById(productId).get();
		CartItemEntity cartItem = cartItemEntityRepository.findByCartAndProductAndSize(cart,productEntity,size);
		cartItemEntityRepository.delete(cartItem);
		return false;
	}


}
