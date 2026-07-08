# Momentum Fitness | Premium Gym & Fitness Platform

A premium, production-ready web application built for **Momentum Fitness & Gym**. Engineered with a modern, high-performance tech stack, security-first route guarding, dynamic database integrations, and a sleek, high-fidelity dark/neon energy theme.

---

## 🚀 Tech Stack

- **Core Framework**: React 19, Vite
- **Styling**: Tailwind CSS v4 (CSS-first config), Custom Glassmorphism, HSL tailormade pallets, Framer Motion (micro-animations)
- **Navigation**: React Router v6 (Code-split with dynamic `React.lazy` loading)
- **Database & Storage**: Firebase v11 (Authentication, Firestore Database, Firebase Storage)
- **Validation**: Native form validation with custom error handling
- **SEO & Meta**: React Helmet Async (Open Graph tags, Twitter Cards, Custom page metadata)
- **Code Quality**: ESLint (modern flat config), Prettier

---

## 📂 Folder Architecture

Designed to support scale, separation of concerns, and intuitive modularity:

```text
src/
├── assets/             # Static graphics, SVG sprites, and brand logos
├── components/
│   ├── common/         # Layout wraps (SectionWrapper, Container)
│   ├── layout/         # Navigation components (Navbar, Footer, MainLayout)
│   └── ui/             # Reusable UI system (Button, Input, Card, Modal, Loader)
├── context/            # Global context providers (AuthContext)
├── pages/              # Core pages & route views
│   ├── admin/          # Admin panels
│   ├── auth/           # Login, signup, reset password, unauthorized
│   ├── dashboard/      # Unified dashboard routing logic
│   ├── legal/          # Legal & policy texts
│   ├── member/         # Member dashboards
│   ├── trainer/        # Trainer dashboards
│   └── (others)        # Home, About, Programs, Nutrition, BMI, etc.
├── routes/             # Access guards & path routers (AppRoutes, ProtectedRoutes)
├── services/           # Firebase instance connections (config.js)
├── styles/             # Global CSS and custom design tokens (index.css)
└── utils/              # Helper utilities (role checks, auth error mappings)
```

---

## 🔒 Security & Environment Variables

This codebase follows a zero-leak security strategy. Secret keys are never committed or hardcoded in the codebase. All access variables are routed via Vite environment structures.

### Local Setup Instructions:

1. Copy the environment template:
   ```bash
   cp .env.example .env
   ```
2. Populate `.env` with actual Firebase credentials:
   ```env
   VITE_FIREBASE_API_KEY=your_actual_key
   VITE_FIREBASE_AUTH_DOMAIN=your_actual_domain
   ...
   ```

> [!WARNING]
> `.env` files are automatically tracked and ignored in `.gitignore`. Never force add environment files to commits.

---

## 🛡️ Route Guarding & Access Control

Access control is managed granularly across three layers:
- **`GuestRoute`**: Restricts logged-in users from seeing authentication flows (Login/Register).
- **`ProtectedRoute`**: Restricts unauthenticated users from entering member environments.
- **`RoleRoute`**: Enforces strict user categorization (`admin`, `trainer`, `member`) and redirects access attempts to an `/unauthorized` landing.

---

## 🛠️ Commands & Verification

| Command | Action |
| :--- | :--- |
| `npm install` | Install all dependencies |
| `npm run dev` | Spin up Vite dev server |
| `npm run build` | Compile the code-split, production bundle in `dist/` |
| `npm run lint` | Run ESLint checks |

---

## 🌟 Premium Features Implemented
- **BMI Calculator**: Interactive metric/imperial dynamic calculations.
- **Micro-interactions**: Spring-based UI button reactions & page transitions.
- **PWA Ready**: Declared custom `manifest.json`, robots files, and dynamic XML sitemaps for maximum crawl efficiency.
