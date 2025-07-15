import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../components/user/components/LoginModal";
import Homepage from "../pages/Homepage";
import RegisterPage from "../components/user/components/RegisterModal";
import ProtectedRoute from "../components/admin/common/ProtectedRoute";
import CustomerLayout from "../components/user/layouts/CustomerLayout";
import AdminLayout from "../layouts/admin/AdminLayout";
import AdminDashboard from "../pages/admin/Dashboard";
import ActivitiesTable from "../pages/admin/Activities";
import EnhancedGuidesDashboard from "../pages/admin/Guides";
import BookingsTable from "../pages/admin/Bookings";
import CustomersProfile from "../pages/admin/Customers";
import ReviewsTable from "../pages/admin/Reviews";
import ProfilePage from "../pages/home/Profilepage";
import ExplorePage from "../pages/home/ExplorePage";
import ContactPage from "../pages/home/ContactPage";
import AboutPage from "../pages/home/AboutUsPage";
import MyBookingsPage from "../pages/home/MyBookingsPage";

// import BookingsPage from "../pages/home/BookingsPage";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<CustomerLayout />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/customer" element={<Homepage />} />
        <Route path="/profile" element={<ProfilePage />} /> 
        <Route path="/explore" element={<ExplorePage />} /> 
        <Route path="/contact" element={<ContactPage />} /> 
        <Route path="/aboutus" element={<AboutPage />} /> 
        <Route path="/mybookings" element={<MyBookingsPage />} /> 
        {/* <Route path="/bookings" element={<BookingsPage />} /> */}
      </Route>

      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedRoles={"admin"}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} /> 
        <Route path='activities' element={<ActivitiesTable />} /> 
        <Route path='guides' element={<EnhancedGuidesDashboard />} /> 
        <Route path='bookings' element={<BookingsTable />} /> 
        <Route path='customers' element={<CustomersProfile />} />        
        <Route path='reviews' element={<ReviewsTable/>} /> 
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
