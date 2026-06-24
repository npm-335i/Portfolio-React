# 🚀 Portfolio-React

[![React](https://img.shields.io/badge/React-19.2.7-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-r152-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0.2-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![License](https://img.shields.io/badge/License-MIT-4ade80?style=for-the-badge&logo=mit&logoColor=white)](LICENSE)

**Live Demo:** [https://your-portfolio.vercel.app](https://your-portfolio.vercel.app)

Modern 3D portfolio template with React, Three.js & Framer Motion. Fully customizable with zero coding required!

---

## ✨ Features

- 🎨 Interactive 3D avatar with animations
- 📱 Fully responsive design
- 🎯 Glass-morphism UI with dark theme
- 📧 Functional contact form with spam protection
- 🖼️ Dynamic project showcase
- 📊 Skill visualization

---

## 📁 Project Structure
Portfolio-React/
├── frontend/
│ ├── public/
│ │ ├── index.html
│ │ └── favicon.ico
│ ├── src/
│ │ ├── assets/
│ │ │ ├── CV/ ← Your CV goes here
│ │ │ │ └── uzair_cv.pdf
│ │ │ └── images/ ← Project images go here
│ │ │ ├── Api.png
│ │ │ ├── Auth.png
│ │ │ ├── block.jpg
│ │ │ ├── ecom.jpg
│ │ │ └── portfolio.png
│ │ ├── components/ ← Don't touch these
│ │ │ ├── Navbar.jsx
│ │ │ ├── Hero.jsx
│ │ │ ├── About.jsx
│ │ │ ├── Skills.jsx
│ │ │ ├── Projects.jsx
│ │ │ ├── Contact.jsx
│ │ │ └── Footer.jsx
│ │ ├── data/
│ │ │ └── PortfolioContent.js ← 🔥 ONLY EDIT THIS
│ │ ├── styles/ ← CSS files (optional customization)
│ │ ├── App.js
│ │ └── index.js
│ ├── .env ← EmailJS keys (optional)
│ ├── .gitignore
│ ├── package.json
│ └── README.md
└── README.md


---

## 🔥 Quick Setup

``bash
git clone https://github.com/npm-335i/Portfolio-React.git
cd Portfolio-React
cd frontend
npm install
npm start``
✏️ Customize (ONLY 3 Steps)
1. Edit Content
ONLY file to edit: /src/data/PortfolioContent.js

Change everything:

Hero: name, title, bio, stats, tech stack

About: description, skills, stats

Projects: add/remove projects, images, links

Contact: email, social links, availability

Skills: add/remove skills with levels

2. Add Your CV
bash
# Place your CV in:
/src/assets/CV/your_cv.pdf

# Update import in /src/components/Hero.jsx:
import cvPDF from "../assets/CV/your_cv.pdf";
3. Add Project Images
bash
# Place images in:
/src/assets/images/your-image.png

# Import in PortfolioContent.js:
import Project1 from "../assets/images/your-image.png";
📧 Contact Form Setup (Optional)
Sign up at EmailJS

Create a service & template

Create .env file in root:

env
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
🚀 Deploy to Vercel
https://vercel.com/button

Or manually:

Push to GitHub

Import to Vercel

Add env variables (if using EmailJS)

Deploy!

🛠️ Tech Stack
React 19

Three.js + React Three Fiber

Framer Motion

EmailJS

CSS3

📝 License
MIT License - feel free to use for personal/commercial projects.

👨‍💻 Created by
Uzair - Full Stack Developer

https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white
https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white

⭐ Support
If you found this useful, please give it a ⭐ on GitHub!

Made with ❤️ by Uzair
