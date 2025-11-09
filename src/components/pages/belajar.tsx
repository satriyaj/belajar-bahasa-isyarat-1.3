import { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from '../ui/card';
import { Progress } from '../ui/progress';
import { BookOpen, Hash, HandHeart, MessageSquare, ChevronRight, CheckCircle, Image as ImageIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { getImageForItem } from '../../data/learning-images';
import { ImageWithFallback } from '../figma/ImageWithFallback';

const modules = [
  {
    id: 'huruf',
    title: 'Belajar Huruf',
    description: 'Pelajari isyarat untuk huruf A-Z',
    icon: BookOpen,
    color: 'from-pink-400 to-rose-500',
    bgColor: 'bg-gradient-to-br from-pink-100 to-rose-100',
    items: Array.from({ length: 26 }, (_, i) => ({
      id: String.fromCharCode(65 + i),
      name: `Huruf ${String.fromCharCode(65 + i)}`,
      letter: String.fromCharCode(65 + i),
    })),
  },
  {
    id: 'angka',
    title: 'Belajar Angka',
    description: 'Pelajari isyarat untuk angka 1-10',
    icon: Hash,
    color: 'from-blue-400 to-cyan-500',
    bgColor: 'bg-gradient-to-br from-blue-100 to-cyan-100',
    items: Array.from({ length: 10 }, (_, i) => ({
      id: `${i + 1}`,
      name: `Angka ${i + 1}`,
      number: i + 1,
    })),
  },
  {
    id: 'sapaan',
    title: 'Belajar Sapaan',
    description: 'Pelajari 5 gerakan sapaan umum',
    icon: HandHeart,
    color: 'from-purple-400 to-indigo-500',
    bgColor: 'bg-gradient-to-br from-purple-100 to-indigo-100',
    items: [
      { id: 'halo', name: 'Halo', word: 'Halo' },
      { id: 'selamat-pagi', name: 'Selamat Pagi', word: 'Selamat Pagi' },
      { id: 'terima-kasih', name: 'Terima Kasih', word: 'Terima Kasih' },
      { id: 'permisi', name: 'Permisi', word: 'Permisi' },
      { id: 'sampai-jumpa', name: 'Sampai Jumpa', word: 'Sampai Jumpa' },
    ],
  },
  {
    id: 'kata-sehari',
    title: 'Belajar Kata Sehari-hari',
    description: 'Pelajari 10 kata yang sering digunakan',
    icon: MessageSquare,
    color: 'from-orange-400 to-yellow-500',
    bgColor: 'bg-gradient-to-br from-orange-100 to-yellow-100',
    items: [
      { id: 'makan', name: 'Makan', word: 'Makan' },
      { id: 'minum', name: 'Minum', word: 'Minum' },
      { id: 'rumah', name: 'Rumah', word: 'Rumah' },
      { id: 'sekolah', name: 'Sekolah', word: 'Sekolah' },
      { id: 'teman', name: 'Teman', word: 'Teman' },
      { id: 'keluarga', name: 'Keluarga', word: 'Keluarga' },
      { id: 'belajar', name: 'Belajar', word: 'Belajar' },
      { id: 'bermain', name: 'Bermain', word: 'Bermain' },
      { id: 'tidur', name: 'Tidur', word: 'Tidur' },
      { id: 'bangun', name: 'Bangun', word: 'Bangun' },
    ],
  },
];

export function Belajar() {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [currentLearningIndex, setCurrentLearningIndex] = useState<number | null>(null);
  const [completedItems, setCompletedItems] = useState<Record<string, Set<string>>>(() => {
    const saved = localStorage.getItem('completedItems');
    if (saved) {
      const parsed = JSON.parse(saved);
      return Object.fromEntries(
        Object.entries(parsed).map(([key, value]) => [key, new Set(value as string[])])
      );
    }
    return {};
  });

  const saveProgress = (moduleId: string, items: Set<string>) => {
    const newCompleted = { ...completedItems, [moduleId]: items };
    setCompletedItems(newCompleted);
    
    const toSave = Object.fromEntries(
      Object.entries(newCompleted).map(([key, value]) => [key, Array.from(value)])
    );
    localStorage.setItem('completedItems', JSON.stringify(toSave));
  };

  const toggleItemComplete = (moduleId: string, itemId: string) => {
    const moduleItems = completedItems[moduleId] || new Set();
    const newItems = new Set(moduleItems);
    
    if (newItems.has(itemId)) {
      newItems.delete(itemId);
    } else {
      newItems.add(itemId);
    }
    
    saveProgress(moduleId, newItems);
  };

  const getModuleProgress = (moduleId: string) => {
    const module = modules.find((m) => m.id === moduleId);
    if (!module) return 0;
    
    const completed = completedItems[moduleId]?.size || 0;
    return (completed / module.items.length) * 100;
  };

  const selectedModuleData = modules.find((m) => m.id === selectedModule);

  const handleNextItem = () => {
    if (currentLearningIndex !== null && selectedModuleData) {
      // Mark current item as completed
      const currentItem = selectedModuleData.items[currentLearningIndex];
      const moduleItems = completedItems[selectedModule!] || new Set();
      const newItems = new Set(moduleItems);
      newItems.add(currentItem.id);
      saveProgress(selectedModule!, newItems);

      // Move to next item
      if (currentLearningIndex < selectedModuleData.items.length - 1) {
        setCurrentLearningIndex(currentLearningIndex + 1);
      } else {
        // If last item, go back to grid view
        setCurrentLearningIndex(null);
      }
    }
  };

  const handlePreviousItem = () => {
    if (currentLearningIndex !== null && currentLearningIndex > 0) {
      setCurrentLearningIndex(currentLearningIndex - 1);
    }
  };

  const handleItemClick = (index: number) => {
    setCurrentLearningIndex(index);
  };

  const handleBackFromLearning = () => {
    setCurrentLearningIndex(null);
  };

  const handleBackToModules = () => {
    setSelectedModule(null);
    setCurrentLearningIndex(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="container mx-auto px-4 py-8"
    >
      {!selectedModule ? (
        <>
          <header className="mb-8 text-center">
            <h1 className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">✨ Halaman Belajar ✨</h1>
            <p className="text-gray-700">Pilih modul pembelajaran untuk memulai petualangan!</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {modules.map((module) => {
              const Icon = module.icon;
              const progress = getModuleProgress(module.id);
              
              return (
                <motion.div
                  key={module.id}
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card
                    className={`p-6 cursor-pointer hover:shadow-2xl transition-all h-full border-4 border-transparent hover:border-white ${module.bgColor}`}
                    onClick={() => setSelectedModule(module.id)}
                    role="button"
                    tabIndex={0}
                    aria-label={`${module.title}: ${module.description}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedModule(module.id);
                      }
                    }}
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${module.color} shadow-lg`}>
                          <Icon className="w-8 h-8 text-white" aria-hidden="true" />
                        </div>
                        <ChevronRight className="w-6 h-6 text-gray-600" aria-hidden="true" />
                      </div>
                      <h2 className="mb-2 text-gray-800">{module.title}</h2>
                      <p className="text-gray-700 mb-4 flex-grow">{module.description}</p>
                      <div className="space-y-2">
                        <Progress value={progress} aria-label={`Progress: ${Math.round(progress)}%`} className="h-3" />
                        <p className="text-gray-600">
                          🎯 {completedItems[module.id]?.size || 0} / {module.items.length} selesai
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </>
      ) : currentLearningIndex !== null && selectedModuleData ? (
        // Learning Mode - Display one item at a time
        <motion.div
          key={currentLearningIndex}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="max-w-2xl mx-auto"
        >
          <Button
            onClick={handleBackFromLearning}
            variant="outline"
            className="mb-6 border-2 hover:scale-105 transition-transform"
            aria-label="Kembali ke daftar item"
          >
            ← Kembali ke Daftar
          </Button>

          <Card className={`p-12 text-center border-4 shadow-2xl ${selectedModuleData.bgColor}`}>
            <div className="mb-8">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${selectedModuleData.color} text-white shadow-lg mb-4`}
              >
                <span>
                  {currentLearningIndex + 1} / {selectedModuleData.items.length}
                </span>
              </motion.div>
            </div>

            <motion.div
              className="mb-8"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {(() => {
                const currentItem = selectedModuleData.items[currentLearningIndex];
                const imagePath = getImageForItem(selectedModule!, currentItem.id);
                
                return (
                  <>
                    <div className="flex flex-col items-center justify-center mb-6">
                      {imagePath ? (
                        // Tampilkan gambar jika tersedia
                        <motion.div
                          initial={{ scale: 0, rotate: -10 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 200 }}
                          className="mb-4"
                        >
                          <div className="relative p-4 bg-white rounded-2xl shadow-2xl border-4 border-white">
                            <ImageWithFallback
                              src={imagePath}
                              alt={`Bahasa isyarat untuk ${currentItem.name}`}
                              className="w-64 h-64 sm:w-80 sm:h-80 object-contain rounded-xl"
                            />
                            <div className={`absolute -top-3 -right-3 px-4 py-2 rounded-full bg-gradient-to-r ${selectedModuleData.color} text-white shadow-lg`}>
                              <span className="text-xl">
                                {'letter' in currentItem && currentItem.letter}
                                {'number' in currentItem && currentItem.number}
                                {'word' in currentItem && '✋'}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        // Fallback jika tidak ada gambar
                        <div className="mb-4">
                          {'letter' in currentItem && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 200 }}
                              className="relative"
                            >
                              <div className={`bg-gradient-to-br ${selectedModuleData.color} bg-clip-text text-transparent text-[160px] leading-none`}>
                                {currentItem.letter}
                              </div>
                              <div className="mt-4 p-3 bg-yellow-50 border-2 border-yellow-200 rounded-lg flex items-center gap-2 justify-center">
                                <ImageIcon className="w-4 h-4 text-yellow-600" />
                                <p className="text-sm text-yellow-700">Gambar belum tersedia</p>
                              </div>
                            </motion.div>
                          )}
                          {'number' in currentItem && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 200 }}
                              className="relative"
                            >
                              <div className={`bg-gradient-to-br ${selectedModuleData.color} bg-clip-text text-transparent text-[160px] leading-none`}>
                                {currentItem.number}
                              </div>
                              <div className="mt-4 p-3 bg-yellow-50 border-2 border-yellow-200 rounded-lg flex items-center gap-2 justify-center">
                                <ImageIcon className="w-4 h-4 text-yellow-600" />
                                <p className="text-sm text-yellow-700">Gambar belum tersedia</p>
                              </div>
                            </motion.div>
                          )}
                          {'word' in currentItem && (
                            <motion.div
                              animate={{ rotate: [0, 10, -10, 0] }}
                              transition={{ repeat: Infinity, duration: 3 }}
                            >
                              <HandHeart className={`w-32 h-32 mx-auto text-purple-600`} aria-hidden="true" />
                              <div className="mt-4 p-3 bg-yellow-50 border-2 border-yellow-200 rounded-lg flex items-center gap-2 justify-center">
                                <ImageIcon className="w-4 h-4 text-yellow-600" />
                                <p className="text-sm text-yellow-700">Gambar belum tersedia</p>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      )}
                    </div>
                    <h2 className="text-gray-800 mb-2">
                      ⭐ {currentItem.name} ⭐
                    </h2>
                    <p className="text-gray-700">
                      Pelajari gerakan isyarat untuk{' '}
                      {'letter' in currentItem && 'huruf'}
                      {'number' in currentItem && 'angka'}
                      {'word' in currentItem && 'kata'}{' '}
                      ini dengan baik ya! 🎉
                    </p>
                  </>
                );
              })()}
            </motion.div>

            <div className="flex gap-4 justify-center">
              <Button
                onClick={handlePreviousItem}
                variant="outline"
                disabled={currentLearningIndex === 0}
                aria-label="Item sebelumnya"
                className="border-2 hover:scale-110 transition-transform disabled:opacity-50"
              >
                ⬅️ Sebelumnya
              </Button>
              <Button
                onClick={handleNextItem}
                className={`bg-gradient-to-r ${selectedModuleData.color} text-white border-0 hover:scale-110 transition-transform shadow-lg`}
                aria-label={
                  currentLearningIndex === selectedModuleData.items.length - 1
                    ? 'Selesai'
                    : 'Selanjutnya'
                }
              >
                {currentLearningIndex === selectedModuleData.items.length - 1
                  ? '🎊 Selesai'
                  : 'Selanjutnya ➡️'}
              </Button>
            </div>
          </Card>

          <div className="mt-6">
            <Progress
              value={((currentLearningIndex + 1) / selectedModuleData.items.length) * 100}
              aria-label={`Progress pembelajaran: ${Math.round(
                ((currentLearningIndex + 1) / selectedModuleData.items.length) * 100
              )}%`}
              className="h-4 shadow-md"
            />
            <p className="text-center mt-2 text-gray-700">
              🚀 Kamu sudah belajar {currentLearningIndex + 1} dari {selectedModuleData.items.length} item!
            </p>
          </div>
        </motion.div>
      ) : (
        // Grid View - Display all items
        <div>
          <Button
            onClick={handleBackToModules}
            variant="outline"
            className="mb-6 border-2 hover:scale-105 transition-transform"
            aria-label="Kembali ke daftar modul"
          >
            ← Kembali
          </Button>

          {selectedModuleData && (
            <>
              <header className="mb-6 text-center">
                <h1 className={`bg-gradient-to-r ${selectedModuleData.color} bg-clip-text text-transparent mb-2`}>
                  {selectedModuleData.title}
                </h1>
                <p className="text-gray-700">{selectedModuleData.description}</p>
                <div className="mt-4 max-w-md mx-auto">
                  <Progress 
                    value={getModuleProgress(selectedModule!)} 
                    aria-label={`Progress modul: ${Math.round(getModuleProgress(selectedModule!))}%`}
                    className="h-3 shadow-md"
                  />
                  <p className="text-gray-700 mt-2">
                    🎯 Progress: {completedItems[selectedModule!]?.size || 0} / {selectedModuleData.items.length}
                  </p>
                </div>
              </header>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {selectedModuleData.items.map((item, index) => {
                  const isCompleted = completedItems[selectedModule!]?.has(item.id);
                  const colors = ['from-pink-200 to-rose-200', 'from-blue-200 to-cyan-200', 'from-purple-200 to-indigo-200', 'from-orange-200 to-yellow-200', 'from-green-200 to-emerald-200'];
                  const bgColor = colors[index % colors.length];
                  const imagePath = getImageForItem(selectedModule!, item.id);
                  
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Card
                        className={`p-4 cursor-pointer hover:shadow-xl transition-all relative border-2 bg-gradient-to-br ${bgColor} ${
                          isCompleted ? 'ring-4 ring-green-400 shadow-green-200' : 'hover:border-white'
                        }`}
                        onClick={() => handleItemClick(index)}
                        role="button"
                        tabIndex={0}
                        aria-label={`${item.name}${isCompleted ? ' - Selesai' : ''}`}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleItemClick(index);
                          }
                        }}
                      >
                        {isCompleted && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1 shadow-lg"
                          >
                            <CheckCircle 
                              className="w-6 h-6 text-white" 
                              aria-hidden="true"
                            />
                          </motion.div>
                        )}
                        <div className="flex flex-col items-center justify-center text-center h-32">
                          {imagePath ? (
                            <div className="mb-2">
                              <ImageWithFallback
                                src={imagePath}
                                alt={`Isyarat ${item.name}`}
                                className="w-16 h-16 object-cover rounded-lg shadow-md"
                              />
                            </div>
                          ) : (
                            <div className={`bg-gradient-to-br ${selectedModuleData.color} bg-clip-text text-transparent mb-2`}>
                              {'letter' in item && item.letter}
                              {'number' in item && item.number}
                              {'word' in item && <HandHeart className="w-10 h-10 mx-auto text-purple-600" aria-hidden="true" />}
                            </div>
                          )}
                          <p className="text-gray-800">{item.name}</p>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}
    </motion.div>
  );
}
