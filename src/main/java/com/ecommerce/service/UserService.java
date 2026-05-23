package com.ecommerce.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ecommerce.entity.Role;
import com.ecommerce.entity.User;
import com.ecommerce.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    public User registerUser(User user) {

        User existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser != null) {
            throw new RuntimeException("Email already registered!");
        }
        
        user.setRole(Role.ROLE_USER); 
        
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }
    
    public User registerAdmin(User user) {

        User existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser != null) {
            throw new RuntimeException("Email already registered!");
        }

        user.setRole(Role.ROLE_ADMIN);

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }
    
    public User loginUser(String email, String password) {
    	User user= userRepository.findByEmail(email);
    	
    	if(user==null) {
    		throw new RuntimeException("User not Found!!");
    	}
    	
    	if(!passwordEncoder.matches(password, user.getPassword())) {
    		throw new RuntimeException("Invalid Password!");
    	}
    	return user;
    }
}