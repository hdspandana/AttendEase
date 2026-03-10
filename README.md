# 🟦 AttendEase  
### ⭐ Smart Attendance Calculator for Students  

![Status](https://img.shields.io/badge/Status-Active-brightgreen)
![Made with](https://img.shields.io/badge/Made%20with-HTML%20%7C%20CSS%20%7C%20JS%20%7C%20Python-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 🎯 About the Project

**AttendEase** is a simple and smart attendance calculator designed to help students check their attendance percentage, safe bunk limit, and required classes instantly.  
Perfect for college students who want to *plan smart* and avoid attendance shortages.

---

## 🚀 Features

- ✔️ Calculate attendance percentage  
- ✔️ Find how many classes you can safely bunk  
- ✔️ Know how many classes you must attend to reach the target  
- ✔️ Clean and simple interface  
- ✔️ Fast, accurate & student-friendly  
- ✔️ Flask-powered REST API backend  
- ✔️ Share results via WhatsApp & Instagram  

---

## 🧮 How It Works

Enter:

- **Classes attended till now**  
- **Classes absent till now**  
- **Total classes in semester**  
- **Target attendance %**

And the calculator instantly shows:

- **Your current attendance %**  
- **Safe bunk limit**  
- **Required classes to reach target**  

---

## 🛠️ Technologies Used

### Frontend
- **HTML**
- **CSS**
- **JavaScript**

### Backend
- **Python**
- **Flask**
- **Flask-CORS**

---

## 🌐 Live Demo

- 🔗 Frontend: [attend-ease-gamma.vercel.app](https://attend-ease-gamma.vercel.app)
- 🔗 Backend API: [attendease-zgzt.onrender.com](https://attendease-zgzt.onrender.com)




## 📂 Project Structure
```
AttendEase/
├── backend/
│   ├── app.py
│   └── requirements.txt
└── frontend/
    ├── index.html
    ├── style.css
    ├── config.js
    ├── script.js
    └── sitemap.xml
```

---

## ▶️ How to Run Locally

### Backend
1. Clone the repository:
```bash
   git clone https://github.com/hdspandana/AttendEase.git
```
2. Navigate to backend folder:
```bash
   cd AttendEase/backend
```
3. Install dependencies:
```bash
   pip install -r requirements.txt
```
4. Run the Flask server:
```bash
   python app.py
```
   Backend runs at `http://localhost:5000`

### Frontend
1. Navigate to frontend folder:
```bash
   cd AttendEase/frontend
```
2. Serve locally:
```bash
   python -m http.server 3000
```
3. Open `http://localhost:3000` in your browser

---

## 🔌 API Reference

### `POST /calculate`

**Request body:**
```json
{
  "attended": 25,
  "absent": 3,
  "totalSem": 43,
  "target": 75
}
```

**Response:**
```json
{
  "conducted": 28,
  "attended": 25,
  "absent": 3,
  "remaining": 15,
  "currentPercent": 89.29,
  "requiredAttended": 33,
  "needToAttend": 8,
  "maxBunk": 7,
  "target": 75.0
}
```

---

## 🌟 Future Enhancements

- Dark mode  
- Attendance prediction AI  
- Save attendance logs  
- Mobile app version  

---

## 👩‍💻 Author

**Spandhuu**  
Made with ❤️ for students who want to track attendance smartly.

---

## ⭐ Support
If you like this project, don't forget to **star ⭐ the repository**!