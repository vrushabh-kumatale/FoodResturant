package com.sunbeam.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.sunbeam.entities.Restaurant;

public interface ResturantDao extends JpaRepository<Restaurant, Long>{

	List<Restaurant> findBystatusTrue();
	
	boolean existsByName(String resturantName);
	
	@Query("select r from Restaurant r left join fetch r.foodItems where r.id=:restaurantId")
	Restaurant fetchCompleteDetails(Long restaurantId);
}
