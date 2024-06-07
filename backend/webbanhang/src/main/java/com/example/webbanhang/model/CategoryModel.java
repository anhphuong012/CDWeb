package com.example.webbanhang.model;

import com.example.webbanhang.Entity.CategoryEntity;

public class CategoryModel {
    private Long id;
    private String name;

    public CategoryModel(){

    }

    public CategoryModel(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    public static CategoryModel convert(CategoryEntity categoryEntity){
        return new CategoryModel(categoryEntity.getId(), categoryEntity.getName());
    }
}
