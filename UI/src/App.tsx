/* eslint-disable react/react-in-jsx-scope */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage";
import AddAIExpense from "./Components/AI/AddAIExpense";
import AddManualExpense from "./Components/Manual/AddManualExpense";
import ExpensesPanel from "./Components/check_expense/CheckExpense";
import { dummyExpenses } from "./Components/config";

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