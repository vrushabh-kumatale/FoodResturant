// import React, { useState } from 'react';
// import axios from 'axios';

// const SignUp = () => {
//   const [user, setUser] = useState({ firstName: '', lastName: '', email: '', password: '', userRole: 'CUSTOMER' });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:8080/users/signup', user);
//       alert("User registered successfully");
//     } catch (error) {
//       alert("Signup failed");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input placeholder="First Name" onChange={(e) => setUser({ ...user, firstName: e.target.value })} />
//       <input placeholder="Last Name" onChange={(e) => setUser({ ...user, lastName: e.target.value })} />
//       <input type="email" placeholder="Email" onChange={(e) => setUser({ ...user, email: e.target.value })} />
//       <input type="password" placeholder="Password" onChange={(e) => setUser({ ...user, password: e.target.value })} />
//       <button type="submit">Sign Up</button>
//     </form>
//   );
// };

// export default SignUp;

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
//import { registerUser } from '../services/admin'


function SignUp() {
  const [info, setInfo] = useState({
    FirstName :'',
    LastName:'',
    email:'',
    password: ''
    
  })

  // get the navigate function reference
  const navigate = useNavigate()

  const onRegister = async () => {
    if (info.FirstName.length == 0) {
      toast.warn('Please enter first name')
    }  else if (info.LastName.length == 0) {
      toast.warn('Please enter last name')
    }
     else if (info.email.length == 0) {
      toast.warn('Please enter email')
    } else if (info.password.length == 0) {
      toast.warn('Please enter password')
    } else if (info.phone.length == 0)
      {
      const { FirstName,LastName, email, password } = info
      const result = await registerUser(
        FirstName,
        LastName,
        email,
        password,
        
      )
      if (result['status'] == 'success') {
        toast.success('Successfully registered a user')

        // navigate to the login screen
        navigate('/login')
      }
    }
  }

  return (
    <div>
      <h1 className='page-header'>Register</h1>
      <div className='container'>
        <div className='mb-3'>
          <label htmlFor=''>First Name</label>
          <input
            onChange={(e) => setInfo({ ...info, FirstName: e.target.value })}
            type='text'
            className='form-control'
          />
        </div>

         <div className='mb-3'>
          <label htmlFor=''>Last Name</label>
          <input
            onChange={(e) => setInfo({ ...info, LastName: e.target.value })}
            type='text'
            className='form-control'
          />
        </div>
        
        <div className='mb-3'>
          <label htmlFor=''>Email</label>
          <input
            onChange={(e) => setInfo({ ...info, email: e.target.value })}
            type='text'
            className='form-control'
          />
        </div>
        

        <div className='mb-3'>
          <label htmlFor=''>Password</label>
          <input
            onChange={(e) => setInfo({ ...info, password: e.target.value })}
            type='password'
            className='form-control'
          />
        </div>

       

        <div className='mb-3'>
          <div className='mb-3'>
            Already have an account yet? Login <Link to='/signin'>here</Link>
          </div>
          <button
            onClick={onRegister}
            className='btn btn-success'
          >
            Register
          </button>
        </div>
      </div>
    </div>
  )
}

export default SignUp



