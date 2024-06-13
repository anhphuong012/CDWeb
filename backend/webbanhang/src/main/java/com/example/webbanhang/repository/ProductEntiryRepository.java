package com.example.webbanhang.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.example.webbanhang.Entity.CategoryEntity;
import com.example.webbanhang.Entity.ProductEntity;

public interface ProductEntiryRepository extends CrudRepository<ProductEntity, Long> {
	List<ProductEntity> findByNameContains(String name);
	List<ProductEntity> findByCategory(CategoryEntity category);

	List<ProductEntity> findByCategoryIn(List<CategoryEntity> categories);
}
