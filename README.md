# GigWorker– Django + React  "An AI Powered Financial Management for South African Freelancers"

## 🚀 Overview

GigWorker AI is a community development application built with **Django (backend)** and **React (frontend)**. The system allows users to register, access their dashboard, track financial safety data, receive AI‑powered categorisation, manage tax compliance information, generate reports, and interact with an AI chatbot.

This project is developed collaboratively during the **KION Hackathon**.

---

## 🧩 Features

### ✅ Authentication & User Management

* User registration
* Login/logout
* JWT authentication via Django REST Framework SimpleJWT
* User dashboard

### ✅ AI‑Powered Modules

* **AI Categorisation** for financial transactions or reports
* **AI Chatbot** for user assistance (OpenAI API)
* **Risk predictions** (optional future feature)

### ✅ Financial Dashboard

* Income overview
* Expense breakdown
* Budget metrics
* Graphs and analytics (React charts)

### ✅ Tax Compliance Module

* Upload tax documents
* Track due dates
* AI‑assisted tax explanations
* Compliance status

### ✅ Reports & Exports

* Export reports as PDF or CSV
* Download user financial summaries
* Generate analytics reports

### 🏗️ Architecture

```
/backend    → Django REST API
/frontend   → React (Vite) App
```

Django exposes REST API endpoints consumed by the React frontend.

---

## 📁 Project Structure

```
safeguard-ai/
│
├── backend/
│   ├── config/           # Django project settings
│   ├── accounts/         # Authentication app
│   ├── finance/          # Financial dashboard API
│   ├── compliance/       # Tax compliance API
│   ├── ai_module/        # AI categorisation + chatbot
│   ├── reports/          # Export features
│   ├── .env.example
│   └── requirements.txt
│
└── frontend/
    ├── src/components/
    ├── src/pages/
    ├── src/services/
    ├── package.json
    └── README.md
```

---

## 🔧 Installation Instructions

### 1. Clone the Repository

```
git clone <repo-url>
cd safeguard-ai
```

### 2. Backend Setup

```
cd backend
python -m venv venv
source venv/Scripts/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### 3. Frontend Setup

```
cd frontend
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create `.env` inside **backend/** using:

```
SECRET_KEY=your_django_secret_key
DEBUG=True
OPENAI_API_KEY=your_openai_key_here
DATABASE_URL=sqlite:///db.sqlite3
```

---

## 🤝 Contributing

### Workflow

* Create a new branch for each feature
* Make commits regularly
* Push to GitHub
* Create Pull Requests for review


## 📄 License

MIT

## 👥 Authors

* Shantel Chamatumba 
* Nkosikhona Mlaba
* Khumiso Rankokwadi
* Zinhle Jiyane

---

## ⭐ Acknowledgements

This project is built for learning, collaboration, and innovation with Django + React + AI.
