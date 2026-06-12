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

export default function CharacterSelector({ roster, team, setTeamSlot, setActiveTeamId, handleAddTeam, teams, activeTeamId, handleTabSwitch }) {
  
  const [search, setSearch] = useState('')

  const handleCharacterClick = (entry) => {
    const emptySlot = team.findIndex(slot => slot === null)
    if (emptySlot === -1) return
    if (team.some(slot => slot?.character.char_id === entry.character.char_id)) return
    setTeamSlot(emptySlot, entry)
  }
  
  return (
    <div className = "flex gap-4 h-screen">
      <div className = "w-64">
        <input className = "w-full bg-gray-900 border border-gray-800 rounded-1g px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gray-600"
          type = "text"
          placeholder = "Search..."
          value = {search}
          onChange = {e => setSearch(e.target.value)}
          />
        <div className = "grid grid-cols-3 gap-2 overflow-y-auto mt-2 p-1">
          {Object.values(roster).filter(entry => 
            entry.character.display_name.toLowerCase().includes(search.toLowerCase())
          ).map(entry => {
            const inTeam = team.some(slot => slot?.character.char_id === entry.character.char_id)
            return (
              <div key = {entry.character.char_id} onClick = {() => handleCharacterClick(entry)}>
                <img
                  src = {`/images/${entry.character.char_id}_icon.webp`}
                  alt = {entry.character.display_name}
                  className = {`w-full aspect-square object-cover rounded-1g ${inTeam ? 'ring-2 ring-white' : ''}`}
                />
                <p className = "text-xs text-center text-white mt-1">{entry.character.display_name}</p>
              </div>
            )
          })}
        </div>
      </div>
      <div className = "flex-1">
          <div className = "flex gap-2 mb-2">
            {Object.keys(teams).map(teamId => (
              <button key={teamId} onClick={() => handleTabSwitch(teamId)} className = {`px-3 py-1 rounded-lg text-sm ${activeTeamId === teamId ? 'bg-gray-400 text-white' : 'bg-gray-800 text-gray-400'}`} >
              {teamId} 
              </button>            
            ))}
            <button onClick={handleAddTeam} clasName = "px-3 py-1 rounded-lg bg-gray-700 text-white text-sm">
              +
            </button>
          </div>
          <div className = "grid grid-cols-4 gap-2 mt-2">
            {team.map((slot, i) => (
              <div key = {i} className = "h-192 bg-gray-900 rounded-xl flex flex-col border border-gray-800" onClick = {() => slot ? setTeamSlot(i, null) : null}>
                <div className="h-128 flex items-center justify-center">
                  
                  {slot ? (<img src = {`/images/${slot.character.char_id}.webp`} className = "w-full h-full object-cover"/>) : (<div className = "relative"> <img src = {`images/empty_slot.png`} className = "h-16 w-16 object-center"/> <p className = "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] text-xl text-black leading-none">+</p></div> )}
                </div>
                <div className = "h-64 flex items-center justify-center border-t border-gray-800">
                  <div className = "relative"> <img src = {`images/empty_slot.png`} className = "h-16 w-16 object-center"/> <p className = "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] text-xl text-black leading-none">+</p></div>
                </div>
              </div>
            ))}
          </div>
      </div>
    </div>
  )
}

