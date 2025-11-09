import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Hand, Sparkles, Star, UserPlus, LogIn } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !email || !password || !confirmPassword) {
      toast.error('Mohon isi semua field! 🙏');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Password tidak cocok! ❌');
      return;
    }

    if (password.length < 4) {
      toast.error('Password minimal 4 karakter! 🔒');
      return;
    }

    setIsLoading(true);

    // Simulate registration process
    setTimeout(() => {
      // Get existing users or create new array
      const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      
      // Check if username already exists
      const existingUser = users.find((user: any) => user.username === username);
      if (existingUser) {
        toast.error('Username sudah terdaftar! 😅');
        setIsLoading(false);
        return;
      }

      // Add new user
      const newUser = {
        username,
        email,
        password,
        registeredAt: new Date().toISOString(),
      };
      users.push(newUser);
      localStorage.setItem('registeredUsers', JSON.stringify(users));

      // Auto login after registration
      const userData = {
        username: username,
        email: email,
        loginTime: new Date().toISOString(),
        isLoggedIn: true,
      };
      localStorage.setItem('userData', JSON.stringify(userData));
      
      toast.success(`Selamat datang, ${username}! 🎉 Akun berhasil dibuat!`);
      setIsLoading(false);
      
      // Redirect to belajar page
      navigate('/belajar');
    }, 1000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast.error('Mohon isi username dan password! 🙏');
      return;
    }

    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      // Get registered users
      const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const user = users.find((u: any) => u.username === username && u.password === password);

      if (user) {
        // Store user data in localStorage
        const userData = {
          username: user.username,
          email: user.email,
          loginTime: new Date().toISOString(),
          isLoggedIn: true,
        };
        
        localStorage.setItem('userData', JSON.stringify(userData));
        
        toast.success(`Selamat datang kembali, ${username}! 🎉`);
        setIsLoading(false);
        
        // Redirect to belajar page
        navigate('/belajar');
      } else {
        toast.error('Username atau password salah! ❌');
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 opacity-50">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          >
            <Star className="w-12 h-12 text-yellow-400" />
          </motion.div>
        </div>
        <div className="absolute bottom-10 right-10 opacity-50">
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          >
            <Sparkles className="w-12 h-12 text-purple-400" />
          </motion.div>
        </div>

        <Card className="p-8 bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 border-4 border-white shadow-2xl">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-lg mb-4"
            >
              <Hand className="w-10 h-10 text-white" aria-hidden="true" />
            </motion.div>
            <h1 className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Belajar Isyarat
            </h1>
            <p className="text-gray-700">
              Mulai petualangan belajar yang seru! 🚀
            </p>
          </div>

          {/* Tabs for Login/Register */}
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/50">
              <TabsTrigger 
                value="login" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Masuk
              </TabsTrigger>
              <TabsTrigger 
                value="register"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Daftar
              </TabsTrigger>
            </TabsList>

            {/* Login Form */}
            <TabsContent value="login">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="login-username" className="text-gray-800">
                      👤 Username
                    </Label>
                    <Input
                      id="login-username"
                      type="text"
                      placeholder="Masukkan username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="border-2 focus:ring-4 focus:ring-blue-300"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-gray-800">
                      🔒 Password
                    </Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="Masukkan password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-2 focus:ring-4 focus:ring-blue-300"
                      disabled={isLoading}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 hover:scale-105 transition-transform shadow-lg disabled:opacity-50"
                    disabled={isLoading}
                    aria-label="Masuk ke aplikasi"
                  >
                    {isLoading ? '⏳ Memproses...' : '🎯 Masuk Sekarang!'}
                  </Button>
                </form>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6 p-4 bg-blue-50 rounded-lg border-2 border-blue-200"
                >
                  <p className="text-gray-700 text-center">
                    💡 <span className="text-gray-800">Belum punya akun?</span> Klik tab "Daftar" di atas!
                  </p>
                </motion.div>
              </motion.div>
            </TabsContent>

            {/* Register Form */}
            <TabsContent value="register">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <form onSubmit={handleRegister} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="register-username" className="text-gray-800">
                      👤 Username
                    </Label>
                    <Input
                      id="register-username"
                      type="text"
                      placeholder="Pilih username unik"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="border-2 focus:ring-4 focus:ring-purple-300"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email" className="text-gray-800">
                      📧 Email
                    </Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="nama@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-2 focus:ring-4 focus:ring-purple-300"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password" className="text-gray-800">
                      🔒 Password
                    </Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="Minimal 4 karakter"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-2 focus:ring-4 focus:ring-purple-300"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-confirm-password" className="text-gray-800">
                      🔐 Konfirmasi Password
                    </Label>
                    <Input
                      id="register-confirm-password"
                      type="password"
                      placeholder="Ketik ulang password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="border-2 focus:ring-4 focus:ring-purple-300"
                      disabled={isLoading}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 hover:scale-105 transition-transform shadow-lg disabled:opacity-50"
                    disabled={isLoading}
                    aria-label="Daftar akun baru"
                  >
                    {isLoading ? '⏳ Memproses...' : '🎊 Daftar Sekarang!'}
                  </Button>
                </form>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6 p-4 bg-purple-50 rounded-lg border-2 border-purple-200"
                >
                  <p className="text-gray-700 text-center">
                    💡 <span className="text-gray-800">Sudah punya akun?</span> Klik tab "Masuk" di atas!
                  </p>
                </motion.div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Fun floating elements */}
        <div className="absolute top-1/4 right-20 opacity-30">
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <div className="text-4xl">🎨</div>
          </motion.div>
        </div>
        <div className="absolute bottom-1/4 left-20 opacity-30">
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }}
          >
            <div className="text-4xl">✨</div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
