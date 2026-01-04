import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();

  return (
  <div className="container">
     <h1 className="mb-5">⚡SigmaGPT</h1>
    <div className="row text-center"> 
  
      <div className="d-flex flex-column">
        {/* Hero Section */}
        <h1 className="display-4 fw-bold">
          Think Smarter with <span className="text-primary">SigmaGPT</span>
        </h1>

        <p className="lead text-secondary mt-3">
          Your AI-powered assistant for learning, coding, and productivity.
          Fast. Secure. Intelligent.
        </p>
        <button
          onClick={() => navigate("/signup")}
          className="btn btn-primary btn-lg me-3 mb-3"
        >
          Get Started
        </button>
        <br/>
        <button
          onClick={() => navigate("/login")}
          className="btn btn-outline-primary mb-3"
        >
          I already have an account
        </button>
      </div>

      {/* Image */}
      <div className="d-flex flex-column gap-4 text-center">
        <img
          src="media/Images/ai.png"
          className="img-fluid rounded shadow-lg"
          alt="AI"
          style={{ maxHeight: "420px" }}
        />
      </div>
    </div>
  </div>       
  );
}

export default HomePage;
