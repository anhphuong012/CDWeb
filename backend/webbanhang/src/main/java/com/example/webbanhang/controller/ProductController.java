package com.example.webbanhang.controller;

import java.io.IOException;

import com.example.webbanhang.dto.ProductDTO;
import com.example.webbanhang.model.ProductModel;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.webbanhang.model.ReposeOject;
import com.example.webbanhang.service.ProductService;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("api/products")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity<ReposeOject> findAll(
            @RequestParam(value = "name", required = false) String name) throws Exception {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");

        if (name != null) {
            if (name.equals("all")) {
                return ResponseEntity.status(HttpStatus.OK).headers(headers)
                        .body(new ReposeOject("OK", " Success", productService.findAllProduct()));
            } else {
                return ResponseEntity.status(HttpStatus.OK).headers(headers)
                        .body(new ReposeOject("OK", " Success", productService.findProductByName(name)));
            }
        } else {
            return ResponseEntity.status(HttpStatus.OK).headers(headers)
                    .body(new ReposeOject("OK", " Success", productService.findAllProduct()));
        }
    }

    @GetMapping(value = "/category/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity<ReposeOject> findByCategory(@PathVariable Long id) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");

        return ResponseEntity.status(HttpStatus.OK).headers(headers)
                .body(new ReposeOject("OK", " Success", productService.findProductByCategory(id)));
    }

    @GetMapping(value = "/product/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody ResponseEntity<ReposeOject> findById(@PathVariable Long id) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");

        return ResponseEntity.status(HttpStatus.OK).headers(headers)
                .body(new ReposeOject("OK", " Success", productService.findById(id)));
    }

    @PostMapping(value = "/product")
    public @ResponseBody ResponseEntity<ReposeOject> create(@RequestPart(value = "file") MultipartFile file, @RequestPart(value = "productDTO") String productDTO) throws IOException {
//		HttpHeaders headers = new HttpHeaders();
//		headers.set("Content-Type", "application/json");
        System.out.println("Controller");

        System.out.println("File:" + file);
        ProductModel result = productService.addProduct(convertToProductDTO(productDTO), file);
        System.out.println("Result:" + result);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ReposeOject("OK", " Success", result));
    }

    @PutMapping(value = "/product/{id}")
    public @ResponseBody ResponseEntity<ReposeOject> update(@PathVariable(value = "id") Long id, @RequestPart(value = "file", required = false) MultipartFile file, @RequestPart(value = "productDTO") String productDTO) throws IOException {
        System.out.println("File:" + file);
        if (file != null && file.isEmpty()) {
            file = null;

        }
        ProductModel result = productService.updateProduct(id, convertToProductDTO(productDTO), file);
        System.out.println("Result:" + result);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ReposeOject("OK", " Success", result));
    }

    @DeleteMapping(value = "/product/{id}")
    public @ResponseBody ResponseEntity<ReposeOject> delete(@PathVariable(value = "id") Long id) throws IOException {
        boolean isDelete = productService.deleteProduct(id);
        System.out.println("delete");
        if (isDelete) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ReposeOject("OK", " Success", true));
        } else {
            return ResponseEntity.status(HttpStatus.FAILED_DEPENDENCY)
                    .body(new ReposeOject("Failed", " Failed", false));
        }

    }

    private ProductDTO convertToProductDTO(String productDTO) {
        ProductDTO result = null;
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            result = objectMapper.readValue(productDTO, ProductDTO.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        return result;
    }


}
