import React, {useState} from "react";

const AddFoodItem = () => {
      const [food, setFood] = useState({ 
        itemName: '', 
        price: '', 
        isVeg: false, 
        restaurantId: ''
     });

     const handleChange = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/food_items/", food);
        alert("food item added");
     };

     return (
        <div>
            <div>Add food Item</div>
        </div>
     )

}

export default AddFoodItem;