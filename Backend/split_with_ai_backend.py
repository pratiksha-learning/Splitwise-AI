# backend/main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import re

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SplitRequest(BaseModel):
    input: str

@app.post("/api/split")
def split_expense(data: SplitRequest):
    text = data.input
    try:
        amount_match = re.search(r"(\d+)", text)
        people = re.findall(r"\b[A-Z]\b", text)

        if not amount_match or not people:
            raise ValueError("Could not parse amount or people.")

        amount = int(amount_match.group(1))
        split_amount = round(amount / len(people), 2)
        result = {person: split_amount for person in people}
        return {"total": amount, "split": result}

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
