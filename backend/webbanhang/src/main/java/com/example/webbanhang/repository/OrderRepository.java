package com.example.webbanhang.repository;

import com.example.webbanhang.Entity.OrderEntity;
import com.example.webbanhang.Entity.UserEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface OrderRepository extends CrudRepository<OrderEntity,Long> {
    List<OrderEntity> findByUser(UserEntity user);
}
