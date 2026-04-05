import { hookTypes, leadTypes } from '../data/concepts'
import { SelectableCard } from './SelectableCard'

export function StepHookLead({ config, updateConfig }) {
  return (
    <div className="space-y-8 pb-24">
      {/* Hook Type */}
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-text-primary">Type de Hook</h2>
          <p className="text-text-secondary">Comment tu vas accrocher en 0-15 secondes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {hookTypes.map(ht => (
            <SelectableCard
              key={ht.id}
              item={{ ...ht, emoji: '🎣' }}
              selected={config.hookType?.id === ht.id}
              onClick={(h) => updateConfig('hookType', h)}
              compact
            />
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-border" />
        <span className="text-text-muted text-sm">puis</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Lead Type */}
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-text-primary">Type de Lead</h2>
          <p className="text-text-secondary">Comment tu développes l'intro en 15-90 secondes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {leadTypes.map(lt => (
            <SelectableCard
              key={lt.id}
              item={{ ...lt, emoji: '📖' }}
              selected={config.leadType?.id === lt.id}
              onClick={(l) => updateConfig('leadType', l)}
              compact
            />
          ))}
        </div>
      </div>

      {(config.hookType || config.leadType) && (
        <div className="bg-accent/10 border border-border-active rounded-xl p-4 text-center space-y-1">
          {config.hookType && (
            <div className="text-accent-light text-sm">
              Hook : <strong>{config.hookType.name}</strong>
            </div>
          )}
          {config.leadType && (
            <div className="text-accent-light text-sm">
              Lead : <strong>{config.leadType.name}</strong>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
