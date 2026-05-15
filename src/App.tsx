import { useEffect, useState } from 'react'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { Dashboard } from './pages/Dashboard'
import { WebGIS } from './pages/WebGIS.tsx'
import { Analisis } from './pages/Analisis'
import { Karbon } from './pages/Karbon'
import './App.css'

type Page = 'home' | 'dashboard' | 'webgis' | 'analisis' | 'karbon'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visibleEntry?.target.id) {
          setCurrentPage(visibleEntry.target.id as Page)
        }
      },
      {
        root: null,
        threshold: [0.2, 0.35, 0.5],
        rootMargin: '-18% 0px -62% 0px',
      }
    )

    const sectionIds: Page[] = ['home', 'dashboard', 'webgis', 'analisis', 'karbon']
    sectionIds.forEach((sectionId) => {
      const element = document.getElementById(sectionId)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [])

  const handleNavigate = (page: Page) => {
    setCurrentPage(page)

    const element = document.getElementById(page)
    if (!element) {
      return
    }

    const navbarOffset = 96
    const top = window.scrollY + element.getBoundingClientRect().top - navbarOffset
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-[#F5F7F4]">
      <Navbar currentPage={currentPage} setCurrentPage={handleNavigate} />
      
      <main>
        <Home onGoToAnalisis={() => handleNavigate('analisis')} onGoToWebGIS={() => handleNavigate('webgis')} />
        <Dashboard />
        <WebGIS />
        <Analisis />
        <Karbon />
      </main>

      <Footer />
    </div>
  )
}

export default App
