import { useState } from 'react'
import { formatMecaniques, genreBeats } from '../data/concepts'

export function SettingsPanel({ apiKey, onSaveKey, formatMecanique, onSetFormat, genreBeat, onSetBeat }) {
  const [showFormats, setShowFormats] = useState(false)
  const [showBeats, setShowBeats] = useState(false)

  const categories = [...new Set(formatMecaniques.map(f => f.category))]

  return (
    <div className="fade-in mb-6 space-y-4 bg-bg-card border border-border rounded-xl p-5">
      {/* API Key */}
      <div>
        <label className="text-sm font-medium text-text-secondary">Cle API Claude</label>
        <input
          type="password"
          value={apiKey}
          onChange={e => onSaveKey(e.target.value)}
          placeholder="sk-ant-..."
          className="mt-1 w-full bg-bg-primary border border-border rounded-lg px-4 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:border-border-active transition-all font-mono text-sm"
        />
      </div>

      {/* Mécanique */}
      <div>
        <button
          onClick={() => setShowFormats(!showFormats)}
          className="text-sm text-text-secondary hover:text-text-primary transition-all"
        >
          {showFormats ? '▼' : '▶'} Mecanique {formatMecanique ? `: ${formatMecanique.name}` : '(optionnel)'}
        </button>
        {showFormats && (
          <div className="fade-in mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {formatMecaniques.map(f => (
              <button
                key={f.id}
                onClick={() => onSetFormat(formatMecanique?.id === f.id ? null : f)}
                className={`text-left p-2 rounded-lg text-xs transition-all ${
                  formatMecanique?.id === f.id
                    ? 'bg-accent/20 text-accent-light border border-border-active'
                    : 'bg-bg-primary border border-border text-text-secondary hover:text-text-primary'
                }`}
              >
                <span>{f.emoji} {f.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Genre Beat */}
      <div>
        <button
          onClick={() => setShowBeats(!showBeats)}
          className="text-sm text-text-secondary hover:text-text-primary transition-all"
        >
          {showBeats ? '▼' : '▶'} Beat de Genre {genreBeat ? `: ${genreBeat.genre} - ${genreBeat.beat}` : '(optionnel)'}
        </button>
        {showBeats && (
          <div className="fade-in mt-2 grid grid-cols-2 md:grid-cols-3 gap-2">
            {genreBeats.map(gb => (
              <button
                key={gb.id}
                onClick={() => onSetBeat(genreBeat?.id === gb.id ? null : gb)}
                className={`text-left p-2 rounded-lg text-xs transition-all ${
                  genreBeat?.id === gb.id
                    ? 'bg-accent/20 text-accent-light border border-border-active'
                    : 'bg-bg-primary border border-border text-text-secondary hover:text-text-primary'
                }`}
              >
                <span className="font-medium">{gb.genre} - {gb.beat}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
