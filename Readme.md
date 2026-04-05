# 🚀 FinBook – Smart Finance Dashboard

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-Fast-purple?logo=vite)
![Tailwind](https://img.shields.io/badge/TailwindCSS-Modern-38B2AC?logo=tailwind-css)
![Status](https://img.shields.io/badge/Status-Complete-success)
![License](https://img.shields.io/badge/License-Educational-lightgrey)

🔗 **Live Demo:** https://fin-book-eight.vercel.app/  
📂 **Repository:** https://github.com/BEASTBOLTT/FinBook  

---

## 📊 Overview

**FinBook** is a modern, responsive **Finance Dashboard UI** designed to help users track and analyze their financial activity in an intuitive and interactive way.

It simulates a real-world financial system with:
- Dynamic data visualization  
- Role-based access control  
- Persistent storage  
- Insight generation  

---

## ✨ Core Features

### 📈 Dashboard Analytics
- 💰 Total Balance overview  
- 📊 Income vs Expense trends (time-based chart)  
- 🧾 Category-wise expense breakdown (pie chart)  
- Clean and minimal card-based UI  

### 💸 Transaction Management
- ➕ Add income & expense transactions  
- 📅 Includes:
  - Date  
  - Amount  
  - Category  
  - Type (Income/Expense)  
- 🔍 Filter by category/type  
- ↕️ Sort by date or amount  

### 🔐 Role-Based UI Simulation
- 👤 **Viewer Mode**
  - Read-only access  
- 🛠️ **Admin Mode**
  - Can add transactions  
- 🔄 Toggle roles dynamically  

### 📊 Insights Engine
- 🧠 Automatically generated insights:
  - Highest spending category  
  - Monthly comparisons  
  - Spending observations  
- Fully **data-driven (not static)**  

### 💾 Data Persistence
- Uses **Local Storage**
- ✔ Data remains after refresh  
- ✔ Mimics real application behavior  

### 📱 Responsive UI
- Works seamlessly on:
  - Desktop  
  - Tablet  
  - Mobile  
- Adaptive sidebar and layout  

---

## 🛠️ Tech Stack

| Technology | Usage |
|----------|------|
| React (Vite) | Frontend framework |
| Tailwind CSS | Styling |
| Chart Library | Data visualization |
| React Hooks | State management |
| Local Storage | Data persistence |

---

## 📂 Project Structure

    FinBook/
    │── src/
    │   ├── components/
    │   │   ├── Dashboard/
    │   │   ├── Transactions/
    │   │   ├── Insights/
    │   │   ├── Charts/
    │   │   ├── Sidebar/
    │   │   └── UI/
    │   ├── pages/
    │   ├── hooks/
    │   ├── utils/
    │   └── App.jsx
    │
    ├── public/
    ├── index.html
    └── package.json

---

## ⚙️ Setup & Installation

    # Clone the repository
    git clone https://github.com/BEASTBOLTT/FinBook.git

    # Navigate into the project
    cd FinBook

    # Install dependencies
    npm install

    # Start development server
    npm run dev

---

## 🧪 How to Use

1. Add transactions (income or expense)  
2. Filter and sort data for analysis  
3. Switch between Admin and Viewer roles  
4. Explore charts and insights  
5. Refresh page → data stays saved  

---

## 🎯 Key Highlights

✔ Fully functional finance dashboard  
✔ Clean component-based architecture  
✔ Role-based UI simulation  
✔ Real-time updates  
✔ Persistent state using local storage  
✔ Dynamic insights generation  

---

## 🚀 Future Improvements

- 🌙 Dark Mode  
- 📤 Export data (CSV/JSON)  
- 🔐 Authentication system  
- 🌐 Backend integration  
- 📊 Advanced analytics  

---

## 👨‍💻 Author

**Devam Pandey**  

---

## 📌 Note

This project was built as part of a frontend assignment to demonstrate:
- UI/UX design  
- State management  
- Data visualization  
- Real-world feature implementation  