# Accident Risk Prediction System

A web-based application that predicts accident risk based on road and environmental conditions using machine learning. The system features a modern frontend interface and a FastAPI backend with XGBoost model integration.

## 🎯 Features

- **Risk Prediction**: Predicts accident risk percentage based on 12 input parameters
- **Risk Classification**: Categorizes predictions as Low, Medium, or High risk
- **Auto-Increment ID**: Automatically generates and increments record IDs
- **CORS Enabled**: Full cross-origin request support
- **Responsive Design**: 3-column form layout with modern UI
- **Real-time Results**: Instant feedback with risk percentage and classification

## 📋 Project Structure

```
Project/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── model/
│   │   └── accident_xgb_pipeline.pkl  # Trained XGBoost model
│   └── __pycache__/
├── frontend/
│   ├── index.html           # HTML form interface
│   ├── style.css            # Styling and 3-column layout
│   └── main.js              # Form handling and API integration
└── README.md                # This file
```

## 🛠️ Technologies Used

### Backend
- **FastAPI** - Modern Python web framework
- **Uvicorn** - ASGI server
- **XGBoost** - Machine learning model
- **Pandas** - Data processing
- **Joblib** - Model serialization

### Frontend
- **HTML5** - Structure
- **CSS3** - Responsive styling with grid layout
- **JavaScript (Vanilla)** - Form submission and API calls
- **Fetch API** - HTTP requests

## 📦 Installation

### Prerequisites
- Python 3.7+
- pip (Python package manager)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install required dependencies:
```bash
pip install fastapi uvicorn joblib pandas xgboost
```

### Frontend Setup
No installation required - open `frontend/index.html` in a modern web browser.

## 🚀 Running the Application

### Start the Backend Server

1. Open a terminal and navigate to the backend folder:
```bash
cd backend
```

2. Run the FastAPI server with auto-reload:
```bash
uvicorn main:app --reload
```

3. Expected output:
```
INFO:     Started server process [PID]
INFO:     Uvicorn running on http://127.0.0.1:8000
```

### Access the Frontend

1. Open `frontend/index.html` in your web browser, or
2. Use a local server (e.g., Live Server extension in VS Code)
3. Form will be available at your server's address


## 📊 Risk Ranges

| Risk Level | Range | Color |
|-----------|-------|-------|
| Low | < 0.30 | Green |
| Medium | 0.30 - 0.60 | Yellow |
| High | > 0.60 | Red |


