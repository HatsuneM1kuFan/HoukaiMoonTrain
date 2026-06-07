import characters from '../data/Base_Kit.json'

function CharacterSelector({ selected, onSelect }) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-medium text-white">Select Character</h2>
      <div className="flex flex-wrap gap-3">
        {characters.map((character) => (
          <button
            key={character.id}
            onClick={() => onSelect(character)}
            className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors
              ${selected?.id === character.id
                ? 'bg-yellow-400 text-gray-950 border-yellow-400'
                : 'bg-gray-800 text-gray-300 border-gray-700 hover:border-yellow-400 hover:text-yellow-400'
              }`}
          >
            {character.display_name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CharacterSelector