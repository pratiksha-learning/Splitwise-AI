import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const CheckExpenses: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="p-6">
      <button onClick={() => navigate(-1)} className="mb-4 text-blue-600">&larr; Back</button>
      <h2 className="text-2xl font-bold mb-2">Check Expenses</h2>
      <p>This is where you&apos;ll view and analyze your expenses.</p>
    </div>
  );
};

export default CheckExpenses;
