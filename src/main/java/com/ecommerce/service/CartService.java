package com.ecommerce.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.entity.Cart;
import com.ecommerce.repository.CartRepository;

@Service
public class CartService {

	@Autowired
	private CartRepository cartRepository;
	
	public Cart addToCart(Cart cart) {
		return cartRepository.save(cart);
	}
	
	public List<Cart> getCartItems(){
		return cartRepository.findAll();
	}
	
	public void removeCartItems(Long id) {
		cartRepository.deleteById(id);
	}
	
	public Cart getCartById(Long id) {
		return cartRepository.findById(id).orElse(null);
	}
	
	public Cart saveCart(Cart cart) {
		return cartRepository.save(cart);
	}
	
	public List<Cart> getUserCart(String email){
	    return cartRepository
	            .findByUserEmail(email);
	}
}
