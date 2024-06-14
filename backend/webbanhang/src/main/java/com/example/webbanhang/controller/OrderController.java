package com.example.webbanhang.controller;

import com.example.webbanhang.model.ReposeOject;
import com.example.webbanhang.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    OrderService orderService;

    @GetMapping(value = "/{id}")
    public @ResponseBody ResponseEntity<ReposeOject> getOrder(@PathVariable Long id){
        System.out.println("find");
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ReposeOject("OK", " Success",orderService.findOrderByUserId(id) ));
    }
    @PostMapping("/{id}")
    public @ResponseBody ResponseEntity<ReposeOject> createOrder(@PathVariable Long id,@RequestParam(value = "orderId",required = false)Long orderId,@RequestParam(value = "idVnpay",required = false)String idVnpay){
        System.out.print("Đã vào order");
        boolean check = orderService.order(id,orderId,idVnpay);
        if(check){
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ReposeOject("OK", " Success",true ));
        }else {
            return ResponseEntity.status(HttpStatus.FAILED_DEPENDENCY)
                    .body(new ReposeOject("Failed", " Failed",false ));
        }
    }



}
