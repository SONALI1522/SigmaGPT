import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogIn = () =>{
    console.log('handlelogin cliked');
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // stop page reload
    console.log('signup');
    try {
      const res = await axios.post("http://localhost:3002/auth/signup", 
        {
        email,
        password,
        username,
        },
        { withCredentials: true }
      );
      // console.log(res.data);
      alert("Signup successful!");
      window.location.href = "http://localhost:5174/";
    } catch (err) {
     if (err.response && err.response.status === 409) {
       alert(err.response.data.message);
     } else {
       alert("Signup failed");
     }
    }
  };

  return (
    <>
    <form className="signup-form" onSubmit={handleSubmit}>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Signup</button>
    </form>
    
    <div className="text-center">
      <p style={{color:"darkblue"}}>Have an account?</p>
      <button 
       className="btn btn-outline-primary"
       onClick={handleLogIn}
      >Login</button>
    </div>
  </>
  )
};

export default Signup;
