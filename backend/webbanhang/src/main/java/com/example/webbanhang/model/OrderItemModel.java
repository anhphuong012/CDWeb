package com.example.webbanhang.model;

import com.example.webbanhang.Entity.OrderItemEntity;

public class OrderItemModel {


    private ProductModel product;

    private String size;

    private int quanlity;


    public  OrderItemModel(){

    }

    public OrderItemModel(ProductModel product, String size, int quanlity) {
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

    public static OrderItemModel convert(OrderItemEntity entity){
        OrderItemModel model = new OrderItemModel();
        model.setProduct(ProductModel.convert(entity.getProduct()));
        model.setQuanlity(entity.getQuanlity());
        model.setSize(entity.getSize());
        return model;
    }
}
