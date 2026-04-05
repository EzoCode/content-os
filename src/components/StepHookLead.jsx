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
              item={ht}
              selected={config.hookType?.id === ht.id}
              onClick={(h) => updateConfig('hookType', h)}
              compact
            />
          ))}
        </div>

        {config.hookType && config.hookType.example && (
          <div className="bg-bg-card border border-border rounded-xl p-4 space-y-1">
            <div className="text-text-muted text-xs">Exemple de hook :</div>
            <div className="text-text-primary text-sm italic">{config.hookType.example}</div>
            {config.hookType.tip && (
              <div className="text-text-muted text-xs mt-2">{config.hookType.tip}</div>
            )}
          </div>
        )}
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
              item={lt}
              selected={config.leadType?.id === lt.id}
              onClick={(l) => updateConfig('leadType', l)}
              compact
            />
          ))}
        </div>

        {config.leadType && config.leadType.example && (
          <div className="bg-bg-card border border-border rounded-xl p-4 space-y-1">
            <div className="text-text-muted text-xs">Exemple de lead :</div>
            <div className="text-text-primary text-sm italic">{config.leadType.example}</div>
            {config.leadType.tip && (
              <div className="text-text-muted text-xs mt-2">{config.leadType.tip}</div>
            )}
          </div>
        )}
      </div>

      {(config.hookType || config.leadType) && (
        <div className="bg-accent/10 border border-border-active rounded-xl p-4 text-center space-y-1">
          {config.hookType && (
            <div className="text-accent-light text-sm">
              {config.hookType.emoji} Hook : <strong>{config.hookType.name}</strong>
            </div>
          )}
          {config.leadType && (
            <div className="text-accent-light text-sm">
              {config.leadType.emoji} Lead : <strong>{config.leadType.name}</strong>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
