package com.example.webbanhang.model;

import java.util.ArrayList;
import java.util.List;

import com.example.webbanhang.Entity.CategoryEntity;
import com.example.webbanhang.Entity.ProductEntity;
import com.example.webbanhang.Entity.SizeEntiry;

public class ProductModel {
	private Long id;
	private String name;
	private int price;
	private String descreption;
	private String image;
	private Long category;
	private List<SizeModel> sizes;

	public ProductModel() {

	}

	public ProductModel(Long id, String name, int price, String descreption, String image, Long category,
			List<SizeModel> sizes) {
		super();
		this.id = id;
		this.name = name;
		this.price = price;
		this.descreption = descreption;
		this.image = image;
		this.category = category;
		this.sizes = sizes;
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

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public String getDescreption() {
		return descreption;
	}

	public void setDescreption(String descreption) {
		this.descreption = descreption;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public Long getCategory() {
		return category;
	}

	public void setCategory(Long category) {
		this.category = category;
	}

	public List<SizeModel> getSizes() {
		return sizes;
	}

	public void setSizes(List<SizeModel> sizes) {
		this.sizes = sizes;
	}

	public static ProductModel convert(ProductEntity productEntiry) {
		ProductModel result = new ProductModel();
		result.setId(productEntiry.getId());
		result.setName(productEntiry.getImage());
		result.setPrice(productEntiry.getPrice());
		result.setDescreption(productEntiry.getDescreption());
		result.setCategory(productEntiry.getCategory().getId());

		List<SizeModel> sizeResult = new ArrayList<>();

		for (SizeEntiry sizeModel : productEntiry.getSizes()) {
			sizeResult.add(SizeModel.convert(sizeModel));
		}
		result.setSizes(sizeResult);
		return result;
	}

}
