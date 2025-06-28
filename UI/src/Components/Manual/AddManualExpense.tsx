import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddManualExpense.css";
import Header from "../Header/Header";
import ContactOverlay from "../ContactOverlay/ContactOverlay";

const AddManualExpense: React.FC = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    split: "split",
  });
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="manual-page-container">
      <button className="back-button" onClick={() => navigate(-1)}>&larr; Back</button>
      <div className="manual-box-with-bg">
      <Header
        title="Add Manual Expense"
        subtitle="Create a manual entry for your shared expenses"
      />
      <form className="manual-form" onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          placeholder="e.g. Dinner at ABC"
        />

        <label>Amount (in ₹)</label>
        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          required
          placeholder="e.g. 450"
        />

        <label>How should it be split?</label>
        <select name="split" value={form.split} onChange={handleChange}>
          <option value="split">Split equally</option>
          <option value="you-paid">You owe full amount</option>
          <option value="she-paid">She owe full amount</option>
        </select>

        <button type="submit" className="submit-button">Submit</button>
      </form>
      </div>

      {submitted && (
        <div className="success-message">✅ Successfully updated expense!</div>
      )}
    </div>
  );
};

export default AddManualExpense;
