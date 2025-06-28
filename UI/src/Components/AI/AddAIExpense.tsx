import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import "./AddAIExpense.css";
import Header from "../Header/Header";
import ContactOverlay from "../ContactOverlay/ContactOverlay";

const AddAIExpense: React.FC = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [selectedContact, setSelectedContact] = useState<string[] | null>(null);

  const contacts = ['Harsh', 'Prachi', 'Rahul', 'H', 'Prat', 'Seh'];

  if (!selectedContact) {
    return (
      <ContactOverlay
        contacts={contacts}
        onSelect={(name) => setSelectedContact(name)}
      />
    );
  }

  const handleSubmit = () => {
    setSubmitted(true);
    // handle submit logic
  };

  return (
    <div className="ai-page-container">
      <button className="back-button" onClick={() => navigate(-1)}>&larr; Back</button>
      <Header
        title="Add an AI Expense"
        subtitle={`Smartly generated just for you, ${selectedContact.join(', ')}`}
      />

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
          ✅ Successfully updated expense with {selectedContact.join(', ')}!
        </div>
      )}
    </div>
  );
};

export default AddAIExpense;
