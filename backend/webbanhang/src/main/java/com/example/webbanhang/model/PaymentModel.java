package com.example.webbanhang.model;

import java.io.Serializable;

public class PaymentModel implements Serializable {
    private String amount;
    private String idVNPay;
    private String orderId;

    public PaymentModel(String amount, String idVNPay, String orderId) {
        this.amount = amount;
        this.idVNPay = idVNPay;
        this.orderId = orderId;
    }
    public  PaymentModel(){}

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
}
