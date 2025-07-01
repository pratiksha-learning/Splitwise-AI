const BASE_URL = "http://localhost:5000/api"; // or your deployed server

// Call AI API to parse sentence and save to DB
export async function addAIExpense(text: string) {
  const res = await fetch(`${BASE_URL}/expense/ai`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to add AI expense");
  }

  return res.json();
}

// Call manual API to store object directly
export async function addManualExpense(data: {
  title: string;
  amount: number;
  paid_by: string;
  split_with: string[];
}) {
  const res = await fetch(`${BASE_URL}/expense/manual`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to add manual expense");
  }

  return res.json();
}

// Fetch all expenses
export async function getAllExpenses() {
  const res = await fetch(`${BASE_URL}/expense`);

  if (!res.ok) {
    throw new Error("Failed to fetch expenses");
  }

  return res.json();
}
