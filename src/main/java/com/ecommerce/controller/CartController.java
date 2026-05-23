package com.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.ecommerce.entity.Cart;
import com.ecommerce.service.CartService;

@RestController
@RequestMapping("/cart")
@CrossOrigin("*")
public class CartController {

	@Autowired
	private CartService cartService;
	
	@PostMapping("/add")
	public Cart addToCart(@RequestBody Cart cart) {
	    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	    String email = authentication.getName();
	    cart.setUserEmail(email);
	    return cartService.addToCart(cart);
	}
	
	@GetMapping
	public List<Cart> getCartItems(){
	    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	    String email = authentication.getName();
	    return cartService.getUserCart(email);
	}
	
	@DeleteMapping("/remove/{id}")
	public String removeItem(@PathVariable Long id) {
		cartService.removeCartItems(id);
		return "Item Removed!";
	}
	
	@PutMapping("/updateQuantity/{id}")
	public ResponseEntity<String> updateQuantity(@PathVariable Long id, @RequestParam int quantity){
		Cart cart=cartService.getCartById(id);
		
		if(cart==null) {
			return ResponseEntity.badRequest().body("Cart Item Not Found");
		}
		cart.setQuantity(quantity);
		cartService.saveCart(cart);
		return ResponseEntity.ok("Quantity Updated");
	};
}
