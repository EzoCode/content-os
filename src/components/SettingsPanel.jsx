import { useState } from 'react'
import { formatMecaniques, genreBeats } from '../data/concepts'

export function SettingsPanel({ apiKey, onSaveKey, formatMecanique, onSetFormat, genreBeat, onSetBeat }) {
  const [showFormats, setShowFormats] = useState(false)
  const [showBeats, setShowBeats] = useState(false)

  // Group formats by category
  const formatsByCategory = formatMecaniques.reduce((acc, f) => {
    if (!acc[f.category]) acc[f.category] = []
    acc[f.category].push(f)
    return acc
  }, {})

  // Group beats by genre
  const beatsByGenre = genreBeats.reduce((acc, gb) => {
    if (!acc[gb.genre]) acc[gb.genre] = []
    acc[gb.genre].push(gb)
    return acc
  }, {})

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
        {apiKey && !apiKey.startsWith('sk-ant-') && (
          <p className="text-xs text-warning mt-1">Le format attendu commence par sk-ant-...</p>
        )}
      </div>

      {/* Mécanique */}
      <div>
        <button
          onClick={() => setShowFormats(!showFormats)}
          className="text-sm text-text-secondary hover:text-text-primary transition-all"
        >
          {showFormats ? '▼' : '▶'} Mecanique {formatMecanique ? `: ${formatMecanique.emoji} ${formatMecanique.name}` : '(optionnel)'}
        </button>
        {showFormats && (
          <div className="fade-in mt-3 space-y-3">
            {formatMecanique && (
              <button
                onClick={() => onSetFormat(null)}
                className="text-xs text-text-muted hover:text-text-primary transition-all"
              >
                Retirer la selection
              </button>
            )}
            {Object.entries(formatsByCategory).map(([category, formats]) => (
              <div key={category}>
                <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">{category}</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1.5">
                  {formats.map(f => (
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
              </div>
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
          <div className="fade-in mt-3 space-y-3">
            {genreBeat && (
              <button
                onClick={() => onSetBeat(null)}
                className="text-xs text-text-muted hover:text-text-primary transition-all"
              >
                Retirer la selection
              </button>
            )}
            {Object.entries(beatsByGenre).map(([genre, beats]) => (
              <div key={genre}>
                <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">{genre}</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5">
                  {beats.map(gb => (
                    <button
                      key={gb.id}
                      onClick={() => onSetBeat(genreBeat?.id === gb.id ? null : gb)}
                      className={`text-left p-2 rounded-lg text-xs transition-all ${
                        genreBeat?.id === gb.id
                          ? 'bg-accent/20 text-accent-light border border-border-active'
                          : 'bg-bg-primary border border-border text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      <div className="font-medium">{gb.beat}</div>
                      <div className="text-text-muted mt-0.5 line-clamp-1">{gb.hook}</div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
