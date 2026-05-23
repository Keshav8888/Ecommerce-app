package com.ecommerce.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="products")
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String companyName;
	private String productName;
	
	private double oldPrice;
	private double newPrice;
	private int discount;
	
	private double rating;
	
	private String category;
	private String brand;
	
	private String imageUrl;

	public Product() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Product(Long id, String companyName, String productName, double oldPrice, double newPrice, int discount,
			double rating, String category, String brand, String imageUrl) {
		super();
		this.id = id;
		this.companyName = companyName;
		this.productName = productName;
		this.oldPrice = oldPrice;
		this.newPrice = newPrice;
		this.discount = discount;
		this.rating = rating;
		this.category = category;
		this.brand = brand;
		this.imageUrl = imageUrl;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
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

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	@Override
	public String toString() {
		return "Product [id=" + id + ", companyName=" + companyName + ", productName=" + productName + ", oldPrice="
				+ oldPrice + ", newPrice=" + newPrice + ", discount=" + discount + ", rating=" + rating + ", category="
				+ category + ", brand=" + brand + ", imageUrl=" + imageUrl + "]";
	}	
	
}
