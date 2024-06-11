package com.example.webbanhang.Entity;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "products")
public class ProductEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	private String name;
	private int price;
	private String descreption;
	private String image;

	@ManyToOne
	@JoinColumn(name = "category_id")
	private CategoryEntity category;

	@OneToMany(mappedBy = "product")
	private List<SizeEntiry> sizes;

//	@OneToOne(mappedBy = "product")
//	private CartItemEntity cartItemEntity;
	@OneToMany(mappedBy = "product")
	private List<CartItemEntity> cartItems;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public String getDescreption() {
		return descreption;
	}

	public void setDescreption(String descreption) {
		this.descreption = descreption;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public CategoryEntity getCategory() {
		return category;
	}

	public void setCategory(CategoryEntity category) {
		this.category = category;
	}

	public Long getId() {
		return id;
	}

	public List<SizeEntiry> getSizes() {
		return sizes;
	}

	public void setSizes(List<SizeEntiry> sizes) {
		this.sizes = sizes;
	}

	public List<CartItemEntity> getCartItems() {
		return cartItems;
	}

	public void setCartItems(List<CartItemEntity> cartItems) {
		this.cartItems = cartItems;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Override
	public String toString() {
		return "ProductEntity{" +
				"id=" + id +
				", name='" + name + '\'' +
				", price=" + price +
				", descreption='" + descreption + '\'' +
				", image='" + image + '\'' +
				", category=" + category +
				", sizes=" + sizes +
				", cartItems=" + cartItems +
				'}';
	}
}
