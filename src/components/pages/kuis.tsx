import { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { CheckCircle, XCircle, Trophy } from 'lucide-react';

const quizQuestions = [
  {
    id: 1,
    question: 'Berapa jumlah huruf dalam alfabet bahasa isyarat Indonesia?',
    options: ['24 huruf', '26 huruf', '28 huruf', '30 huruf'],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: 'Apa yang dimaksud dengan bahasa isyarat?',
    options: [
      'Bahasa yang menggunakan suara',
      'Bahasa yang menggunakan gerakan tangan dan ekspresi wajah',
      'Bahasa tertulis',
      'Bahasa yang hanya digunakan oleh anak-anak',
    ],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: 'Manakah yang merupakan sapaan dalam bahasa isyarat?',
    options: ['Mengangkat tangan dan melambaikannya', 'Menundukkan kepala', 'Menutup mata', 'Berdiri tegak'],
    correctAnswer: 0,
  },
  {
    id: 4,
    question: 'Angka berapa yang ditunjukkan dengan mengangkat semua jari tangan?',
    options: ['3', '5', '7', '10'],
    correctAnswer: 1,
  },
  {
    id: 5,
    question: 'Apa fungsi ekspresi wajah dalam bahasa isyarat?',
    options: [
      'Tidak ada fungsi khusus',
      'Menunjukkan emosi dan makna tambahan',
      'Hanya untuk hiasan',
      'Menggantikan gerakan tangan',
    ],
    correctAnswer: 1,
  },
];

export function Kuis() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      // Save quiz result to localStorage
      const result = {
        date: new Date().toISOString(),
        score: calculateScore(),
        total: quizQuestions.length,
      };
      
      const history = JSON.parse(localStorage.getItem('quizHistory') || '[]');
      history.push(result);
      localStorage.setItem('quizHistory', JSON.stringify(history));
      
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const calculateScore = () => {
    let score = 0;
    quizQuestions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setQuizStarted(false);
  };

  const startQuiz = () => {
    setQuizStarted(true);
  };

  if (!quizStarted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="container mx-auto px-4 py-8"
      >
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 text-center bg-gradient-to-br from-yellow-100 to-orange-100 border-4 shadow-2xl">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" aria-hidden="true" />
            </motion.div>
            <h1 className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-4">
              🎯 Kuis Bahasa Isyarat 🎯
            </h1>
            <p className="text-gray-700 mb-6">
              Uji pemahaman Anda tentang bahasa isyarat dengan menjawab 5 pertanyaan berikut.
              Anda akan mendapatkan skor di akhir kuis! 🌟
            </p>
            <Button 
              onClick={startQuiz} 
              size="lg" 
              className="bg-gradient-to-r from-orange-500 to-pink-500 text-white border-0 hover:scale-110 transition-transform shadow-lg"
              aria-label="Mulai kuis"
            >
              🚀 Mulai Kuis
            </Button>
          </Card>
        </div>
      </motion.div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const percentage = (score / quizQuestions.length) * 100;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="container mx-auto px-4 py-8"
      >
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 bg-gradient-to-br from-yellow-100 to-orange-100 border-4 shadow-2xl">
            <div className="text-center mb-8">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 1 }}
              >
                <Trophy className="w-24 h-24 text-yellow-500 mx-auto mb-4" aria-hidden="true" />
              </motion.div>
              <h1 className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-2">
                🎉 Hasil Kuis 🎉
              </h1>
              <div className="mb-4">
                <div className="text-gray-800">
                  Skor Anda: {score} dari {quizQuestions.length}
                </div>
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full inline-block mt-2">
                  Persentase: {percentage.toFixed(0)}%
                </div>
              </div>
              {percentage >= 80 ? (
                <p className="text-green-600">✨ Luar biasa! Anda sangat memahami bahasa isyarat! ✨</p>
              ) : percentage >= 60 ? (
                <p className="text-blue-600">👍 Bagus! Terus belajar untuk meningkatkan pemahaman Anda.</p>
              ) : (
                <p className="text-orange-600">💪 Tetap semangat! Cobalah belajar lebih banyak modul.</p>
              )}
            </div>

            <div className="space-y-4 mb-8">
              <h2 className="text-gray-800">📝 Pembahasan:</h2>
              {quizQuestions.map((question, index) => {
                const userAnswer = selectedAnswers[question.id];
                const isCorrect = userAnswer === question.correctAnswer;

                return (
                  <Card key={question.id} className="p-4">
                    <div className="flex items-start gap-3">
                      {isCorrect ? (
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" aria-hidden="true" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" aria-hidden="true" />
                      )}
                      <div className="flex-grow">
                        <p className="text-gray-800 mb-2">
                          {index + 1}. {question.question}
                        </p>
                        <p className="text-gray-600">
                          Jawaban Anda: <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                            {question.options[userAnswer]}
                          </span>
                        </p>
                        {!isCorrect && (
                          <p className="text-gray-600">
                            Jawaban Benar: <span className="text-green-600">
                              {question.options[question.correctAnswer]}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="flex gap-4 justify-center">
              <Button onClick={resetQuiz} variant="outline" aria-label="Ulangi kuis">
                Ulangi Kuis
              </Button>
              <Button onClick={() => window.location.href = '/belajar'} aria-label="Kembali ke halaman belajar">
                Kembali Belajar
              </Button>
            </div>
          </Card>
        </div>
      </motion.div>
    );
  }

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <motion.div
      key={currentQuestion}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700">
              📝 Pertanyaan {currentQuestion + 1} dari {quizQuestions.length}
            </span>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full">
              {progress.toFixed(0)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Progress kuis: ${progress.toFixed(0)}%`}
            />
          </div>
        </div>

        <Card className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 border-4 shadow-xl">
          <h2 className="text-gray-800 mb-6">❓ {question.question}</h2>

          <RadioGroup
            value={selectedAnswers[question.id]?.toString()}
            onValueChange={(value) => handleAnswerSelect(question.id, parseInt(value))}
            aria-label="Pilihan jawaban"
          >
            <div className="space-y-4">
              {question.options.map((option, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                    selectedAnswers[question.id] === index
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => handleAnswerSelect(question.id, index)}
                >
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>

          <div className="flex gap-4 mt-8">
            <Button
              onClick={handlePrevious}
              variant="outline"
              disabled={currentQuestion === 0}
              aria-label="Pertanyaan sebelumnya"
            >
              Sebelumnya
            </Button>
            <Button
              onClick={handleNext}
              disabled={selectedAnswers[question.id] === undefined}
              className="ml-auto"
              aria-label={currentQuestion === quizQuestions.length - 1 ? 'Lihat hasil' : 'Pertanyaan selanjutnya'}
            >
              {currentQuestion === quizQuestions.length - 1 ? 'Lihat Hasil' : 'Selanjutnya'}
            </Button>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
