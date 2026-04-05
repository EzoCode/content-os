import { useState } from 'react'
import { psychologicalConcepts } from '../data/concepts'
import { SelectableCard } from './SelectableCard'

export function StepPsychoConcept({ config, updateConfig }) {
  const [search, setSearch] = useState('')

  const filtered = psychologicalConcepts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.description.toLowerCase().includes(search.toLowerCase()) ||
    (c.source && c.source.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="space-y-6 pb-24">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-text-primary">Concept Psychologique</h2>
        <p className="text-text-secondary">Choisis le levier psychologique principal de ton contenu</p>
      </div>

      <div className="max-w-md mx-auto">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Rechercher un concept, une source, un auteur..."
          className="w-full bg-bg-card border border-border rounded-xl px-4 py-2.5 text-text-primary placeholder-text-muted focus:outline-none focus:border-border-active transition-all"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map(concept => (
          <SelectableCard
            key={concept.id}
            item={concept}
            selected={config.psychoConcept?.id === concept.id}
            onClick={() => updateConfig('psychoConcept', concept)}
          />
        ))}
      </div>

      {config.psychoConcept && (
        <div className="bg-accent/10 border border-border-active rounded-xl p-5 space-y-3">
          <div className="text-accent-light text-sm font-semibold">
            {config.psychoConcept.emoji} {config.psychoConcept.name}
          </div>
          {config.psychoConcept.source && (
            <div className="text-text-muted text-xs">
              Source : {config.psychoConcept.source}
            </div>
          )}
          {config.psychoConcept.example && (
            <div className="text-text-secondary text-sm">
              <span className="text-text-muted text-xs block mb-1">Exemple d'application :</span>
              {config.psychoConcept.example}
            </div>
          )}
          {config.psychoConcept.tone && (
            <div className="text-text-secondary text-xs">
              Tonalité : <span className="text-accent-light">{config.psychoConcept.tone}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
