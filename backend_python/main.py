import json
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# IMPORTANT: Allow your Vercel URL and localhost for testing
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, "*" allows any frontend to connect
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# This handles the data fetching from the local JSON file
@app.get("/api/products")
def read_products():
    try:
        # We look for database.json in the same folder
        with open("database.json", "r") as file:
            data = json.load(file)
        return data
    except Exception as e:
        return {"error": f"Could not read data: {str(e)}"}

if __name__ == "__main__":
    import uvicorn
    # Render provides a PORT environment variable, we must use it
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)