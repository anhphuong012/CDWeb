package com.example.webbanhang.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.example.webbanhang.Entity.ProductEntity;

public interface ProductEntiryRepository extends CrudRepository<ProductEntity, Long> {
	List<ProductEntity> findByNameContains(String name);
}
