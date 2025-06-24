import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="home-container">
      <h1 className="home-title">
        SplitWithAI <span role="img" aria-label="robot">🤖</span>
      </h1>
      <div className="card-grid">
        <div className="card" onClick={() => handleClick("/add-ai")}> 
          <h2 className="card-title">Add Expense with AI</h2>
          <p className="card-text">Use smart AI to categorize and record expenses effortlessly.</p>
        </div>

        <div className="card" onClick={() => handleClick("/add-manual")}> 
          <h2 className="card-title">Add Expense Manually</h2>
          <p className="card-text">Manually input details for each expense.</p>
        </div>

        <div className="card" onClick={() => handleClick("/check-expenses")}> 
          <h2 className="card-title">Check Expenses</h2>
          <p className="card-text">Review and analyze your expense history.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
