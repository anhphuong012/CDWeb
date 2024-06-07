package com.example.webbanhang.service;

import com.example.webbanhang.Entity.CategoryEntity;
import com.example.webbanhang.model.CategoryModel;
import com.example.webbanhang.repository.CategoryEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
public class CategoryServiceImp implements ICategoryService{
    @Autowired
    CategoryEntityRepository categoryEntityRepository;
    @Override
    public List<CategoryModel> getAll() {
        Iterator<CategoryEntity> listCategory = categoryEntityRepository.findAll().iterator();
        List<CategoryModel> result = new ArrayList<>();
        CategoryModel temp;
        while(listCategory.hasNext()){
            temp = CategoryModel.convert(listCategory.next());
            result.add(temp);
        }
        return result;
    }
}
