package com.example.webbanhang.dto;

import com.example.webbanhang.model.SizeModel;

public class ProductDTO {
	private Long id;

	private String name;
	private int price;
	private String descreption;
	private String image;
	private Long category_id;
	private SizeModel size;

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

	public Long getCategory_id() {
		return category_id;
	}

	public void setCategory_id(Long category_id) {
		this.category_id = category_id;
	}

	public SizeModel getSize() {
		return size;
	}

	public void setSize(SizeModel size) {
		this.size = size;
	}

	public Long getId() {
		return id;
	}

}
