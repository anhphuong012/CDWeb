package com.example.webbanhang.service;

import com.example.webbanhang.Entity.*;
import com.example.webbanhang.config.VNPayConfig;
import com.example.webbanhang.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService implements IOrderService{
    public static final int ORDER_WAITTING_ACCEPT = 0;
    public static final int ORDER_WAITTING_MOVE = 1;
    public static final int ORDER_MOVE = 2;
    public static final int ORDER_FISNISH = 3;
    @Autowired
    private UserEntityRepository userRepository;

    @Autowired
    private VNPayRepository vnPayRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private CartItemEntityRepository cartItemEntityRepository;
    @Override
    public boolean order(Long userId,Long orderId,String vnpayId) {
        UserEntity user = userRepository.findById(userId).get();
        List<CartItemEntity> listCartItem =user.getCart().getCartItems();
        OrderEntity order = new OrderEntity();
        order.setUser(user);
        order.setDateCreate(LocalDateTime.now());
        order.setStatus(ORDER_WAITTING_ACCEPT);

        if(orderId ==null){
            order.setId(Long.parseLong(VNPayConfig.getRandomNumber(8)));
        }else {
            order.setId(orderId);
        }

        List<OrderItemEntity> listOrderItem = new ArrayList<>();
        OrderItemEntity temp;
        int totalPrice = 0;

        for (CartItemEntity item:listCartItem
             ) {
            temp = new OrderItemEntity();
            temp.setProduct(item.getProduct());
            temp.setQuanlity(item.getQuanlity());
            temp.setOrder(order);

//            orderItemRepository.save(temp);

            totalPrice += item.getProduct().getPrice() *item.getQuanlity();
            listOrderItem.add(temp);
        }
        order.setOrderItems(listOrderItem);

        System.out.println("Length:" + order.getOrderItems().size());
        order.setTotalPrice(totalPrice);

        if(vnpayId !=null){
            VNPayEntity vnpay = new VNPayEntity();
            vnpay.setIdVNPay(Long.parseLong(vnpayId));
            vnpay.setOrder(order);
            vnpay.setAmount(totalPrice);
//            vnPayRepository.save(vnpay);

            order.setPay(vnpay);
            order.setTypePayment("Thanh toán qua VNPAY");
            order.setIsPay(true);
        }else {
            order.setTypePayment("Thanh toán qua trực tiếp");
            order.setIsPay(false);
        }
        boolean check = orderRepository.save(order) != null;

        if(check){
            for (CartItemEntity item:listCartItem
            ) {
                cartItemEntityRepository.delete(item);
            }
        }

        return check;
    }
}