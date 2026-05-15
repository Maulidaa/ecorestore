import { useState } from 'react'
import { Home } from './pages/Home'
import { Docs } from './pages/Docs'
import { Community } from './pages/Community'
import './App.css'

type Page = 'home' | 'docs' | 'community'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')

  return (
    <>
      <nav style={{ 
        padding: '15px 30px', 
        background: '#fff',
        borderBottom: '2px solid var(--border)',
        display: 'flex',
        gap: '10px'
      }}>
        <button 
          onClick={() => setCurrentPage('home')}
          style={{ 
            padding: '8px 16px',
            fontSize: '16px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            background: currentPage === 'home' ? 'var(--accent)' : '#f0f0f0',
            color: currentPage === 'home' ? '#fff' : '#000',
            transition: 'all 0.3s'
          }}
        >
          Home
        </button>
        <button 
          onClick={() => setCurrentPage('docs')}
          style={{ 
            padding: '8px 16px',
            fontSize: '16px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            background: currentPage === 'docs' ? 'var(--accent)' : '#f0f0f0',
            color: currentPage === 'docs' ? '#fff' : '#000',
            transition: 'all 0.3s'
          }}
        >
          Docs
        </button>
        <button 
          onClick={() => setCurrentPage('community')}
          style={{ 
            padding: '8px 16px',
            fontSize: '16px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            background: currentPage === 'community' ? 'var(--accent)' : '#f0f0f0',
            color: currentPage === 'community' ? '#fff' : '#000',
            transition: 'all 0.3s'
          }}
        >
          Community
        </button>
      </nav>

      {currentPage === 'home' && <Home />}
      {currentPage === 'docs' && <Docs />}
      {currentPage === 'community' && <Community />}

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
