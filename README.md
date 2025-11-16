# 🍬 Sweet Shop — MERN Stack Application

## Inventory Management + Purchase System with Admin Panel

A full-stack MERN application where users can browse sweets, purchase items, and admins can fully manage inventory.

Supports authentication, authorization, admin-only operations, modern UI, toast notifications, and protected routes.

## 🚀 Features

### 👤 Authentication
* Register & Login (JWT-based)
* Password hashing with `bcrypt`
* Persistent session stored in `localStorage`
* Protected pages for authenticated users
* Admin-only route protection

### 🍭 Sweets Management (Admin Only)
* Add new sweets
* Edit existing sweets via modal
* Delete sweets
* Restock inventory
* Search sweets by name
* Category filtering
* Image support for sweets

### 🛍️ User Features
* Browse all sweets
* View categories
* Purchase sweets (reduces stock)
* Search sweets
* Light/Dark mode UI

### 🎨 Frontend UI
* React + Vite
* Context API (Auth + Theme)
* Custom toast notifications
* Responsive and modern styling
* Reusable components (Navbar, SweetCard, SweetList, Modals)

### 📡 API Endpoints

#### Auth
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register user |
| `POST` | `/api/auth/login` | Authenticate user |

#### Sweets
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/sweets` | Add sweet (Admin only) |
| `GET` | `/api/sweets` | List all sweets |
| `GET` | `/api/sweets/search?query=` | Search sweets |
| `PUT` | `/api/sweets/:id` | Update sweet (Admin only) |
| `DELETE` | `/api/sweets/:id` | Delete sweet (Admin only) |

#### Inventory Operations
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/sweets/:id/purchase` | Purchase a sweet |
| `POST` | `/api/sweets/:id/restock` | Restock sweet (Admin only) |

## 🛠️ Tech Stack

### Frontend
* React (Vite)
* Axios
* Context API
* React Router
* CSS (custom design)
* Custom Toasts
* Role-based Access

### Backend
* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* Bcrypt for password hashing

## 📁 Folder Structure (Simplified)

## 📦 Installation

### 1️⃣ Clone Repository
```bash
git clone <your-repo-url>
cd sweet-shop
```

## 🗄️ Backend Setup
Navigate to the backend directory:
```
cd backend
```

## Install dependencies:

```
npm install
```
### Create a .env file inside the backend/ directory with the following content:

## Code snippet
```bash
PORT=4000
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-secret>
Start the backend server:
```

```
npm start
💻 Frontend Setup
Navigate to the frontend directory:
```
```
cd ../frontend
Install dependencies:
```
```
npm install
Start the frontend development server:
```
npm run dev
``

## 🔐 Creating an Admin User
- You can manually update any user’s role to "admin" in your MongoDB database:

```JSON

{
  "role": "admin"
}
```
## 🧠 My AI Usage
- A required section describing how AI tools were used during development.

- Which AI tools I used
- ChatGPT (Primary tool)

- GitHub Copilot (Occasional inline suggestions)

## How I used them
- ChatGPT — Intentional Use
- I used ChatGPT to assist with tasks such as:

- Designing backend route structure (auth, sweets, middleware)

- Generating boilerplate for controllers/services

- Creating express middleware (JWT auth, adminOnly)

- Debugging issues with routing, tokens, and CORS

- Planning frontend architecture (components, context structure)

- Building React UI structure (AdminPanel, EditSweetModal, Navbar)

- Writing global styles + improving UI consistency

- Creating ProtectedRoute logic

- Writing commit messages and documentation

- I did not copy blindly — I reviewed, modified, and validated all code.

- GitHub Copilot — Passive Use
- - Used only for:

- Completing small React snippets

- Suggesting Mongoose schema fields

- Auto-generating simple utility functions

- Copilot was secondary; ChatGPT guided the major design decisions.

##  Reflection: How AI Impacted My Workflow
- - AI significantly improved my productivity, but I remained fully responsible for:

- Understanding every piece of logic

Debugging and fixing integration errors

Structuring the system

Testing API flows manually

Ensuring secure & correct implementation

AI acted as a support tool — not a shortcut to skip understanding.

It helped me learn faster, write cleaner code, and focus on functionality instead of boilerplate.
