# SplitWithAI 🤖

A smart and simple full-stack expense-splitting application. Add expenses using AI or manually, and track all your shared costs in one place.

## 🔥 Features

### Frontend
- 💬 Add Expense with AI — Enter natural sentences like *“Paid 500 for groceries by John”*
- 📝 Add Expense Manually — Title, amount, and choose split options
- 📊 Check Expenses — View and analyze all shared costs
- ✅ Smooth UI inspired by ChatGPT layout

### Backend
- 🌐 RESTful APIs to handle expense storage and retrieval
- 🧠 Optional AI endpoint to process sentence-based inputs
- 💾 Connected to PostgreSQL (or MongoDB, etc.)

---

## 🖼️ Screenshots

| Home Page                         | Add with AI                      | Manual Entry                     |
|----------------------------------|----------------------------------|----------------------------------|
| ![Home](./screenshots/home.png) | ![AI](./screenshots/add-ai.png) | ![Manual](./screenshots/manual.png) |

---

## 🧠 Tech Stack

| Layer     | Technology                   |
|-----------|------------------------------|
| Frontend  | React, TypeScript, React Router, CSS |
| Backend   | Python (FastAPI / Flask / Django)     |
| Database  | PostgreSQL (or MongoDB)      |
| Deployment | Docker, AKS (Azure Kubernetes Service) |

---

## 🛠️ Project Structure

```
SplitWithAI/
├── UI/                   # React frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
├── backend/              # Python backend (FastAPI/Django)
│   ├── app/
│   ├── requirements.txt
│   └── ...
├── README.md
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/SplitWithAI.git
cd SplitWithAI
```

---

## 📦 Frontend Setup (React)

```bash
cd UI
npm install
npm start
```

Visit [http://localhost:3000](http://localhost:3000)

---

## ⚙️ Backend Setup (Python + FastAPI Example)

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Visit [http://localhost:8000/docs](http://localhost:8000/docs) for Swagger UI

---

## 🧪 Sample API Routes

| Method | Endpoint          | Description               |
|--------|-------------------|---------------------------|
| POST   | /add-expense      | Add new expense           |
| GET    | /expenses         | Get all expenses          |
| POST   | /parse-ai-input   | (Optional) Parse AI input |

---

## 📄 Environment Variables

Create a `.env` in both `UI/` and `backend/` folders.

**For Backend:**
```
DATABASE_URL=your_db_connection_string
```

---

## 📤 Deployment (Optional)

You can deploy using:

- Vercel / Netlify for frontend
- Railway / Render / Azure / EC2 for backend
- Docker + AKS for full-stack deployment

---

## 👩‍💻 Author

Made with ❤️ by [Pratiksha Bhandari](https://github.com/yourusername)

---

## 📃 License

[MIT](LICENSE)
