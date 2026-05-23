package com.ecommerce.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="cart")
public class Cart {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String productName;
	private String companyName;
	private double oldPrice;
	private double newPrice;
	private int discount;
	private double rating;
	private String imageUrl;
	private int quantity;
	private String userEmail;
	
	public Cart() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Cart(Long id, String productName, String companyName, double oldPrice, double newPrice, int discount,
			double rating, String imageUrl, int quantity, String userEmail) {
		super();
		this.id = id;
		this.productName = productName;
		this.companyName = companyName;
		this.oldPrice = oldPrice;
		this.newPrice = newPrice;
		this.discount = discount;
		this.rating = rating;
		this.imageUrl = imageUrl;
		this.quantity = quantity;
		this.userEmail = userEmail;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public double getOldPrice() {
		return oldPrice;
	}

	public void setOldPrice(double oldPrice) {
		this.oldPrice = oldPrice;
	}

	public double getNewPrice() {
		return newPrice;
	}

	public void setNewPrice(double newPrice) {
		this.newPrice = newPrice;
	}

	public int getDiscount() {
		return discount;
	}

	public void setDiscount(int discount) {
		this.discount = discount;
	}

	public double getRating() {
		return rating;
	}

	public void setRating(double rating) {
		this.rating = rating;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	
	public String getUserEmail() {
	    return userEmail;
	}

	public void setUserEmail(String userEmail) {
	    this.userEmail = userEmail;
	}

//	@Override
//	public String toString() {
//		return "Cart [id=" + id + ", productName=" + productName + ", companyName=" + companyName + ", oldPrice="
//				+ oldPrice + ", newPrice=" + newPrice + ", discount=" + discount + ", rating=" + rating + ", imageUrl="
//				+ imageUrl + ", quantity=" + quantity + "]";
//	}
	
	
}
