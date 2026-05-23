package com.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.entity.Order;
import com.ecommerce.service.OrderService;

@RestController
@RequestMapping("/orders")
@CrossOrigin("*")
public class OrderController {

	@Autowired
	private OrderService orderService;
	
	@PostMapping("/place")
	public ResponseEntity<?> placeOrder(Authentication authentication){
		String userEmail = authentication.getName();
		
		Order order = orderService.placeOrder(userEmail);
		
		return ResponseEntity.ok(order);
	}
	
	@GetMapping("/my-orders")
	public List<Order> getMyOrders(Authentication authentication){
		String userEmail=authentication.getName();
		
		return orderService.getUserOrders(userEmail);
	}
	
	@GetMapping("/admin/all")
	public List<Order> getAllOrders(){
		return orderService.getAllOrders();
	}
	
	@PutMapping("/admin/update-status/{id}")
	public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody String status){
		Order updatedOrder=orderService.updateStatus(id, status);
		
		return ResponseEntity.ok(updatedOrder);
	}
}
