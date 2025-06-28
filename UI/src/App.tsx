/* eslint-disable react/react-in-jsx-scope */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage";
import AddAIExpense from "./Components/AI/AddAIExpense";
import AddManualExpense from "./Components/Manual/AddManualExpense";
import ExpensesPanel from "./Components/check_expense/CheckExpense";
import { Expense } from "./Components/check_expense/ListItemWidget";

const dummyExpenses: Expense[] = [
  {
    id: '1',
    title: 'Dinner at ABC',
    addedBy: 'Harsh',
    amount: 800,
    paidBy: 'Harsh',
    owedBy: 'Pratiksha',
    mode: 'manual',
    splitType: 'youOweFull',
  },
  {
    id: '2',
    title: 'Cab from office',
    addedBy: 'Pratiksha',
    amount: 300,
    paidBy: 'Pratiksha',
    owedBy: 'Harsh',
    mode: 'api',
    splitType: 'equal',
  },
  {
    id: '2',
    title: 'Cab from office',
    addedBy: 'Pratiksha',
    amount: 300,
    paidBy: 'Pratiksha',
    owedBy: 'Harsh',
    mode: 'api',
    splitType: 'equal',
  },
  {
    id: '2',
    title: 'Cab from office',
    addedBy: 'Pratiksha',
    amount: 300,
    paidBy: 'Pratiksha',
    owedBy: 'Harsh',
    mode: 'api',
    splitType: 'equal',
  },
  {
    id: '2',
    title: 'Cab from office',
    addedBy: 'Pratiksha',
    amount: 300,
    paidBy: 'Pratiksha',
    owedBy: 'Harsh',
    mode: 'api',
    splitType: 'equal',
  },
  {
    id: '2',
    title: 'Cab from office',
    addedBy: 'Pratiksha',
    amount: 300,
    paidBy: 'Pratiksha',
    owedBy: 'Harsh',
    mode: 'api',
    splitType: 'equal',
  },
];

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-ai" element={<AddAIExpense />} />
        <Route path="/add-manual" element={<AddManualExpense />} />
        <Route path="/check-expenses" element={<ExpensesPanel expenses={dummyExpenses} currentUser="Pratiksha"/>} />
      </Routes>
    </Router>
  );
}

export default App;