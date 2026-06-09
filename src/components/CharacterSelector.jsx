import { useState } from 'react'
import characters from '../data/Base_Kit.json'

const ELEMENT_COLORS = {
  'Fire': '#ef4444',
  'Ice': '#60a5fa',
  'Lightning': '#a78bfa',
  'Wind': '#34d399',
  'Quantum': '#818cf8',
  'Imaginary': '#fbbf24',
  'Physical': '#d1d5db',
}

export default function CharacterSelector({ roster, team, setTeamSlot }) {
  
  const [search, setSearch] = useState('')
  
  return (
    <div className = "flex gap-4 h-screen">
      <div className = "w-64">
        <input className = "w-full bg-gray-900 border border-gray-800 rounded-1g px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gray-600"
          type = "text"
          placeholder = "Search..."
          value = {search}
          onChange = {e => setSearch(e.target.value)}
          />
        <div className = "grid grid-cols-3 gap-2 overflow-y-auto mt-2">
          {Object.values(roster).map(entry => (
            <div key = {entry.character.char_id}>
              <img
                src = {`/images/${entry.character.char_id}_icon.webp`}
                alt = {entry.character.display_name}
                className = "w-full aspect-square object-cover rounded-1g"
              />
              <p className = "text-xs text-center text-white mt-1">{entry.character.display_name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className = "flex-1">

      </div>
    </div>
  )
}

