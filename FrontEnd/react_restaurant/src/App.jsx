import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import SignUp from './components/Auth/SignUp'
import SignIn from './components/Auth/SignIn'
import AddRestaurant from './components/Auth/AddRestaurant';
import AddFoodItem from './components/Auth/AddFoodItem';
import RestaurantList from './components/Auth/RestaurantList';

function App() {
  

  return (
    
      <Routes>
        <Route path="/" element={<SignUp />}/>
        <Route path="/login" element={<SignIn />}/>
        <Route path="/add_restaurant" element={<AddRestaurant />}/>
        <Route path="/restaurants" element={<RestaurantList/>} />
        <Route path="/add-food-item/:restaurantId" element={<AddFoodItem />} />

     </Routes>
    
  )
}

export default App
