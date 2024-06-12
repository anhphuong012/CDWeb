package com.example.webbanhang.model;

import com.example.webbanhang.Entity.CartEntity;
import com.example.webbanhang.Entity.CartItemEntity;
import com.example.webbanhang.Entity.ProductEntity;
import jakarta.persistence.*;

import java.io.Serializable;

public class CartItemModel implements Serializable {





    private ProductModel product;

    private String size;

    private int quanlity;

    public CartItemModel(){

    }
    public CartItemModel( ProductModel product, String size, int quanlity) {
        this.product = product;
        this.size = size;
        this.quanlity = quanlity;
    }


    public ProductModel getProduct() {
        return product;
    }

    public void setProduct(ProductModel product) {
        this.product = product;
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

    public static  CartItemModel convert(CartItemEntity cartItem){
        CartItemModel cartItemModel = new CartItemModel();
        cartItemModel.setQuanlity(cartItem.getQuanlity());
        cartItemModel.setSize(cartItem.getSize());
        cartItemModel.setProduct(ProductModel.convert(cartItem.getProduct()));
        return cartItemModel;
    }
}
