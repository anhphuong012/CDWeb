package com.example.webbanhang.repository;

import org.springframework.data.repository.CrudRepository;

import com.example.webbanhang.Entity.CategoryEntity;

import java.util.List;

public interface CategoryEntityRepository extends CrudRepository<CategoryEntity, Long> {

}
