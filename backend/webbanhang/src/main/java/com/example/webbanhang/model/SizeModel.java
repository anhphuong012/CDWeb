package com.example.webbanhang.model;

import com.example.webbanhang.Entity.ProductEntity;
import com.example.webbanhang.Entity.SizeEntiry;

public class SizeModel {
	private Long id;

	private String size;
	private int quanlity;

	
	public SizeModel(String size, int quanlity) {
		super();
		this.size = size;
		this.quanlity = quanlity;
	}

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

	
	public static SizeModel convert(SizeEntiry sizeEntiry) {
		return new SizeModel(sizeEntiry.getSize(),sizeEntiry.getQuanlity());
	}

}
