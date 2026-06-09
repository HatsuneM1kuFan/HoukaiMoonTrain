import { useState } from 'react'
import CharacterSelector from './components/CharacterSelector'
import characters from './data/Base_Kit.json'

function App() {
  const [activePage, setActivePage] = useState('select')
  const [roster, setRoster] = useState(Object.fromEntries(characters.map(char => [char.char_id, {character: char, lightcone: null, relics: null, planar: null}])))
  const [teams, setTeams] = useState({"Team 1": [null, null, null, null]})
  const [activeTeamId, setActiveTeamId] = useState("Team 1")
  const [selectedCharacter, setSelectedCharacter] = useState(null)
  const activeTeam = teams[activeTeamId]
  const pages = [
    { id: 'select', label: 'Team' },
    { id: 'kit', label: 'Kit' },
    { id: 'build', label: 'Build' },
  ]

  const setTeamSlot = (slotIndex, rosterEntry) => {
    setTeams(prev => ({
      ...prev,
      [activeTeamId]: prev[activeTeamId].map((slot,i) => i === slotIndex ? rosterEntry : slot)}))} // prev[activeTeamId] is the team we are changing a character in, if i == slotIndex (the slot we want to change), replace with rosterEntry, else keep same slot state.
    

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">HoukaiMoonTrain</h1>
          <p className="text-gray-500 text-sm mt-1">A Honkai: Star Rail Battle Simulator</p>
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
          roster = {roster}
          team = {activeTeam}
          setTeamSlot = {setTeamSlot}
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