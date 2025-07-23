import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dob: "",
    userRole: "",
    subscriptionAmount: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending data:", formData);

    try {
      const res = await axios.post("http://localhost:8080/users/signup", formData);
      alert("Signup successful!");
      console.log("Server response:", res.data);
      navigate("/login"); 
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
      alert("Signup failed. Check console for details.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="form-control"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="form-control"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="date"
            name="dob"
            className="form-control"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <select
            name="userRole"
            className="form-control"
            value={formData.userRole}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            <option value="CUSTOMER">CUSTOMER</option>
            <option value="DELIVERY_PERSON">DELIVERY_PERSON</option>
            <option value="MANAGER">MANAGER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>

        <div className="mb-3">
          <input
            type="number"
            name="subscriptionAmount"
            placeholder="Subscription Amount"
            className="form-control"
            value={formData.subscriptionAmount}
            onChange={handleChange}
            min="1000"
            max="5000"
            step="100"
            required
          />
        </div>

        <div className='mb-3'>
          <div className='mb-3'>
            Already have an account yet? Login <Link to='/login'>here</Link>
          </div>
          <button
            onClick={handleChange}
            className='btn btn-success'
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
