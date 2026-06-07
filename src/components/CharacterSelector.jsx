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

const ABILITY_TABS = ['basic_atk', 'skill', 'ultimate', 'talent', 'technique']

const TAB_LABELS = {
  basic_atk: 'Basic',
  skill: 'Skill',
  ultimate: 'Ultimate',
  talent: 'Talent',
  technique: 'Technique',
}

const ENHANCED_MAP = {
  basic_atk: 'enhanced_basic_atk',
  skill: 'enhanced_skill',
}

function ElementDot({ element }) {
  return (
    <span
      className="inline-block w-2 h-2 rounded-full flex-shrink-0"
      style={{ backgroundColor: ELEMENT_COLORS[element] ?? '#888' }}
    />
  )
}

function AbilityPanel({ character, activeTab }) {
  if (!character) {
    return (
      <div className="flex items-center justify-center h-full text-gray-600 text-sm italic">
        Select a character to view kit
      </div>
    )
  }

  const abilities = character.kit?.abilities ?? {}
  const ability = abilities[activeTab]
  const enhancedKey = ENHANCED_MAP[activeTab]
  const enhanced = enhancedKey ? abilities[enhancedKey] : null

  if (!ability) {
    return (
      <div className="flex items-center justify-center h-full text-gray-600 text-sm italic">
        No data for this ability
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5 overflow-y-auto pr-1">
      <AbilityBlock ability={ability} character={character} />
      {enhanced && (
        <>
          <div className="flex items-center gap-2">
            <div className="h-px flex-1 bg-gray-800" />
            <span className="text-xs text-gray-500 uppercase tracking-widest">Enhanced</span>
            <div className="h-px flex-1 bg-gray-800" />
          </div>
          <AbilityBlock ability={enhanced} character={character} isEnhanced />
        </>
      )}
    </div>
  )
}

function AbilityBlock({ ability, character, isEnhanced = false }) {
  const element = character.element
  const accentColor = ELEMENT_COLORS[element] ?? '#888'

  return (
    <div
      className="rounded-lg p-4 flex flex-col gap-3"
      style={{
        background: isEnhanced
          ? `linear-gradient(135deg, rgba(30,30,40,0.9), rgba(20,20,30,0.9))`
          : `linear-gradient(135deg, rgba(20,20,30,0.9), rgba(15,15,25,0.9))`,
        border: `1px solid ${isEnhanced ? accentColor + '44' : '#ffffff12'}`,
      }}
    >
      <div className="flex items-start gap-2">
        {isEnhanced && (
          <span
            className="text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 mt-0.5"
            style={{ background: accentColor + '22', color: accentColor, border: `1px solid ${accentColor}44` }}
          >
            Enhanced
          </span>
        )}
        <h3 className="text-white font-semibold text-sm leading-snug">{ability.name}</h3>
      </div>

      <p className="text-gray-400 text-xs leading-relaxed">{ability.description}</p>

    </div>
  )
}

function TeamSlot({ character, slotIndex, onRemove, onDrop, onDragOver }) {
  const accentColor = character ? (ELEMENT_COLORS[character.element] ?? '#888') : null

  return (
    <div
      className="relative flex flex-col items-center gap-2 rounded-xl p-3 transition-all duration-200 cursor-pointer group"
      style={{
        background: character
          ? `linear-gradient(160deg, ${accentColor}18, rgba(15,15,25,0.95))`
          : 'rgba(255,255,255,0.03)',
        border: character ? `1px solid ${accentColor}44` : '1px dashed rgba(255,255,255,0.1)',
        minHeight: '100px',
      }}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, slotIndex)}
    >
      {character ? (
        <>
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0"
            style={{ background: accentColor + '33', border: `2px solid ${accentColor}66` }}
          >
            {character.display_name[0]}
          </div>
          <div className="text-center">
            <p className="text-white text-xs font-semibold leading-tight">{character.display_name}</p>
            <p className="text-xs mt-0.5" style={{ color: accentColor }}>{character.element}</p>
          </div>
          <button
            onClick={() => onRemove(slotIndex)}
            className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-gray-800 text-gray-500 hover:text-red-400 hover:bg-gray-700 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            ×
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center gap-1 py-2">
          <div className="w-8 h-8 rounded-full border border-dashed border-gray-700 flex items-center justify-center text-gray-600 text-lg">+</div>
          <p className="text-gray-600 text-xs">Slot {slotIndex + 1}</p>
        </div>
      )}
    </div>
  )
}

export default function CharacterSelector({ team, setTeam, selectedCharacter, setSelectedCharacter }) {
  const [activeCharacter, setActiveCharacter] = useState(selectedCharacter)
  const [activeTab, setActiveTab] = useState('basic_atk')
  const [search, setSearch] = useState('')

  const filtered = characters.filter(c =>
    c.display_name.toLowerCase().includes(search.toLowerCase()) ||
    c.element?.toLowerCase().includes(search.toLowerCase()) ||
    c.path?.toLowerCase().includes(search.toLowerCase())
  )

  function handleCharacterClick(character) {
    setActiveCharacter(character)
    setActiveTab('basic_atk')
    onCharacterSelect?.(character)
  }

  function handleAddToTeam(character) {
    if (team.some(s => s?.char_id === character.char_id)) return
    const emptySlot = team.findIndex(s => s === null)
    if (emptySlot === -1) return
    const next = [...team]
    next[emptySlot] = character
    setTeam(next)
  }

  function handleRemoveFromTeam(slotIndex) {
    const next = [...team]
    next[slotIndex] = null
    setTeam(next)
  }

  function handleDragStart(e, character) {
    e.dataTransfer.setData('char_id', character.char_id)
  }

  function handleDrop(e, slotIndex) {
    const charId = e.dataTransfer.getData('char_id')
    const character = characters.find(c => c.char_id === charId)
    if (!character) return
    if (team.some((s, i) => s?.char_id === charId && i !== slotIndex)) return
    const next = [...team]
    next[slotIndex] = character
    setTeam(next)
  }

  function handleDragOver(e) {
    e.preventDefault()
  }

  const accentColor = activeCharacter ? (ELEMENT_COLORS[activeCharacter.element] ?? '#888') : '#6366f1'

  return (
    <div className="flex gap-3 h-[600px]">

      {/* LEFT: Character roster */}
      <div className="w-52 flex flex-col gap-2 flex-shrink-0">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gray-600"
          />
        </div>
        <div className="flex-1 overflow-y-auto flex flex-col gap-1 pr-1">
          {filtered.map(character => {
            const isActive = activeCharacter?.char_id === character.char_id
            const inTeam = team.some(s => s?.char_id === character.char_id)
            const elemColor = ELEMENT_COLORS[character.element] ?? '#888'
            return (
              <div
                key={character.char_id}
                draggable
                onDragStart={e => handleDragStart(e, character)}
                onClick={() => handleCharacterClick(character)}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-150 select-none"
                style={{
                  background: isActive
                    ? `linear-gradient(90deg, ${elemColor}22, transparent)`
                    : 'transparent',
                  border: isActive ? `1px solid ${elemColor}44` : '1px solid transparent',
                }}
              >
                <ElementDot element={character.element} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate leading-tight">{character.display_name}</p>
                  <p className="text-xs text-gray-500 truncate">{character.path?.replace('The ', '')}</p>
                </div>
                {inTeam && (
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: elemColor }} />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* CENTER: Team lineup */}
      <div className="w-44 flex flex-col gap-2 flex-shrink-0">
        <p className="text-xs text-gray-500 uppercase tracking-widest px-1">Team</p>
        <div className="flex flex-col gap-2 flex-1">
          {team.map((character, i) => (
            <TeamSlot
              key={i}
              character={character}
              slotIndex={i}
              onRemove={handleRemoveFromTeam}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            />
          ))}
        </div>
        {activeCharacter && !team.some(s => s?.char_id === activeCharacter.char_id) && (
          <button
            onClick={() => handleAddToTeam(activeCharacter)}
            className="w-full py-2 rounded-lg text-xs font-medium transition-colors"
            style={{
              background: accentColor + '22',
              border: `1px solid ${accentColor}44`,
              color: accentColor,
            }}
          >
            + Add {activeCharacter.display_name}
          </button>
        )}
      </div>

      {/* RIGHT: Kit reader */}
      <div className="flex-1 flex flex-col gap-2 min-w-0">
        {/* Character header */}
        <div
          className="rounded-xl px-4 py-3 flex items-center gap-3"
          style={{
            background: activeCharacter
              ? `linear-gradient(90deg, ${accentColor}18, transparent)`
              : 'rgba(255,255,255,0.02)',
            border: `1px solid ${activeCharacter ? accentColor + '33' : '#ffffff0a'}`,
          }}
        >
          {activeCharacter ? (
            <>
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                style={{ background: accentColor + '33', border: `2px solid ${accentColor}66`, color: accentColor }}
              >
                {activeCharacter.display_name[0]}
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{activeCharacter.display_name}</p>
                <p className="text-xs" style={{ color: accentColor }}>
                  {activeCharacter.element} · {activeCharacter.path?.replace('The ', '')}
                </p>
              </div>
              <div className="ml-auto flex gap-3">
                {['HP','ATK','DEF','SPD'].map(stat => (
                  <div key={stat} className="text-center">
                    <p className="text-gray-500 text-xs">{stat}</p>
                    <p className="text-white text-xs font-mono font-medium">
                      {Math.round(activeCharacter.base_stats?.[stat] ?? 0)}
                    </p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-gray-600 text-sm italic">No character selected</p>
          )}
        </div>

        {/* Ability tabs */}
        <div className="flex gap-1">
          {ABILITY_TABS.map(tab => {
            const isActive = activeTab === tab
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150"
                style={{
                  background: isActive ? accentColor + '22' : 'transparent',
                  border: isActive ? `1px solid ${accentColor}44` : '1px solid transparent',
                  color: isActive ? accentColor : '#6b7280',
                }}
              >
                {TAB_LABELS[tab]}
              </button>
            )
          })}
        </div>

        {/* Ability content */}
        <div
          className="flex-1 rounded-xl p-4 overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <AbilityPanel character={activeCharacter} activeTab={activeTab} />
        </div>

        {/* Major traces */}
        {activeCharacter?.kit?.major_traces && (
          <div className="flex gap-2">
            {Object.entries(activeCharacter.kit.major_traces).map(([key, trace]) => (
              <div
                key={key}
                className="flex-1 rounded-lg px-3 py-2"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <p className="text-xs font-medium text-gray-300 truncate">{trace.name}</p>
                <p className="text-xs text-gray-500 mt-0.5 uppercase tracking-wider">A{trace.ascension_required}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
