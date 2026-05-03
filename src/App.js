import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import clientStore, { persistor } from "./redux/store/clientStore";
import ProtectedRoute from "./components/wrappers/guards/ProtectedRoute";
import Landing from "./pages/landing/Landing";
import PublicGuard from "./components/wrappers/guards/PublicRoute";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Dashboard from "./pages/dashboard/Dashboard";
import { ModalProvider } from "./context/ModalProvider";
import { ToastProvider } from "./context/ToastProvider";
import DashboardWrapper from "./components/wrappers/DashBoardWrapper";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });

  return (
    <Provider store={clientStore}>
      <ToastProvider>
        <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <ModalProvider>
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
                      <DashboardWrapper>
                        <Dashboard />
                      </DashboardWrapper>
                    </ProtectedRoute>
                  } />

                </Routes>
              </ModalProvider>
            </BrowserRouter>
          </QueryClientProvider>
        </PersistGate>
      </ToastProvider>
    </Provider >
  );
}

export default App;