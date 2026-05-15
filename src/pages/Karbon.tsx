import { useEffect, useRef } from 'react'
import './Karbon.css'

export function Karbon() {
  const generalChartRef = useRef<HTMLCanvasElement | null>(null)
  const abrasionChartRef = useRef<HTMLCanvasElement | null>(null)
  const generalChartInstanceRef = useRef<any>(null)
  const abrasionChartInstanceRef = useRef<any>(null)

  useEffect(() => {
    const Chart = (window as Window & { Chart?: any }).Chart
    if (!Chart) return

    if (generalChartRef.current) {
      Chart.getChart(generalChartRef.current)?.destroy()

      generalChartInstanceRef.current = new Chart(generalChartRef.current, {
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

    if (abrasionChartRef.current) {
      Chart.getChart(abrasionChartRef.current)?.destroy()

      abrasionChartInstanceRef.current = new Chart(abrasionChartRef.current, {
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
          scales: {
            y: { beginAtZero: true, ticks: { font: { size: 11 } } },
            x: { ticks: { font: { size: 11 } } },
          },
        },
      })
    }

    return () => {
      generalChartInstanceRef.current?.destroy()
      abrasionChartInstanceRef.current?.destroy()
      generalChartInstanceRef.current = null
      abrasionChartInstanceRef.current = null
    }
  }, [])

  return (
    <section id="karbon" className="py-20 md:py-24 dashboard-bg">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="section-title text-2xl md:text-4xl text-center mb-10 md:mb-14">
          Estimasi Karbon Global & Eduwisata
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          <div className="lg:col-span-2 glass rounded-2xl p-5 md:p-7">
            <h3 className="text-base md:text-lg font-bold mb-6 md:mb-8">Target Serapan Karbon Nasional</h3>
            <div className="h-56 md:h-72 relative">
              <canvas id="generalCarbonChart" ref={generalChartRef}></canvas>
            </div>
          </div>

          <div className="gradient-green rounded-2xl p-5 md:p-7 soft-shadow text-white">
            <h3 className="text-lg md:text-2xl font-bold mb-5 md:mb-7">Eduwisata Ekosistem</h3>
            <p className="leading-relaxed text-xs md:text-sm mb-6 md:mb-8">
              Platform membuka peluang wisata edukasi dan simulasi restorasi berbasis masyarakat.
            </p>
            <div className="space-y-4 md:space-y-5 text-xs md:text-sm">
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-circle-check"></i>
                Jalur Tracking Mangrove
              </div>
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-circle-check"></i>
                Program Adopsi Pohon
              </div>
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-circle-check"></i>
                Pusat Edukasi Flora & Fauna
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 md:mt-18">
          <h3 className="text-base md:text-lg font-bold mb-7 md:mb-8">Statistik Abrasi Pesisir Nasional</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-7">
            <div className="p-5 md:p-6 bg-gradient-to-br from-red-500/20 to-orange-500/10 rounded-xl border border-red-400/30">
              <p className="text-xs uppercase tracking-wider font-bold mb-3 md:mb-4">Total Area Abrasi Aktif</p>
              <p className="text-xl md:text-3xl font-bold">73 Ha</p>
              <p className="text-xs mt-3 md:mt-4">Area pesisir yang mengalami degradasi garis pantai</p>
            </div>
            
            <div className="p-5 md:p-6 bg-gradient-to-br from-yellow-500/20 to-orange-500/10 rounded-xl border border-yellow-400/30">
              <p className="text-xs  uppercase tracking-wider font-bold mb-3 md:mb-4">Rata-rata Laju Abrasi</p>
              <p className="text-xl md:text-3xl font-bold">1.8 m/thn</p>
              <p className="text-xs mt-3 md:mt-4">Perubahan garis pantai per tahun</p>
            </div>
            
            <div className="p-5 md:p-6 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 rounded-xl border border-blue-400/30">
              <p className="text-xs uppercase tracking-wider font-bold mb-3 md:mb-4">Laju Maksimal</p>
              <p className="text-xl md:text-3xl font-bold">3.2 m/thn</p>
              <p className="text-xs mt-3 md:mt-4">Di zona prioritas (pesisir utara Jawa)</p>
            </div>
          </div>

          <div className="mt-8 md:mt-10 glass rounded-2xl p-4 md:p-6">
            <h3 className="text-sm md:text-base font-bold mb-2">Tren Perubahan Abrasi (2015-2024)</h3>
            <p className="text-xs text-gray-800 mb-4 md:mb-5">Proyeksi panjang garis pantai yang terdampak per tahun dalam periode 10 tahun.</p>
            <div className="h-56 md:h-64 relative">
              <canvas id="abrasionTrendChart" ref={abrasionChartRef}></canvas>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
