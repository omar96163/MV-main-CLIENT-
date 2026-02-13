import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  Zap,
  Shield,
  Mail,
  Phone,
  ArrowRight,
  Star,
  Unlock,
  Users,
  Target,
  TrendingUp,
  CheckCircle2,
  UserPlus,
  Coins,
} from "lucide-react";
import AuthModal from "../components/AuthModal";

const LandingPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "requestSignup">("login");
  const { user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleAuthClick = (mode: "login" | "requestSignup") => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleGoogleLogin = () => {
    window.location.href = "https://mv-main-server.vercel.app/auth/google";
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b-2 sticky top-0 z-50 bg-white/75 backdrop-blur-sm rounded-b-[50px] shadow-lg">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-5">
            <img src="/logo.png" alt="Logo" className="h-10 w-auto lg:mr-40" />
            <div className="hidden md:flex items-center gap-4">
              <a
                href="#solutions"
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-all duration-500 p-2 hover:bg-gradient-to-r
                hover:from-transparent hover:via-blue-100 hover:-translate-y-1"
              >
                Solutions
              </a>
              <a
                href="#how-it-works"
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-all duration-500 p-2 hover:bg-gradient-to-r
                hover:from-transparent hover:via-blue-100 hover:-translate-y-1"
              >
                How it Works ?
              </a>
              <a
                href="#comparison"
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-all duration-500 p-2 hover:bg-gradient-to-r
                hover:from-transparent hover:via-blue-100 hover:-translate-y-1"
              >
                Why Dalily ?
              </a>
            </div>
            {/* Desktop buttons - hidden on mobile */}
            <div className="hidden md:flex flex-row items-center space-x-2 text-sm">
              <button
                onClick={() => handleAuthClick("login")}
                className="text-gray-600 hover:bg-gray-200 px-4 py-2 rounded-lg font-medium shadow-md transition-all"
              >
                Sign In
              </button>
              <button
                onClick={() => handleAuthClick("requestSignup")}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
              >
                Get Started
              </button>
              <button
                onClick={handleGoogleLogin}
                className="group flex items-center flex-row-reverse w-[38px] hover:w-28 p-2 bg-white border rounded-full shadow-md overflow-hidden transition-all duration-500 ease-out"
              >
                <span>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                </span>
                <span className="whitespace-nowrap text-sm font-medium text-gray-700 opacity-0 -translate-x-6 group-hover:opacity-100 group-hover:-translate-x-2 transition-all duration-500 ease-out ">
                  Sign with
                </span>
              </button>
            </div>
            {/* Mobile hamburger menu */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>

              {/* Mobile menu dropdown with slide animation */}
              <div
                className={`absolute top-full right-0 left-0 mt-2 mx-4 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 ease-out z-50 ${
                  isMenuOpen
                    ? "opacity-100 translate-y-0 max-h-96"
                    : "opacity-0 -translate-y-4 max-h-0 pointer-events-none"
                }`}
              >
                <div className="flex flex-col p-4 space-y-3">
                  <button
                    onClick={() => {
                      handleAuthClick("login");
                      setIsMenuOpen(false);
                    }}
                    className="text-gray-700 hover:bg-gray-100 px-5 py-3 rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-200 text-center"
                  >
                    Sign In
                  </button>

                  <button
                    onClick={() => {
                      handleAuthClick("requestSignup");
                      setIsMenuOpen(false);
                    }}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    Get Started
                  </button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="px-2 bg-white text-gray-500">or</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      handleGoogleLogin();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center justify-center space-x-2 px-5 py-3 bg-white border-2 border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">
                      Continue with Google
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 min-h-screen flex flex-row justify-center items-center bg-gradient-to-b via-slate-300">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-blue-200 border border-blue-100 text-blue-700 text-[10px] sm:text-xs font-semibold uppercase tracking-wide mb-4 sm:mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              <span className="hidden sm:inline">
                New: First Community-Based Lead Qualification
              </span>
              <span className="sm:hidden">
                New: Community Lead Qualification
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight sm:leading-relaxed px-2">
              Exchange Data
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-300 mt-2 sm:mt-3">
                Close Deals Smarter
              </p>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-slate-500 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed px-4">
              Dalily AI is a smart platform helping Sales and Recruitment teams
              in the Middle East access real, verified contact data through a
              fair points-exchange system.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-6 px-4">
            <button
              onClick={() => handleAuthClick("requestSignup")}
              className="bg-gradient-to-r from-[#0b07f0] to-[#0b07f0] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:scale-105 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transition-all w-full sm:w-auto"
            >
              <span className="hidden sm:inline">
                Start now to get free credits
              </span>
              <span className="sm:hidden">Get Free Credits</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <button
              onClick={() => handleAuthClick("login")}
              className="border-2 border-gray-300 text-gray-700 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:border-gray-400 hover:bg-white transition-all duration-200 w-full sm:w-auto"
            >
              <span className="hidden sm:inline">
                Start exchanging for free
              </span>
              <span className="sm:hidden">Exchange for Free</span>
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 sm:py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-slate-900 px-4">
              The Cycle of Success
            </h2>
            <p className="text-slate-500 mt-2 sm:mt-3 text-sm sm:text-base px-4">
              A transparent system for mutual benefit among community members.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 text-center relative max-w-6xl mx-auto">
            {/* Connecting Line - Desktop Only */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-slate-200 via-blue-200 to-slate-200 -z-10"></div>

            {/* Card 1 */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-blue-100 hover:shadow-lg transition-all duration-500 hover:border-blue-300 hover:-translate-y-1">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <UserPlus className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Add Data</h3>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                Safely contribute verified professional contact information to
                the platform.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-yellow-100 hover:shadow-lg transition-all duration-500 hover:border-yellow-300 hover:-translate-y-1">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Coins className="w-7 h-7 sm:w-8 sm:h-8 text-yellow-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">Earn Points</h3>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                Receive instant points for every contribution reviewed and
                accepted.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-green-100 hover:shadow-lg transition-all duration-500 hover:border-green-300 hover:-translate-y-1 sm:col-span-2 md:col-span-1">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Unlock className="w-7 h-7 sm:w-8 sm:h-8 text-green-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2">
                Unlock Opportunities
              </h3>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                Use your points to access the lead data you actually need.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-16 sm:py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 px-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 sm:mb-4 font-display">
              Who Is Dalily AI For?
            </h2>
            <p className="text-slate-500 text-sm sm:text-base">
              Tailored tools for professionals who need accurate data fast.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {/* HR & Recruitment Card */}
            <div className="bento-card bg-white p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border border-purple-100 shadow-sm relative overflow-hidden group hover:border-purple-300 hover:-translate-y-2 transition-all duration-300">
              {/* Background Icon */}
              <div className="absolute top-0 right-0 p-4 sm:p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Users className="w-24 h-24 sm:w-32 sm:h-32 text-purple-600" />
              </div>

              {/* Icon Badge */}
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 text-purple-600 rounded-xl mb-4 sm:mb-6 relative z-10">
                <Users className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-5 relative z-10">
                HR & Recruitment
              </h3>

              {/* Description */}
              <p className="text-slate-500 mb-5 sm:mb-6 text-sm sm:text-base leading-relaxed relative z-10">
                Find verified candidate contact details faster without relying
                on expensive global databases.
              </p>

              {/* Features List */}
              <ul className="space-y-2 sm:space-y-3 relative z-10">
                <li className="flex items-center gap-2 sm:gap-3 text-slate-700 font-medium text-sm sm:text-base">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 flex-shrink-0" />
                  <span>Faster Sourcing</span>
                </li>
                <li className="flex items-center gap-2 sm:gap-3 text-slate-700 font-medium text-sm sm:text-base">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 flex-shrink-0" />
                  <span>Local Talent Intelligence</span>
                </li>
                <li className="flex items-center gap-2 sm:gap-3 text-slate-700 font-medium text-sm sm:text-base">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 flex-shrink-0" />
                  <span>Community Verification</span>
                </li>
              </ul>
            </div>

            {/* Sales & Business Dev Card */}
            <div className="bento-card bg-white p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border border-blue-100 shadow-sm relative overflow-hidden group hover:border-blue-300 hover:-translate-y-2 transition-all duration-300">
              {/* Background Icon */}
              <div className="absolute top-0 right-0 p-4 sm:p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Target className="w-24 h-24 sm:w-32 sm:h-32 text-blue-600" />
              </div>

              {/* Icon Badge */}
              <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 text-blue-600 rounded-xl mb-4 sm:mb-6 relative z-10">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-5 relative z-10">
                Sales & Business Dev
              </h3>

              {/* Description */}
              <p className="text-slate-500 mb-5 sm:mb-6 text-sm sm:text-base leading-relaxed relative z-10">
                Discover decision‑makers and accurate leads with less cost and
                higher response rates.
              </p>

              {/* Features List */}
              <ul className="space-y-2 sm:space-y-3 relative z-10">
                <li className="flex items-center gap-2 sm:gap-3 text-slate-700 font-medium text-sm sm:text-base">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />
                  <span>Decision Makers Access</span>
                </li>
                <li className="flex items-center gap-2 sm:gap-3 text-slate-700 font-medium text-sm sm:text-base">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />
                  <span>AI Lead Qualification</span>
                </li>
                <li className="flex items-center gap-2 sm:gap-3 text-slate-700 font-medium text-sm sm:text-base">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />
                  <span>Lower Cost Per Lead (CPL)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="comparison" className="py-16 sm:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
              Why Choose Dalily AI?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              The smartest way to grow your professional network
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-gray-500 max-w-3xl mx-auto mt-2 px-4">
              Everything you need to find, manage, and connect with the right
              professionals
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Card 1 - Earn Points */}
            <div className="bg-gray-50 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                <Star className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                Earn Points
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Add verified contacts and earn points. Build your network while
                helping others.
              </p>
            </div>

            {/* Card 2 - Unlock Access */}
            <div className="bg-gray-50 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                <Unlock className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                Unlock Access
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Spend points to unlock real professional data. Get direct
                contact information.
              </p>
            </div>

            {/* Card 3 - Accurate Data */}
            <div className="bg-gray-50 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                Accurate Data
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Community-validated contacts ensure high accuracy and up-to-date
                information.
              </p>
            </div>

            {/* Card 4 - Advanced Search */}
            <div className="bg-gray-50 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 sm:col-span-2 lg:col-span-1">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                <Zap className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                Advanced Search
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                LinkedIn-style filters with AI-powered matching and boolean
                search operators
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem / Solution Section */}
      <section className="py-16 sm:py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="flex flex-col justify-center items-center text-center mb-12 sm:mb-16">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 font-display px-4 flex flex-col sm:flex-row items-center justify-center">
              <strong className="inline-block p-2 rounded-lg bg-gradient-to-r from-red-300 text-red-600 mr-2 sm:mr-5">
                The Old Way
              </strong>{" "}
              <span className="inline-block">vs.</span>{" "}
              <strong className="inline-block p-2 rounded-lg bg-gradient-to-l from-blue-300 text-blue-600 ml-2 sm:ml-5">
                Dalily AI
              </strong>
            </h2>
            <p className="text-slate-600 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base px-4 max-w-3xl">
              Traditional databases are expensive, outdated, and lack MENA
              coverage.
              <span className="block mt-1">
                Dalily AI introduces a fair, community-driven model.
              </span>
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center lg:px-20">
            {/* Comparison List */}
            <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
              {/* Item 1 - Red */}
              <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-red-50/50 border border-red-100">
                <div className="bg-red-100 text-red-600 p-2 rounded-lg shrink-0">
                  <span className="text-base sm:text-lg">❌</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                    Expensive Subscriptions
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    High monthly fees even if you don't use the data.
                  </p>
                </div>
              </div>

              {/* Item 2 - Blue */}
              <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-blue-50/50 border border-blue-100">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg shrink-0">
                  <span className="text-base sm:text-lg">✔️</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                    Points-Based Exchange
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Pay with data or points. No forced subscriptions.
                  </p>
                </div>
              </div>

              {/* Item 3 - Red */}
              <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-red-50/50 border border-red-100">
                <div className="bg-red-100 text-red-600 p-2 rounded-lg shrink-0">
                  <span className="text-base sm:text-lg">❌</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                    Outdated Global Data
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Irrelevant to the local MENA market nuances.
                  </p>
                </div>
              </div>

              {/* Item 4 - Blue */}
              <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-blue-50/50 border border-blue-100">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg shrink-0">
                  <span className="text-base sm:text-lg">✔️</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                    Verified Local Data
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Community-verified with strong Arabic support.
                  </p>
                </div>
              </div>
            </div>

            {/* Dashboard Mockup */}
            <div className="relative order-1 lg:order-2">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 to-slate-100 rounded-2xl sm:rounded-3xl transform rotate-3 scale-95 opacity-50"></div>
              <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 border border-gray-200">
                {/* Header */}
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                      Dashboard
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                      Welcome back DalilyAi! Here's your overview.
                    </p>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg sm:rounded-xl p-3 sm:p-4 text-white">
                    <p className="text-xs sm:text-sm opacity-90">
                      Available Points
                    </p>
                    <p className="text-xl sm:text-2xl font-bold mt-1">1,250</p>
                  </div>
                  <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg sm:rounded-xl p-3 sm:p-4 text-white">
                    <p className="text-xs sm:text-sm opacity-90">
                      Total Contacts
                    </p>
                    <p className="text-xl sm:text-2xl font-bold mt-1">87</p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg sm:rounded-xl p-3 sm:p-4 text-white">
                    <p className="text-xs sm:text-sm opacity-90">
                      Unlocked Profiles
                    </p>
                    <p className="text-xl sm:text-2xl font-bold mt-1">42</p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 sm:px-4 rounded-lg text-xs sm:text-sm font-medium transition-colors">
                    Upload Profile
                  </button>
                  <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 sm:px-4 rounded-lg text-xs sm:text-sm font-medium transition-colors">
                    View All Contacts
                  </button>
                </div>

                {/* Recent Activity */}
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                    Recent Activity
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-purple-100 rounded-lg">
                      <div className="w-2 h-2 bg-purple-500 rounded-full shrink-0"></div>
                      <span className="text-xs sm:text-sm text-gray-700 flex-1 truncate">
                        Updated profile: Michael Chen
                      </span>
                      <span className="text-[10px] sm:text-xs text-gray-500 shrink-0">
                        1h ago
                      </span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-green-100 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full shrink-0"></div>
                      <span className="text-xs sm:text-sm text-gray-700 flex-1 truncate">
                        Uploaded profile: Sarah Johnson
                      </span>
                      <span className="text-[10px] sm:text-xs text-gray-500 shrink-0">
                        2h ago
                      </span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-blue-100 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full shrink-0"></div>
                      <span className="text-xs sm:text-sm text-gray-700 flex-1 truncate">
                        Unlocked profile: Michael Chen
                      </span>
                      <span className="text-[10px] sm:text-xs text-gray-500 shrink-0">
                        1d ago
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-28 bg-blue-600">
        <div className="container mx-auto px-4 sm:px-6 text-center text-white">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 font-display px-4 leading-tight">
            Ready to turn your data into real opportunities?
          </h2>
          <p className="text-blue-100 mb-8 sm:mb-10 text-base sm:text-lg px-4 max-w-2xl mx-auto">
            Exchange Contacts, Unlock a World of Opportunities.
          </p>
          <button
            onClick={() => handleAuthClick("requestSignup")}
            className="bg-white text-blue-700 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-slate-100 transition-all hover:-translate-y-1 shadow-lg hover:shadow-xl w-full sm:w-auto max-w-md mx-auto"
          >
            <span className="hidden sm:inline">
              Start Now for Free – Add Your First Contact
            </span>
            <span className="sm:hidden">Start Now for Free</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-28 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Logo and Description */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
              </div>
              <p className="text-gray-400 leading-relaxed">
                The most advanced B2B contact search platform with AI-powered
                matching and collaborative data sharing.
              </p>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">Email Us</p>
                    <a
                      href="mailto:support@contactpro.com"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      info@talentnavigator.net
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">Call Us</p>
                    <a
                      href="tel:+1-555-0123"
                      className="text-green-400 hover:text-green-300 transition-colors"
                    >
                      +201030252979
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <div className="space-y-3">
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </a>
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  Help Center
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Border */}
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2026 dalily.ai All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal mode={authMode} onClose={() => setShowAuthModal(false)} />
      )}
    </div>
  );
};

export default LandingPage;
