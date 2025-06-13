import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import Homepage from "../pages/Homepage";
import MainLayout from "../layouts/MainLayout";
import RegisterPage from "../pages/RegisterPage";

const AppRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Homepage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Route>
        </Routes>
    </BrowserRouter>
);

export default AppRouter;