# 🚀 HRMS Dashboard (React + Supabase)

A modern Human Resource Management System (HRMS) built using React, Tailwind CSS, and Supabase. Includes authentication, role-based access, and employee management features.

---

## 📌 Features

### 🔐 Authentication
- Login / Signup using Supabase Auth
- Session management via `AuthContext`
- Role-based redirection (Admin / Employee)

### 👤 Employee Management
- Add Employee
- Edit Employee
- Delete Employee
- View Employee List

### 📊 Dashboard
- Overview stats (Employees, Attendance, etc.)
- Clean and minimal UI
- Real-time data from Supabase

### 📅 Attendance System
- Mark attendance
- Store and fetch attendance records

### 🛡️ Role-Based Access
- **Admin** — full access, manage employees
- **Employee** — limited access, view personal data

---

## 🛠️ Tech Stack

| Layer        | Tech                          |
|--------------|--------------------------------|
| Frontend     | React.js + Tailwind CSS       |
| Backend      | Supabase                      |
| Database     | PostgreSQL (via Supabase)     |
| Auth         | Supabase Authentication       |
| Deployment   | Vercel / Netlify              |

---

## 📂 Project Structure

```

```
FrontEnd/
├── dist
│   ├── assets
│   │   ├── index-6rHmkMSw.css
│   │   └── index-L7t5y5c9.js
│   ├── favicon.svg
│   ├── icons.svg
│   └── index.html
├── public
│   ├── favicon.svg
│   └── icons.svg
├── src
│   ├── assets
│   │   ├── favicon-32x32.png
│   │   ├── hero.png
│   │   └── react.svg
│   ├── components
│   │   ├── Badge.jsx
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Input.jsx
│   │   └── Modal.jsx
│   ├── context
│   │   ├── AuthContext.jsx
│   │   ├── EmployeeContext.jsx
│   │   └── ToastContext.jsx
│   ├── hooks
│   ├── layouts
│   │   ├── DashboardLayout.jsx
│   │   ├── Header.jsx
│   │   └── Sidebar.jsx
│   ├── lib
│   │   ├── api.js
│   │   └── supabase.js
│   ├── pages
│   │   ├── admin
│   │   │   ├── Attendance.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Employees.jsx
│   │   │   ├── Leave.jsx
│   │   │   └── Payroll.jsx
│   │   ├── auth
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   ├── employee
│   │   │   ├── Attendance.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Leave.jsx
│   │   │   ├── Payroll.jsx
│   │   │   └── Profile.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── EmployeeDashboard.jsx
│   │   ├── SignIn.jsx
│   │   └── SignUp.jsx
│   ├── routes
│   │   ├── index.jsx
│   │   └── ProtectedRoute.jsx
│   ├── services
│   │   └── mockData.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

```

---

## ⚙️ Installation

```bash
# Clone repo
git clone https://github.com/your-username/hrms-dashboard.git

# Go to project
cd hrms-dashboard/FrontEnd

# Install dependencies
npm install

# Start dev server
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file in the **project root** (same level as `package.json`, NOT inside `src/`):

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

Restart the dev server after creating or editing this file — Vite only reads env vars at startup.

---

## 🚀 Deployment

Deploy on Vercel or Netlify. Add the environment variables above in your deployment platform's settings — they won't be picked up from a local `.env` file in production.

---

## 🎯 Future Improvements

- Payroll system 💰
- Leave management 📄
- Notifications 🔔
- Charts & analytics 📈
- Dark mode 🌙

---

## 🧠 UI/UX Goals

- Minimalist design
- Clean alignment & spacing
- Professional SaaS dashboard feel

---

## 🤝 Contributing

Pull requests are welcome. For major changes, open an issue first.

---

## 📄 License

This project is licensed under the MIT License.
