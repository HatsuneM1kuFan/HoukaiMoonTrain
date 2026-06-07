import { useState } from 'react'
import CharacterSelector from './components/CharacterSelector'

function App() {
  const [activePage, setActivePage] = useState('select')
  const [team, setTeam] = useState([null, null, null, null])
  const [selectedCharacter, setSelectedCharacter] = useState(null)

  const pages = [
    { id: 'select', label: 'Team' },
    { id: 'kit', label: 'Kit' },
    { id: 'build', label: 'Build' },
  ]

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">HoukaiMoonTrain</h1>
          <p className="text-gray-500 text-sm mt-1">HSR Build Simulator</p>
        </div>
        <nav className="flex gap-1">
          {pages.map(page => (
            <button
              key={page.id}
              onClick={() => setActivePage(page.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activePage === page.id
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {page.label}
            </button>
          ))}
        </nav>
      </div>

      {activePage === 'select' && (
        <CharacterSelector
          team={team}
          setTeam={setTeam}
          selectedCharacter={selectedCharacter}
          setSelectedCharacter={setSelectedCharacter}
        />
      )}
      {activePage === 'kit' && (
        <div className="text-gray-500 italic text-sm">Kit page coming soon</div>
      )}
      {activePage === 'build' && (
        <div className="text-gray-500 italic text-sm">Build page coming soon</div>
      )}
    </div>
  )
}

export default App