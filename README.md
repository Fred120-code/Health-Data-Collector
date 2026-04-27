# 💊 Health Data Collector

A full-stack web application for collecting and analyzing health metrics with regression analysis visualization.

## 🚀 Quick Start

### Prerequisites

- Node.js (v16+)
- npm or yarn
- PostgreSQL database (or use Neon for cloud-hosted)

### Installation & Setup

#### 1. Setup Backend

```bash
cd server
cp .env.example .env
# Edit .env and add your PostgreSQL database URL
npm install
npx prisma migrate dev --name init
node index.js
```

The backend will run on **http://localhost:3000**

#### 2. Setup Frontend

In a new terminal:

```bash
cd client
npm install
npm run dev
```

The frontend will run on **http://localhost:5173**

### Database Setup

Create a PostgreSQL database and set the connection string in `/server/.env`:

```
DATABASE_URL="postgresql://user:password@localhost:5432/health_data_db"
PORT=3000
```

Or use **Neon** (cloud PostgreSQL):

1. Sign up at [neon.tech](https://neon.tech)
2. Create a project and copy the connection string
3. Paste it in `/server/.env`

---

## ✨ Features

### Backend (Express + Prisma)

- **POST /data** - Add new health data (age, blood pressure)
- **GET /data** - Get all records sorted by newest first
- **GET /regression** - Calculate linear regression analysis

### Frontend (React + Vite)

- 📝 Form to input age and blood pressure
- 📊 Table displaying all records
- 📈 Chart with regression line overlay
- ✅ Input validation
- 🔄 Refresh data button
- ⏳ Loading states
- 🎨 Responsive Tailwind CSS design

---

## 📁 Project Structure

```
Health Data Collector/
├── server/
│   ├── index.js              # Express server
│   ├── package.json
│   ├── .env                  # Database URL + PORT
│   ├── .env.example
│   ├── prisma/
│   │   └── schema.prisma     # Database schema
│   └── .gitignore
│
└── client/
    ├── src/
    │   ├── App.jsx           # Main app component
    │   ├── main.jsx
    │   ├── index.css
    │   └── components/
    │       ├── DataForm.jsx
    │       ├── DataTable.jsx
    │       └── RegressionChart.jsx
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── package.json
    └── .gitignore
```

---

## 🧮 Linear Regression Formula

The app calculates:

- **b0 (intercept)** = meanY - (b1 × meanX)
- **b1 (slope)** = (ΣXY - (ΣX × ΣY / n)) / (ΣX² - (ΣX)² / n)

Result: `tension = b0 + b1 × age`

---

## 🛠️ API Reference

### POST /data

Add a health record.

**Request:**

```json
{
  "age": 35,
  "tension": 120.5
}
```

**Response:**

```json
{
  "id": 1,
  "age": 35,
  "tension": 120.5,
  "createdAt": "2025-04-27T10:30:00.000Z"
}
```

---

### GET /data

Retrieve all records.

**Response:**

```json
[
  {
    "id": 1,
    "age": 35,
    "tension": 120.5,
    "createdAt": "2025-04-27T10:30:00.000Z"
  }
]
```

---

### GET /regression

Calculate linear regression.

**Response:**

```json
{
  "b0": 95.1234,
  "b1": 0.562,
  "points": [
    { "x": 30, "y": 110.8 },
    { "x": 35, "y": 125.3 }
  ]
}
```

---

## 🎨 UI Components

- **DataForm** - Input validation with error messages
- **DataTable** - Displays records with formatted dates
- **RegressionChart** - Scatter plot with regression line using Chart.js
- **App** - Main layout with error/success notifications

---

## 🔒 Error Handling

- Invalid input validation
- Minimum 2 data points required for regression
- Division by zero protection
- Clear error messages in UI
- Loading states for all async operations

---

## 📦 Technologies Used

**Backend:**

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL

**Frontend:**

- React 18
- Vite
- Tailwind CSS
- Chart.js

---

## 🐛 Troubleshooting

**CORS Error?**

- Ensure backend is running on `http://localhost:3000`
- CORS is enabled in server/index.js

**Database Connection Error?**

- Check DATABASE_URL in `/server/.env`
- Ensure PostgreSQL server is running
- Run `npx prisma migrate dev` to initialize schema

**Port Already in Use?**

- Backend: Change PORT in `.env`
- Frontend: Vite uses port 5173 by default

---

## 📝 License

MIT
