import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const AddRestaurant = () => {
  const [restaurant, setRestaurant] = useState({
    
    name: '',
    address: '',
    city: '',
    description: ''
   
  });
   const navigate = useNavigate();

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRestaurant({ ...restaurant, [name]: value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/restaurants', restaurant);
      alert("Restaurant added successfully");
      setRestaurant({ name: '', address: '', city: '', description: '' }); 

      navigate("/restaurants");
    } catch (error) {
      alert("Error adding restaurant");
      console.error("Add error:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Restaurant</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            name="name"
            placeholder="Restaurant Name"
            className="form-control"
            value={restaurant.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="form-control"
            value={restaurant.address}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="city"
            placeholder="City"
            className="form-control"
            value={restaurant.city}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="description"
            placeholder="Description"
            className="form-control"
            value={restaurant.description}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Add Restaurant
        </button>
      </form>
    </div>
  );
};

export default AddRestaurant;
