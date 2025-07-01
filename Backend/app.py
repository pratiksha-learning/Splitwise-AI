# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from pydantic import BaseModel, ValidationError
import os
import json
from dotenv import load_dotenv
import cohere
from db import get_connection

load_dotenv()

app = Flask(__name__)
CORS(app)

# Load Cohere client
co = cohere.Client(os.getenv("COHERE_API_KEY"))

# Pydantic models
class AIExpenseInput(BaseModel):
    text: str

class ManualExpenseInput(BaseModel):
    title: str
    amount: float
    paid_by: str
    split_with: list[str]

# Route: AI-generated expense
@app.route("/api/expense/ai", methods=["POST"])
def add_ai_expense():
    try:
        data = AIExpenseInput(**request.get_json())
        text = data.text

        prompt = f"""
        You are an API backend assistant. Convert the following user sentence into a valid JSON object with:
        - title (string)
        - amount (number)
        - paid_by (string)
        - split_with (array of strings)

        Respond ONLY with a valid JSON.

        Example:
        Input: "Paid 800 for dinner by Pratiksha split with Harsh and Prachi"
        Output:
        {{
          "title": "Dinner",
          "amount": 800,
          "paid_by": "Pratiksha",
          "split_with": ["Harsh", "Prachi"],
        }}

        Input: "{text}"
        Output:
        """

        response = co.chat(
            model="command-r",
            message=prompt,
            temperature=0.3
        )
        ai_output = response.text.strip()

        parsed = json.loads(ai_output)

        # Validate parsed keys
        required_keys = {"title", "amount", "paid_by", "split_with"}
        if not required_keys.issubset(parsed):
            raise ValueError("AI response missing fields")

        # Save to DB
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(
            """
            INSERT INTO expenses (title, amount, paid_by, split_with, source)
            VALUES (%s, %s, %s, %s, %s)
            """,
            (parsed["title"], parsed["amount"], parsed["paid_by"], ",".join(parsed["split_with"]), 'ai')
        )
        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"message": "AI expense added", "data": parsed}), 200

    except ValidationError as ve:
        return jsonify({"error": ve.errors()}), 422
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Route: Manual expense
@app.route("/api/expense/manual", methods=["POST"])
def add_manual_expense():
    try:
        data = ManualExpenseInput(**request.get_json())

        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(
            """
            INSERT INTO expenses (title, amount, paid_by, split_with, source)
            VALUES (%s, %s, %s, %s, %s)
            """,
            (data.title, data.amount, data.paid_by, ",".join(data.split_with), 'manual')
        )
        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"message": "Manual expense added", "data": data.dict()}), 200

    except ValidationError as ve:
        return jsonify({"error": ve.errors()}), 422
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Route: Get all expenses
@app.route("/api/expense", methods=["GET"])
def get_expenses():
    try:
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM expenses")
        result = cursor.fetchall()
        cursor.close()
        conn.close()

        for row in result:
            row["split_with"] = row["split_with"].split(",")

        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
