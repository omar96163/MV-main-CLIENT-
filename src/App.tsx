import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ContactProvider } from "./contexts/ContactContext";
import { Toaster } from 'react-hot-toast';
import { DashboardProvider } from "./contexts/DashboardContext";

import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import SearchPage from "./pages/SearchPage";
import UploadPage from "./pages/UploadPage";
import MagicAssistant from "./pages/MagicAssistant";
import AdminPage from "./pages/AdminPage";
import ProfilePage from "./pages/ProfilePage";
import MyContactsPage from "./pages/MyContactsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import GoogleSuccess from "./pages/GoogleSuccess";

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      {/* Google OAuth success handler */}
      <Route path="/google-success" element={<GoogleSuccess />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Navbar />
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/search"
        element={
          <ProtectedRoute>
            <Navbar />
            <SearchPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-contacts"
        element={
          <ProtectedRoute>
            <Navbar />
            <MyContactsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/upload"
        element={
          <ProtectedRoute>
            <Navbar />
            <UploadPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/magic-assistant"
        element={
          <ProtectedRoute>
            <Navbar />
            <MagicAssistant />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly>
            <Navbar />
            <AdminPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/:id"
        element={
          <ProtectedRoute>
            <Navbar />
            <ProfilePage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <ContactProvider>
        <DashboardProvider>
          <Router>
            <Toaster
              position="bottom-right"
              toastOptions={{
                duration: 4000,
                className:
                  "flex items-center gap-3 bg-white text-slate-800 border border-slate-200 shadow-2xl rounded-2xl px-5 py-4",
                success: {
                  icon: "✅",
                  className:
                    "bg-emerald-600 text-white border-emerald-700",
                },
                error: {
                  icon: "❌",
                  className:
                    "bg-red-600 text-white border-red-700",
                },
                loading: {
                  icon: "⏳",
                  className:
                    "bg-blue-600 text-white border-blue-700",
                },
              }}
            />
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
              <AppRoutes />
            </div>
          </Router>
        </DashboardProvider>
      </ContactProvider>
    </AuthProvider>
  );
}

export default App;