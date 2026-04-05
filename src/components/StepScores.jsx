import { qualityCriteria } from '../data/concepts'

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
            onClick={() => onChange(value === n ? 0 : n)}
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

export function StepScores({ config, updateConfig }) {
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
    <div className="max-w-2xl mx-auto space-y-8 pb-24">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-text-primary">Scores de Qualité</h2>
        <p className="text-text-secondary">Évalue les critères de ton contenu (optionnel mais recommandé)</p>
      </div>

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

      {/* Summary of selections */}
      <div className="bg-bg-card border border-border rounded-xl p-5 space-y-3">
        <h3 className="text-sm font-semibold text-accent-light">Récap de ta configuration</h3>
        <div className="space-y-2 text-sm">
          <div><span className="text-text-muted">Fond :</span> <span className="text-text-primary">{config.fond.substring(0, 60)}...</span></div>
          <div><span className="text-text-muted">Bridge :</span> <span className="text-text-primary">{config.bridge.substring(0, 60)}...</span></div>
          <div><span className="text-text-muted">Concept :</span> <span className="text-text-primary">{config.conceptPsy?.name}{config.subConcept ? ` → ${config.subConcept.name}` : ''}</span></div>
          <div><span className="text-text-muted">Mécanique :</span> <span className="text-text-primary">{config.formatMecanique?.name}</span></div>
          {config.genreBeat && <div><span className="text-text-muted">Beat :</span> <span className="text-text-primary">{config.genreBeat.genre} — {config.genreBeat.beat}</span></div>}
        </div>
      </div>
    </div>
  )
}
