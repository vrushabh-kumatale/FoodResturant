

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const SignIn = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setErrorMsg(""); // Clear previous error

//     try {
//       const response = await axios.post("http://localhost:8080/users/signin", {
//         email,
//         password,
//       });

//       // Extract data from response (adjust based on your backend response DTO)
//       const { name, email: userEmail, role } = response.data;

//       // Store in sessionStorage or context as needed
//       sessionStorage.setItem("name", name);
//       sessionStorage.setItem("email", userEmail);
//       sessionStorage.setItem("role", role);


//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         setErrorMsg("Invalid email or password");
//       } else {
//         setErrorMsg("Server error. Please try again later.");
//         console.error("Login failed:", error);
//       }
//     }
//   };

//   return (
//     <div className="container mt-5" style={{ maxWidth: "400px" }}>
//       <h2 className="mb-4">Login</h2>
//       <form onSubmit={handleLogin}>
//         <div className="mb-3">
//           <input
//             type="email"
//             className="form-control"
//             placeholder="Enter email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <input
//             type="password"
//             className="form-control"
//             placeholder="Enter password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>

//         {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

//         <button type="submit" className="btn btn-primary w-100">
//           Sign In
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SignIn;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg(""); // Clear previous error

    try {
      const response = await axios.post("http://localhost:8080/users/signin", {
        email,
        password,
      });

      // Assuming your backend returns a full user object
      const { name, email: userEmail, role } = response.data;

      // Store in sessionStorage
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("email", userEmail);
      sessionStorage.setItem("role", role);

      // 🔄 Redirect to add restaurant page
      navigate("/add_restaurant");

    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMsg("Invalid email or password");
      } else {
        setErrorMsg("Server error. Please try again later.");
        console.error("Login failed:", error);
      }
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}

        <button type="submit" className="btn btn-primary w-100">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;


