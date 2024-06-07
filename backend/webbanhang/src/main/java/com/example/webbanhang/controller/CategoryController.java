package com.example.webbanhang.controller;


import com.example.webbanhang.model.ReposeOject;
import com.example.webbanhang.service.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/categories")
public class CategoryController {
    @Autowired
    ICategoryService categoryService;

    @GetMapping()
    public @ResponseBody ResponseEntity<ReposeOject> getAll() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");

        return ResponseEntity.status(HttpStatus.OK).headers(headers)
                .body(new ReposeOject("OK", " Success", categoryService.getAll()));
    }
}
