🚀 Portfolio-React
https://img.shields.io/badge/React-19.2.7-61DAFB?style=for-the-badge&logo=react&logoColor=white
https://img.shields.io/badge/Three.js-r152-000000?style=for-the-badge&logo=three.js&logoColor=white
https://img.shields.io/badge/Framer_Motion-11.0.2-0055FF?style=for-the-badge&logo=framer&logoColor=white
https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white
https://img.shields.io/badge/License-MIT-4ade80?style=for-the-badge&logo=mit&logoColor=white

Live Demo: https://your-portfolio.vercel.app

A modern, interactive 3D portfolio template built with React, Three.js, and Framer Motion. Fully customizable with zero coding required.

✨ Features
🎨 Interactive 3D avatar with smooth animations

📱 Fully responsive on all devices

🎯 Glass-morphism UI with dark theme

📧 Functional contact form with EmailJS integration

🖼️ Dynamic project showcase with filtering

📊 Visual skill representation

🚀 Smooth scroll and page transitions

🎭 Customizable without touching code

📁 Project Structure
Portfolio-React/
└── frontend/
    ├── public/
    │   ├── index.html
    │   └── favicon.ico
    ├── src/
    │   ├── assets/
    │   │   ├── CV/              ← Your CV goes here
    │   │   │   └── uzair_cv.pdf
    │   │   └── images/          ← Project images go here
    │   │       ├── Api.png
    │   │       ├── Auth.png
    │   │       ├── block.jpg
    │   │       ├── ecom.jpg
    │   │       └── portfolio.png
    │   ├── components/          ← Don't touch these
    │   │   ├── Navbar.jsx
    │   │   ├── Hero.jsx
    │   │   ├── About.jsx
    │   │   ├── Skills.jsx
    │   │   ├── Projects.jsx
    │   │   ├── Contact.jsx
    │   │   └── Footer.jsx
    │   ├── data/
    │   │   └── PortfolioContent.js  ← 🔥 ONLY EDIT THIS
    │   ├── styles/              ← CSS files (optional)
    │   ├── App.js
    │   └── index.js
    ├── .env                     ← EmailJS keys (optional)
    ├── .gitignore
    ├── package.json
    └── README.md
🚀 Quick Setup
bash
git clone https://github.com/npm-335i/Portfolio-React.git
cd Portfolio-React/frontend
npm install
npm start
✏️ Customize in 3 Steps
Step 1: Edit Content
Only file to edit: /frontend/src/data/PortfolioContent.js

Change everything:

Hero: name, title, bio, stats, tech stack

About: description, skills, stats

Projects: add/remove projects, images, links

Contact: email, social links, availability

Skills: add/remove skills with levels

Step 2: Add Your CV
bash
# Place your CV in:
/frontend/src/assets/CV/your_cv.pdf

# Update import in /frontend/src/components/Hero.jsx:
import cvPDF from "../assets/CV/your_cv.pdf";
Step 3: Add Project Images
bash
# Place images in:
/frontend/src/assets/images/your-image.png

# Import in PortfolioContent.js:
import Project1 from "../assets/images/your-image.png";
📧 Contact Form Setup (Optional)
Sign up at EmailJS

Create a service and template

Create .env file in /frontend/:

env
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
🚀 Deploy to Vercel
Push to GitHub

Import repository to Vercel

Add environment variables (if using EmailJS)

Deploy!

🛠️ Tech Stack
React 19 - UI Framework

Three.js + React Three Fiber - 3D Graphics

Framer Motion - Animations

EmailJS - Contact Form

CSS3 - Styling

📝 License
MIT License - Feel free to use for personal or commercial projects.

👨‍💻 Created by
Uzair - Full Stack Developer

https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white
https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white

⭐ Support
If you found this useful, please give it a ⭐ on GitHub!

Made with ❤️ by Uzair
