import { useState } from 'react'
import { formatMecaniques } from '../data/concepts'
import { SelectableCard } from './SelectableCard'

export function StepFormatMecanique({ config, updateConfig }) {
  const [filter, setFilter] = useState('all')

  const categories = [...new Set(formatMecaniques.map(f => f.category))]

  const filtered = filter === 'all'
    ? formatMecaniques
    : formatMecaniques.filter(f => f.category === filter)

  // Get recommended formats based on psycho concept's bestWith
  const recommended = config.psychoConcept?.bestWith || []

  return (
    <div className="space-y-6 pb-24">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-text-primary">Format Mécanique</h2>
        <p className="text-text-secondary">Choisis le format visuel/mécanique de ta vidéo</p>
      </div>

      {recommended.length > 0 && (
        <div className="bg-success/5 border border-success/20 rounded-xl p-4">
          <div className="text-success text-xs font-medium mb-2">
            Formats recommandés pour "{config.psychoConcept?.name}" :
          </div>
          <div className="flex flex-wrap gap-2">
            {formatMecaniques.filter(f => recommended.includes(f.id)).map(f => (
              <button
                key={f.id}
                onClick={() => updateConfig('formatMecanique', f)}
                className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                  config.formatMecanique?.id === f.id
                    ? 'bg-success/20 text-success border border-success/40'
                    : 'bg-bg-card border border-success/20 text-text-secondary hover:text-success hover:border-success/40'
                }`}
              >
                {f.emoji} {f.name}
              </button>
            ))}
          </div>
        </div>
      )}

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
        <div className="bg-accent/10 border border-border-active rounded-xl p-5 space-y-2">
          <div className="text-accent-light text-sm font-semibold">
            {config.formatMecanique.emoji} {config.formatMecanique.name}
            <span className="text-text-muted font-normal text-xs ml-2">{config.formatMecanique.category}</span>
            {config.formatMecanique.effort && (
              <span className="ml-2 px-2 py-0.5 bg-bg-card text-text-muted text-xs rounded-full">Effort : {config.formatMecanique.effort}</span>
            )}
          </div>
          {config.formatMecanique.tip && (
            <div className="text-text-secondary text-sm">
              <span className="text-text-muted text-xs block mb-1">Conseil de production :</span>
              {config.formatMecanique.tip}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
