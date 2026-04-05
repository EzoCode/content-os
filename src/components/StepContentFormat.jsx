import { contentFormats } from '../data/concepts'
import { SelectableCard } from './SelectableCard'

export function StepContentFormat({ config, updateConfig }) {
  return (
    <div className="space-y-6 pb-24">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-text-primary">Format de Contenu</h2>
        <p className="text-text-secondary">Choisis la structure narrative de ton contenu</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {contentFormats.map(format => (
          <SelectableCard
            key={format.id}
            item={{ ...format, emoji: '📋' }}
            selected={config.contentFormat?.id === format.id}
            onClick={(f) => updateConfig('contentFormat', f)}
            compact
          />
        ))}
      </div>

      {config.contentFormat && (
        <div className="bg-accent/10 border border-border-active rounded-xl p-4 text-center">
          <span className="text-accent-light text-sm">
            Sélectionné : <strong>{config.contentFormat.name}</strong>
          </span>
        </div>
      )}
    </div>
  )
}
