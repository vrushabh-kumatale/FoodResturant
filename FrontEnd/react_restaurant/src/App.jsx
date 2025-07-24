import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import SignUp from './components/Auth/SignUp'
import SignIn from './components/Auth/SignIn'
import AddRestaurant from './components/Auth/AddRestaurant';


function App() {
  

  return (
    
      <Routes>
        <Route path="/" element={<SignUp />}/>
        <Route path="/login" element={<SignIn />}/>
        <Route path="/add_restaurant" element={<AddRestaurant />}/>
     </Routes>
    
  )
}

export default App
