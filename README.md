# EcoRestore-AI

EcoRestore-AI adalah aplikasi demo berbasis React + TypeScript untuk pemantauan restorasi pesisir. Aplikasi ini menampilkan alur analisis dalam satu halaman yang bisa di-scroll, dengan navigasi cepat ke setiap bagian utama seperti Home, Dashboard, WebGIS, Analisis, dan Karbon.

## Fitur Utama

- Landing page dengan hero, statistik, dan CTA.
- Dashboard ringkas untuk prioritas restorasi.
- WebGIS interaktif dengan peta, legenda polygon, detail lokasi, rekomendasi AI, kalender tanam, dan dashboard lingkungan.
- Halaman Analisis untuk penjelasan alur identifikasi zona prioritas.
- Halaman Karbon untuk estimasi serapan karbon dan tren abrasi.
- Navigasi internal yang mengikuti posisi scroll.

## Tech Stack

- React 19
- TypeScript
- Vite
- Leaflet untuk peta
- Chart.js untuk visualisasi data
- Tailwind CSS via CDN di `index.html`

## Struktur Proyek

```text
src/
  App.tsx
  main.tsx
  index.css
  components/
  pages/
    Home.tsx
    Dashboard.tsx
    WebGIS.tsx
    Analisis.tsx
    Karbon.tsx
```

## Menjalankan Proyek

1. Install dependensi:

```bash
npm install
```

2. Jalankan mode development:

```bash
npm run dev
```

3. Build production:

```bash
npm run build
```

4. Cek lint:

```bash
npm run lint
```

## Catatan

- Beberapa aset seperti Leaflet dan Chart.js dimuat melalui CDN di `index.html`.
- Aplikasi dirancang sebagai satu halaman dengan section yang saling tersambung lewat scroll, bukan perpindahan route penuh.
