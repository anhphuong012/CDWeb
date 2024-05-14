package com.example.webbanhang.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name ="sizes")
public class SizeEntiry {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	private String size;
	private int quanlity;
	
	@ManyToOne
	@JoinColumn(name = "product_id",nullable = false)
	private ProductEntity product;

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public int getQuanlity() {
		return quanlity;
	}

	public void setQuanlity(int quanlity) {
		this.quanlity = quanlity;
	}

	public ProductEntity getProduct() {
		return product;
	}

	public void setProduct(ProductEntity product) {
		this.product = product;
	}

	public Long getId() {
		return id;
	}
	
	
}
