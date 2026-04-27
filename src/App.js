import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProtectedRoute from "./guards/ProtectedRoute";
import Landing from "./pages/landing/Landing";
import PublicGuard from "./guards/PublicRoute";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <PublicGuard>
            <Landing />
          </PublicGuard>
        } />
        <Route path="/login" element={
          <PublicGuard>
            <Login />
          </PublicGuard>
        } />
        <Route path="/register" element={
          <PublicGuard>
            <Register />
          </PublicGuard>
        } />
        <Route path="/forgotpassword" element={
          <PublicGuard>
            <ForgotPassword />
          </PublicGuard>
        } />
        <Route path="/reset/:token" element={
          <PublicGuard>
            <ResetPassword />
          </PublicGuard>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;