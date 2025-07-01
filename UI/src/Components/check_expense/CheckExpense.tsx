/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Expense } from './ListItemWidget';
import { useNavigate } from 'react-router-dom';
import Items from './ListItemWidget';
import './checkExpense.css';
import Header from '../Header/Header';
import { getAllExpenses } from '../../actions/api';

interface Props {
  currentUser: string;
}

const ExpensesPanel: React.FC<Props> = ({ currentUser }) => {
  const navigate = useNavigate();
  const [expensesList, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    getAllExpenses()
      .then(setExpenses)
      .catch((err) => alert(err.message));
  }, []);

  return (
    <div className="expenses-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        &larr; Back
      </button>
      <Header title="Check Expenses" subtitle="Review what you owe or are owed" />
      <div className="expense-list">
        {expensesList.map((exp: any) => (
          <Items key={exp.id} expense={exp} currentUser={currentUser} />
        ))}
      </div>
    </div>
  );
};

export default ExpensesPanel;
