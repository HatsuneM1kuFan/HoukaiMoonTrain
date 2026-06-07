import { useState } from 'react'
import CharacterSelector from './components/Chara_selector'

function App() {
  const [selectedCharacter, setSelectedCharacter] = useState(null)

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <h1 className="text-3xl font-bold text-yellow-400 mb-2">HoukaiMoonTrain</h1>
      <p className="text-gray-400 mb-8">HSR Build Simulator</p>

      <CharacterSelector
        selected={selectedCharacter}
        onSelect={setSelectedCharacter}
      />

      {selectedCharacter && (
        <div className="mt-8 p-4 bg-gray-900 rounded-lg">
          <h2 className="text-xl font-medium text-yellow-400">
            {selectedCharacter.display_name}
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            {selectedCharacter.element} · {selectedCharacter.path}
          </p>
          <div className="mt-4 grid grid-cols-4 gap-4">
            <div>
              <p className="text-gray-500 text-xs">HP</p>
              <p className="text-white font-medium">{selectedCharacter.base_stats.HP}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">ATK</p>
              <p className="text-white font-medium">{selectedCharacter.base_stats.ATK}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">DEF</p>
              <p className="text-white font-medium">{selectedCharacter.base_stats.DEF}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">SPD</p>
              <p className="text-white font-medium">{selectedCharacter.base_stats.SPD}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App