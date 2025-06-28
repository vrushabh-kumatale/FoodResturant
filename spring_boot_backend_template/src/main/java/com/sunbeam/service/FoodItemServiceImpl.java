package com.sunbeam.service;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.sunbeam.custom_exceptions.ResourceNotFoundException;
import com.sunbeam.dao.FoodItemDao;
import com.sunbeam.dao.ResturantDao;
import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.FoodItemDTO;
import com.sunbeam.entities.FoodItem;
import com.sunbeam.entities.Restaurant;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class FoodItemServiceImpl implements FoodItemService{

	private final FoodItemDao foodItemDao;
	private final ResturantDao restaurantDao;
	private final ModelMapper modelMapper;
	@Override
	public ApiResponse addFoodItemToRestaurant(Long restaurantId, FoodItemDTO dto) {
Restaurant restaurantEntity = restaurantDao.findById(restaurantId)
.orElseThrow(() -> new ResourceNotFoundException("Invalid restaurant id - Food Item can't be added!!!!"));
FoodItem foodItemEntity = modelMapper.map(dto, FoodItem.class);
restaurantEntity.addFoodItem(foodItemEntity);
		return new ApiResponse("New food item added to the restaurant");
	}

}
