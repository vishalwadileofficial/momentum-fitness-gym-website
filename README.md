# Momentum Fitness | Premium Gym & Fitness Platform

A premium, production-ready web application built for **Momentum Fitness & Gym**. Engineered with a modern, high-performance tech stack, security-first route guarding, dynamic database integrations, and a sleek, high-fidelity dark/neon energy theme.

---

## 📖 Project Overview

Momentum Fitness is an elite, high-performance gym facility tailored for serious athletes and dedicated fitness enthusiasts. This comprehensive digital platform serves as the facility's primary client portal, integrating seamless user onboarding, subscription management, class reservations, and personalized fitness tracking.

With custom dashboards tailored to the specific needs of Members, Trainers, and Administrators, the application eliminates manual overhead and brings the gym's operations entirely to the cloud. From tracking BMI and macronutrients to managing group classes and membership tiers, Momentum Fitness delivers an uncompromising digital experience.

---

## ✨ Key Features

- **Dynamic Role-Based Dashboards**: Exclusive portal interfaces for Members (metrics, schedules), Trainers (client rosters, programming), and Administrators (user management, billing, facility announcements).
- **Secure Authentication & Routing**: Firebase-powered user authentication with rigorous route guarding (Guest, Protected, Role-specific routes).
- **Class Booking System**: Real-time capacity-limited slot reservations for 9 engineered group training protocols.
- **Advanced Health Metrics**: Integrated BMI assessment calculators and progress tracking visualizations.
- **Corporate Rate Requests & Pricing**: Flexible membership tier displays, private coaching packages, and drop-in pass processing.
- **Micro-Interactions & Animations**: High-fidelity UX/UI using Framer Motion to deliver premium feedback and engagement.
- **Fully Responsive & PWA-Ready**: Optimized for desktop, tablet, and mobile interfaces.

---

## 🚀 Tech Stack

- **Core Framework**: React 19, Vite
- **Styling**: Tailwind CSS v4, Custom Glassmorphism, HSL tailor-made palettes, Framer Motion (micro-animations)
- **Navigation**: React Router v6 (Code-split with dynamic `React.lazy` loading)
- **Database & Storage**: Firebase v11 (Authentication, Firestore Database, Firebase Storage)
- **Validation**: Native form validation with custom error handling
- **SEO & Meta**: React Helmet Async (Open Graph tags, Twitter Cards, Custom page metadata)
- **Code Quality**: ESLint (modern flat config), Prettier

---

## ⚙️ Environment Setup

This codebase follows a zero-leak security strategy. Secret keys are never committed or hardcoded in the codebase. All access variables are routed via Vite environment variables.

1. Clone the repository and navigate to the root directory.
2. Duplicate the environment template file:
   ```bash
   cp .env.example .env
   ```
3. Populate `.env` with your Firebase project credentials and configuration details:
   ```env
   VITE_FIREBASE_API_KEY=your_actual_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

> [!WARNING]
> `.env` files are automatically tracked and ignored in `.gitignore`. Never force-add environment files to commits.

---

## 🛠️ Installation Guide

Follow these steps to run the application locally on your machine:

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start the Development Server**:
   ```bash
   npm run dev
   ```

3. **Open the Application**:
   Navigate to `http://localhost:5173` in your browser.

4. **Lint Code (Optional)**:
   ```bash
   npm run lint
   ```

---

## 📂 Folder Structure

Designed to support scale, separation of concerns, and intuitive modularity:

```text
src/
├── assets/             # Static graphics, SVG sprites, and brand logos
├── components/
│   ├── common/         # Layout wrappers (SectionWrapper, Container)
│   ├── layout/         # Navigation components (Navbar, Footer, MainLayout)
│   └── ui/             # Reusable UI elements (Button, Input, Card, Modal, Loader)
├── context/            # Global context providers (AuthContext)
├── pages/              # Core pages & route views
│   ├── admin/          # Administrator panels
│   ├── auth/           # Login, signup, reset password, unauthorized
│   ├── dashboard/      # Unified dashboard routing logic
│   ├── legal/          # Legal & policy texts
│   ├── member/         # Member dashboards and analytics
│   ├── trainer/        # Trainer tools and client rosters
│   └── (others)        # Home, Pricing, Programs, BMI Calculator, etc.
├── routes/             # Access guards & path routers (AppRoutes, ProtectedRoutes)
├── services/           # Firebase instance connections (firebase.js)
├── styles/             # Global CSS and custom design tokens (index.css)
└── utils/              # Helper utilities (role checks, formatters)
```

---

## 🌐 Deployment Guide

This application is ready to be hosted on providers like Vercel, Netlify, or Firebase Hosting.

1. **Build the Application**:
   Compile the code-split, production bundle in the `dist/` folder:
   ```bash
   npm run build
   ```

2. **Deploy to Vercel (Example)**:
   - Connect your GitHub repository to Vercel.
   - Set the build command to `npm run build` and output directory to `dist`.
   - Add all environment variables from your `.env` file to Vercel's Environment Variables settings.
   - Deploy.

3. **Firebase Rules**:
   Ensure your Firestore security rules are configured to match the application's read/write demands based on user roles (`admin`, `trainer`, `member`).

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details. (c) 2026 Momentum Fitness.
