package com.ecommerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.entity.Role;
import com.ecommerce.entity.User;
import com.ecommerce.security.JwtUtil;
import com.ecommerce.service.UserService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;
    
    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register/user")
    public User registerUser(@RequestBody User user) {
        user.setRole(Role.ROLE_USER);
        return userService.registerUser(user);
    }

    @PostMapping("/register/admin")
    public User registerAdmin(@RequestBody User user) {
        user.setRole(Role.ROLE_ADMIN);
        return userService.registerAdmin(user);
    }  
    
//    @PostMapping("/login")
//    public String login(@RequestBody User user) {
//
//        User loggedUser = userService.loginUser(user.getEmail(), user.getPassword());
//
//        String token = jwtUtil.generateToken(loggedUser.getEmail(), loggedUser.getRole());
//
//        return token;
//    }
    
    @PostMapping("/login")
    public java.util.Map<String, String> login(@RequestBody User user) {

        User loggedUser = userService.loginUser(user.getEmail(),user.getPassword());

        String token = jwtUtil.generateToken(loggedUser.getEmail(),loggedUser.getRole());

        java.util.Map<String, String> response = new java.util.HashMap<>();

        response.put("token", token);

        response.put("role",loggedUser.getRole().name());

        response.put("name",loggedUser.getName());

        return response;
    }
}