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
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 text-sm">
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
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pb-28 px-4 sm:px-6 lg:px-8 min-h-screen flex flex-row justify-center items-center bg-gradient-to-b via-slate-300">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-200 border border-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wide mb-3">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              New:First Community-Based Lead Qualification
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-relaxed">
              Exchange Data
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-300 mt-3">
                Close Deals Smarter
              </p>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
              Dalily AI is a smart platform helping Sales and Recruitment teams
              in the Middle East access real, verified contact data through a
              fair points-exchange system.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <button
              onClick={() => handleAuthClick("requestSignup")}
              className="bg-gradient-to-r from-[#0b07f0] to-[#0b07f0] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:scale-105 flex items-center space-x-2 shadow-md hover:shadow-lg transition-all"
            >
              <span>Start now to get free credits</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => handleAuthClick("login")}
              className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-gray-400 hover:bg-white transition-all duration-200"
            >
              Start exchanging for free
            </button>
          </div>
        </div>
      </section>

      {/* Problem / Solution Section */}
      <section className="py-28">
        <div className="container mx-auto px-6">
          <div className="flex flex-col justify-center items-center text-center mb-16">
            <h2 className="text-3xl font-bold mb-6 font-display">
              <strong className="p-2 rounded-l-lg bg-gradient-to-r from-red-300 text-red-600 mr-5">
                The Old Way
              </strong>{" "}
              vs.{" "}
              <strong className="p-2 rounded-r-lg bg-gradient-to-l from-blue-300 text-blue-600 ml-5">
                Dalily AI
              </strong>
            </h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Traditional databases are expensive, outdated, and lack MENA
              coverage.<br></br> Dalily AI introduces a fair, community-driven
              model.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center lg:px-20">
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-red-50/50 border border-red-100">
                <div className="bg-red-100 text-red-600 p-2 rounded-lg shrink-0">
                  <span className="w-5 h-5">❌</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">
                    Expensive Subscriptions
                  </h4>
                  <p className="text-sm text-slate-500 mt-1">
                    High monthly fees even if you don't use the data.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-blue-50/50 border border-blue-100">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg shrink-0">
                  <span className="w-5 h-5">✔️</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">
                    Points-Based Exchange
                  </h4>
                  <p className="text-sm text-slate-500 mt-1">
                    Pay with data or points. No forced subscriptions.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-red-50/50 border border-red-100">
                <div className="bg-red-100 text-red-600 p-2 rounded-lg shrink-0">
                  <span className="w-5 h-5">❌</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">
                    Outdated Global Data
                  </h4>
                  <p className="text-sm text-slate-500 mt-1">
                    Irrelevant to the local MENA market nuances.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-blue-50/50 border border-blue-100">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg shrink-0">
                  <span className="w-5 h-5">✔️</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">
                    Verified Local Data
                  </h4>
                  <p className="text-sm text-slate-500 mt-1">
                    Community-verified with strong Arabic support.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-100 to-slate-100 rounded-3xl transform rotate-3 scale-95 opacity-50"></div>
              <div className="relative bg-slate-900 rounded-2xl shadow-2xl p-6 md:p-8 text-white">
                <div className="flex items-center justify-between mb-8 border-b border-slate-700 pb-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    dashboard.dalily.ai
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-xs uppercase tracking-wider">
                        Total Points
                      </p>
                      <p className="text-3xl font-bold text-primary-400">
                        1,250
                      </p>
                    </div>
                    <div className="bg-primary-600 px-3 py-1 rounded text-xs font-bold">
                      +50 Today
                    </div>
                  </div>
                  <div className="h-px bg-slate-700 my-4"></div>
                  <div className="bg-slate-800 p-4 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center">
                        JD
                      </div>
                      <div>
                        <p className="font-bold text-sm">John Doe</p>
                        <p className="text-xs text-slate-400">CTO @ TechMena</p>
                      </div>
                    </div>
                    <button className="text-primary-400 text-xs font-bold hover:underline">
                      UNLOCKED
                    </button>
                  </div>
                  <div className="bg-slate-800 p-4 rounded-lg flex items-center justify-between opacity-50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center">
                        ?
                      </div>
                      <div>
                        <p className="font-bold text-sm">Hidden Profile</p>
                        <p className="text-xs text-slate-400">
                          Head of Sales @ DubaiCo
                        </p>
                      </div>
                    </div>
                    <button className="bg-primary-600 text-white px-3 py-1.5 rounded text-xs font-bold">
                      Unlock (20pts)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-28">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 font-display">
              Who Is Dalily AI For ?
            </h2>
            <p className="text-slate-500">
              Tailored tools for professionals who need accurate data fast.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bento-card bg-white p-10 rounded-3xl border border-purple-100 shadow-sm relative overflow-hidden group hover:border-purple-300 hover:translate-y-2 transition-all duration-300">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Users className="w-32 h-32 text-purple-600" />
              </div>
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 text-purple-600 rounded-xl mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-5">
                HR & Recruitment
              </h3>
              <p className="text-slate-500 mb-6">
                Find verified candidate contact details faster without relying
                on expensive global databases.
              </p>

              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-purple-500" />
                  Faster Sourcing
                </li>
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-purple-500" />
                  Local Talent Intelligence
                </li>
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-purple-500" />
                  Community Verification
                </li>
              </ul>
            </div>
            <div className="bento-card bg-white p-10 rounded-3xl border border-blue-100 shadow-sm relative overflow-hidden group hover:border-blue-300 hover:translate-y-2 transition-all duration-300">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Target className="w-32 h-32 text-blue-600" />
              </div>
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-xl mb-6">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-5">
                Sales & Business Dev
              </h3>
              <p className="text-slate-500 mb-6">
                Discover decision‑makers and accurate leads with less cost and
                higher response rates.
              </p>

              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-blue-500" />
                  Decision Makers Access
                </li>
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-blue-500" />
                  AI Lead Qualification
                </li>
                <li className="flex items-center gap-3 text-slate-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-blue-500" />
                  Lower Cost Per Lead (CPL)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-28">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-display text-slate-900">
              The Cycle of Success
            </h2>
            <p className="text-slate-500 mt-2">
              A transparent system for mutual benefit among community members.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center relative">
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-slate-200 via-blue-200 to-slate-200 -z-10"></div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-blue-100 hover:shadow-lg transition-all duration-500 hover:border-blue-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <UserPlus className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Add Data</h3>
              <p className="text-slate-500 text-sm">
                Safely contribute verified professional contact information to
                the platform.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-yellow-100 hover:shadow-lg transition-all duration-500 hover:border-yellow-300">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Coins className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Earn Points</h3>
              <p className="text-slate-500 text-sm">
                Receive instant points for every contribution reviewed and
                accepted.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-green-100 hover:shadow-lg transition-all duration-500 hover:border-green-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Unlock className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Unlock Opportunities</h3>
              <p className="text-slate-500 text-sm">
                Use your points to access the lead data you actually need.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="comparison" className="py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Dalily AI ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The smartest way to grow your professional network
            </p>
            <p className="text-lg text-gray-500 max-w-3xl mx-auto mt-2">
              Everything you need to find, manage, and connect with the right
              professionals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br via-blue-500 rounded-full flex items-center justify-center mb-6">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Earn Points
              </h3>
              <p className="text-gray-600">
                Add verified contacts and earn points. Build your network while
                helping others.
              </p>
            </div>

            <div className="bg-gray-50 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br via-purple-500 rounded-full flex items-center justify-center mb-6">
                <Unlock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Unlock Access
              </h3>
              <p className="text-gray-600">
                Spend points to unlock real professional data. Get direct
                contact information.
              </p>
            </div>

            <div className="bg-gray-50 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br via-orange-500 rounded-full flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Accurate Data
              </h3>
              <p className="text-gray-600">
                Community-validated contacts ensure high accuracy and up-to-date
                information.
              </p>
            </div>

            <div className="bg-gray-50 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br via-green-500 rounded-full flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Advanced Search
              </h3>
              <p className="text-gray-600">
                LinkedIn-style filters with AI-powered matching and boolean
                search operators
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-28 bg-blue-600">
        <div className="container mx-auto px-6 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display">
            Ready to turn your data into real opportunities?
          </h2>
          <p className="text-blue-100 mb-10 text-lg">
            Exchange Contacts, Unlock a World of Opportunities.
          </p>
          <button
            onClick={() => handleAuthClick("requestSignup")}
            className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-100 transition-transform hover:-translate-y-1 shadow-lg"
          >
            Start Now for Free – Add Your First Contact
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
              © 2024 dalily.ai All rights reserved.
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
