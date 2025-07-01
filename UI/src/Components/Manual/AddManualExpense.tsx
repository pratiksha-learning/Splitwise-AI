/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddManualExpense.css';
import Header from '../Header/Header';
import ContactOverlay from '../ContactOverlay/ContactOverlay';
import { contacts } from '../config';
import { addManualExpense } from '../../actions/api';

const AddManualExpense: React.FC = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: '',
    amount: '',
    paidBy: '',
    splitWith: [] as string[],
  });
  const [selectedContact, setSelectedContact] = useState<string[] | null>(null);

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!selectedContact) {
    return <ContactOverlay contacts={contacts} onSelect={(name) => setSelectedContact(name)} />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        title: form.title,
        amount: parseFloat(form.amount),
        paid_by: form.paidBy,
        split_with: form.splitWith,
      };

      const res = await addManualExpense(payload);
      console.log('Manual saved:', res);
      setSubmitted(true);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="manual-page-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        &larr; Back
      </button>
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

          <div className="paid_and_split">
            <label>Who paid?</label>
            <select
              className="select"
              name="paidBy"
              value={form.paidBy}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="You">You</option>
              {selectedContact.map((person) => (
                <option key={person} value={person}>
                  {person}
                </option>
              ))}
            </select>
            <label>Split with whom?</label>
            <div className="multi-select-container" ref={dropdownRef}>
              <div className="multi-select-box" onClick={() => setOpen(!open)}>
                {form.splitWith.length === 0 ? 'Select contacts...' : form.splitWith.join(', ')}
                <span className="arrow">{open ? '▲' : '▼'}</span>
              </div>

              {open && (
                <div className="multi-select-dropdown">
                  {['You', ...selectedContact].map((person) => (
                    <label key={person} className="checkbox-option">
                      <input
                        type="checkbox"
                        value={person}
                        checked={form.splitWith.includes(person)}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          const name = e.target.value;
                          setForm((prev) => ({
                            ...prev,
                            splitWith: checked
                              ? [...prev.splitWith, name]
                              : prev.splitWith.filter((p) => p !== name),
                          }));
                        }}
                      />
                      {person}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>

      {submitted && <div className="success-message">✅ Successfully updated expense!</div>}
    </div>
  );
};

export default AddManualExpense;
