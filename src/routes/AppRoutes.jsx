import React, { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ProtectedRoute, GuestRoute } from './ProtectedRoutes'
import { RoleRoute } from './RoleRoutes'
import Loader from '@/components/ui/Loader'
import MainLayout from '@/components/layout/MainLayout'

// Lazy loaded public pages
const Home = lazy(() => import('@/pages/Home'))
const About = lazy(() => import('@/pages/About'))
const Membership = lazy(() => import('@/pages/Membership'))
const Programs = lazy(() => import('@/pages/Programs'))
const PersonalTraining = lazy(() => import('@/pages/PersonalTraining'))
const Nutrition = lazy(() => import('@/pages/Nutrition'))
const Trainers = lazy(() => import('@/pages/Trainers'))
const TransformationStories = lazy(() => import('@/pages/TransformationStories'))
const BMICalculator = lazy(() => import('@/pages/BMICalculator'))
const Gallery = lazy(() => import('@/pages/Gallery'))
const Blog = lazy(() => import('@/pages/Blog'))
const Pricing = lazy(() => import('@/pages/Pricing'))
const FAQ = lazy(() => import('@/pages/FAQ'))
const Contact = lazy(() => import('@/pages/Contact'))

// Lazy loaded Auth pages
const Login = lazy(() => import('@/pages/auth/Login'))
const Register = lazy(() => import('@/pages/auth/Register'))
const ForgotPassword = lazy(() => import('@/pages/auth/ForgotPassword'))
const Unauthorized = lazy(() => import('@/pages/auth/Unauthorized'))

// Lazy loaded Legal pages
const PrivacyPolicy = lazy(() => import('@/pages/legal/PrivacyPolicy'))
const Terms = lazy(() => import('@/pages/legal/Terms'))

// Lazy loaded Protected/Dashboard pages
const Dashboard = lazy(() => import('@/pages/dashboard/Dashboard'))
const MemberDashboard = lazy(() => import('@/pages/member/MemberDashboard'))
const TrainerDashboard = lazy(() => import('@/pages/trainer/TrainerDashboard'))
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'))

const NotFound = lazy(() => import('@/pages/NotFound'))

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loader.Page />}>
      <Routes>
        {/* Public Routes with Main Navbar and Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/personal-training" element={<PersonalTraining />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/trainers" element={<Trainers />} />
          <Route path="/transformation-stories" element={<TransformationStories />} />
          <Route path="/bmi-calculator" element={<BMICalculator />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Route>

        {/* Guest Routes (Auth pages) */}
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Protected Dashboard Entry Route */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* Role-Based Routes */}
        <Route element={<RoleRoute allowedRoles={['member', 'admin']} />}>
          <Route path="/member/*" element={<MemberDashboard />} />
        </Route>

        <Route element={<RoleRoute allowedRoles={['trainer', 'admin']} />}>
          <Route path="/trainer/*" element={<TrainerDashboard />} />
        </Route>

        <Route element={<RoleRoute allowedRoles={['admin']} />}>
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}
