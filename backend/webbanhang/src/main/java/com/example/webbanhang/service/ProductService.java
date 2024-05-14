package com.example.webbanhang.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.webbanhang.Entity.ProductEntity;
import com.example.webbanhang.model.ProductModel;
import com.example.webbanhang.repository.CategoryEntityRepository;
import com.example.webbanhang.repository.ProductEntiryRepository;
import com.example.webbanhang.repository.SizeEntityRepository;

import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;





@Service
public class ProductService {
	@Autowired
	private ProductEntiryRepository productEntityRepository;

	@Autowired
	private CategoryEntityRepository categoryEntityRepository;

	@Autowired
	private SizeEntityRepository repository;
	
	@Autowired
	private ImageService imageService;
	
	 @Autowired
	    private ResourceLoader resourceLoader;

	public List<ProductModel> findAllProduct() throws IOException {
		Iterator<ProductEntity> listPd = productEntityRepository.findAll().iterator();
		List<ProductModel> result = new ArrayList<>();
		ProductModel productModel;
		ProductEntity productEntity;
		while (listPd.hasNext()) {
			productEntity = listPd.next();
			productModel = ProductModel.convert(productEntity);

;
			
			productModel.setImage("http://localhost:8080" + "/webbanhang/src/main/resources/static/images/01.jpg");
			
			result.add(productModel);
		}
		return result;
	}

	public List<ProductModel> findProductByName(String name) {
		List<ProductEntity> listPd = productEntityRepository.findByNameContains(name);
		List<ProductModel> result = new ArrayList<>();
		for (ProductEntity productEntity : listPd) {
			result.add(ProductModel.convert(productEntity));
		}
		return result;
	}

}
