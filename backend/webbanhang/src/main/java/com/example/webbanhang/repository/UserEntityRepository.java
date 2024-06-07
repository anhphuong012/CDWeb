package com.example.webbanhang.repository;

import org.springframework.data.repository.CrudRepository;

import com.example.webbanhang.Entity.UserEntity;

import java.util.Optional;

public interface UserEntityRepository extends CrudRepository<UserEntity,Long>{

    boolean existsByEmail(String email);

    Optional<UserEntity> findByUsername(String username);

}
