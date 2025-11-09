import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card } from '../ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar } from 'recharts';
import { Trophy, Calendar, TrendingUp, BookOpen, Hash, HandHeart, MessageSquare, Award, Star } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface QuizResult {
  date: string;
  score: number;
  total: number;
}

const modules = [
  {
    id: 'huruf',
    title: 'Belajar Huruf',
    icon: BookOpen,
    color: 'from-pink-400 to-rose-500',
    bgColor: 'bg-gradient-to-br from-pink-100 to-rose-100',
    total: 26,
  },
  {
    id: 'angka',
    title: 'Belajar Angka',
    icon: Hash,
    color: 'from-blue-400 to-cyan-500',
    bgColor: 'bg-gradient-to-br from-blue-100 to-cyan-100',
    total: 10,
  },
  {
    id: 'sapaan',
    title: 'Belajar Sapaan',
    icon: HandHeart,
    color: 'from-purple-400 to-indigo-500',
    bgColor: 'bg-gradient-to-br from-purple-100 to-indigo-100',
    total: 5,
  },
  {
    id: 'kata-sehari',
    title: 'Belajar Kata Sehari-hari',
    icon: MessageSquare,
    color: 'from-orange-400 to-yellow-500',
    bgColor: 'bg-gradient-to-br from-orange-100 to-yellow-100',
    total: 10,
  },
];

export function Perkembangan() {
  const [quizHistory, setQuizHistory] = useState<QuizResult[]>([]);
  const [learningStats, setLearningStats] = useState<Record<string, number>>({});

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('quizHistory') || '[]');
    setQuizHistory(history);

    // Get learning statistics
    const completedItems = JSON.parse(localStorage.getItem('completedItems') || '{}');
    const stats: Record<string, number> = {};
    
    modules.forEach(module => {
      const completed = completedItems[module.id];
      stats[module.id] = completed ? completed.length : 0;
    });
    
    setLearningStats(stats);
  }, []);

  const chartData = quizHistory.map((result, index) => ({
    quiz: `Kuis ${index + 1}`,
    skor: result.score,
    maksimal: result.total,
    persentase: ((result.score / result.total) * 100).toFixed(0),
  }));

  const averageScore = quizHistory.length > 0
    ? (quizHistory.reduce((sum, result) => sum + (result.score / result.total) * 100, 0) / quizHistory.length).toFixed(1)
    : 0;

  const totalQuizzes = quizHistory.length;

  // Calculate total learning items completed
  const totalItemsCompleted = Object.values(learningStats).reduce((sum, count) => sum + count, 0);
  const totalItemsAvailable = modules.reduce((sum, module) => sum + module.total, 0);
  const learningPercentage = totalItemsAvailable > 0 
    ? ((totalItemsCompleted / totalItemsAvailable) * 100).toFixed(0)
    : 0;

  // Prepare data for learning chart
  const learningChartData = modules.map(module => ({
    name: module.title.replace('Belajar ', ''),
    selesai: learningStats[module.id] || 0,
    total: module.total,
    persentase: ((learningStats[module.id] || 0) / module.total * 100).toFixed(0),
  }));

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="container mx-auto px-4 py-8"
    >
      <header className="mb-8 text-center">
        <h1 className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          📊 Perkembangan Belajar 📊
        </h1>
        <p className="text-gray-700">Lihat statistik dan riwayat belajar & kuis Anda! 🌟</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Card className="p-6 bg-gradient-to-br from-pink-100 to-rose-100 border-2 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-pink-400 to-rose-500 rounded-xl shadow-md">
                <Star className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              <div>
                <p className="text-gray-700">Item Dipelajari</p>
                <p className="text-gray-800">{totalItemsCompleted} / {totalItemsAvailable}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Card className="p-6 bg-gradient-to-br from-blue-100 to-cyan-100 border-2 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl shadow-md">
                <Award className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              <div>
                <p className="text-gray-700">Progress Belajar</p>
                <p className="text-gray-800">{learningPercentage}%</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Card className="p-6 bg-gradient-to-br from-green-100 to-emerald-100 border-2 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl shadow-md">
                <Trophy className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              <div>
                <p className="text-gray-700">Total Kuis</p>
                <p className="text-gray-800">{totalQuizzes}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Card className="p-6 bg-gradient-to-br from-purple-100 to-pink-100 border-2 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl shadow-md">
                <TrendingUp className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              <div>
                <p className="text-gray-700">Rata-rata Skor Kuis</p>
                <p className="text-gray-800">{averageScore}%</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      <Tabs defaultValue="belajar" className="mb-8">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="belajar" className="text-base">📚 Statistik Belajar</TabsTrigger>
          <TabsTrigger value="kuis" className="text-base">🏆 Statistik Kuis</TabsTrigger>
        </TabsList>

        <TabsContent value="belajar">
          {/* Learning Statistics */}
          <Card className="p-6 mb-8 bg-gradient-to-br from-pink-50 to-purple-50 border-2 shadow-lg">
            <h2 className="text-gray-800 mb-6">📊 Progress Belajar Per Modul</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={learningChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-3 rounded-lg shadow-lg border">
                          <p className="text-gray-800 mb-1">{payload[0].payload.name}</p>
                          <p className="text-purple-600">
                            Selesai: {payload[0].payload.selesai} / {payload[0].payload.total}
                          </p>
                          <p className="text-gray-600">Progress: {payload[0].payload.persentase}%</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
                <Bar dataKey="selesai" fill="#a855f7" name="Item Selesai" />
                <Bar dataKey="total" fill="#e9d5ff" name="Total Item" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Module Details */}
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 shadow-lg">
            <h2 className="text-gray-800 mb-6">📖 Detail Per Modul</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {modules.map((module, index) => {
                const Icon = module.icon;
                const completed = learningStats[module.id] || 0;
                const percentage = ((completed / module.total) * 100).toFixed(0);

                return (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className={`p-4 ${module.bgColor} border-2 shadow-md`}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${module.color}`}>
                          <Icon className="w-5 h-5 text-white" aria-hidden="true" />
                        </div>
                        <h3 className="text-gray-800">{module.title}</h3>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-gray-700">
                          <span>Progress:</span>
                          <span className="font-bold">{completed} / {module.total}</span>
                        </div>
                        <div className="w-full bg-white rounded-full h-3 shadow-inner">
                          <div
                            className={`h-3 rounded-full bg-gradient-to-r ${module.color} transition-all duration-500`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <p className="text-right text-gray-600">{percentage}%</p>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="kuis">
          {quizHistory.length > 0 ? (
            <>
              <Card className="p-6 mb-8 bg-gradient-to-br from-yellow-50 to-orange-50 border-2 shadow-lg">
                <h2 className="text-gray-800 mb-6">📈 Grafik Perkembangan Skor Kuis</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quiz" />
                <YAxis domain={[0, 5]} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-3 rounded-lg shadow-lg border">
                          <p className="text-gray-800">{payload[0].payload.quiz}</p>
                          <p className="text-blue-600">
                            Skor: {payload[0].payload.skor} / {payload[0].payload.maksimal}
                          </p>
                          <p className="text-gray-600">Persentase: {payload[0].payload.persentase}%</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="skor"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="Skor"
                  dot={{ fill: '#3b82f6', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 shadow-lg">
            <h2 className="text-gray-800 mb-6">📝 Riwayat Kuis</h2>
            <div className="space-y-4">
              {quizHistory.slice().reverse().map((result, index) => {
                const percentage = ((result.score / result.total) * 100).toFixed(0);
                const actualIndex = quizHistory.length - index;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-white border-2 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${
                        parseInt(percentage) >= 80
                          ? 'bg-gradient-to-br from-green-400 to-emerald-500'
                          : parseInt(percentage) >= 60
                          ? 'bg-gradient-to-br from-blue-400 to-cyan-500'
                          : 'bg-gradient-to-br from-orange-400 to-yellow-500'
                      }`}>
                        <Trophy className="w-5 h-5 text-white" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-gray-800">🎯 Kuis #{actualIndex}</p>
                        <p className="text-gray-600">📅 {formatDate(result.date)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-800">
                        {result.score} / {result.total}
                      </p>
                      <p
                        className={`px-3 py-1 rounded-full inline-block ${
                          parseInt(percentage) >= 80
                            ? 'bg-green-100 text-green-600'
                            : parseInt(percentage) >= 60
                            ? 'bg-blue-100 text-blue-600'
                            : 'bg-orange-100 text-orange-600'
                        }`}
                      >
                        {percentage}%
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </>
      ) : (
        <Card className="p-12 text-center bg-gradient-to-br from-gray-50 to-gray-100 border-2">
          <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" aria-hidden="true" />
          <h2 className="text-gray-800 mb-2">Belum Ada Riwayat Kuis</h2>
          <p className="text-gray-600 mb-6">
            Mulai mengerjakan kuis untuk melihat perkembangan belajar Anda 🎯
          </p>
          <a
            href="/kuis"
            className="inline-block px-6 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:scale-105 transition-transform shadow-lg"
          >
            🚀 Mulai Kuis
          </a>
        </Card>
      )}
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
