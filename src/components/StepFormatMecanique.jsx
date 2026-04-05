import { useState } from 'react'
import { formatMecaniques } from '../data/concepts'
import { SelectableCard } from './SelectableCard'

export function StepFormatMecanique({ config, updateConfig }) {
  const [filter, setFilter] = useState('all')

  const categories = [...new Set(formatMecaniques.map(f => f.category))]

  const filtered = filter === 'all'
    ? formatMecaniques
    : formatMecaniques.filter(f => f.category === filter)

  return (
    <div className="space-y-6 pb-24">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-text-primary">Format Mécanique</h2>
        <p className="text-text-secondary">Choisis le format visuel/mécanique de ta vidéo</p>
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
          />
        ))}
      </div>

      {config.formatMecanique && (
        <div className="bg-accent/10 border border-border-active rounded-xl p-4 text-center">
          <span className="text-accent-light text-sm">
            Sélectionné : <strong>{config.formatMecanique.name}</strong> ({config.formatMecanique.category})
          </span>
        </div>
      )}
    </div>
  )
}
