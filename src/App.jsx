import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import FindParkingPage from './pages/FindParkingPage';
import AssistancePage from './pages/AssistancePage';
import HostPage from './pages/HostPage';
import AuthPage from './pages/AuthPage';
import AuthModal from './components/AuthModal';
import ListParkingModal from './components/ListParkingModal';
import AssistanceModal from './components/AssistanceModal';
import Toast from './components/Toast';
import { apiGetMe, apiLogout } from './services/api';

function AppContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState('login');
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [isAssistanceModalOpen, setIsAssistanceModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Restore authenticated session on mount
  useEffect(() => {
    async function checkAuth() {
      const user = await apiGetMe();
      if (user) {
        setCurrentUser(user);
      }
    }
    checkAuth();
  }, []);

  const showToast = (title, message) => {
    setToast({ title, message });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const handleOpenAuth = (mode = 'login') => {
    setAuthInitialMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleSignOut = () => {
    apiLogout();
    setCurrentUser(null);
    showToast('Signed Out', 'You have been signed out successfully.');
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setIsAuthModalOpen(false);
    showToast('Signed In', `Welcome, ${user.name}!`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
      {/* 1. Navigation Bar */}
      <Navbar
        onOpenAuth={handleOpenAuth}
        onOpenListParking={() => setIsListModalOpen(true)}
        currentUser={currentUser}
        onSignOut={handleSignOut}
      />

      {/* Main Routed Content */}
      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onOpenListParking={() => setIsListModalOpen(true)}
              />
            }
          />
          <Route path="/find-parking" element={<FindParkingPage />} />
          <Route path="/vehicle-assistance" element={<AssistancePage />} />
          <Route path="/list-parking" element={<HostPage onOpenAuth={handleOpenAuth} />} />
          <Route path="/host" element={<HostPage onOpenAuth={handleOpenAuth} />} />
          <Route
            path="/login"
            element={
              <AuthPage
                defaultMode="login"
                onLoginSuccess={handleLoginSuccess}
              />
            }
          />
          <Route
            path="/register"
            element={
              <AuthPage
                defaultMode="register"
                onLoginSuccess={handleLoginSuccess}
              />
            }
          />
          <Route
            path="*"
            element={
              <HomePage
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onOpenListParking={() => setIsListModalOpen(true)}
              />
            }
          />
        </Routes>
      </main>

      {/* 10. Footer */}
      <Footer
        onOpenAuth={handleOpenAuth}
        onOpenListParking={() => setIsListModalOpen(true)}
        onRequestAssistance={() => setIsAssistanceModalOpen(true)}
      />

      {/* Global Modals for Navbar & Footer access */}
      <AuthModal
        isOpen={isAuthModalOpen}
        initialMode={authInitialMode}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <ListParkingModal
        isOpen={isListModalOpen}
        onClose={() => setIsListModalOpen(false)}
      />

      <AssistanceModal
        isOpen={isAssistanceModalOpen}
        onClose={() => setIsAssistanceModalOpen(false)}
      />

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
