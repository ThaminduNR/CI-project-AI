from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd

# Lazy load model (only when needed)
model = None

def load_model():
    global model
    if model is None:
        try:
            model = joblib.load("model/accident_xgb_model.pkl")
        except Exception as e:
            print(f"Error loading model: {e}")
    return model

app = FastAPI(title="Accident Risk Prediction API")

# ----- Enable CORS -----
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

# ----- Input schema -----
class AccidentInput(BaseModel):
    id: int
    road_type: str
    num_lanes: int
    curvature: float
    speed_limit: int
    lighting: str
    weather: str
    road_signs_present: bool
    public_road: bool
    time_of_day: str
    holiday: bool
    school_season: bool
    num_reported_accidents: int

# ----- Prediction endpoint -----
@app.post("/predict")
def predict_risk(data: AccidentInput):
    
    # Load model when first needed
    loaded_model = load_model()
    if loaded_model is None:
        return {"error": "Model failed to load"}

    # Convert input to DataFrame
    df = pd.DataFrame([data.dict()])
    
    try:
        # Make prediction
        prediction = loaded_model.predict(df)[0]
        
        # Classify based on risk ranges
        if prediction < 0.30:
            risk_level = "Low accident risk"
        elif prediction < 0.60:
            risk_level = "Medium accident risk"
        else:
            risk_level = "High accident risk"
        
        return {
            "accident_risk": float(prediction),
            "risk_level": risk_level
        }
    except Exception as e:
        return {"error": str(e)}
