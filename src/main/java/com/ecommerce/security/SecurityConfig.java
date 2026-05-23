package com.ecommerce.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

	@Autowired
	private JwtFilter jwtFilter;
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
		 
		http
         .csrf(csrf -> csrf.disable())

         .authorizeHttpRequests(auth -> auth
        		  .requestMatchers(
        		            "/",
        		            "/index.html",
        		            "/login.html",
        		            "/register.html",
        		            "/products.html",
        		            "/cart.html",
        		            "/admin.html",
        		            "/user.html",
        		            "/orders.html",
        		            "/admin-orders.html",
        		            "/cart/**",
        		            "/css/**",
        		            "/js/**",
        		            "/products",
        		            "/auth/**",
        		            "/images/**",
        		            "/favicon.ico",
        		            "/uploads/**",
        		            
        		            "/products/category/**"
        		    ).permitAll()

             .requestMatchers("/auth/**").permitAll()
             .requestMatchers("/products", "/products/category/**", "/products/sort/**").permitAll()
             .requestMatchers("/products/admin/**").hasRole("ADMIN")
             .requestMatchers("/admin/**").hasRole("ADMIN")
             .requestMatchers("/cart/**").authenticated()
             .requestMatchers("/products/admin/**").permitAll()
             .anyRequest().authenticated()
//        		.anyRequest().permitAll()
        				
         )
         
         .formLogin(form -> form.disable())
         .httpBasic(basic -> basic.disable());

		 http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
		 
     return http.build();
	}
	
	@Bean
	public org.springframework.security.crypto.password.PasswordEncoder passwordEncoder(){
		return new org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder();
	}
}
