import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import Homepage from "../pages/Homepage";
import RegisterPage from "../pages/RegisterPage";
import MainLayout from "../layouts/MainLayout";

// ✅ Admin imports
import AdminLayout from "../layouts/admin/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Activities from "../pages/admin/Activities";
import Bookings from "../pages/admin/Bookings";
import Guides from "../pages/admin/Guides";
import Customers from "../pages/admin/Customers";
import Reviews from "../pages/admin/Reviews";
import Analytics from "../pages/admin/Analytics";
import Settings from "../pages/admin/Settings";
import ProtectedRoute from "../components/admin/common/ProtectedRoute";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      {/* 🌐 Public/User Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* 🛠️ Admin Routes */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedRoles={"admin"}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="activities" element={<Activities />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="guides" element={<Guides />} />
        <Route path="customers" element={<Customers />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* 🔁 Redirect for unknown paths */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
