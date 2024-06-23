package com.example.webbanhang.repository;

import com.example.webbanhang.Entity.OrderEntity;
import com.example.webbanhang.Entity.OrderItemEntity;
import com.example.webbanhang.Entity.ProductEntity;
import com.example.webbanhang.Entity.UserEntity;
import jakarta.persistence.criteria.Order;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderRepository extends CrudRepository<OrderEntity,Long> {
    List<OrderEntity> findByUser(UserEntity user,Sort sort);
    List<OrderEntity> findAll(Sort sort);
    List<OrderEntity> findByStatus(int status,Sort sort);
    @Query("SELECT o FROM OrderEntity o WHERE (:status IS NULL OR o.status = :status) AND o.user.id = :userId ORDER BY o.dateCreate DESC")
    List<OrderEntity> findByStatusAndUserId(@Param("status") int status, @Param("userId") Long userId, Sort sort);


    @Query("SELECT o FROM OrderItemEntity o WHERE o.order.id = :orderId")
    List<OrderItemEntity> findByOrderId(@Param("orderId") Long orderId);
}
