
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get('http://localhost:8080/restaurants');
      setRestaurants(response.data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  const removeRestaurant = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/restaurants/${id}`);
      alert('Restaurant deleted successfully');
      fetchRestaurants();
    } catch (error) {
      console.error('Error deleting restaurant:', error);
      alert('Failed to delete restaurant');
    }
  };

  const updateRestaurant = (id) => {
    navigate(`/edit-restaurant/${id}`);
  };

  const handleAddFood = (id) => {
    navigate(`/add-food-item/${id}`);
  };

  return (
    <div className="container mt-4">
      <h2>Available Restaurants</h2>
      {restaurants.length === 0 ? (
        <p>No restaurants available.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>City</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((restaurant, index) => (
              <tr key={index}>
                <td>{restaurant.name}</td>
                <td>{restaurant.address}</td>
                <td>{restaurant.city}</td>
                <td>{restaurant.description}</td>
                <td>
                  <button
                    onClick={() => removeRestaurant(restaurant.id)}
                    className="btn btn-danger me-2"
                  >
                     Delete
                  </button>
                  <button
                    onClick={() => updateRestaurant(restaurant.id)}
                    className="btn btn-success me-2"
                  >
                     Edit
                  </button>
                  <button
                    onClick={() => handleAddFood(restaurant.id)}
                    className="btn btn-warning text-white"
                  >
                     Add Food
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RestaurantList;


