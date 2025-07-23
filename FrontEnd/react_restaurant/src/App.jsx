import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import SignUp from './components/Auth/SignUp'
function App() {
  

  return (
    
      <Routes>
        <Route path="/" element={<SignUp />}/>
      </Routes>
    
  )
}

export default App
