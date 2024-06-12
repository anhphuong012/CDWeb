package com.example.webbanhang.Entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "carts")
public class CartEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@OneToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id", referencedColumnName = "id")
	private UserEntity user;
	
	@OneToMany(fetch = FetchType.LAZY,mappedBy="cart")
	private List<CartItemEntity> cartItems = new ArrayList<>();

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public UserEntity getUser() {
		return user;
	}

	public void setUser(UserEntity user) {
		this.user = user;
	}

	public List<CartItemEntity> getCartItems() {
		return cartItems;
	}

	public void setCartItems(List<CartItemEntity> cartItems) {
		this.cartItems = cartItems;
	}
	
	
}
