import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import VerticalNav from './components/VerticalNav/VerticalNav';
import Hero from './components/HeroSection/Hero';
import Skill from './components/Skills/Skill';
import Project from './components/Projects/Projects';
import Testimonials from './components/Testimonials/Testimonials';
import Contact from './Pages/Contact/Contact';
import Footer from './components/Footer/Footer';
import ChatWidget from './components/ChatWidget/ChatWidget';
import Loading from './components/Loading/Loading';
import AdminLogin from './Pages/Admin/AdminLogin';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import { ThemeProvider } from './context/ThemeContext';
import { I18nProvider } from './context/I18nContext';

function App() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [logoutRedirect, setLogoutRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading for demo purposes
  // In a real app, this would be controlled by actual data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5 seconds

    return () => clearTimeout(timer);
  }, []);

  const PortfolioPage = () => (
    <div className="min-h-screen bg-bg-primary relative">
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <Navbar />
          <VerticalNav />
          <main className="pt-36 px-6 md:pt-20 lg:px-12 mx-auto max-w-7xl">
            <Hero />
            <Skill />
            <Project />
            <Testimonials />
            <Contact />
          </main>
          <Footer />
          <ChatWidget />
        </>
      )}
    </div>
  );

  const ProtectedAdminRoute = ({ children }) => {
    useEffect(() => {
      if (!isAdminAuthenticated && logoutRedirect) {
        setLogoutRedirect(false);
      }
    }, [isAdminAuthenticated, logoutRedirect]);

    return isAdminAuthenticated
      ? children
      : <Navigate to={logoutRedirect ? "/" : "/admin/login"} replace />;
  };

  return (
    <ThemeProvider>
      <I18nProvider>
        <Router>
          <Routes>
          {/* Portfolio Routes */}
          <Route path="/" element={<PortfolioPage />} />

          {/* Admin Routes */}
          <Route
            path="/admin/login"
            element={
              isAdminAuthenticated ? (
                <Navigate to="/admin/dashboard" replace />
              ) : (
                <AdminLogin onLogin={() => setIsAdminAuthenticated(true)} />
              )
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard onLogout={() => {
                  localStorage.removeItem('adminToken');
                  setLogoutRedirect(true);
                  setIsAdminAuthenticated(false);
                }} />
              </ProtectedAdminRoute>
            }
          />

          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </I18nProvider>
    </ThemeProvider>
  );
}

export default App;
