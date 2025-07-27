package com.sunbeam.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.dto.FoodItemDTO;
import com.sunbeam.service.FoodItemService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/food_items")
@AllArgsConstructor
@CrossOrigin(origins="http://localhost:3000")
public class FoodItemController {
	
	private final FoodItemService foodItemService;
	
	@PostMapping("/{restaurantId}")
	ResponseEntity<?> addFoodItem(@PathVariable Long restaurantId, @RequestBody FoodItemDTO dto)
	{
		System.out.println("in add food "+restaurantId+" "+dto);
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(foodItemService.addFoodItemToRestaurant(restaurantId, dto));
		
	}

}
