package com.example.webbanhang.model;

import com.example.webbanhang.Entity.VNPayEntity;

import java.io.Serializable;

public class VNPayModel implements Serializable {
    private String amount;
    private String idVNPay;
    private String orderId;

    private int status;

    public VNPayModel(String amount, String idVNPay, String orderId) {
        this.amount = amount;
        this.idVNPay = idVNPay;
        this.orderId = orderId;
    }

    public VNPayModel(String amount, String idVNPay, String orderId, int status) {
        this.amount = amount;
        this.idVNPay = idVNPay;
        this.orderId = orderId;
        this.status = status;
    }

    public VNPayModel(){}

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public String getIdVNPay() {
        return idVNPay;
    }

    public void setIdVNPay(String idVNPay) {
        this.idVNPay = idVNPay;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public static VNPayModel convert(VNPayEntity enity){
        VNPayModel model = new VNPayModel();
        model.setAmount(enity.getAmount() +"");
        model.setStatus(enity.getStatus());
        model.setIdVNPay(enity.getIdVNPay()+"");
        model.setOrderId(enity.getOrder().getId() +"");
        return model;
    }
}
