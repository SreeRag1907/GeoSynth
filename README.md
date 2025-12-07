# GeoSynth 🌍

> An intelligent heatmap-based store placement analysis platform that leverages machine learning to identify optimal locations for new stores based on order density, delivery patterns, and demographic data.

[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![Python](https://img.shields.io/badge/Python-3.8+-yellow.svg)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-2.0+-lightgrey.svg)](https://flask.palletsprojects.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-green.svg)](https://www.mongodb.com/)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Machine Learning Model](#machine-learning-model)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

**GeoSynth** is a comprehensive geospatial analytics platform designed to solve the critical business challenge of optimal store placement. By combining order density analysis, delivery delay patterns, and population demographics, GeoSynth provides data-driven recommendations for new store locations to minimize delivery times and maximize market coverage.

### Problem Statement

Traditional store placement decisions often rely on intuition or limited data analysis. GeoSynth addresses this by:
- Identifying underserved geographical areas through heatmap visualization
- Analyzing order patterns and delivery inefficiencies
- Using machine learning clustering (DBSCAN) to recommend optimal store locations
- Providing actionable insights through interactive dashboards

## ✨ Features

### 🗺️ Interactive Mapping & Visualization
- **3D Globe Visualization**: Interactive globe component for global perspective
- **Google Maps Integration**: Real-time map rendering with custom markers
- **Heatmap Analytics**: Visual representation of order density and delivery patterns
- **Location Explorer**: Detailed exploration of geographical data points

### 🤖 AI-Powered Analytics
- **DBSCAN Clustering**: Machine learning algorithm to identify optimal store locations
- **Predictive Modeling**: Forecast demand patterns and delivery requirements
- **AI Insights**: Automated recommendations based on data analysis
- **Competitor Analysis**: Market analysis and competitive positioning

### 📊 Data Management
- **Customer Management**: Track customer orders, locations, and delivery history
- **Store Management**: Monitor existing store performance and coverage
- **Order Analytics**: Analyze order patterns, delays, and fulfillment metrics
- **City-Level Insights**: Demographic and order data by city

### 🎨 Modern UI/UX
- **Responsive Design**: Fully responsive across desktop, tablet, and mobile
- **Dark/Light Mode**: Theme switching with persistent preferences
- **Component Library**: Built with Radix UI and shadcn/ui components
- **Interactive Charts**: Data visualization using Recharts
- **Toast Notifications**: Real-time user feedback

### 🔐 Authentication & Security
- **User Authentication**: Secure login and registration system
- **Password Hashing**: bcrypt encryption for user credentials
- **Protected Routes**: Role-based access control
- **Session Management**: Secure session handling with Zustand

## 🏗️ Architecture

GeoSynth follows a modern microservices architecture with four main components:

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   Frontend  │─────▶│   Backend   │─────▶│   MongoDB   │
│  (React +   │      │  (Express   │      │  (Database) │
│   Vite)     │      │   Node.js)  │      │             │
└─────────────┘      └─────────────┘      └─────────────┘
       │                                           
       │             ┌─────────────┐               
       └────────────▶│  ML Model   │               
                     │  (Flask +   │               
                     │   Python)   │               
                     └─────────────┘               
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI, shadcn/ui
- **State Management**: Zustand
- **Routing**: React Router DOM
- **Maps**: Google Maps React API, Cobe (3D Globe)
- **Charts**: Recharts
- **Forms**: React Hook Form with Zod validation
- **Animations**: Framer Motion

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: bcrypt for password hashing
- **CORS**: Enabled for cross-origin requests
- **Auto-increment**: mongoose-sequence for ID generation

### Machine Learning Service
- **Framework**: Flask (Python)
- **ML Libraries**: 
  - scikit-learn (DBSCAN clustering)
  - NumPy (numerical operations)
- **CORS**: Flask-CORS for API access
- **Logging**: Python logging module

### Additional Flask Service
- Basic Flask service for extended functionality

## 📁 Project Structure

```
GeoSynth/
├── Frontend/                    # React TypeScript frontend
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── ui/            # shadcn/ui components
│   │   │   ├── globe.tsx      # 3D globe visualization
│   │   │   ├── sidebar.tsx    # Navigation sidebar
│   │   │   └── ...
│   │   ├── pages/             # Application pages
│   │   │   ├── Dashboard.tsx
│   │   │   ├── GoogleMap.tsx
│   │   │   ├── ai-insights.tsx
│   │   │   ├── heatmap-analytics.tsx
│   │   │   ├── data-management.tsx
│   │   │   └── ...
│   │   ├── layouts/           # Layout components
│   │   ├── hooks/             # Custom React hooks
│   │   ├── store/             # Zustand state management
│   │   ├── lib/               # Utility functions
│   │   └── types/             # TypeScript type definitions
│   ├── package.json
│   └── vite.config.ts
│
├── Backend/                     # Node.js Express backend
│   ├── src/
│   │   ├── controllers/        # Route controllers
│   │   │   ├── user.controller.js
│   │   │   ├── customer.controller.js
│   │   │   ├── order.controller.js
│   │   │   ├── stores.controller.js
│   │   │   └── city.controller.js
│   │   ├── models/             # Mongoose schemas
│   │   │   ├── user.model.js
│   │   │   ├── customer.model.js
│   │   │   ├── order.model.js
│   │   │   ├── stores.model.js
│   │   │   └── city.model.js
│   │   ├── routes/             # API routes
│   │   │   └── index.route.js
│   │   ├── db/                 # Database configuration
│   │   │   └── connectDB.js
│   │   ├── utils/              # Helper utilities
│   │   │   ├── ApiError.utils.js
│   │   │   ├── ApiResponse.utils.js
│   │   │   └── AsyncHandler.utils.js
│   │   ├── app.js              # Express app configuration
│   │   ├── index.js            # Server entry point
│   │   └── constants.js        # Application constants
│   └── package.json
│
├── Model/                       # ML prediction service
│   ├── ml/
│   │   └── store_predictor.py  # DBSCAN clustering model
│   └── app.py                  # Flask API server
│
├── Flask/                       # Additional Flask service
│   └── app.py
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **Python** (3.8 or higher)
- **MongoDB** (6.0 or higher)
- **npm** or **yarn** package manager
- **pip** (Python package manager)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SreeRag1907/GeoSynth.git
   cd GeoSynth
   ```

2. **Install Frontend dependencies**
   ```bash
   cd Frontend
   npm install
   ```

3. **Install Backend dependencies**
   ```bash
   cd ../Backend
   npm install
   ```

4. **Install Python dependencies for ML Model**
   ```bash
   cd ../Model
   pip install flask flask-cors scikit-learn numpy
   ```

5. **Install Python dependencies for Flask service**
   ```bash
   cd ../Flask
   pip install flask
   ```

6. **Configure Environment Variables**

   Create a `.env` file in the `Backend` directory:
   ```env
   PORT=8000
   MONGODB_URI=mongodb://localhost:27017/geosynth
   CORS_ORIGIN=http://localhost:5173
   ```

### Running the Application

You'll need to run multiple services simultaneously. Open separate terminal windows for each:

1. **Start MongoDB** (if not running as a service)
   ```bash
   mongod
   ```

2. **Start the Backend server**
   ```bash
   cd Backend
   npm run dev
   ```
   Backend will run on `http://localhost:8000`

3. **Start the ML Model service**
   ```bash
   cd Model
   python app.py
   ```
   ML service will run on `http://localhost:5000`

4. **Start the Frontend**
   ```bash
   cd Frontend
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

5. **Access the Application**
   
   Open your browser and navigate to `http://localhost:5173`

## 📡 API Documentation

### Backend API (Port 8000)

Base URL: `http://localhost:8000/api`

#### User Management
- `POST /users/register` - Register new user
- `POST /users/login` - User login
- `GET /users/:id` - Get user details

#### Customer Management
- `GET /customers` - Get all customers
- `POST /customers` - Create new customer
- `GET /customers/:id` - Get customer by ID
- `PUT /customers/:id` - Update customer
- `DELETE /customers/:id` - Delete customer

#### Order Management
- `GET /orders` - Get all orders
- `POST /orders` - Create new order
- `GET /orders/:id` - Get order by ID
- `PUT /orders/:id` - Update order
- `DELETE /orders/:id` - Delete order

#### Store Management
- `GET /stores` - Get all stores
- `POST /stores` - Create new store
- `GET /stores/:id` - Get store by ID
- `PUT /stores/:id` - Update store
- `DELETE /stores/:id` - Delete store

#### City Management
- `GET /cities` - Get all cities
- `POST /cities` - Create new city
- `GET /cities/:id` - Get city by ID

### ML Model API (Port 5000)

Base URL: `http://localhost:5000/api`

#### Store Prediction
- `GET /predict_stores` - Get predicted optimal store locations
  - Uses DBSCAN clustering on customer data
  - Returns array of predicted store coordinates
  - Reads from `Frontend/src/pages/data.json`

## 🤖 Machine Learning Model

### DBSCAN Clustering Algorithm

GeoSynth uses **DBSCAN (Density-Based Spatial Clustering of Applications with Noise)** to identify optimal store locations.

#### How it works:

1. **Data Collection**: Gathers customer location data (latitude, longitude)
2. **Clustering**: Groups customers based on geographical density
3. **Centroid Calculation**: Computes cluster centroids as optimal store locations
4. **Noise Filtering**: Excludes sparse areas with insufficient customer density

#### Parameters:
- `eps=0.015` - Maximum distance between two points to be considered neighbors
- `min_samples=5` - Minimum number of points to form a dense region

#### Output:
Returns predicted store locations as an array of coordinates:
```json
{
  "predicted_stores": [
    [40.7128, -74.0060],
    [34.0522, -118.2437]
  ]
}
```

### Model Features:
- ✅ Handles noise points (outliers)
- ✅ Identifies clusters of arbitrary shape
- ✅ No need to specify number of clusters beforehand
- ✅ Robust to sparse data regions
- ✅ Real-time prediction via REST API

## 🎨 Key Pages & Features

### Dashboard
Central hub displaying key metrics, charts, and quick actions.

### Location Explorer
Interactive map interface to explore customer locations, existing stores, and delivery zones.

### Heatmap Analytics
Visual heatmap showing order density, delivery delays, and underserved areas.

### AI Insights
Machine learning-powered recommendations for store placement and business optimization.

### Data Management
CRUD operations for managing customers, orders, stores, and cities.

### Competitor Analysis
Market analysis tools to understand competitive landscape.

### Reports
Generate and export analytical reports on store performance and recommendations.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👥 Team

Developed by [SreeRag1907](https://github.com/SreeRag1907)

## 🙏 Acknowledgments

- Google Maps API for mapping capabilities
- scikit-learn for machine learning algorithms
- shadcn/ui for beautiful UI components
- MongoDB for flexible data storage
- React ecosystem for robust frontend development

---

**GeoSynth** - Intelligent Store Placement for Smarter Business Decisions 🌍📍
