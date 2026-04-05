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

  return (
    <div className="space-y-6 pb-24">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-text-primary">Catégorie de Hook</h2>
        <p className="text-text-secondary">Choisis le type de hook qui va capter l'attention</p>
      </div>

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
        <div className="bg-accent/10 border border-border-active rounded-xl p-4 text-center">
          <span className="text-accent-light text-sm">
            Sélectionné : <strong>{config.hookCategory.name}</strong>
            {config.hookSubFormat && <> → <strong>{config.hookSubFormat}</strong></>}
          </span>
        </div>
      )}
    </div>
  )
}
