package com.ecommerce.controller;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.Path;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.ecommerce.entity.Product;
import com.ecommerce.service.ProductService;

@RestController
@RequestMapping("/products")
@CrossOrigin("*")
public class ProductController {
    
	@Autowired
 	private ProductService productService;
	
	@PostMapping("/admin/add")
	public ResponseEntity<String> addProduct(@RequestParam("companyName") String companyName, @RequestParam("productName") String productName, @RequestParam("oldPrice") double oldPrice, @RequestParam("newPrice") double newPrice, @RequestParam("discount") int discount, @RequestParam("rating") double rating, @RequestParam("category") String category, @RequestParam("image") MultipartFile image

	) {

	    try {
	        String uploadDir = "uploads/";
	        File directory = new File(uploadDir);
	        if (!directory.exists()) {
	            directory.mkdirs();
	        }
	        String fileName = image.getOriginalFilename();
	        Path filePath = Paths.get(uploadDir + fileName);
	        Files.write(filePath, image.getBytes());
	        Product product = new Product();

	        product.setCompanyName(companyName);
	        product.setProductName(productName);
	        product.setOldPrice(oldPrice);
	        product.setNewPrice(newPrice);
	        product.setDiscount(discount);
	        product.setRating(rating);
	        product.setCategory(category);

	        product.setImageUrl("/uploads/" + fileName);

	        productService.addProduct(product);

	        return ResponseEntity.ok("Product Added Successfully");
	    }

	    catch (Exception e) {

	        e.printStackTrace();

	        return ResponseEntity.status(500)
	                .body("Error Adding Product");
	    }
	}
	
	@GetMapping
	public List<Product> getAllProducts(){
		return productService.getAllProducts();
	}
	
	@DeleteMapping("/admin/delete/{id}")
	public String deleteProduct(@PathVariable Long id){
		productService.deleteProduct(id);
		return "Product Deleted Successfully";
	}
	
	@PutMapping("/admin/update/{id}")
	public ResponseEntity<String> updateProduct(@PathVariable Long id, @RequestParam("companyName") String companyName, @RequestParam("productName") String productName, @RequestParam("oldPrice") double oldPrice, @RequestParam("newPrice") double newPrice, @RequestParam("discount") int discount, @RequestParam("rating") double rating, @RequestParam("category") String category, @RequestParam(value = "image", required = false) MultipartFile image

	) {

	    try {

	        Product product =
	        productService.getProductById(id);

	        product.setCompanyName(companyName);
	        product.setProductName(productName);
	        product.setOldPrice(oldPrice);
	        product.setNewPrice(newPrice);
	        product.setDiscount(discount);
	        product.setRating(rating);
	        product.setCategory(category);

	        /* IMAGE UPDATE */

	        if(image != null && !image.isEmpty() && image.getOriginalFilename() != null && !image.getOriginalFilename().isBlank()) {

	            String uploadDir = "uploads/";

	            File directory =
	            new File(uploadDir);

	            if(!directory.exists()) {

	                directory.mkdirs();
	            }

	            String fileName =
	            image.getOriginalFilename();

	            Path filePath =
	            Paths.get(uploadDir + fileName);

	            Files.write(
	                filePath,
	                image.getBytes()
	            );

	            product.setImageUrl("/uploads/" + fileName);
	        }

	        productService.saveProduct(product);

	        return ResponseEntity.ok(
	            "Product Updated Successfully"
	        );
	    }

	    catch(Exception e) {

	        e.printStackTrace();

	        return ResponseEntity.status(500)
	                .body("Update Failed");
	    }
	}
	
	@GetMapping("/category/{category}")
	public List<Product> getByCategory(@PathVariable String category){
		return productService.getByCategory(category);
	}
	
	@GetMapping("/sort/low")
	public List<Product> lowToHigh(){
		return productService.sortLowToHigh();
	}
	
	@GetMapping("/sort/high")
	public List<Product> highToLow(){
		return productService.sortHighToLow();
	}
}
