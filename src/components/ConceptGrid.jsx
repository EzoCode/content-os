import { useState } from 'react'

export function ConceptGrid({ concepts, selectedConcepts, toggleConcept, isSelected, results, generating, queue }) {
  const [expandedId, setExpandedId] = useState(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {concepts.map(cat => {
        const catSelected = selectedConcepts.filter(c => c.concept.id === cat.id)
        const hasResult = catSelected.some(c => results[c.key])
        const isGenerating = catSelected.some(c => c.key === generating)
        const isQueued = catSelected.some(c => queue.includes(c.key))
        const isExpanded = expandedId === cat.id

        return (
          <div key={cat.id} className="relative">
            <button
              onClick={() => setExpandedId(isExpanded ? null : cat.id)}
              className={`w-full text-left p-3 rounded-xl border transition-all duration-200 ${
                catSelected.length > 0
                  ? 'border-border-active bg-accent/10'
                  : 'border-border bg-bg-card hover:bg-bg-card-hover'
              }`}
            >
              <div className="flex items-start gap-2">
                <span className="text-lg">{cat.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-text-primary text-sm leading-tight">{cat.name}</h3>
                    {isGenerating && <span className="animate-spin text-xs">⚡</span>}
                    {hasResult && !isGenerating && <span className="text-success text-xs">✓</span>}
                    {isQueued && !isGenerating && <span className="text-text-muted text-xs">⏳</span>}
                  </div>
                  <p className="text-text-muted text-xs mt-0.5 line-clamp-2">{cat.description}</p>
                </div>
                {catSelected.length > 0 && (
                  <span className="bg-accent text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                    {catSelected.length}
                  </span>
                )}
              </div>
            </button>

            {/* Expanded sub-concepts */}
            {isExpanded && (
              <div className="fade-in absolute z-20 left-0 right-0 mt-1 bg-bg-secondary border border-border-active rounded-xl shadow-xl p-2 max-h-80 overflow-y-auto">
                {/* Select whole category */}
                <button
                  onClick={() => toggleConcept(cat, null)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm mb-1 transition-all ${
                    isSelected(cat.id, null)
                      ? 'bg-accent/20 text-accent-light'
                      : 'text-text-primary hover:bg-bg-card'
                  }`}
                >
                  <span className="font-semibold">{cat.emoji} Toute la categorie</span>
                </button>
                <div className="border-t border-border my-1" />
                {cat.subConcepts.map(sub => (
                  <button
                    key={sub.id}
                    onClick={() => toggleConcept(cat, sub)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-all ${
                      isSelected(cat.id, sub.id)
                        ? 'bg-accent/20 text-accent-light'
                        : 'text-text-secondary hover:text-text-primary hover:bg-bg-card'
                    }`}
                  >
                    <span className="font-medium">{sub.name}</span>
                    <span className="text-text-muted ml-1 text-xs">- {sub.description}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
