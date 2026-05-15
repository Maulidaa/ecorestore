import './Home.css'

type HomeProps = {
  onGoToAnalisis: () => void
  onGoToWebGIS: () => void
}

export function Home({ onGoToAnalisis, onGoToWebGIS }: HomeProps) {
  return (
    <section id="home" className="hero-bg min-h-screen flex items-center justify-center text-white relative pt-20 md:pt-20">
      <div className="text-center px-4 md:px-6 max-w-4xl">
        <h1 className="hero-title text-3xl md:text-6xl mb-3 md:mb-4 leading-tight">EcoRestore-AI</h1>
        <p className="text-base md:text-xl leading-relaxed mb-6 md:mb-8">Data dan Teknologi untuk Alam yang Pulih Kembali</p>

        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-4">
          <button onClick={onGoToAnalisis} type="button" className="px-4 md:px-6 py-2 md:py-2.5 rounded-full bg-[#AEB784] hover:bg-[#134332] transition text-xs md:text-sm font-bold shadow-xl text-black">
            Mulai Analisis
          </button>
          <button onClick={onGoToWebGIS} type="button" className="px-4 md:px-6 py-2 md:py-2.5 rounded-full border border-white hover:bg-white hover:text-black transition text-xs md:text-sm">
            Lihat Peta WebGIS
          </button>
        </div>
      </div>

      <div className="absolute bottom-[-60px] md:bottom-[-50px] left-1/2 -translate-x-1/2 w-[95%] md:w-[90%] max-w-6xl px-2 md:px-0">
        <div className="bg-white rounded-xl md:rounded-2xl soft-shadow p-4 md:p-6 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 text-center">
          <div>
            <h2 className="text-xl md:text-3xl font-bold text-[#134332]">178</h2>
            <p className="mt-1 md:mt-2 text-xs text-gray-600">Hektar Abrasi</p>
          </div>
          <div>
            <h2 className="text-xl md:text-3xl font-bold text-[#134332]">68%</h2>
            <p className="mt-1 md:mt-2 text-xs text-gray-600">Vegetasi Hilang</p>
          </div>
          <div>
            <h2 className="text-xl md:text-3xl font-bold text-[#134332]">12</h2>
            <p className="mt-1 md:mt-2 text-xs text-gray-600">Zona Prioritas</p>
          </div>
          <div>
            <h2 className="text-xl md:text-3xl font-bold text-[#134332]">7.2K</h2>
            <p className="mt-1 md:mt-2 text-xs text-gray-600">Ton CO₂ Potensi</p>
          </div>
        </div>
      </div>
    </section>
  )
}
