import { closingEmotions, qualityCriteria } from '../data/concepts'
import { SelectableCard } from './SelectableCard'

function ScoreSlider({ label, description, value, onChange }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-text-primary">{label}</div>
        <div className="text-xs text-text-muted truncate">{description}</div>
      </div>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(n => (
          <button
            key={n}
            onClick={() => onChange(n)}
            className={`w-8 h-8 rounded-lg text-sm font-bold transition-all ${
              value >= n
                ? 'bg-accent text-white'
                : 'bg-bg-card border border-border text-text-muted hover:text-text-primary'
            }`}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  )
}

export function StepClosingScores({ config, updateConfig }) {
  const updateScore = (category, id, value) => {
    updateConfig('scores', {
      ...config.scores,
      [category]: {
        ...config.scores[category],
        [id]: value
      }
    })
  }

  return (
    <div className="space-y-8 pb-24">
      {/* Closing Emotion */}
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-text-primary">Émotion de Closing</h2>
          <p className="text-text-secondary">Quelle émotion doit rester après ta vidéo ?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {closingEmotions.map(em => (
            <SelectableCard
              key={em.id}
              item={em}
              selected={config.closingEmotion?.id === em.id}
              onClick={(e) => updateConfig('closingEmotion', e)}
              compact
            />
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-border" />
        <span className="text-text-muted text-sm">scores de qualité (optionnel)</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* SUCCES Scores */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">
          Framework SUCCES <span className="text-text-muted text-sm font-normal">— Engagement & Mémorabilité</span>
        </h3>
        <div className="bg-bg-card border border-border rounded-xl p-4 space-y-3">
          {qualityCriteria.succes.map(c => (
            <ScoreSlider
              key={c.id}
              label={c.name}
              description={c.description}
              value={config.scores.succes[c.id] || 0}
              onChange={(v) => updateScore('succes', c.id, v)}
            />
          ))}
        </div>
      </div>

      {/* Nouveauté Scores */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">
          Nouveauté <span className="text-text-muted text-sm font-normal">— Innovation de l'angle</span>
        </h3>
        <div className="bg-bg-card border border-border rounded-xl p-4 space-y-3">
          {qualityCriteria.nouveaute.map(c => (
            <ScoreSlider
              key={c.id}
              label={c.name}
              description={c.description}
              value={config.scores.nouveaute[c.id] || 0}
              onChange={(v) => updateScore('nouveaute', c.id, v)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
