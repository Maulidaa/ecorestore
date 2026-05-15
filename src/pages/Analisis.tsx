import './Analisis.css'

export function Analisis() {
  return (
    <section id="analisis" className="py-24 md:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="section-title text-2xl md:text-4xl text-center text-eco-dark mb-12 md:mb-16">
          Bagaimana Analisis & AI Kami Bekerja
        </h2>
        
        <div className="grid md:grid-cols-3 gap-5 md:gap-7 mb-12 md:mb-16">
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="w-10 h-10 bg-eco-blue/10 text-eco-blue rounded-lg flex items-center justify-center text-lg mb-4">
              <i className="fa-solid fa-satellite-dish"></i>
            </div>
            <h3 className="text-sm md:text-base font-bold mb-3">Integrasi GEE & Satelit</h3>
            <p className="text-slate-800 text-sm leading-relaxed">
              Kami menggunakan Google Earth Engine (GEE) memproses citra Sentinel-1, Sentinel-2, dan Landsat. Sistem mendeteksi anomali vegetasi (NDVI) dan perubahan garis pantai (NDWI) di seluruh Indonesia secara otomatis.
            </p>
          </div>
          
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="w-10 h-10 bg-eco-green/10 text-eco-green rounded-lg flex items-center justify-center text-lg mb-4">
              <i className="fa-solid fa-network-wired"></i>
            </div>
            <h3 className="text-sm md:text-base font-bold mb-3">Machine Learning Pencocokan</h3>
            <p className="text-slate-800 text-sm leading-relaxed">
              Algoritma AI kami menganalisis data tanah, curah hujan, dan salinitas laut untuk merekomendasikan jenis pohon (mangrove atau terestrial) yang memiliki probabilitas hidup (survival rate) tertinggi.
            </p>
          </div>
          
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-slate-100">
            <div className="w-10 h-10 bg-amber-500/10 text-amber-500 rounded-lg flex items-center justify-center text-lg mb-4">
              <i className="fa-solid fa-calendar-days"></i>
            </div>
            <h3 className="text-sm md:text-base font-bold mb-3">Smart Calendar Universal</h3>
            <p className="text-slate-800 text-sm leading-relaxed">
              Mempertimbangkan anomali iklim global seperti El Niño/La Niña, AI merumuskan "Jendela Waktu Tanam" agar bibit terhindar dari gelombang pasang ekstrem atau kekeringan panjang.
            </p>
          </div>
        </div>

        <div className="bg-slate-900 rounded-xl p-5 md:p-6 text-white mt-8">
          <h3 className="text-base font-bold mb-5 text-center">Alur Pemrosesan Prioritisasi Restorasi</h3>
          <div className="flex flex-col md:flex-row items-center justify-between gap-2">
            <div className="text-center p-2">
              <i className="fa-solid fa-cloud-arrow-down text-xl text-eco-blue mb-2"></i>
              <p className="font-bold text-xs">Input Data Geospasial</p>
            </div>
            <i className="fa-solid fa-arrow-right text-slate-600 hidden md:block"></i>
            <div className="text-center p-2">
              <i className="fa-solid fa-layer-group text-xl text-eco-green mb-2"></i>
              <p className="font-bold text-xs">Klasifikasi Kerusakan</p>
            </div>
            <i className="fa-solid fa-arrow-right text-slate-600 hidden md:block"></i>
            <div className="text-center p-2">
              <i className="fa-solid fa-robot text-xl text-purple-400 mb-2"></i>
              <p className="font-bold text-xs">Rekomendasi AI</p>
            </div>
            <i className="fa-solid fa-arrow-right text-slate-600 hidden md:block"></i>
            <div className="text-center p-2">
              <i className="fa-solid fa-flag-checkered text-xl text-amber-400 mb-2"></i>
              <p className="font-bold text-xs">Skor Prioritas Output</p>
            </div>
          </div>
        </div>

        <div className="mt-14 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="section-title text-3xl md:text-4xl text-center mb-12">Morosari, Demak</h3>
            <p className="text-base text-gray-700 leading-relaxed mb-8">
              Abrasi di kawasan Morosari menyebabkan hilangnya vegetasi mangrove dan degradasi garis pantai secara signifikan dalam dua dekade terakhir.
            </p>
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-5 soft-shadow flex justify-between items-center">
                <div>
                  <h4 className="text-lg font-bold text-eco-dark">Mangrove Hilang</h4>
                  <p className="text-gray-500 mt-1 text-xs">Perubahan 2004 - 2024</p>
                </div>
                <div className="text-2xl font-bold text-red-500">-156 Ha</div>
              </div>
              <div className="bg-white rounded-xl p-5 soft-shadow flex justify-between items-center">
                <div>
                  <h4 className="text-lg font-bold text-eco-dark">Prioritas Restorasi</h4>
                  <p className="text-gray-500 mt-1 text-xs">Klasifikasi AI</p>
                </div>
                <div className="text-lg font-bold text-yellow-500">TINGGI</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop" className="rounded-2xl soft-shadow" alt="Morosari Demak" />
            <div className="absolute bottom-5 left-5 glass rounded-lg p-5 text-white">
              <h4 className="text-sm md:text-base font-bold mb-3">Rekomendasi AI</h4>
              <p className="leading-relaxed text-xs">
                Rhizophora mucronata sangat cocok untuk restorasi wilayah pesisir aktif.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
