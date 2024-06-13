package com.example.webbanhang.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "vnpay")
public class VNPayEntity {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinColumn(name = "order_id", referencedColumnName = "id")
    private OrderEntity order;

    private Long idVNPay;

    private int amount;

    public VNPayEntity(){

    }

    public VNPayEntity(Long id, OrderEntity order, Long idVNPay) {
        this.id = id;
        this.order = order;
        this.idVNPay = idVNPay;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public OrderEntity getOrder() {
        return order;
    }

    public void setOrder(OrderEntity order) {
        this.order = order;
    }

    public Long getIdVNPay() {
        return idVNPay;
    }

    public void setIdVNPay(Long idVNPay) {
        this.idVNPay = idVNPay;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }
}
