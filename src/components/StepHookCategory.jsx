import { useState } from 'react'
import { hookCategories } from '../data/concepts'
import { SelectableCard } from './SelectableCard'

export function StepHookCategory({ config, updateConfig }) {
  const [showSub, setShowSub] = useState(false)

  const handleSelect = (cat) => {
    updateConfig('hookCategory', cat)
    updateConfig('hookSubFormat', null)
    setShowSub(true)
  }

  // Get recommended hook categories based on psycho concept's bestWith
  const recommended = config.psychoConcept?.bestWith || []
  const recommendedHooks = hookCategories.filter(h => recommended.includes(h.id))

  return (
    <div className="space-y-6 pb-24">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-text-primary">Catégorie de Hook</h2>
        <p className="text-text-secondary">Choisis le type de hook qui va capter l'attention</p>
      </div>

      {recommendedHooks.length > 0 && (
        <div className="bg-success/5 border border-success/20 rounded-xl p-4">
          <div className="text-success text-xs font-medium mb-2">
            Recommandés pour "{config.psychoConcept?.name}" :
          </div>
          <div className="flex flex-wrap gap-2">
            {recommendedHooks.map(h => (
              <button
                key={h.id}
                onClick={() => handleSelect(h)}
                className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                  config.hookCategory?.id === h.id
                    ? 'bg-success/20 text-success border border-success/40'
                    : 'bg-bg-card border border-success/20 text-text-secondary hover:text-success hover:border-success/40'
                }`}
              >
                {h.emoji} {h.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {hookCategories.map(cat => (
          <SelectableCard
            key={cat.id}
            item={cat}
            selected={config.hookCategory?.id === cat.id}
            onClick={handleSelect}
          />
        ))}
      </div>

      {config.hookCategory && showSub && (
        <div className="fade-in space-y-4">
          <h3 className="text-lg font-semibold text-text-primary text-center">
            Sous-format de {config.hookCategory.name} <span className="text-text-muted text-sm">(optionnel)</span>
          </h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {config.hookCategory.subFormats.map(sf => (
              <button
                key={sf}
                onClick={() => updateConfig('hookSubFormat', config.hookSubFormat === sf ? null : sf)}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  config.hookSubFormat === sf
                    ? 'bg-accent text-white'
                    : 'bg-bg-card border border-border text-text-secondary hover:text-text-primary hover:border-border-active'
                }`}
              >
                {sf}
              </button>
            ))}
          </div>
        </div>
      )}

      {config.hookCategory && (
        <div className="bg-accent/10 border border-border-active rounded-xl p-5 space-y-2">
          <div className="text-accent-light text-sm font-semibold">
            {config.hookCategory.emoji} {config.hookCategory.name}
            {config.hookSubFormat && <span className="text-text-secondary font-normal"> → {config.hookSubFormat}</span>}
          </div>
          {config.hookCategory.tip && (
            <div className="text-text-secondary text-sm">
              <span className="text-text-muted text-xs block mb-1">Conseil :</span>
              {config.hookCategory.tip}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
