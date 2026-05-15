import './Dashboard.css'

export function Dashboard() {
  return (
    <section id="dashboard" className="pt-32 md:pt-44 pb-24 md:pb-32 dashboard-bg">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="section-title text-2xl md:text-4xl text-center mb-12 md:mb-16">Fitur</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="glass rounded-2xl p-5 md:p-7 soft-shadow">
              <div className="flex justify-between items-center mb-5 flex-col md:flex-row gap-4">
                <div>
                  <h3 className="text-base md:text-xl font-bold">Peta Pemantauan Deforestasi</h3>
                  <p className="text-gray-800 mt-2 text-xs md:text-sm">Monitoring perubahan vegetasi dan abrasi pesisir</p>
                </div>
                <div className="bg-[#AF3E3E] px-4 py-1 rounded-full text-xs font-bold whitespace-nowrap text-white">Prioritas Tinggi</div>
              </div>
              <div className="map-box rounded-xl h-48 md:h-56 relative overflow-hidden">
                <div className="absolute top-4 left-4 glass p-4 rounded-lg text-xs text-white">
                  <h4 className="font-bold mb-3">Layer Peta</h4>
                  <div className="space-y-3 text-xs">
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded-full"></div>Mangrove</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded-full"></div>Abrasi</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-yellow-400 rounded-full"></div>Vegetasi Darat</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12 md:mb-16">
              <div className="glass rounded-xl p-5 card-hover soft-shadow">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-[#134332] flex items-center justify-center text-lg icon-white">
                    <i className="fa-solid fa-leaf"></i>
                  </div>
                  <h3 className="text-base md:text-lg font-bold">AI Restorasi</h3>
                </div>
                <p className="leading-relaxed text-gray-800 text-sm">
                  Sistem memberikan rekomendasi tanaman dan metode restorasi berdasarkan karakteristik wilayah.
                </p>
              </div>

              <div className="glass rounded-xl p-5 card-hover soft-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#AEB784] flex items-center justify-center text-lg">
                    <i className="fa-solid fa-cloud-rain text-eco-blue rounded-lg"></i>
                  </div>
                  <h3 className="text-base md:text-lg font-bold">Smart Planting</h3>
                </div>
                <p className="leading-relaxed text-gray-800 text-sm">
                  Menentukan waktu tanam optimal berdasarkan cuaca, musim, dan curah hujan.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-10 mt-10 md:mt-12">
            <div className="glass rounded-2xl p-6 md:p-7 soft-shadow">
              <h3 className="text-base md:text-lg font-bold mb-7 md:mb-8">Sistem Prioritas</h3>
              <div className="space-y-6">
                <div className="flex gap-3 items-start">
                  <div className="w-9 h-9 rounded-full bg-red-500 flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                  <div>
                    <h4 className="text-base font-bold">Prioritas Tinggi</h4>
                    <p className="text-gray-800 mt-0.5 text-xs">Kerusakan &gt;60% dan abrasi aktif.</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="w-9 h-9 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                  <div>
                    <h4 className="text-base font-bold">Prioritas Sedang</h4>
                    <p className="text-gray-800 mt-0.5 text-xs">Degradasi vegetasi awal.</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                  <div>
                    <h4 className="text-base font-bold">Prioritas Rendah</h4>
                    <p className="text-gray-800 mt-0.5 text-xs">Fokus pemeliharaan ekosistem.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
