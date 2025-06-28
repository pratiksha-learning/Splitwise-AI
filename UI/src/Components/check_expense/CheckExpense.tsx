import React from 'react';
import { Expense } from './ListItemWidget';
import { useNavigate} from "react-router-dom";
import Items from './ListItemWidget';
import "./checkExpense.css";
import Header from '../Header/Header';

interface Props {
  expenses: Expense[];
  currentUser: string;
}

const ExpensesPanel: React.FC<Props> = ({ expenses, currentUser }) => {
  const navigate = useNavigate();
  return (
      <div className="expenses-container">
        <button className="back-button" onClick={() => navigate(-1)}>&larr; Back</button>
        <Header
        title="Check Expenses"
        subtitle="Review what you owe or are owed"
      />
        <div className="expense-list">
          {expenses.map((exp) => (
            <Items key={exp.id} expense={exp} currentUser={currentUser} />
          ))}
        </div>
      </div>
  );
};

export default ExpensesPanel;

