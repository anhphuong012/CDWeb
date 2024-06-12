package com.example.webbanhang.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.webbanhang.model.ReposeOject;
import com.example.webbanhang.service.ICartService;

@RestController
@RequestMapping("api/cart")
public class CartController {
	@Autowired
	ICartService cartService;

	@PostMapping("/{userId}")
	@ResponseBody
	ResponseEntity<ReposeOject> addCartItem(@PathVariable Long userId, @RequestParam Long productId,
			@RequestParam int quanlity, @RequestParam String size) {
		cartService.add(userId, productId, quanlity, size);
		return ResponseEntity.status(HttpStatus.OK).body(new ReposeOject("OK", " Success", true));
	}

	@GetMapping("/{userId}")
	@ResponseBody
	ResponseEntity<ReposeOject> getCartItem(@PathVariable Long userId) {

		return ResponseEntity.status(HttpStatus.OK)
				.body(new ReposeOject("OK", " Success", cartService.findCartByUser(userId)));
	}

	@PutMapping("/{userId}")
	@ResponseBody
	ResponseEntity<ReposeOject> update(@PathVariable Long userId,@RequestParam Long productId,@RequestParam String size, @RequestParam int type) {

		return ResponseEntity.status(HttpStatus.OK)
				.body(new ReposeOject("OK", " Success", cartService.changeQuanlity(userId,productId,size,type)));
	}

	@DeleteMapping("/{userId}")
	@ResponseBody
	ResponseEntity<ReposeOject> delete(@PathVariable Long userId,@RequestParam Long productId,@RequestParam String size) {

		return ResponseEntity.status(HttpStatus.OK)
				.body(new ReposeOject("OK", " Success", cartService.delete(userId,productId,size)));
	}
}
