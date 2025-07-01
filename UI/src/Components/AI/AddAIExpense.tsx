/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddAIExpense.css';
import Header from '../Header/Header';
import ContactOverlay from '../ContactOverlay/ContactOverlay';
import { contacts } from '../config';
import { addAIExpense } from '../../actions/api';

const AddAIExpense: React.FC = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [selectedContact, setSelectedContact] = useState<string[] | null>(null);
  const [sentence, setSentence] = useState<string>('');

  if (!selectedContact) {
    return <ContactOverlay contacts={contacts} onSelect={(name) => setSelectedContact(name)} />;
  }

  const handleSubmit = async () => {
    try {
      const res = await addAIExpense(sentence);
      console.log('AI saved:', res);
      setSubmitted(true);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="ai-page-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        &larr; Back
      </button>
      <Header
        title="Add an AI Expense"
        subtitle={`Smartly generated just for you, ${selectedContact.join(', ')}`}
      />

      <div className="ai-box-with-bg">
        <label className="ai-label">
          Enter your expense sentence
          <span
            className="tooltip"
            title="Include amount, category, and who paid. Example: 'Paid 800 for dinner by Pratiksha split with Harsh and Prachi'"
          >
            {' '}
            ⓘ
          </span>
        </label>
        <textarea
          className="ai-textarea"
          placeholder="e.g. Paid 800 for dinner by Pratiksha split with Harsh and Prachi"
          onChange={(e: any) => setSentence(e.target.value)}
        ></textarea>
        <button className="submit-button" onClick={handleSubmit}>
          Submit
        </button>
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
