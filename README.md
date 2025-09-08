# study-app

A minimal study app scaffold with a Next.js frontend and FastAPI backend.

## Prerequisites
- Node.js 18+ and npm
- Python 3.10+

## Setup

### Frontend
```bash
cd frontend
npm install
npm run dev
```
The app runs at `http://localhost:3000`.

### Backend
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```
The API runs at `http://127.0.0.1:8000`.

## Structure
- `frontend/`: Next.js (App Router) + TypeScript + Tailwind + shadcn/ui
- `backend/`: FastAPI app with job endpoints
- `shared/`: Placeholder for shared utilities
- `docs/`: Project docs

