import './Navbar.css'
import { useState } from 'react'

type Page = 'home' | 'dashboard' | 'webgis' | 'analisis' | 'karbon'

type NavbarProps = {
  currentPage: Page
  setCurrentPage: (page: Page) => void
}

export function Navbar({ currentPage, setCurrentPage }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigate = (page: Page) => {
    setCurrentPage(page)
    setIsMobileMenuOpen(false)
  }

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, page: Page) => {
    event.preventDefault()
    navigate(page)
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 md:py-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg gradient-green flex items-center justify-center text-white text-lg">
              <i className="fa-solid fa-seedling"></i>
            </div>
            <h1 className="text-xl font-bold text-[#134332]">EcoRestore-AI</h1>
          </div>

          <button
            id="mobile-menu-btn"
            type="button"
            className="md:hidden w-10 h-10 rounded-lg border border-slate-300 text-slate-700 flex items-center justify-center"
            aria-label="Buka menu"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((current) => !current)}
          >
            <i className="fa-solid fa-bars"></i>
          </button>

          <div className="hidden md:flex items-center justify-end gap-8 text-sm ml-auto">
            <a href="#home" onClick={(event) => handleLinkClick(event, 'home')} className={`nav-link hover:text-[#134332] transition ${currentPage === 'home' ? 'active' : ''}`}>
              Beranda
            </a>
            <a href="#dashboard" onClick={(event) => handleLinkClick(event, 'dashboard')} className={`nav-link hover:text-[#134332] transition ${currentPage === 'dashboard' ? 'active' : ''}`}>
              Fitur
            </a>
            <a href="#webgis" onClick={(event) => handleLinkClick(event, 'webgis')} className={`nav-link hover:text-[#134332] transition ${currentPage === 'webgis' ? 'active' : ''}`}>
              WebGIS
            </a>
            <a href="#analisis" onClick={(event) => handleLinkClick(event, 'analisis')} className={`nav-link hover:text-[#134332] transition ${currentPage === 'analisis' ? 'active' : ''}`}>
              Analisis AI
            </a>
            <a href="#karbon" onClick={(event) => handleLinkClick(event, 'karbon')} className={`nav-link hover:text-[#134332] transition ${currentPage === 'karbon' ? 'active' : ''}`}>
              Karbon
            </a>
          </div>
        </div>

        <div id="mobile-menu" className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden mt-3 pt-3 border-t border-slate-200`}>
          <div className="flex flex-col gap-2 text-sm text-slate-700">
            <a href="#home" onClick={(event) => handleLinkClick(event, 'home')} className="mobile-nav-link nav-link hover:text-[#134332] transition py-1 text-left">
              Beranda
            </a>
            <a href="#dashboard" onClick={(event) => handleLinkClick(event, 'dashboard')} className="mobile-nav-link nav-link hover:text-[#134332] transition py-1 text-left">
              Fitur
            </a>
            <a href="#webgis" onClick={(event) => handleLinkClick(event, 'webgis')} className="mobile-nav-link nav-link hover:text-[#134332] transition py-1 text-left">
              WebGIS
            </a>
            <a href="#analisis" onClick={(event) => handleLinkClick(event, 'analisis')} className="mobile-nav-link nav-link hover:text-[#134332] transition py-1 text-left">
              Analisis AI
            </a>
            <a href="#karbon" onClick={(event) => handleLinkClick(event, 'karbon')} className="mobile-nav-link nav-link hover:text-[#134332] transition py-1 text-left">
              Karbon
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
