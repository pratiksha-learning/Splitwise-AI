import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import "./AddAIExpense.css";

const AddAIExpense: React.FC = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    // handle submit logic
  };

  return (
    <div className="ai-page-container">
      <button className="back-button" onClick={() => navigate(-1)}>&larr; Back</button>

      <div className="ai-box-with-bg">
        <label className="ai-label">
          Enter your expense sentence
          <span className="tooltip" title="Include amount, category, and who paid. Example: 'Paid 500 for groceries by John'"> ⓘ</span>
        </label>
        <textarea className="ai-textarea" placeholder="e.g. Paid 500 for lunch by John"></textarea>
        <button className="submit-button" onClick={handleSubmit}>Submit</button>
      </div>
      {submitted && (
        <div className="success-message">
          ✅ Successfully updated expense!
        </div>
      )}
    </div>
  );
};

export default AddAIExpense;
