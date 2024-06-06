package com.example.webbanhang.repository;

import org.springframework.data.repository.CrudRepository;

import com.example.webbanhang.Entity.CartEntity;
import com.example.webbanhang.Entity.UserEntity;

public interface CartEntityRepository extends CrudRepository<CartEntity, Long> {
	CartEntity findByUser(UserEntity user);

}
