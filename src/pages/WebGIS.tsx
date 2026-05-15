import { useEffect, useMemo, useRef, useState } from 'react'
import './WebGIS.css'

type PolygonKey = 'restoration' | 'vegetationLoss' | 'mangroveIncrease' | 'abrasion' | 'stable'

type CalendarItem = {
  month: string
  title: string
  description: string
  highlight?: boolean
}

type PlantItem = {
  name: string
  detail: string
}

type DetailData = {
  title: string
  area: string
  areaSize: string
  abrasionRate: string
  abrasionArea: string
  status: string
  priority: string
  kpiAbrasion: string
  kpiPriority: string
  kpiRainfall: string
  kpiSeason: string
  plantType: string
  plantTypeDesc: string
  plantMethod: string
  methodDesc: string
  eduValue: string
  eduValueDesc: string
  condition: string
  recommendation: string
  plants: PlantItem[]
  calendar: CalendarItem[]
  calendarPhase: string
  calendarBadge: string
  calendarSummary: string
  temperature: string
  humidity: string
  rainfall: string
  wind: string
  soilPh: string
  soilOrganic: string
  waterSalinity: string
  waterClarity: string
  ndvi: string
  vegetationCover: string
  polygon: [number, number][]
  color: string
  fillColor: string
  popupClass: string
  popupTitle: string
  popupText: string
  carbonSeries: number[]
}

type WebGISDetailProps = {
  detail: DetailData | null
  activeAccordion: 'plant' | 'method' | 'edu' | null
  setActiveAccordion: (panel: 'plant' | 'method' | 'edu' | null) => void
  chartRef: { current: HTMLCanvasElement | null }
}

const polygonDetails: Record<PolygonKey, DetailData> = {
  restoration: {
    title: 'Zona Prioritas Restorasi',
    area: '120 Ha',
    areaSize: 'Luas total 120 hektar dengan distribusi: 65% mangrove, 35% vegetasi darat.',
    abrasionRate: '2.5 m/tahun (tingkat akselerasi sedang)',
    abrasionArea: '18 Ha',
    status: 'Restorasi tinggi',
    priority: 'Prioritas Tinggi',
    kpiAbrasion: '2.5 m/tahun',
    kpiPriority: '89 / 100',
    kpiRainfall: '2.140 mm',
    kpiSeason: 'Nov - Jan',
    plantType: 'Mangrove campuran',
    plantTypeDesc: 'Kombinasi Rhizophora mucronata dan Avicennia alba dipilih untuk mensimulasikan kondisi pesisir berlumpur dengan tekanan abrasi sedang. Kedua spesies ini memiliki sistem akar yang kuat untuk menstabilkan garis pantai.',
    plantMethod: 'Sabuk hijau pesisir dan penanaman bertahap',
    methodDesc: 'Strategi penanaman berlapis: zona depan menggunakan spesies pionir, zona tengah dengan Rhizophora, dan zona belakang dengan Avicennia. Penanaman dilakukan bertahap selama 2-3 tahun untuk memastikan adaptasi optimal.',
    eduValue: 'Tinggi, cocok untuk jalur edukasi mangrove',
    eduValueDesc: 'Lokasi ini ideal untuk program eduwisata karena aksesibilitas tinggi dan terlihatnya perubahan restorasi dalam 6-12 bulan. Cocok untuk sekolah, universitas, dan CSR perusahaan yang ingin pembelajaran langsung tentang konservasi mangrove.',
    condition: 'Area ini menunjukkan kehilangan vegetasi yang cukup besar sehingga menjadi prioritas utama untuk penanaman ulang dan penguatan sabuk hijau.',
    recommendation: 'Rhizophora mucronata, Avicennia alba',
    plants: [
      { name: 'Rhizophora mucronata', detail: '(Kecocokan 96%) - Cocok untuk zona berlumpur.' },
      { name: 'Avicennia alba', detail: '(Kecocokan 90%) - Membantu stabilisasi garis pantai.' },
    ],
    calendar: [
      { month: 'Jan', title: 'Monitoring', description: 'Pantau survival rate bibit dan kondisi pasang surut.' },
      { month: 'Feb', title: 'Pemeliharaan', description: 'Bersihkan gulma dan cek pengikatan bibit muda.' },
      { month: 'Mar', title: 'Persiapan lahan', description: 'Perbaiki drainase dan siapkan bibit cadangan.' },
      { month: 'Apr', title: 'Pra-tanam', description: 'Uji kelembaban tanah dan finalisasi blok tanam.', highlight: true },
      { month: 'Mei', title: 'Tanam utama', description: 'Jendela tanam terbaik untuk zona restorasi prioritas.', highlight: true },
      { month: 'Jun', title: 'Monitoring awal', description: 'Cek stres bibit dan lakukan penyulaman jika perlu.' },
      { month: 'Jul', title: 'Penguatan akar', description: 'Tambahkan pelindung sederhana pada titik rawan.' },
      { month: 'Agu', title: 'Enrichment', description: 'Isi celah vegetasi dan evaluasi tutupan lahan.' },
      { month: 'Sep', title: 'Persiapan hujan', description: 'Siapkan bibit, patok, dan zona tanam lanjutan.' },
      { month: 'Okt', title: 'Tanam optimal', description: 'Mulai penanaman saat curah hujan lebih stabil.', highlight: true },
      { month: 'Nov', title: 'Tanam utama', description: 'Periode terbaik untuk pengayaan dan blok baru.', highlight: true },
      { month: 'Des', title: 'Audit akhir tahun', description: 'Rekap pertumbuhan dan siapkan rencana tahun berikutnya.' },
    ],
    calendarPhase: 'Fase tanam aktif: Okt - Nov',
    calendarBadge: 'Jendela Tanam Utama',
    calendarSummary: 'Curah hujan mulai stabil sehingga penanaman mangrove memiliki peluang adaptasi yang lebih tinggi dan tingkat kehilangan bibit lebih rendah.',
    temperature: '28°C',
    humidity: '85%',
    rainfall: '2,140 mm',
    wind: '4.2 m/s',
    soilPh: '7.2',
    soilOrganic: '4.5%',
    waterSalinity: '22 ppt',
    waterClarity: '0.8 m',
    ndvi: '0.68',
    vegetationCover: '72%',
    polygon: [[-6.827, 110.622], [-6.824, 110.627], [-6.829, 110.631], [-6.833, 110.626]],
    color: '#6366f1',
    fillColor: '#818cf8',
    popupClass: 'popup-restoration',
    popupTitle: 'Zona Prioritas Restorasi Tinggi',
    popupText: 'Area yang direkomendasikan untuk restorasi mangrove dan perlindungan abrasi.',
    carbonSeries: [80, 210, 560, 1100, 1850],
  },
  vegetationLoss: {
    title: 'Kehilangan Vegetasi',
    area: '86 Ha',
    areaSize: 'Luas total 86 hektar dengan kondisi: 45% sudah terbuka, 55% vegetasi rusak.',
    abrasionRate: '1.8 m/tahun (tingkat sedang)',
    abrasionArea: '12 Ha',
    status: 'Degradasi tinggi',
    priority: 'Prioritas Tinggi',
    kpiAbrasion: '1.8 m/tahun',
    kpiPriority: '82 / 100',
    kpiRainfall: '2.350 mm',
    kpiSeason: 'Okt - Des',
    plantType: 'Tanaman restorasi hutan lokal',
    plantTypeDesc: 'Kombinasi tanaman setempat seperti sengon, puspa, dan spesies pionir lokal yang tahan terhadap variabilitas iklim. Pemilihan spesies lokal meningkatkan tingkat keberhasilan restorasi di atas 85%.',
    plantMethod: 'Enrichment planting',
    methodDesc: 'Penanaman pengayaan dengan mempertahankan pohon existing yang masih sehat sebagai kanopi. Strategi ini mempercepat pemulihan struktur hutan alami dan menciptakan habitat yang lebih kompleks untuk fauna lokal.',
    eduValue: 'Sedang, cocok untuk wisata interpretasi hutan',
    eduValueDesc: 'Lokasi ini dapat dikembangkan sebagai trail edukasi dengan interpretive signs mengenai proses restorasi hutan. Relevan untuk pembelajaran tentang pengelolaan DAS dan konservasi tanah bagi pelajar tingkat menengah atas.',
    condition: 'Vegetasi darat mengalami degradasi akibat pembukaan lahan dan tekanan pesisir yang meningkat.',
    recommendation: 'Rhizophora mucronata, Bruguiera gymnorhiza',
    plants: [
      { name: 'Rhizophora mucronata', detail: '(Kecocokan 92%) - Efektif untuk zona perlindungan awal.' },
      { name: 'Bruguiera gymnorhiza', detail: '(Kecocokan 84%) - Cocok untuk area transisi.' },
    ],
    calendar: [
      { month: 'Jan', title: 'Monitoring', description: 'Pantau area terbuka dan potensi erosi permukaan.' },
      { month: 'Feb', title: 'Survei tanah', description: 'Ukur kelembaban dan siapkan kebutuhan bibit lokal.' },
      { month: 'Mar', title: 'Persiapan lahan', description: 'Buka jalur tanam dan perbaiki akses kerja.' },
      { month: 'Apr', title: 'Tanam terbatas', description: 'Mulai blok kecil di titik yang lebih aman dari genangan.', highlight: true },
      { month: 'Mei', title: 'Tanam utama', description: 'Lanjutkan penanaman saat kondisi lahan lebih stabil.', highlight: true },
      { month: 'Jun', title: 'Monitoring', description: 'Cek respons bibit terhadap intensitas hujan.' },
      { month: 'Jul', title: 'Penambahan bibit', description: 'Isi area yang gagal tumbuh atau terkena gangguan.' },
      { month: 'Agu', title: 'Pemeliharaan', description: 'Perkuat ajir dan lakukan pembersihan gulma.' },
      { month: 'Sep', title: 'Pra-musim hujan', description: 'Siapkan bibit cadangan dan cek drainase lahan.' },
      { month: 'Okt', title: 'Tanam awal', description: 'Awal musim hujan, cocok untuk penanaman terbatas.', highlight: true },
      { month: 'Nov', title: 'Monitoring', description: 'Evaluasi hasil tanam awal dan lakukan penyulaman.' },
      { month: 'Des', title: 'Evaluasi', description: 'Tutup tahun dengan audit survival rate dan rencana lanjut.' },
    ],
    calendarPhase: 'Fase tanam aktif: Okt',
    calendarBadge: 'Tanam Bertahap',
    calendarSummary: 'Area ini lebih cocok untuk persiapan lahan dan penanaman terbatas pada awal musim hujan, disertai monitoring kelembaban tanah.',
    temperature: '27.5°C',
    humidity: '82%',
    rainfall: '2,350 mm',
    wind: '3.8 m/s',
    soilPh: '6.8',
    soilOrganic: '3.8%',
    waterSalinity: '20 ppt',
    waterClarity: '0.6 m',
    ndvi: '0.55',
    vegetationCover: '58%',
    polygon: [[-6.836, 110.612], [-6.833, 110.617], [-6.838, 110.620], [-6.842, 110.615]],
    color: '#ef4444',
    fillColor: '#f87171',
    popupClass: 'popup-vegetation-loss',
    popupTitle: 'Kehilangan Vegetasi',
    popupText: 'Area dengan degradasi vegetasi yang memerlukan intervensi restorasi.',
    carbonSeries: [30, 90, 220, 410, 650],
  },
  mangroveIncrease: {
    title: 'Mangrove Bertambah',
    area: '54 Ha',
    areaSize: 'Luas total 54 hektar dengan komposisi: 78% mangrove sehat, 22% dalam pemulihan.',
    abrasionRate: '0.8 m/tahun (tingkat rendah)',
    abrasionArea: '5 Ha',
    status: 'Pulih baik',
    priority: 'Prioritas Menengah',
    kpiAbrasion: '0.8 m/tahun',
    kpiPriority: '76 / 100',
    kpiRainfall: '2.250 mm',
    kpiSeason: 'Nov - Jan',
    plantType: 'Mangrove sehat (pemeliharaan)',
    plantTypeDesc: 'Area ini menunjukkan pertumbuhan mangrove yang baik. Fokus management adalah pada pemeliharaan dan pencegahan degradasi melalui monitoring rutin dan pengendalian tekanan manusia.',
    plantMethod: 'Pemeliharaan dan monitoring',
    methodDesc: 'Strategi management meliputi patroli reguler, pencegahan pembukaan lahan, penghijauan untuk gap yang ada, dan monitoring NDVI menggunakan satelit untuk mendeteksi perubahan dini.',
    eduValue: 'Sedang-Tinggi, referensi keberhasilan restorasi',
    eduValueDesc: 'Lokasi ini excellent sebagai benchmark untuk program restorasi yang sukses. Cocok untuk demonstrasi dan pelatihan tentang manajemen mangrove jangka panjang serta partisipasi komunitas lokal.',
    condition: 'Area penanaman komunitas menunjukkan peningkatan tutupan mangrove dan berhasil menahan limpasan air.',
    recommendation: 'Rhizophora mucronata, Avicennia marina',
    plants: [
      { name: 'Rhizophora mucronata', detail: '(Kecocokan 94%) - Stabil pada substrat lumpur.' },
      { name: 'Avicennia marina', detail: '(Kecocokan 87%) - Cocok untuk zona pasang surut.' },
    ],
    calendar: [
      { month: 'Jan', title: 'Monitoring', description: 'Pantau pertumbuhan dan tutupan mangrove sehat.' },
      { month: 'Feb', title: 'Pembersihan', description: 'Bersihkan sampah dan vegetasi pengganggu di petak tanam.' },
      { month: 'Mar', title: 'Enrichment kecil', description: 'Isi gap vegetasi dengan bibit tambahan jika diperlukan.' },
      { month: 'Apr', title: 'Pemeliharaan aktif', description: 'Perkuat jalur monitoring komunitas dan perbaiki drainase.', highlight: true },
      { month: 'Mei', title: 'Penanaman lanjutan', description: 'Terapkan penanaman tambahan di area yang pulih.', highlight: true },
      { month: 'Jun', title: 'Audit kesehatan', description: 'Cek kesehatan akar, salinitas, dan tutupan kanopi.' },
      { month: 'Jul', title: 'Patroli komunitas', description: 'Libatkan warga untuk menjaga area restorasi.' },
      { month: 'Agu', title: 'Penguatan buffer', description: 'Tambahkan zona penahan di sisi yang rawan gangguan.' },
      { month: 'Sep', title: 'Pra-hujan', description: 'Siapkan bibit pengisi dan rencana tanam berikutnya.' },
      { month: 'Okt', title: 'Tanam utama', description: 'Awal jendela tanam terbaik untuk pengayaan area.', highlight: true },
      { month: 'Nov', title: 'Tanam utama', description: 'Lanjutkan penanaman dan perlindungan bibit muda.', highlight: true },
      { month: 'Des', title: 'Evaluasi akhir', description: 'Audit hasil tanam dan siapkan pengelolaan tahun depan.' },
    ],
    calendarPhase: 'Fase tanam aktif: Okt - Nov',
    calendarBadge: 'Jendela Tanam Utama',
    calendarSummary: 'Pertumbuhan mangrove sedang baik, sehingga penanaman tambahan dapat dilakukan beriringan dengan pemeliharaan rutin dan monitoring komunitas.',
    temperature: '28.2°C',
    humidity: '84%',
    rainfall: '2.250 mm',
    wind: '3.5 m/s',
    soilPh: '7.4',
    soilOrganic: '5.2%',
    waterSalinity: '24 ppt',
    waterClarity: '1.0 m',
    ndvi: '0.72',
    vegetationCover: '78%',
    polygon: [[-6.832, 110.629], [-6.829, 110.634], [-6.834, 110.637], [-6.838, 110.632]],
    color: '#134332',
    fillColor: '#34d399',
    popupClass: 'popup-mangrove-increase',
    popupTitle: 'Mangrove Bertambah',
    popupText: 'Area restorasi berhasil dengan peningkatan tutupan mangrove.',
    carbonSeries: [60, 190, 430, 850, 1260],
  },
  abrasion: {
    title: 'Abrasi Pesisir',
    area: '73 Ha',
    areaSize: 'Luas total 73 hektar dengan zona: 40% frontal abrasi, 60% zona buffer.',
    abrasionRate: '3.2 m/tahun (tingkat akselerasi tinggi)',
    abrasionArea: '23 Ha',
    status: 'Abrasi aktif',
    priority: 'Prioritas Tinggi',
    kpiAbrasion: '3.2 m/tahun',
    kpiPriority: '92 / 100',
    kpiRainfall: '2.100 mm',
    kpiSeason: 'Nov - Feb',
    plantType: 'Mangrove pesisir terbuka',
    plantTypeDesc: 'Spesies pionir seperti Avicennia alba dan Sonneratia alba dipilih karena tahan terhadap lingkungan ekstrem. Kedua spesies ini dapat tumbuh di zone paling depan yang terkena dampak gelombang.',
    plantMethod: 'Rehabilitasi vegetatif pesisir',
    methodDesc: 'Kombinasi teknik: structural, biological, dan engineering untuk stabilisasi garis pantai dengan monitoring intensif setiap 3 bulan.',
    eduValue: 'Tinggi, lokasi penelitian adaptasi pesisir',
    eduValueDesc: 'Area ini sangat cocok untuk studi kasus tentang adaptasi ekosistem terhadap perubahan iklim dan sea level rise.',
    condition: 'Perubahan garis pantai masih aktif dan memerlukan penguatan vegetasi pelindung di zona depan.',
    recommendation: 'Avicennia alba, Sonneratia alba',
    plants: [
      { name: 'Avicennia alba', detail: '(Kecocokan 91%) - Spesies pionir untuk meredam gelombang.' },
      { name: 'Sonneratia alba', detail: '(Kecocokan 85%) - Baik untuk area pantai terbuka.' },
    ],
    calendar: [
      { month: 'Jan', title: 'Monitoring gelombang', description: 'Cek tingkat gangguan ombak dan stabilitas pelindung alami.' },
      { month: 'Feb', title: 'Tanam penutup', description: 'Waktu aman untuk penguatan bibit di zona depan.', highlight: true },
      { month: 'Mar', title: 'Survei ulang', description: 'Identifikasi titik abrasi aktif dan kebutuhan penyulaman.' },
      { month: 'Apr', title: 'Pemeliharaan', description: 'Periksa pengikatan, sedimentasi, dan kemungkinan rusak.' },
      { month: 'Mei', title: 'Enrichment terbatas', description: 'Isi celah vegetasi di titik yang sudah lebih aman.' },
      { month: 'Jun', title: 'Monitoring', description: 'Pantau stres bibit dan resiko intrusi air asin.' },
      { month: 'Jul', title: 'Perawatan struktur', description: 'Perkuat windbreak dan cek geobag bila dipakai.' },
      { month: 'Agu', title: 'Evaluasi lapangan', description: 'Tentukan area yang masih layak untuk tanam ulang.' },
      { month: 'Sep', title: 'Persiapan hujan', description: 'Rancang ulang blok tanam berdasarkan perubahan pantai.' },
      { month: 'Okt', title: 'Tanam awal', description: 'Mulai penanaman saat cuaca mulai lebih stabil.', highlight: true },
      { month: 'Nov', title: 'Tanam optimal', description: 'Fase terbaik untuk restorasi mangrove pesisir terbuka.', highlight: true },
      { month: 'Des', title: 'Tanam lanjutan', description: 'Lanjutkan pengayaan di area yang sudah terlindungi.' },
    ],
    calendarPhase: 'Fase tanam aktif: Nov - Feb',
    calendarBadge: 'Zona Tanam Pesisir',
    calendarSummary: 'Penanaman lebih aman dilakukan pada periode hujan yang lebih konsisten untuk menekan stres bibit akibat gelombang dan angin pesisir.',
    temperature: '29°C',
    humidity: '80%',
    rainfall: '2.100 mm',
    wind: '5.1 m/s',
    soilPh: '6.9',
    soilOrganic: '3.2%',
    waterSalinity: '25 ppt',
    waterClarity: '0.5 m',
    ndvi: '0.42',
    vegetationCover: '45%',
    polygon: [[-6.828, 110.639], [-6.824, 110.646], [-6.829, 110.650], [-6.833, 110.644], [-6.831, 110.639]],
    color: '#fb923c',
    fillColor: '#fdba74',
    popupClass: 'popup-abrasion',
    popupTitle: 'Abrasi Pesisir',
    popupText: 'Zona yang menunjukkan tekanan gelombang dan mundurnya garis pantai.',
    carbonSeries: [40, 120, 280, 560, 920],
  },
  stable: {
    title: 'Vegetasi Stabil',
    area: '68 Ha',
    areaSize: 'Luas total 68 hektar dengan kondisi: 92% vegetasi sehat, 8% monitoring berkala.',
    abrasionRate: '0.3 m/tahun (tingkat minimal)',
    abrasionArea: '2 Ha',
    status: 'Stabil',
    priority: 'Prioritas Rendah',
    kpiAbrasion: '0.3 m/tahun',
    kpiPriority: '58 / 100',
    kpiRainfall: '2.180 mm',
    kpiSeason: 'Sepanjang tahun',
    plantType: 'Pemeliharaan dan monitoring',
    plantTypeDesc: 'Area ini sudah memiliki vegetasi alami yang stabil. Fokus management adalah mempertahankan kondisi existing melalui proteksi dari aktivitas manusia yang merusak.',
    plantMethod: 'Monitoring berkelanjutan',
    methodDesc: 'Program meliputi patroli reguler, NDVI monitoring setiap 2 minggu, community engagement, dan selective enrichment untuk gap kecil.',
    eduValue: 'Sedang, baseline untuk research monitoring',
    eduValueDesc: 'Lokasi ini berfungsi sebagai control area dan baseline untuk penelitian jangka panjang tentang carbon sequestration dan biodiversity.',
    condition: 'Vegetasi relatif stabil dan masih berfungsi sebagai penahan alami terhadap gelombang dan limpasan air.',
    recommendation: 'Pemeliharaan rutin dan pemantauan berkala',
    plants: [
      { name: 'Pemeliharaan vegetasi eksisting', detail: '- Fokus pada perlindungan area yang sudah sehat.' },
      { name: 'Monitoring NDVI', detail: '- Deteksi perubahan tutupan lahan secara berkala.' },
    ],
    calendar: [
      { month: 'Jan', title: 'Monitoring rutin', description: 'Jaga stabilitas tutupan vegetasi dan pantau perubahan kecil.' },
      { month: 'Feb', title: 'Monitoring rutin', description: 'Cek kondisi saluran air dan risiko kerusakan ringan.' },
      { month: 'Mar', title: 'Pemeliharaan ringan', description: 'Perbaiki celah kecil dan bersihkan area monitoring.' },
      { month: 'Apr', title: 'Pengayaan kecil', description: 'Tambahkan bibit hanya pada spot yang kosong.' },
      { month: 'Mei', title: 'Monitoring rutin', description: 'Fokus pada kestabilan kanopi dan kesehatan akar.' },
      { month: 'Jun', title: 'Audit vegetasi', description: 'Nilai kesehatan lahan dan rencana tindak lanjut.' },
      { month: 'Jul', title: 'Patroli konservasi', description: 'Libatkan komunitas untuk menjaga area tetap stabil.' },
      { month: 'Agu', title: 'Evaluasi musim', description: 'Cek dampak musim kering dan kebutuhan irigasi ringan.' },
      { month: 'Sep', title: 'Persiapan semester hujan', description: 'Tentukan area cadangan untuk pengayaan kecil.' },
      { month: 'Okt', title: 'Monitoring intensif', description: 'Mulai periode hujan dengan pengawasan lebih rapat.' },
      { month: 'Nov', title: 'Monitoring tahunan', description: 'Simpan data pertumbuhan untuk acuan tahun berikutnya.' },
      { month: 'Des', title: 'Rekap akhir tahun', description: 'Tutup tahun dengan ringkasan kesehatan lahan.' },
    ],
    calendarPhase: 'Fase tanam aktif: monitoring sepanjang tahun',
    calendarBadge: 'Zona Monitoring Tahunan',
    calendarSummary: 'Wilayah stabil cocok untuk pemeliharaan, monitoring berkala, dan penyisipan bibit hanya bila terdapat celah vegetasi kecil.',
    temperature: '27.8°C',
    humidity: '83%',
    rainfall: '2.180 mm',
    wind: '3.2 m/s',
    soilPh: '7.5',
    soilOrganic: '5.8%',
    waterSalinity: '21 ppt',
    waterClarity: '1.2 m',
    ndvi: '0.75',
    vegetationCover: '88%',
    polygon: [[-6.840, 110.620], [-6.836, 110.625], [-6.842, 110.629], [-6.846, 110.624]],
    color: '#22d3ee',
    fillColor: '#67e8f9',
    popupClass: 'popup-stable',
    popupTitle: 'Vegetasi Stabil',
    popupText: 'Area yang masih mempertahankan vegetasi alami dengan risiko degradasi rendah.',
    carbonSeries: [70, 140, 310, 520, 780],
  },
}

function WebGISDetail({ detail, activeAccordion, setActiveAccordion, chartRef }: WebGISDetailProps) {
  if (!detail) {
    return (
      <div className="bg-slate-900 rounded-2xl shadow-xl p-5 md:p-7 text-white">
        <h3 className="text-sm md:text-base font-bold mb-6 md:mb-8">Data Detail Singkat</h3>
        <div id="empty-state" className="space-y-3 text-center py-6">
          <div className="text-3xl md:text-4xl text-slate-600 mb-2">
            <i className="fa-solid fa-map-location-dot"></i>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed">Belum ada area yang dipilih.</p>
          <p className="text-slate-500 text-xs">Klik poligon di peta untuk detail.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-slate-900 rounded-2xl shadow-xl p-5 md:p-7 text-white">
      <h3 className="text-sm md:text-base font-bold mb-6 md:mb-8">Data Detail Singkat</h3>
      <div id="detail-content" className="space-y-4 md:space-y-5 text-xs text-slate-300">
        <div>
          <p className="text-slate-500 uppercase tracking-wider text-xs font-bold">Area terpilih</p>
          <p id="detail-area" className="text-white font-bold mt-1">{detail.title}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="border border-slate-700 rounded-lg p-3 bg-slate-800/50">
            <p className="text-slate-400 text-xs mb-2">Laju Abrasi</p>
            <p id="detail-kpi-abrasion" className="text-white font-bold text-sm">{detail.kpiAbrasion}</p>
          </div>
          <div className="border border-slate-700 rounded-lg p-3 bg-slate-800/50">
            <p className="text-slate-400 text-xs mb-2">Skor Prioritas</p>
            <p id="detail-kpi-priority" className="text-white font-bold text-sm">{detail.kpiPriority}</p>
          </div>
          <div className="border border-slate-700 rounded-lg p-3 bg-slate-800/50">
            <p className="text-slate-400 text-xs mb-2">Curah Hujan</p>
            <p id="detail-kpi-rainfall" className="text-white font-bold text-sm">{detail.kpiRainfall}</p>
          </div>
          <div className="border border-slate-700 rounded-lg p-3 bg-slate-800/50">
            <p className="text-slate-400 text-xs mb-2">Musim Tanam</p>
            <p id="detail-kpi-season" className="text-white font-bold text-sm">{detail.kpiSeason}</p>
          </div>
        </div>

        <div>
          <p className="text-slate-500 uppercase tracking-wider text-xs font-bold">Luas Lahan</p>
          <p id="detail-area-size" className="text-white font-bold mt-1">{detail.area}</p>
          <p id="detail-area-details" className="text-slate-400 text-xs mt-2">{detail.areaSize}</p>
        </div>
        <div>
          <p className="text-slate-500 uppercase tracking-wider text-xs font-bold">Abrasi Pesisir</p>
          <p id="detail-abrasion-rate" className="text-white font-bold mt-1">{detail.abrasionRate}</p>
          <p id="detail-abrasion-area" className="text-slate-400 text-xs mt-1">Area terpengaruh: {detail.abrasionArea}</p>
        </div>
        <div>
          <p className="text-slate-500 uppercase tracking-wider text-xs font-bold">Status</p>
          <p id="detail-status" className="text-white font-bold mt-1">{detail.status}</p>
        </div>
        <div>
          <p className="text-slate-500 uppercase tracking-wider text-xs font-bold">Rekomendasi AI</p>
          <p id="detail-recommendation" className="text-white font-bold mt-1">{detail.recommendation}</p>
        </div>
      </div>
    </div>
  )
}

export function WebGIS() {
  const mapRef = useRef<HTMLDivElement | null>(null)
  const chartRef = useRef<HTMLCanvasElement | null>(null)
  const mapInstanceRef = useRef<any>(null)
  const chartInstanceRef = useRef<any>(null)
  const [selectedKey, setSelectedKey] = useState<PolygonKey | null>(null)
  const [activeAccordion, setActiveAccordion] = useState<'plant' | 'method' | 'edu' | null>(null)

  const selectedDetail = useMemo(() => (selectedKey ? polygonDetails[selectedKey] : null), [selectedKey])

  useEffect(() => {
    const leaflet = (window as Window & { L?: any }).L

    if (!mapRef.current || !leaflet || mapInstanceRef.current) {
      return
    }

    const map = leaflet.map(mapRef.current, { zoomControl: true, scrollWheelZoom: false }).setView([-6.83, 110.63], 12)

    leaflet.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri',
    }).addTo(map)

    const areaCircle = leaflet.circle([-6.83, 110.63], {
      color: '#134332',
      fillColor: '#134332',
      fillOpacity: 0.5,
      radius: 1200,
    }).addTo(map)

    areaCircle.bindPopup("<b class='text-eco-blue'>Area Prioritas Restorasi Tinggi</b><br><span class='text-xs text-slate-500'>Klik area ini untuk melihat analisis spesifik lokasi.</span>")

    const polygonKeys: PolygonKey[] = ['vegetationLoss', 'mangroveIncrease', 'abrasion', 'stable', 'restoration']
    const polygonLayers = polygonKeys.map((key) => {
      const detail = polygonDetails[key]
      const polygon = leaflet.polygon(detail.polygon, {
        color: detail.color,
        fillColor: detail.fillColor,
        fillOpacity: 0.42,
        weight: 2,
      }).addTo(map)

      polygon.bindTooltip(detail.title, {
        permanent: true,
        direction: 'center',
        className: 'polygon-label',
        opacity: 0.95,
      })

      polygon.bindPopup(`
        <div class="map-popup">
          <h2 class="map-popup-title ${detail.popupClass}">${detail.popupTitle}</h2>
          <p class="map-popup-text">${detail.popupText}</p>
          <div class="map-popup-meta">
            <p class="map-popup-meta-label">Detail singkat</p>
            <p class="map-popup-meta-item">Luas: ${detail.area}</p>
            <p class="map-popup-meta-item">Status: ${detail.status}</p>
          </div>
        </div>
      `)

      polygon.on('click', () => {
        setSelectedKey(key)
        setActiveAccordion('plant')
      })

      return polygon
    })

    areaCircle.on('click', () => {
      setSelectedKey('restoration')
      setActiveAccordion('plant')
    })

    map.fitBounds(leaflet.featureGroup([...polygonLayers, areaCircle]).getBounds().pad(0.2))
    mapInstanceRef.current = map

    return () => {
      map.remove()
      mapInstanceRef.current = null
    }
  }, [])

  useEffect(() => {
    const Chart = (window as Window & { Chart?: any }).Chart
    if (!Chart || !chartRef.current) {
      return
    }

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy()
      chartInstanceRef.current = null
    }

    if (!selectedDetail) {
      return
    }

    const context = chartRef.current.getContext('2d')
    if (!context) return

    const gradient = context.createLinearGradient(0, 0, 0, 300)
    gradient.addColorStop(0, 'rgba(16, 185, 129, 0.4)')
    gradient.addColorStop(1, 'rgba(16, 185, 129, 0.0)')

    chartInstanceRef.current = new Chart(context, {
      type: 'line',
      data: {
        labels: ['Tahun 1', 'Tahun 2', 'Tahun 3', 'Tahun 4', 'Tahun 5'],
        datasets: [{
          label: `Serapan Karbon (Ton) - ${selectedDetail.title}`,
          data: selectedDetail.carbonSeries,
          borderColor: '#134332',
          backgroundColor: gradient,
          fill: true,
          tension: 0.4,
          borderWidth: 3,
          pointBackgroundColor: '#fff',
          pointBorderColor: '#134332',
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true, grid: { borderDash: [5, 5] } }, x: { grid: { display: false } } },
      },
    })
  }, [selectedDetail])

  useEffect(() => {
    const Chart = (window as Window & { Chart?: any }).Chart
    if (!Chart) {
      return
    }

    const generalCanvas = document.getElementById('generalCarbonChart') as HTMLCanvasElement | null
    const abrasionCanvas = document.getElementById('abrasionTrendChart') as HTMLCanvasElement | null

    if (generalCanvas && !(generalCanvas as HTMLCanvasElement & { __chart?: boolean }).__chart) {
      const context = generalCanvas.getContext('2d')
      if (context) {
        new Chart(context, {
          type: 'bar',
          data: {
            labels: ['2026', '2027', '2028', '2029', '2030'],
            datasets: [{
              label: 'Target Agregat Nasional (Ribu Ton)',
              data: [120, 350, 780, 1400, 2500],
              backgroundColor: '#134332',
              borderRadius: 6,
            }],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: { y: { beginAtZero: true } },
            plugins: { legend: { display: false } },
          },
        })
      }
      ;(generalCanvas as HTMLCanvasElement & { __chart?: boolean }).__chart = true
    }

    if (abrasionCanvas && !(abrasionCanvas as HTMLCanvasElement & { __chart?: boolean }).__chart) {
      const context = abrasionCanvas.getContext('2d')
      if (context) {
        new Chart(context, {
          type: 'line',
          data: {
            labels: ['2015', '2017', '2019', '2021', '2023', '2024'],
            datasets: [{
              label: 'Panjang Garis Pantai Terdampak (Km)',
              data: [18, 32, 48, 65, 78, 85],
              borderColor: '#ef4444',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              fill: true,
              tension: 0.4,
              pointRadius: 6,
              pointBackgroundColor: '#ef4444',
              pointBorderColor: '#fff',
              pointBorderWidth: 2,
              borderWidth: 3,
            }],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { labels: { font: { size: 13, weight: 'bold' }, padding: 15, usePointStyle: true } } },
            scales: { y: { beginAtZero: true, ticks: { font: { size: 11 } } }, x: { ticks: { font: { size: 11 } } } },
          },
        })
      }
      ;(abrasionCanvas as HTMLCanvasElement & { __chart?: boolean }).__chart = true
    }
  }, [])

  return (
    <section id="webgis" className="py-24 md:py-32 bg-slate-50 scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center text-center mb-16 gap-6">
          <h2 className="section-title text-2xl md:text-4xl">Pemantauan WebGIS</h2>
          <p className="text-slate-500 text-base md:text-base max-w-2xl">Peta Interaktif. <span className="font-bold text-eco-blue">Klik pada area di peta</span> untuk melihat analisis spesifik lokasi.</p>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            <button type="button" className="px-3 py-1.5 bg-eco-blue text-white rounded text-xs font-bold shadow-md hover:bg-eco-blue/90 transition">Layer: Deforestasi</button>
            <a href="map_abrasi.html" className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded text-xs font-bold hover:bg-slate-50 transition">Layer: Abrasi</a>
          </div>
        </div>

        <div ref={mapRef} id="map" className="shadow-xl border-4 border-white mb-10 md:mb-16 rounded-lg h-[350px] bg-gray-300 overflow-hidden"></div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-5 md:p-7">
            <div className="mb-6 md:mb-8">
              <h2 className="text-xl md:text-xl font-bold text-slate-800">Legenda Anotasi Polygon</h2>
              <p className="text-base text-slate-500 mt-3">Klik tiap area untuk melihat detail lokasi dan rekomendasi AI.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 text-xs text-slate-700">
              <div className="map-legend-item"><span className="map-color map-color-vegetation-loss"></span>Kehilangan vegetasi</div>
              <div className="map-legend-item"><span className="map-color map-color-mangrove-increase"></span>Mangrove bertambah</div>
              <div className="map-legend-item"><span className="map-color map-color-mangrove-decrease"></span>Mangrove berkurang</div>
              <div className="map-legend-item"><span className="map-color map-color-stable"></span>Vegetasi stabil</div>
              <div className="map-legend-item"><span className="map-color map-color-abrasion"></span>Abrasi pesisir</div>
              <div className="map-legend-item"><span className="map-color map-color-restoration"></span>Zona prioritas restorasi</div>
            </div>
          </div>

          {selectedDetail ? (
            <WebGISDetail detail={selectedDetail} activeAccordion={activeAccordion} setActiveAccordion={setActiveAccordion} chartRef={chartRef} />
          ) : (
            <WebGISDetail detail={null} activeAccordion={activeAccordion} setActiveAccordion={setActiveAccordion} chartRef={chartRef} />
          )}
        </div>

        {selectedDetail && (
          <div id="specific-analysis-panel" className="space-y-8 md:space-y-10">
            <div className="flex items-center mb-7">
              <div className="w-1.5 h-6 bg-eco-green rounded-full mr-3"></div>
              <h2 className="text-lg md:text-xl font-bold text-eco-dark">Analisis Lokasi: <span id="loc-title" className="text-eco-blue">{selectedDetail.title}</span></h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-4 flex-col md:flex-row gap-3">
                  <h3 className="text-sm md:text-base font-bold text-slate-800"><i className="fa-solid fa-microchip text-eco-blue mr-2"></i>Rekomendasi AI</h3>
                  <span id="detail-priority-badge" className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-xs font-bold border border-red-200 whitespace-nowrap">{selectedDetail.priority}</span>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Kondisi Saat Ini</p>
                    <p id="detail-condition" className="text-xs text-slate-700">{selectedDetail.condition}</p>
                  </div>
                  <div className="p-3 bg-eco-green/10 rounded-lg border border-eco-green/20">
                    <p className="text-xs text-eco-dark uppercase tracking-wider font-bold mb-2">Tanaman Restorasi</p>
                    <ul id="detail-plants" className="text-xs space-y-2 text-slate-700">
                      {selectedDetail.plants.map((plant) => (
                        <li key={plant.name}>
                          <i className="fa-solid fa-check-circle text-eco-green mr-1.5"></i>
                          <strong>{plant.name}</strong> {plant.detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-4 space-y-4">
                    <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-1">Smart Planting Calendar</p>
                        <p id="detail-calendar-phase" className="text-sm font-bold text-slate-800">{selectedDetail.calendarPhase}</p>
                      </div>
                      <span id="detail-calendar-badge" className="inline-flex w-fit items-center gap-2 px-3 py-1 rounded-full bg-[#AEB784]/20 text-[#134332] text-xs font-bold border border-[#AEB784]/30">
                        <i className="fa-solid fa-seedling"></i>
                        {selectedDetail.calendarBadge}
                      </span>
                    </div>
                    <p id="detail-calendar-summary" className="text-xs text-slate-600 leading-relaxed">{selectedDetail.calendarSummary}</p>
                    <div className="space-y-3">
                      <div className="grid grid-cols-12 gap-1.5 items-end">
                        {selectedDetail.calendar.map((item) => (
                          <div key={`${item.month}-${item.title}`} className={`rounded-full ${item.highlight ? 'bg-[#AEB784]' : 'bg-slate-200'} h-6`} title={`${item.month}: ${item.title}`}></div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span>Jan</span><span>Mar</span><span>Mei</span><span>Jul</span><span>Sep</span><span>Nov</span>
                      </div>
                    </div>
                    <div id="detail-calendar" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
                      {selectedDetail.calendar.map((item) => (
                        <div key={`${item.month}-${item.title}-card`} className={`rounded-xl border p-3 ${item.highlight ? 'border-[#AEB784] bg-[#AEB784]/15 shadow-sm' : 'border-slate-200 bg-slate-50'}`}>
                          <p className={`text-[11px] uppercase tracking-wider font-bold mb-1 ${item.highlight ? 'text-[#134332]' : 'text-slate-500'}`}>{item.month}</p>
                          <p className={`text-xs font-bold ${item.highlight ? 'text-[#134332]' : 'text-slate-800'}`}>{item.title}</p>
                          <p className={`text-[11px] mt-1 leading-relaxed ${item.highlight ? 'text-[#134332]' : 'text-slate-500'}`}>{item.description}</p>
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-500">
                      <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#AEB784]"></span>Periode tanam optimal</div>
                      <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>Monitoring / persiapan</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-sm md:text-base font-bold text-slate-800 mb-2"><i className="fa-solid fa-cloud-arrow-down text-eco-green mr-2"></i>Estimasi Serapan Karbon</h3>
                    <p className="text-xs text-slate-500">Simulasi indikatif untuk area seluas <span className="font-bold text-slate-700">50 Ha</span> berdasarkan jenis vegetasi dominan.</p>
                  </div>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#AEB784]/20 text-[#134332] text-xs font-bold border border-[#AEB784]/30 whitespace-nowrap">
                    <i className="fa-solid fa-chart-line"></i>
                    Proyeksi 5 Tahun
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <p className="text-[11px] uppercase tracking-wider font-bold text-slate-500 mb-1">Serapan tahunan</p>
                    <p id="carbon-annual" className="text-lg font-bold text-slate-800">90 tCO₂e/tahun</p>
                    <p className="text-[11px] text-slate-500 mt-1">Asumsi 1,8 tCO₂e/ha/tahun</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <p className="text-[11px] uppercase tracking-wider font-bold text-slate-500 mb-1">Potensi 5 tahun</p>
                    <p id="carbon-5yr" className="text-lg font-bold text-slate-800">450 tCO₂e</p>
                    <p className="text-[11px] text-slate-500 mt-1">Akumulasi restorasi tahap awal</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <p className="text-[11px] uppercase tracking-wider font-bold text-slate-500 mb-1">Nilai indikatif</p>
                    <p id="carbon-value" className="text-lg font-bold text-slate-800">USD 3.600</p>
                    <p className="text-[11px] text-slate-500 mt-1">Estimasi dengan harga USD 8/tCO₂e</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-3">Asumsi perhitungan</p>
                    <ul className="space-y-2 text-xs text-slate-700 leading-relaxed">
                      <li className="flex items-start gap-2"><span className="w-2 h-2 rounded-full bg-[#AEB784] mt-1.5"></span><span>Jenis vegetasi dominan: mangrove campuran dengan tingkat kelangsungan tumbuh sedang-tinggi.</span></li>
                      <li className="flex items-start gap-2"><span className="w-2 h-2 rounded-full bg-[#AEB784] mt-1.5"></span><span>Serapan dihitung sebagai proyeksi awal, bukan angka kredit karbon tersertifikasi.</span></li>
                      <li className="flex items-start gap-2"><span className="w-2 h-2 rounded-full bg-[#AEB784] mt-1.5"></span><span>Nilai ekonomi hanya ilustrasi untuk presentasi awal dan perlu verifikasi lapangan.</span></li>
                    </ul>
                  </div>
                  <div className="h-64 relative rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <canvas ref={chartRef} id="specificCarbonChart"></canvas>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
              <h3 className="text-sm md:text-base font-bold text-slate-800 mb-6"><i className="fa-solid fa-lightbulb text-yellow-500 mr-2"></i>Rekomendasi Restorasi</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <button className="accordion-btn w-full flex items-center justify-between p-5 bg-slate-50 hover:bg-slate-100 transition text-left" type="button" onClick={() => setActiveAccordion(activeAccordion === 'plant' ? null : 'plant')}>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-2">Jenis Tanaman</p>
                      <p id="reco-plant-type" className="text-sm font-bold text-slate-800">{selectedDetail.plantType}</p>
                    </div>
                    <i className={`fa-solid fa-chevron-down text-slate-400 transition-transform ml-4 flex-shrink-0 ${activeAccordion === 'plant' ? 'rotate-180' : ''}`}></i>
                  </button>
                  <div className={`accordion-content ${activeAccordion === 'plant' ? '' : 'hidden'} p-5 bg-white border-t border-slate-200 text-xs text-slate-700 leading-relaxed`}>
                    <p id="reco-plant-desc">{selectedDetail.plantTypeDesc}</p>
                  </div>
                </div>
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <button className="accordion-btn w-full flex items-center justify-between p-5 bg-slate-50 hover:bg-slate-100 transition text-left" type="button" onClick={() => setActiveAccordion(activeAccordion === 'method' ? null : 'method')}>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-2">Metode Tanam</p>
                      <p id="reco-plant-method" className="text-sm font-bold text-slate-800">{selectedDetail.plantMethod}</p>
                    </div>
                    <i className={`fa-solid fa-chevron-down text-slate-400 transition-transform ml-4 flex-shrink-0 ${activeAccordion === 'method' ? 'rotate-180' : ''}`}></i>
                  </button>
                  <div className={`accordion-content ${activeAccordion === 'method' ? '' : 'hidden'} p-5 bg-white border-t border-slate-200 text-xs text-slate-700 leading-relaxed`}>
                    <p id="reco-method-desc">{selectedDetail.methodDesc}</p>
                  </div>
                </div>
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <button className="accordion-btn w-full flex items-center justify-between p-5 bg-slate-50 hover:bg-slate-100 transition text-left" type="button" onClick={() => setActiveAccordion(activeAccordion === 'edu' ? null : 'edu')}>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-2">Potensi Eduwisata</p>
                      <p id="reco-edu-value" className="text-sm font-bold text-slate-800">{selectedDetail.eduValue}</p>
                    </div>
                    <i className={`fa-solid fa-chevron-down text-slate-400 transition-transform ml-4 flex-shrink-0 ${activeAccordion === 'edu' ? 'rotate-180' : ''}`}></i>
                  </button>
                  <div className={`accordion-content ${activeAccordion === 'edu' ? '' : 'hidden'} p-5 bg-white border-t border-slate-200 text-xs text-slate-700 leading-relaxed`}>
                    <p id="reco-edu-desc">{selectedDetail.eduValueDesc}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
              <h3 className="text-sm md:text-base font-bold text-slate-800 mb-6"><i className="fa-solid fa-cloud-sun text-[#2A3663] mr-2"></i>Dashboard Informasi Lingkungan</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-lg p-4 border border-orange-200">
                  <div className="flex items-center justify-between mb-2"><p className="text-xs text-slate-600 uppercase tracking-wider font-bold">Suhu Rata-rata</p><i className="fa-solid fa-thermometer-half text-[#A82323] text-lg"></i></div>
                  <p id="env-temperature" className="text-2xl font-bold text-[#A82323]">{selectedDetail.temperature}</p>
                  <p className="text-xs text-[#A82323] mt-1">Kondisi hangat &amp; lembab</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center justify-between mb-2"><p className="text-xs text-slate-600 uppercase tracking-wider font-bold">Kelembaban</p><i className="fa-solid fa-droplet text-[#2A3663] text-lg"></i></div>
                  <p id="env-humidity" className="text-2xl font-bold text-[#2A3663]">{selectedDetail.humidity}</p>
                  <p className="text-xs text-slate-500 mt-1">Kelembaban tinggi</p>
                </div>
                <div className="bg-gradient-to-br from-cyan-50 to-cyan-100/50 rounded-lg p-4 border border-cyan-200">
                  <div className="flex items-center justify-between mb-2"><p className="text-xs text-slate-600 uppercase tracking-wider font-bold">Curah Hujan</p><i className="fa-solid fa-cloud-rain text-[#547A95] text-lg"></i></div>
                  <p id="env-rainfall" className="text-2xl font-bold text-[#547A95]">{selectedDetail.rainfall}</p>
                  <p className="text-xs text-slate-500 mt-1">Tahunan</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-lg p-4 border border-green-200">
                  <div className="flex items-center justify-between mb-2"><p className="text-xs text-slate-600 uppercase tracking-wider font-bold">Kecepatan Angin</p><i className="fa-solid fa-wind text-[#546B41] text-lg"></i></div>
                  <p id="env-wind" className="text-2xl font-bold text-[#546B41]">{selectedDetail.wind}</p>
                  <p className="text-xs text-[#C9CDCF] mt-1">Angin sedang</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <p className="text-xs text-slate-600 uppercase tracking-wider font-bold mb-3">Kualitas Tanah</p>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between mb-1"><span className="text-xs text-slate-600">pH Tanah</span><span id="env-soil-ph" className="text-xs font-bold text-slate-800">{selectedDetail.soilPh}</span></div>
                      <div className="w-full bg-slate-200 rounded-full h-2"><div className="bg-[#99AD7A] h-2 rounded-full" style={{ width: '72%' }}></div></div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1"><span className="text-xs text-slate-600">Kandungan Organik</span><span id="env-soil-organic" className="text-xs font-bold text-slate-800">{selectedDetail.soilOrganic}</span></div>
                      <div className="w-full bg-slate-200 rounded-full h-2"><div className="bg-[#C9996B] h-2 rounded-full" style={{ width: '65%' }}></div></div>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <p className="text-xs text-slate-600 uppercase tracking-wider font-bold mb-3">Kualitas Air</p>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between mb-1"><span className="text-xs text-slate-600">Salinitas</span><span id="env-water-salinity" className="text-xs font-bold text-slate-800">{selectedDetail.waterSalinity}</span></div>
                      <div className="w-full bg-slate-200 rounded-full h-2"><div className="bg-[#2A3663] h-2 rounded-full" style={{ width: '68%' }}></div></div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1"><span className="text-xs text-slate-600">Kejernihan</span><span id="env-water-clarity" className="text-xs font-bold text-slate-800">{selectedDetail.waterClarity}</span></div>
                      <div className="w-full bg-slate-200 rounded-full h-2"><div className="bg-[#9BB4C0] h-2 rounded-full" style={{ width: '55%' }}></div></div>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <p className="text-xs text-slate-600 uppercase tracking-wider font-bold mb-3">Kesehatan Vegetasi</p>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between mb-1"><span className="text-xs text-slate-600">NDVI Index</span><span id="env-ndvi" className="text-xs font-bold text-slate-800">{selectedDetail.ndvi}</span></div>
                      <div className="w-full bg-slate-200 rounded-full h-2"><div className="bg-[#546B41] h-2 rounded-full" style={{ width: '68%' }}></div></div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1"><span className="text-xs text-slate-600">Tutupan Vegetasi</span><span id="env-vegetation-cover" className="text-xs font-bold text-slate-800">{selectedDetail.vegetationCover}</span></div>
                      <div className="w-full bg-slate-200 rounded-full h-2"><div className="bg-[#99AD7A] h-2 rounded-full" style={{ width: '72%' }}></div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
