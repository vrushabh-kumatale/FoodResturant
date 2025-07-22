import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
  const [user, setUser] = useState({ firstName: '', lastName: '', email: '', password: '', userRole: 'CUSTOMER' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/users/signup', user);
      alert("User registered successfully");
    } catch (error) {
      alert("Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="First Name" onChange={(e) => setUser({ ...user, firstName: e.target.value })} />
      <input placeholder="Last Name" onChange={(e) => setUser({ ...user, lastName: e.target.value })} />
      <input type="email" placeholder="Email" onChange={(e) => setUser({ ...user, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={(e) => setUser({ ...user, password: e.target.value })} />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
