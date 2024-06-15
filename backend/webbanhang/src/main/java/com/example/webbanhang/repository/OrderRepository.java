package com.example.webbanhang.repository;

import com.example.webbanhang.Entity.OrderEntity;
import com.example.webbanhang.Entity.UserEntity;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface OrderRepository extends CrudRepository<OrderEntity,Long> {
    List<OrderEntity> findByUser(UserEntity user);
    List<OrderEntity> findAll(Sort sort);
    List<OrderEntity> findByStatus(int status,Sort sort);
}
