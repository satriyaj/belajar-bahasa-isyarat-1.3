import { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { MessageSquare, CheckCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function Saran() {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    jenisSaran: '',
    pesan: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call to /api/suggestions
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Mock API response
      console.log('Mengirim data ke /api/suggestions:', formData);
      
      setIsSubmitted(true);
      toast.success('Saran Anda berhasil dikirim!');
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          nama: '',
          email: '',
          jenisSaran: '',
          pesan: '',
        });
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      toast.error('Gagal mengirim saran. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="max-w-2xl mx-auto">
        <header className="mb-8 text-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <MessageSquare className="w-12 h-12 text-purple-600 mx-auto mb-4" aria-hidden="true" />
          </motion.div>
          <h1 className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            💌 Kirim Saran 💌
          </h1>
          <p className="text-gray-700">
            Kami sangat menghargai masukan Anda untuk meningkatkan aplikasi ini! 🌟
          </p>
        </header>

        <Card className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 border-4 shadow-xl">
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" aria-hidden="true" />
              <h2 className="text-green-600 mb-2">Terima Kasih!</h2>
              <p className="text-gray-600">Saran Anda telah berhasil dikirim.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="nama">
                  Nama <span className="text-red-600" aria-label="wajib diisi">*</span>
                </Label>
                <Input
                  id="nama"
                  type="text"
                  placeholder="Masukkan nama Anda"
                  value={formData.nama}
                  onChange={(e) => handleInputChange('nama', e.target.value)}
                  required
                  aria-required="true"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-red-600" aria-label="wajib diisi">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nama@contoh.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  aria-required="true"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="jenisSaran">
                  Jenis Saran <span className="text-red-600" aria-label="wajib diisi">*</span>
                </Label>
                <Select
                  value={formData.jenisSaran}
                  onValueChange={(value) => handleInputChange('jenisSaran', value)}
                  required
                >
                  <SelectTrigger id="jenisSaran" aria-required="true">
                    <SelectValue placeholder="Pilih jenis saran" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fitur">Saran Fitur Baru</SelectItem>
                    <SelectItem value="perbaikan">Perbaikan Bug</SelectItem>
                    <SelectItem value="konten">Penambahan Konten</SelectItem>
                    <SelectItem value="desain">Perbaikan Desain</SelectItem>
                    <SelectItem value="lainnya">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pesan">
                  Pesan <span className="text-red-600" aria-label="wajib diisi">*</span>
                </Label>
                <Textarea
                  id="pesan"
                  placeholder="Tuliskan saran atau masukan Anda di sini..."
                  value={formData.pesan}
                  onChange={(e) => handleInputChange('pesan', e.target.value)}
                  required
                  aria-required="true"
                  rows={6}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 hover:scale-105 transition-transform disabled:opacity-50"
                disabled={isSubmitting}
                aria-label={isSubmitting ? 'Mengirim saran...' : 'Kirim saran'}
              >
                {isSubmitting ? '⏳ Mengirim...' : '📤 Kirim Saran'}
              </Button>
            </form>
          )}
        </Card>

        <Card className="mt-6 p-6 bg-gradient-to-br from-blue-100 to-cyan-100 border-4 shadow-lg">
          <h2 className="text-gray-800 mb-2">📞 Informasi Kontak</h2>
          <p className="text-gray-700 mb-2">
            Jika Anda memiliki pertanyaan mendesak, silakan hubungi kami melalui:
          </p>
          <ul className="text-gray-700 space-y-1">
            <li>📧 Email: support@belajarisyarat.com</li>
            <li>💬 WhatsApp: +62 812-3456-7890</li>
            <li>📱 Instagram: @belajarisyarat</li>
          </ul>
        </Card>
      </div>
    </motion.div>
  );
}
