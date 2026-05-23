package com.ecommerce.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.entity.Cart;
import com.ecommerce.entity.Order;
import com.ecommerce.entity.OrderItem;
import com.ecommerce.entity.User;
import com.ecommerce.repository.CartRepository;
import com.ecommerce.repository.OrderRepository;
import com.ecommerce.repository.UserRepository;

@Service
public class OrderService {

	@Autowired
	private OrderRepository orderRepository;
	
	@Autowired
	private CartRepository cartRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	  /* Place Order */
	 public Order placeOrder(String userEmail){
		 
		/* Get User Cart Items */
		List<Cart> cartItems = cartRepository.findByUserEmail(userEmail);
		
		/* Create Order */
		Order order=new Order();
		
		order.setUserEmail(userEmail);
		User user = userRepository.findByEmail(userEmail);
		String userName = user.getName();
		order.setUserName(userName);
		order.setStatus("Pending");
		order.setOrderDate(LocalDateTime.now());
		
		List<OrderItem> orderItems=new ArrayList<>();
		
		double totalAmount=0;
		
		/* Converting Cart → Order Items */
		for(Cart cart : cartItems) {
			OrderItem item = new OrderItem();
			
			item.setProductName(cart.getProductName());
			item.setUserName(userName);
			item.setCompanyName(cart.getCompanyName());
			item.setImageUrl(cart.getImageUrl());
			item.setPrice(cart.getNewPrice());
			item.setQuantity(cart.getQuantity());
			item.setDiscount(cart.getDiscount());
			item.setOrder(order);
			
			orderItems.add(item);
			
			totalAmount += cart.getNewPrice()*cart.getQuantity();
		}
			
			order.setOrderItems(orderItems);
			order.setTotalAmount(totalAmount);
			
			 /* Save Order */
			Order savedOrder = orderRepository.save(order);
			
	        /* Clear Cart */
			cartRepository.deleteAll(cartItems);
			
			return savedOrder;
	 	}

	    /* User Orders */

	    public List<Order> getUserOrders(String userEmail){
	        return orderRepository.findByUserEmail(userEmail);
	    }

	    /* Admin All Orders */

	    public List<Order> getAllOrders(){
	        return orderRepository.findAll();
	    }

	    /* Update Status */

	    public Order updateStatus(Long id, String status){
	        Order order = orderRepository.findById(id).orElse(null);
	        
	        if(order != null){
	            order.setStatus(status);
	            return orderRepository.save(order);
	        }
	        return null;
	    }
}
