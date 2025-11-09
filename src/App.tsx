import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { Navbar } from './components/navbar';
import { Login } from './components/pages/login';
import { Belajar } from './components/pages/belajar';
import { Kuis } from './components/pages/kuis';
import { Perkembangan } from './components/pages/perkembangan';
import { Saran } from './components/pages/saran';
import { Toaster } from './components/ui/sonner';

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsed = JSON.parse(userData);
      setIsAuthenticated(parsed.isLoggedIn === true);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-700">Memuat...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      {!isLoginPage && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/belajar" replace />} />
          <Route
            path="/belajar"
            element={
              <ProtectedRoute>
                <Belajar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/kuis"
            element={
              <ProtectedRoute>
                <Kuis />
              </ProtectedRoute>
            }
          />
          <Route
            path="/perkembangan"
            element={
              <ProtectedRoute>
                <Perkembangan />
              </ProtectedRoute>
            }
          />
          <Route
            path="/saran"
            element={
              <ProtectedRoute>
                <Saran />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AnimatePresence>
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
