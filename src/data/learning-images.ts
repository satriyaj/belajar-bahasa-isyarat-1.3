// File ini berisi mapping gambar untuk setiap item pembelajaran
// Untuk menambahkan gambar dari komputer Anda:
// 1. Simpan gambar-gambar ke folder /assets/images/
// 2. Update path di bawah ini sesuai dengan nama file gambar Anda

export const learningImages: Record<string, Record<string, string>> = {
  // Gambar untuk Huruf A-Z
  huruf: {
    // Contoh: 'A': '/assets/images/huruf/A.png',
    A: "/images/huruf/A.png", // Kosongkan jika belum ada gambar
    B: "",
    C: "",
    D: "",
    E: "",
    F: "",
    G: "",
    H: "",
    I: "",
    J: "",
    K: "",
    L: "",
    M: "",
    N: "",
    O: "",
    P: "",
    Q: "",
    R: "",
    S: "",
    T: "",
    U: "",
    V: "",
    W: "",
    X: "",
    Y: "",
    Z: "",
  },

  // Gambar untuk Angka 1-10
  angka: {
    "1": "",
    "2": "",
    "3": "",
    "4": "",
    "5": "",
    "6": "",
    "7": "",
    "8": "",
    "9": "",
    "10": "",
  },

  // Gambar untuk Sapaan
  sapaan: {
    halo: "",
    "selamat-pagi": "",
    "terima-kasih": "",
    permisi: "",
    "sampai-jumpa": "",
  },

  // Gambar untuk Kata Sehari-hari
  "kata-sehari": {
    makan: "",
    minum: "",
    rumah: "",
    sekolah: "",
    teman: "",
    keluarga: "",
    belajar: "",
    bermain: "",
    tidur: "",
    bangun: "",
  },
};

// Fungsi helper untuk mendapatkan gambar
export function getImageForItem(
  moduleId: string,
  itemId: string
): string | null {
  const image = learningImages[moduleId]?.[itemId];
  return image || null;
}
