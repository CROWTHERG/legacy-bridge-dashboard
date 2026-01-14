import json
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

# Enable CORS so your Vercel frontend can communicate with this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the data structure for adding a new product
class Product(BaseModel):
    name: str
    category: str
    quantity: int
    price: float

DB_FILE = "database.json"

# Helper function to read data
def read_db():
    if not os.path.exists(DB_FILE):
        return []
    with open(DB_FILE, "r") as file:
        return json.load(file)

# Route: Get all products
@app.get("/api/products")
def get_products():
    return read_db()

# Route: Add a new product
@app.post("/api/products")
def add_product(product: Product):
    try:
        data = read_db()
        new_item = product.dict()
        new_item["id"] = len(data) + 1  # Simple ID generation
        data.append(new_item)
        
        with open(DB_FILE, "w") as file:
            json.dump(data, file, indent=2)
            
        return {"message": "Success", "product": new_item}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)