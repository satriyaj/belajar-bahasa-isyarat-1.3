# Cara Menambahkan Gambar Bahasa Isyarat

## Langkah-langkah:

### 1. Simpan Gambar Anda

Buat folder struktur seperti ini:

```
/assets/
  /images/
    /huruf/
      A.png
      B.png
      C.png
      ... (dst untuk semua huruf)
    /angka/
      1.png
      2.png
      ... (dst untuk angka 1-10)
    /sapaan/
      halo.png
      selamat-pagi.png
      terima-kasih.png
      permisi.png
      sampai-jumpa.png
    /kata-sehari/
      makan.png
      minum.png
      rumah.png
      ... (dst)
```

### 2. Edit File `/data/learning-images.ts`

Buka file `/data/learning-images.ts` dan isi path gambar untuk setiap item.

Contoh untuk huruf A-C:

```typescript
huruf: {
  'A': '/assets/images/huruf/A.png',
  'B': '/assets/images/huruf/B.png',
  'C': '/assets/images/huruf/C.png',
  // ... lanjutkan untuk huruf lainnya
}
```

Contoh untuk angka:

```typescript
angka: {
  '1': '/assets/images/angka/1.png',
  '2': '/assets/images/angka/2.png',
  // ... dst
}
```

### 3. Format Gambar yang Disarankan

- **Format**: PNG atau JPG
- **Ukuran**: 400x400px hingga 800x800px (rasio 1:1 atau portrait)
- **Background**: Transparan (PNG) atau putih bersih
- **Nama file**: Sesuai dengan huruf/angka/kata (case-sensitive)

### 4. Contoh Nama File

- Huruf: `A.png`, `B.png`, `C.png`, dst
- Angka: `1.png`, `2.png`, `3.png`, dst
- Sapaan: `halo.png`, `selamat-pagi.png`, dst
- Kata: `makan.png`, `minum.png`, dst

### 5. Tips

- Pastikan nama file sesuai dengan ID di sistem
- Gunakan gambar dengan resolusi yang baik
- File size sebaiknya tidak terlalu besar (max 500KB per gambar)
- Jika tidak ada gambar, biarkan kosong ('') dan akan menampilkan placeholder

### 6. Setelah Upload

Setelah gambar diupload dan path sudah diisi, refresh halaman dan gambar akan otomatis muncul di aplikasi!

## Alternatif Sementara

Jika belum punya gambar, sistem akan menampilkan:

- Huruf/Angka besar yang colorful
- Icon placeholder yang menarik
- Warna gradient yang berbeda untuk setiap item
