package com.example.webbanhang.repository;

import java.util.List;
import org.springframework.data.repository.CrudRepository;

import com.example.webbanhang.Entity.UserEntity;

import java.util.Optional;

public interface UserEntityRepository extends CrudRepository<UserEntity,Long>{

    boolean existsByEmail(String email);

    Optional<UserEntity> findByUsername(String username);

    Optional<UserEntity> findByEmail(String email);

    Optional<UserEntity> findById(Long id);


    List<UserEntity> findAll();

}
