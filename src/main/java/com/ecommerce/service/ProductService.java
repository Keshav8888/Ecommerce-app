package com.ecommerce.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.entity.Product;
import com.ecommerce.repository.ProductRepository;

@Service
public class ProductService {

	@Autowired
    private ProductRepository productRepository;

    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    public Product getProductById(Long id){
        return productRepository.findById(id).orElse(null);
    }

    public Product saveProduct(Product product){
        return productRepository.save(product);
    }
    
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    public Product updateProduct(Long id, Product product) {
        Product existingProduct = productRepository.findById(id).orElse(null);

        existingProduct.setCompanyName(product.getCompanyName());
        existingProduct.setProductName(product.getProductName());
        existingProduct.setOldPrice(product.getOldPrice());
        existingProduct.setNewPrice(product.getNewPrice());
        existingProduct.setDiscount(product.getDiscount());
        existingProduct.setRating(product.getRating());
        existingProduct.setCategory(product.getCategory());
        existingProduct.setBrand(product.getBrand());
        existingProduct.setImageUrl(product.getImageUrl());

        return productRepository.save(existingProduct);
    }

    public List<Product> getByCategory(String category) {
        return productRepository.findByCategory(category);
    }

    public List<Product> sortLowToHigh() {
        return productRepository.findAllByOrderByNewPriceAsc();
    }

    public List<Product> sortHighToLow() {
        return productRepository.findAllByOrderByNewPriceDesc();
    }
}
