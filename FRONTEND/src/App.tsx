import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Company from "./pages/Company";
import SystemLogs from "./pages/SystemLogs";
import Subscriptions from "./pages/Subscriptions";
import Settings from "./pages/Settings";
import Scans from "./pages/Scans";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SuperadminLogin from "./components/superadmin/SuperadminLogin";
import SuperadminDashboard from "./pages/SuperadminDashboard";
import { AdminLayout } from "./components/superadmin/AdminLayout";
import { ProtectedRoute } from "./components/common/ProtectedRoute";
import CustomizeEnterprisePlan from "./pages/CustomizeEnterprisePlan";
import TwoFactorAuth from "./pages/TwoFactorAuth";
import Superadmin2FA from "./components/superadmin/Superadmin2FA";
import ForgotPassword from "./pages/forgetpassword";
import ResetPassword from "./pages/resetpassword";
import PricingPlans from "./pages/PricingPlans";
import AOS from "aos";
import { useEffect } from "react";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";
import AvailableScansFree from "./pages/AvailableScansFree";

const App = () => {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);
  return (
    <Routes>
      {/* Non-admin routes */}
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/customize-enterprise"
        element={<CustomizeEnterprisePlan />}
      />
      <Route path="/Tfa" element={<TwoFactorAuth />} />
      <Route path="/verify-registration-otp" element={<TwoFactorAuth />} />
      <Route path="/verify-login-otp" element={<TwoFactorAuth />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/pricing" element={<PricingPlans />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/payment-cancel" element={<PaymentCancel />} />
      <Route path="/free-scans" element={<AvailableScansFree />} />

      {/* Superadmin login route */}
      <Route path="/NS-MS-1127/login" element={<SuperadminLogin />} />
      {/* Superadmin OTP verification route */}
      <Route path="/NS-MS-1127/otp" element={<Superadmin2FA />} />

      {/* Protected Superadmin routes */}
      <Route
        path="/NS-MS-1127"
        element={
          <ProtectedRoute requiredRole="superadmin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<SuperadminDashboard />} />
        <Route path="Company" element={<Company />} />
        <Route path="scans" element={<Scans />} />
        <Route path="reports" element={<Reports />} />
        <Route path="subscriptions" element={<Subscriptions />} />
        <Route path="logs" element={<SystemLogs />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;