# Uretek Inventory Tracker — Frontend

React dashboard for Uretek Argentina's internal inventory management system.

🔗 **Live:** [uretek-inventory-ui-production.up.railway.app](https://uretek-inventory-ui-production.up.railway.app)  
🔗 **Backend repo:** [link to your backend repo here]

---

## What it does

- Login with JWT authentication — token stored in localStorage, sent on every request
- Dashboard shows live ISO and Resina tank levels with low-stock alerts
- Jobs table with sortable entries, quoted vs actual product usage, and per-job status management
- Add jobs — automatically deducts product from stock on the backend
- Restock — log incoming inventory

---

## Tech Stack

- **React 18** + **TypeScript**
- **Vite**
- **Tailwind CSS**
- **React Router v6** — protected routes, redirects unauthenticated users to /login
- **Railway** — deployment

---

## Auth flow

/login → POST /api/auth/login → store token → redirect to /
Every fetch → Authorization: Bearer <token>
No token → redirect to /login

---

## Running locally

```bash
git clone <repo-url>
cd uretek-inventory-ui
npm install
npm run dev
```

Expects the backend running at:
https://uretek-inventory-spring-production.up.railway.app

---

## Screenshots

![Dashboard](https://github.com/user-attachments/assets/95c7e068-ed69-4bea-bd1c-0871ebfc51ad)

