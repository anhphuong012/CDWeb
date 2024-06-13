package com.example.webbanhang.repository;

import com.example.webbanhang.Entity.OrderItemEntity;
import org.springframework.data.repository.CrudRepository;

public interface OrderItemRepository extends CrudRepository<OrderItemEntity,Long> {
}
