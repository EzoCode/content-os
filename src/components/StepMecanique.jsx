import { useState } from 'react'
import { formatMecaniques, genreBeats } from '../data/concepts'
import { SelectableCard } from './SelectableCard'

export function StepMecanique({ config, updateConfig }) {
  const [filter, setFilter] = useState('all')
  const [showBeats, setShowBeats] = useState(false)

  const categories = [...new Set(formatMecaniques.map(f => f.category))]

  const filtered = filter === 'all'
    ? formatMecaniques
    : formatMecaniques.filter(f => f.category === filter)

  return (
    <div className="space-y-6 pb-24">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-text-primary">Mécanique</h2>
        <p className="text-text-secondary">"Comment je filme / monte ?" — Le format de livraison</p>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-1.5 rounded-full text-sm transition-all ${
            filter === 'all' ? 'bg-accent text-white' : 'bg-bg-card border border-border text-text-secondary hover:text-text-primary'
          }`}
        >
          Tous
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-sm transition-all ${
              filter === cat ? 'bg-accent text-white' : 'bg-bg-card border border-border text-text-secondary hover:text-text-primary'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map(format => (
          <SelectableCard
            key={format.id}
            item={format}
            selected={config.formatMecanique?.id === format.id}
            onClick={(f) => updateConfig('formatMecanique', f)}
            compact
          />
        ))}
      </div>

      {config.formatMecanique && (
        <div className="bg-accent/10 border border-border-active rounded-xl p-4 text-center">
          <span className="text-accent-light text-sm">
            Mécanique : <strong>{config.formatMecanique.name}</strong> ({config.formatMecanique.category})
          </span>
        </div>
      )}

      {/* Genre Beats Booster */}
      <div className="border-t border-border pt-6">
        <button
          onClick={() => setShowBeats(!showBeats)}
          className="w-full text-center text-sm text-text-secondary hover:text-accent-light transition-all"
        >
          {showBeats ? '▼' : '▶'} Booster de Genre (optionnel) — Ajouter un beat narratif de genre
        </button>

        {showBeats && (
          <div className="fade-in mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
            {genreBeats.map(gb => (
              <button
                key={gb.id}
                onClick={() => updateConfig('genreBeat', config.genreBeat?.id === gb.id ? null : gb)}
                className={`text-left p-3 rounded-lg text-sm transition-all ${
                  config.genreBeat?.id === gb.id
                    ? 'bg-accent/20 text-accent-light border border-border-active'
                    : 'bg-bg-card border border-border text-text-secondary hover:text-text-primary'
                }`}
              >
                <span className="font-medium">{gb.genre} — {gb.beat}</span>
                <p className="text-xs text-text-muted mt-1">{gb.hook}</p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
