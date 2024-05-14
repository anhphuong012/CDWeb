package com.example.webbanhang.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.webbanhang.model.ReposeOject;
import com.example.webbanhang.service.ProductService;

@RestController
@RequestMapping("api/products")
public class ProductController {
	@Autowired
	private ProductService productService;

	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<ReposeOject> findAll(
			@RequestParam(value = "name", required = false) String name) throws IOException {
		HttpHeaders headers = new HttpHeaders();
		headers.set("Content-Type", "application/json");

		if (name != null) {
			return ResponseEntity.status(HttpStatus.OK).headers(headers)
					.body(new ReposeOject("OK", " Success", productService.findProductByName(name)));
		} else {
			return ResponseEntity.status(HttpStatus.OK).headers(headers)
					.body(new ReposeOject("OK", " Success", productService.findAllProduct()));
		}
	}

}