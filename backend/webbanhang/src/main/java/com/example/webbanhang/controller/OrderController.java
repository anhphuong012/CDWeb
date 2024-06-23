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
    @GetMapping(value = "orders/{id}")
    public @ResponseBody ResponseEntity<ReposeOject> getOrderById(@PathVariable(name = "id") Long id){
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ReposeOject("OK", " Success",orderService.getOrderById(id) ));
    }

    @GetMapping(value = "/{id}")
    public @ResponseBody ResponseEntity<ReposeOject> getOrder(@PathVariable Long id){
        System.out.println("find");
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ReposeOject("OK", " Success",orderService.findOrderByUserId(id) ));
    }

    @GetMapping(value = "/{id}/{status}")
    public @ResponseBody ResponseEntity<ReposeOject> getOrder(@PathVariable Long id, @PathVariable int status){
        System.out.println("find");
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ReposeOject("OK", " Success",orderService.findByStatusAndUserId(id, status) ));
    }

    @GetMapping()
    public @ResponseBody ResponseEntity<ReposeOject> getAllOrder(@RequestParam(value = "status",required = false) String status){
        System.out.println("find");
        if(status ==null){
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ReposeOject("OK", " Success",orderService.findAllOrder() ));
        }else {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ReposeOject("OK", " Success",orderService.findByStatus(Integer.parseInt(status)) ));
        }
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


    @PutMapping
    public @ResponseBody ResponseEntity<ReposeOject> update(@RequestParam(value = "orderId")Long orderId,@RequestParam(value = "status") int status){
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ReposeOject("OK", " Success",orderService.changeStatus(orderId,status) ));
    }


}
