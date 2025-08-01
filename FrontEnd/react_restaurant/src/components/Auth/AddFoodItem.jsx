
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {useParams } from "react-router-dom";

const AddFoodItem = () => {
  const { restaurantId } = useParams(); 
  const [foodItem, setFoodItem] = useState({
    itemName: "",
    itemDescription: "",
    isVeg: true,
    price: ""
  });

  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    
    const newValue = type === "checkbox" ? checked : value;

    setFoodItem((prevState) => ({
      ...prevState,
      [name]: name === "price" ? parseInt(newValue) : newValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!restaurantId) {
      toast.error("Restaurant ID is missing in URL!");
      return;
    }

    try {
      await axios.post(
        `http://localhost:8080/food_items/${restaurantId}`,
        foodItem
      );
      toast.success("Food item added successfully!");
      setFoodItem({ itemName: "", itemDescription: "", isVeg: true, price: "" });
      
      
  
    } catch (error) {
      toast.error("Failed to add food item");
      console.error("Error adding food item:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Food Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Food Name</label>
          <input
            type="text"
            name="itemName"
            value={foodItem.itemName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label>Description</label>
          <input
            type="text"
            name="itemDescription"
            value={foodItem.itemDescription}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label>Price (in ₹)</label>
          <input
            type="number"
            name="price"
            value={foodItem.price}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label>Type</label>
          <select
            name="isVeg"
            value={foodItem.isVeg}
            onChange={(e) =>
              setFoodItem({ ...foodItem, isVeg: e.target.value === "true" })
            }
            className="form-select"
          >
            <option value="true">Veg</option>
            <option value="false">Non-Veg</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Add Food
        </button>
      </form>
    </div>
  );
};

export default AddFoodItem;
