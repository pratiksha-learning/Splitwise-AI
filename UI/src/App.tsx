/* eslint-disable react/react-in-jsx-scope */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage";
import AddAIExpense from "./Components/AddAIExpense";
import AddManualExpense from "./Components/AddManualExpense";
import CheckExpenses from "./Components/CheckExpenses";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-ai" element={<AddAIExpense />} />
        <Route path="/add-manual" element={<AddManualExpense />} />
        <Route path="/check-expenses" element={<CheckExpenses />} />
      </Routes>
    </Router>
  );
}

export default App;