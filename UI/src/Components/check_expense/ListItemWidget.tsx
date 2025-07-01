import React, { useState } from 'react';
import './checkExpense.css';

export interface Expense {
  id: string;
  title: string;
  addedBy: string;
  amount: number;
  paid_by: string;
  split_with: string[];
  source: 'manual' | 'ai';
  splitType: 'equal' | 'youOweFull' | 'theyOweFull';
}

interface Props {
  expense: Expense;
  currentUser: string;
}

const Items: React.FC<Props> = ({ expense, currentUser }) => {
  const [expanded, setExpanded] = useState(false);
  const isUserCreditor = expense.paid_by === currentUser;
  const splitCount = expense.split_with.length; // include the payer
  const perPerson = expense.amount / splitCount;

  let splitLabel = '';
  const { paid_by, split_with } = expense;

  const youPaid = paid_by === currentUser;
  const youAreInSplit = split_with.includes(currentUser);

  if (youPaid && youAreInSplit) {
    splitLabel = '🤝 Split Equally';
  } else if (!youPaid && youAreInSplit) {
    splitLabel = '🟥 You Owe';
  } else if (youPaid && !youAreInSplit) {
    splitLabel = '🟩 They Owe';
  }

  const amountClass = isUserCreditor ? 'receivable' : 'owed';

  let amount = null;
  if (splitLabel.includes('You Owe')) {
    amount = perPerson;
  } else if (splitLabel.includes('Split Equally')) {
    amount = perPerson * (splitCount - 1);
  } else {
    amount = expense.amount;
  }
  return (
    <div className="expense-item">
      <div className="expense-header" onClick={() => setExpanded(!expanded)}>
        <div className="expense-title">
          <strong>{expense.title}</strong>
          <div style={{ display: 'flex' }}>
            <span className={`mode-tag ${expense.source === 'manual' ? 'mode-manual' : 'mode-ai'}`}>
              {expense.source === 'manual' ? 'Manual' : 'AI'}
            </span>
            <span className="split-label">{splitLabel}</span>
          </div>
        </div>
        <div className={`amount ${amountClass}`}>₹{amount}</div>
      </div>

      {expanded && (
        <div className="expense-details">
          <p>
            <strong>Paid By:</strong> {expense.paid_by}
          </p>
          <p>
            <strong>Owed By:</strong> {expense.split_with.join(', ')}
          </p>
          <p>
            <strong>Total:</strong> {expense.amount}
          </p>
        </div>
      )}
    </div>
  );
};

export default Items;
