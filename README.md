# 💪 AlgoGym – Your Personalized DSA Workout App 🧠

AlgoGym is a gamified platform that generates personalized DSA (Data Structures and Algorithms) problem sets based on your strengths and weaknesses. It motivates consistent practice through XP, streaks, topic-wise progress, and daily goals — your own gym for algorithms!

---

## 🚀 Features

### 🎯 Personalized Problem Generation
- Generates problems from your weak topics(fetches using user's leetcode profile) using **Gemini API**
- Problems include title, topic, difficulty, time estimate, and hints

### 🧠 Smart Progress Tracking
- 📊 XP system to track progress
- 🔥 Daily streak counter to build consistency
- 🧩 Tracks number of problems solved per topic
- 🕒 Recent activity log to visualize your efforts

### 🛡️ Secure & Seamless Auth
- Integrated with **NextAuth.js**
- Secure session handling and user state management

### 🌐 Platform Handle Integration
- Connect your **LeetCode**, **GeeksforGeeks**, and **Codeforces** profiles
- Dashboard reflects your coding journey across platforms

### 🎨 Beautiful Dashboard UI
- Built with **Next.js** and **Tailwind CSS**
- Fully responsive

---

## 🧪 Tech Stack

| Layer            | Tools/Libraries Used                            |
|------------------|--------------------------------------------------|
| 🧠 AI API        | Google Gemini 1.5 (generative model)             |
| 🔙 Backend       | Next.js API routes, MongoDB Atlas (Mongoose)     |
| 🧾 Auth          | NextAuth.js                                       |
| 💽 Database      | MongoDB Atlas                                     |
| 🎨 Frontend      | React + Tailwind CSS (fully responsive)           |
| ☁️ Deployment    | Vercel               |

---

## ✨ How It Works

- **User logs in** and links platform handles.
- Based on weak topics from performance, **Gemini generates custom DSA problems**.
- Solved problems are stored and tracked — never repeated again.
- XP and streak system motivates consistency.
- Dashboard visualizes daily and cumulative progress.
---

## 🧠 What I Learned

This project was a great learning experience that helped me explore full-stack development, AI integration, and user-centric design. Here are some of the key things I learned:

- ✅ **Authentication** with NextAuth.js and session-based user state
- ✅ **Building RESTful API routes** using Next.js
- ✅ **Using Gemini (Google Generative AI)** to dynamically create useful content
- ✅ **MongoDB + Mongoose** for schema modeling and storing complex user data
- ✅ **React Hooks (useState, useEffect)** for reactive UI
- ✅ **Creating reusable, responsive UI** with Tailwind CSS
- ✅ Handling **Edge Cases** like onboarding new users or avoiding duplicates
- ✅ Tracking **XP, streaks, and progress gamification** to enhance user motivation

> This was a passion project and one of the most rewarding experiences of my learning journey. 🚀

---
