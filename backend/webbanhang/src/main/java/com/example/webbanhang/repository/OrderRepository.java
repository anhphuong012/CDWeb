package com.example.webbanhang.repository;

import com.example.webbanhang.Entity.OrderEntity;
import org.springframework.data.repository.CrudRepository;

public interface OrderRepository extends CrudRepository<OrderEntity,Long> {
}
