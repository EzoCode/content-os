import { useState } from 'react'
import { conceptsPsy } from '../data/concepts'

export function StepConceptPsy({ config, updateConfig }) {
  const [search, setSearch] = useState('')
  const [expandedId, setExpandedId] = useState(null)

  const filtered = conceptsPsy.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.description.toLowerCase().includes(search.toLowerCase()) ||
    c.subConcepts.some(sc => sc.name.toLowerCase().includes(search.toLowerCase()))
  )

  const handleSelectCategory = (cat) => {
    if (config.conceptPsy?.id === cat.id) {
      setExpandedId(expandedId === cat.id ? null : cat.id)
    } else {
      updateConfig('conceptPsy', cat)
      updateConfig('subConcept', null)
      setExpandedId(cat.id)
    }
  }

  const handleSelectSub = (sub) => {
    updateConfig('subConcept', config.subConcept?.id === sub.id ? null : sub)
  }

  return (
    <div className="space-y-6 pb-24">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-text-primary">Concept Psychologique</h2>
        <p className="text-text-secondary">"Quel effet je veux créer ?" — L'angle psychologique + hook</p>
      </div>

      <div className="max-w-md mx-auto">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Rechercher un concept..."
          className="w-full bg-bg-card border border-border rounded-xl px-4 py-2.5 text-text-primary placeholder-text-muted focus:outline-none focus:border-border-active transition-all"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map(cat => {
          const isSelected = config.conceptPsy?.id === cat.id
          const isExpanded = expandedId === cat.id && isSelected

          return (
            <div key={cat.id} className="space-y-2">
              <button
                onClick={() => handleSelectCategory(cat)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                  isSelected
                    ? 'selected-card border-border-active bg-accent/10'
                    : 'border-border bg-bg-card hover:bg-bg-card-hover hover:border-border/80'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-xl mt-0.5">{cat.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-text-primary text-base">{cat.name}</h3>
                    <p className="text-text-secondary mt-1 text-sm">{cat.description}</p>
                    <p className="text-text-muted mt-1 text-xs">{cat.subConcepts.length} sous-concepts</p>
                  </div>
                  {isSelected && <span className="text-accent-light text-lg">✓</span>}
                </div>
              </button>

              {isExpanded && (
                <div className="fade-in ml-4 space-y-1">
                  {cat.subConcepts.map(sub => (
                    <button
                      key={sub.id}
                      onClick={() => handleSelectSub(sub)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                        config.subConcept?.id === sub.id
                          ? 'bg-accent/20 text-accent-light border border-border-active'
                          : 'bg-bg-secondary text-text-secondary hover:text-text-primary hover:bg-bg-card'
                      }`}
                    >
                      <span className="font-medium">{sub.name}</span>
                      <span className="text-text-muted ml-2 text-xs">— {sub.description}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {config.conceptPsy && (
        <div className="bg-accent/10 border border-border-active rounded-xl p-4 text-center">
          <span className="text-accent-light text-sm">
            Concept : <strong>{config.conceptPsy.name}</strong>
            {config.subConcept && <> → <strong>{config.subConcept.name}</strong></>}
          </span>
        </div>
      )}
    </div>
  )
}
