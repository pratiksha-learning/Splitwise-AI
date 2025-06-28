import React, { useState } from 'react';
import "./checkExpense.css";

export interface Expense {
  id: string;
  title: string;
  addedBy: string;
  amount: number;
  paidBy: string;
  owedBy: string;
  mode: 'manual' | 'api';
  splitType: 'equal' | 'youOweFull' | 'theyOweFull';
}

interface Props {
  expense: Expense;
  currentUser: string;
}

const Items: React.FC<Props> = ({ expense, currentUser }) => {
  const [expanded, setExpanded] = useState(false);
  const isUserOwes = expense.owedBy === currentUser;
  const isUserCreditor = expense.paidBy === currentUser;

  let splitLabel = '';
  if (expense.splitType === 'equal') {
    splitLabel = '🤝 Split Equally';
  } else if (expense.splitType === 'youOweFull') {
    splitLabel = '🟥 You Owe Full';
  } else if (expense.splitType === 'theyOweFull') {
    splitLabel = '🟩 They Owe Full';
  }

  const amountClass = isUserOwes ? 'owed' : isUserCreditor ? 'receivable' : '';

  return (
    <div className="expense-item">
      <div className="expense-header" onClick={() => setExpanded(!expanded)}>
        <div className="expense-title">
          <strong>{expense.title}</strong>
          <span className={`mode-tag ${expense.mode === 'manual' ? 'mode-manual' : 'mode-ai'}`}>
            {expense.mode === 'manual' ? 'Manual' : 'AI'}
          </span>
          <span className="split-label">{splitLabel}</span>
        </div>
        <div className={`amount ${amountClass}`}>₹{expense.amount}</div>
      </div>

      {expanded && (
        <div className="expense-details">
          <p><strong>Paid By:</strong> {expense.paidBy}</p>
          <p><strong>Owed By:</strong> {expense.owedBy}</p>
        </div>
      )}
    </div>
  );
};

export default Items;
