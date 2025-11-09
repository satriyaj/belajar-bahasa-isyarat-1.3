import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Hand, LogOut, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [username, setUsername] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsed = JSON.parse(userData);
      setUsername(parsed.username || '');
    }
  }, []);

  const menuItems = [
    { path: '/belajar', label: 'Belajar' },
    { path: '/kuis', label: 'Kuis' },
    { path: '/perkembangan', label: 'Perkembangan' },
    { path: '/saran', label: 'Saran' },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    localStorage.removeItem('userData');
    toast.success('Berhasil keluar! Sampai jumpa! 👋');
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 shadow-lg sticky top-0 z-50" role="navigation" aria-label="Main navigation">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 hover:scale-105 transition-transform"
            aria-label="Belajar Isyarat - Halaman Utama"
          >
            <div className="bg-white rounded-full p-2">
              <Hand className="w-6 h-6 text-purple-600" aria-hidden="true" />
            </div>
            <span className="text-white">Belajar Isyarat</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`transition-all hover:scale-110 ${
                  location.pathname === item.path 
                    ? 'text-white bg-white/30 px-4 py-2 rounded-full' 
                    : 'text-white/90 hover:text-white px-4 py-2'
                }`}
                aria-current={location.pathname === item.path ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
            
            {/* User Info and Logout */}
            <div className="flex items-center gap-3 ml-4 pl-4 border-l-2 border-white/30">
              <div className="flex items-center gap-2 text-white/90">
                <User className="w-5 h-5" aria-hidden="true" />
                <span className="hidden lg:inline">{username}</span>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors text-white"
                aria-label="Keluar"
                title="Keluar"
              >
                <LogOut className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
            aria-label={isMenuOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-white" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6 text-white" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col gap-4 pt-4 pb-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      location.pathname === item.path
                        ? 'bg-white text-purple-600'
                        : 'text-white bg-white/20 hover:bg-white/30'
                    }`}
                    aria-current={location.pathname === item.path ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                ))}
                
                {/* Mobile User Info and Logout */}
                <div className="border-t-2 border-white/30 pt-4 mt-2">
                  <div className="flex items-center gap-2 text-white px-4 py-2 mb-2">
                    <User className="w-5 h-5" aria-hidden="true" />
                    <span>{username}</span>
                  </div>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors text-white"
                    aria-label="Keluar"
                  >
                    <LogOut className="w-5 h-5" aria-hidden="true" />
                    <span>Keluar</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
