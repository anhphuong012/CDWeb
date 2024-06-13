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
    @PostMapping("/{id}")
    public @ResponseBody ResponseEntity<ReposeOject> createOrder(@PathVariable Long id,@RequestParam(value = "orderId",required = false)Long orderId,@RequestParam(value = "idVnpay",required = false)String idVnpay){
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
