import { contentFormats } from '../data/concepts'
import { SelectableCard } from './SelectableCard'

export function StepContentFormat({ config, updateConfig }) {
  // Get recommended content formats based on psycho concept's bestWith
  const recommended = config.psychoConcept?.bestWith || []
  const recommendedFormats = contentFormats.filter(f => recommended.includes(f.id))

  return (
    <div className="space-y-6 pb-24">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-text-primary">Format de Contenu</h2>
        <p className="text-text-secondary">Choisis la structure narrative de ton contenu</p>
      </div>

      {recommendedFormats.length > 0 && (
        <div className="bg-success/5 border border-success/20 rounded-xl p-4">
          <div className="text-success text-xs font-medium mb-2">
            Structures recommandées pour "{config.psychoConcept?.name}" :
          </div>
          <div className="flex flex-wrap gap-2">
            {recommendedFormats.map(f => (
              <button
                key={f.id}
                onClick={() => updateConfig('contentFormat', f)}
                className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                  config.contentFormat?.id === f.id
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {contentFormats.map(format => (
          <SelectableCard
            key={format.id}
            item={format}
            selected={config.contentFormat?.id === format.id}
            onClick={(f) => updateConfig('contentFormat', f)}
            compact
          />
        ))}
      </div>

      {config.contentFormat && (
        <div className="bg-accent/10 border border-border-active rounded-xl p-5 space-y-2">
          <div className="text-accent-light text-sm font-semibold">
            {config.contentFormat.emoji} {config.contentFormat.name}
          </div>
          {config.contentFormat.example && (
            <div className="text-text-secondary text-sm">
              <span className="text-text-muted text-xs block mb-1">Exemple :</span>
              {config.contentFormat.example}
            </div>
          )}
          {config.contentFormat.tip && (
            <div className="text-text-secondary text-xs">
              {config.contentFormat.tip}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
