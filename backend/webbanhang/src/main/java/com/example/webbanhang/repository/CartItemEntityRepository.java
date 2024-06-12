package com.example.webbanhang.repository;

import com.example.webbanhang.Entity.CartEntity;
import com.example.webbanhang.Entity.ProductEntity;
import org.springframework.data.repository.CrudRepository;

import com.example.webbanhang.Entity.CartItemEntity;

public interface CartItemEntityRepository extends CrudRepository<CartItemEntity, Long> {
    CartItemEntity findByCartAndProductAndSize(CartEntity cart, ProductEntity product, String size);

}
