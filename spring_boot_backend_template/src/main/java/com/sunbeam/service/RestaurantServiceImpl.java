package com.sunbeam.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.sunbeam.custom_exceptions.ApiException;
import com.sunbeam.custom_exceptions.ResourceNotFoundException;
import com.sunbeam.dao.ResturantDao;
import com.sunbeam.dto.AddRestaurantDTO;
import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.RestaurantMenuDTO;
import com.sunbeam.dto.RestaurantRespDTO;
import com.sunbeam.entities.Restaurant;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class RestaurantServiceImpl implements RestaurantService{
	
	private final ResturantDao resturantDao;
	private final ModelMapper modelMapper;

	@Override
	public List<RestaurantRespDTO> getAllRestaurants() {
		
		return resturantDao.findBystatusTrue()
				.stream()
				.map(restaurant -> 
				modelMapper.map(restaurant, RestaurantRespDTO.class))
				.toList();
	}

	@Override
	public ApiResponse deleteRestaurantDetails(Long restaurantId) {
		Restaurant restaurant = resturantDao.findById(restaurantId)
				.orElseThrow(() -> new ResourceNotFoundException("invalid restaurant id!!!!"));
		restaurant.setStatus(false);
		
		return new ApiResponse("Soft deleted restaurant details");
	}

	@Override
	public RestaurantRespDTO getRestaurantDetails(Long id) {
     Restaurant entity = resturantDao.findById(id)
    		 .orElseThrow(()-> new ResourceNotFoundException("invalid restaurant id!!!!"));
		return modelMapper.map(entity, RestaurantRespDTO.class);
	}

	@Override
	public ApiResponse updateDetails(Long id, AddRestaurantDTO dto) {
		if (resturantDao.existsByName(dto.getName()))
			throw new ApiException("Dup Restaurant Name - update restaurant failed ");

		// invoke dao's method
		Restaurant entity = resturantDao.findById(id)
				.orElseThrow(() ->
				new ResourceNotFoundException("Invalid Restaurant ID : Update failed"));
		// map dto -> entity (only not null fields will be transferred)
		//entity - PERSISTENT
		modelMapper.map(dto, entity);//modifying state of the persistent entity
	//	restaurantDao.save(entity);
		return new ApiResponse("restaurant details updated !");
		
	}

	@Override
	public ApiResponse addNewRestaurant(AddRestaurantDTO dto) {
		if(resturantDao.existsByName(dto.getName())) throw new ApiException("Dup Restaurant Name - add restaurant failed");
		
		Restaurant entity = modelMapper.map(dto, Restaurant.class);
		entity.setStatus(true);
		
		Restaurant persistenRestaurant = resturantDao.save(entity);
		
		return new ApiResponse("Added new Restaurant with ID= "+persistenRestaurant.getId());
	}

	@Override
	public RestaurantMenuDTO getCompleteDetails(Long restaurantId) {
		Restaurant entity =
				resturantDao.fetchCompleteDetails(restaurantId);
		//2. map entity -> dto
		return modelMapper.map(entity, RestaurantMenuDTO.class);
	}

}
