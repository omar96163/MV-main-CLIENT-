// src/components/AuthModal.tsx
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { X, Mail, Lock, User, Key } from "lucide-react";
import toast from "react-hot-toast";

type AuthMode = "login" | "register" | "forgotPassword" | "enterResetCode";

interface AuthModalProps {
  mode: "login" | "register";
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({
  mode: initialMode,
  onClose,
}) => {
  const [currentMode, setCurrentMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to send reset code");
      }

      toast.success("Reset code sent! Check your email.");
      setCurrentMode("enterResetCode");
    } catch (error: any) {
      console.error("Forgot password error:", error);
      toast.error(error?.message || "Failed to send reset code");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resetCode, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success("Password updated! You can now sign in.");
      setCurrentMode("login");
    } catch (error: any) {
      toast.error(error.message || "Invalid or expired reset code");
    } finally {
      setLoading(false);
    }
  };

  // --- تسجيل الدخول أو التسجيل ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (currentMode === "login") {
        await login(email, password);
        toast.success("Successfully signed in!");
      } else if (currentMode === "register") {
        await register(email, password, name);
        toast.success("Account created successfully!");
      }
      onClose();
    } catch (error: any) {
      console.error("Auth error:", error);
      toast.error(error?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  // --- عرض النموذج المناسب ---
  const renderForm = () => {
    if (currentMode === "enterResetCode") {
      return (
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reset Code
            </label>
            <div className="relative">
              <Key className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={resetCode}
                onChange={(e) => setResetCode(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter 6-digit code"
                required
                maxLength={6}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter new password"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Confirm new password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => setCurrentMode("login")}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Back to Sign In
            </button>
          </div>
        </form>
      );
    }

    if (currentMode === "forgotPassword") {
      return (
        <form onSubmit={handleForgotPassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
          >
            {loading ? "Sending..." : "Send Reset Code"}
          </button>

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => setCurrentMode("login")}
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              ← Back to Sign In
            </button>
          </div>
        </form>
      );
    }

    return (
      <>
        <form onSubmit={handleSubmit} className="space-y-4">
          {currentMode === "register" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
          >
            {loading
              ? "Processing..."
              : currentMode === "login"
              ? "Sign In"
              : "Create Account"}
          </button>
        </form>

        <div className="text-center">
          {currentMode === "login" ? (
            <p className="text-gray-600">
              <button
                onClick={() => setCurrentMode("forgotPassword")}
                className="my-3 text-red-400 hover:text-red-700 font-medium transition-colors hover:underline"
              >
                Forgot password ?
              </button>
              <p>
                Don't have an account ?{" "}
                <button
                  onClick={() => setCurrentMode("register")}
                  className="text-blue-400 hover:text-blue-700 font-medium transition-colors hover:underline"
                >
                  Sign up
                </button>
              </p>
            </p>
          ) : (
            <p className="text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => setCurrentMode("login")}
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Sign in
              </button>
            </p>
          )}
        </div>
      </>
    );
  };

  const getTitle = () => {
    if (currentMode === "enterResetCode") return "Enter Reset Code";
    if (currentMode === "forgotPassword") return "Reset Password";
    return currentMode === "login" ? "Welcome Back" : "Create Account";
  };

  const getDescription = () => {
    if (currentMode === "enterResetCode")
      return "Enter the 6-digit code sent to your email.";
    if (currentMode === "forgotPassword")
      return "Enter your email to receive a reset code.";
    return currentMode === "login"
      ? "Sign in to access your dashboard"
      : "Join thousands of professionals";
  };

  const getIcon = () => {
    if (currentMode === "enterResetCode")
      return <Key className="w-8 h-8 text-white" />;
    if (currentMode === "forgotPassword")
      return <Mail className="w-8 h-8 text-white" />;
    return <User className="w-8 h-8 text-white" />;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            {getIcon()}
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {getTitle()}
          </h2>
          <p className="text-gray-600">{getDescription()}</p>
        </div>

        {renderForm()}
      </div>
    </div>
  );
};

export default AuthModal;
