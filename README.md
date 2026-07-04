# 🚀 HRMS Dashboard (React + Supabase)

A modern Human Resource Management System (HRMS) built using React, Tailwind CSS, and Supabase.  
This project includes authentication, role-based access, and employee management features.

---

## 📌 Features

### 🔐 Authentication
- Login / Signup using Supabase Auth
- Session management
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
- **Admin**
  - Full access
  - Manage employees
- **Employee**
  - Limited access
  - View personal data

---

## 🛠️ Tech Stack

- **Frontend:** React.js + Tailwind CSS
- **Backend:** Supabase
- **Database:** PostgreSQL (via Supabase)
- **Auth:** Supabase Authentication
- **Deployment:** Vercel / Netlify

---

## 📂 Project Structure


src/
│── components/
│── pages/
│── layouts/
│── services/
│── utils/
│── App.jsx
│── main.jsx


---

## ⚙️ Installation

```bash
# Clone repo
git clone https://github.com/your-username/hrms-dashboard.git

# Go to project
cd hrms-dashboard

# Install dependencies
npm install

# Start dev server
npm run dev
🔑 Environment Variables

Create a .env file in root:

VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
🚀 Deployment

You can deploy easily on:

Vercel
Netlify

Make sure to add environment variables in deployment settings.

🎯 Future Improvements
Payroll system 💰
Leave management 📄
Notifications 🔔
Charts & analytics 📈
Dark mode 🌙
🧠 UI/UX Goals
Minimalist design
Clean alignment & spacing
Professional SaaS dashboard feel
🤝 Contributing

Pull requests are welcome. For major changes, open an issue first.

📄 License

This project is licensed under the MIT License.
