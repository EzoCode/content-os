export function StepIdea({ config, updateConfig }) {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-text-primary">Quelle est ton idée ?</h2>
        <p className="text-text-secondary">Décris le sujet ou l'angle de ton contenu. Sois spécifique.</p>
      </div>

      <div className="space-y-4">
        <textarea
          value={config.idea}
          onChange={e => updateConfig('idea', e.target.value)}
          placeholder="Ex: Pourquoi les gens intelligents prennent des décisions stupides — explorer le paradoxe du midwit à travers l'histoire de Kahneman et ses propres biais..."
          className="w-full h-40 bg-bg-card border border-border rounded-xl px-4 py-3 text-text-primary placeholder-text-muted resize-none focus:outline-none focus:border-border-active focus:ring-1 focus:ring-accent/30 transition-all"
        />
        <div className="flex justify-between text-sm">
          <span className={`${config.idea.length > 10 ? 'text-success' : 'text-text-muted'}`}>
            {config.idea.length > 10 ? '✓ Assez détaillé' : 'Minimum 10 caractères'}
          </span>
          <span className="text-text-muted">{config.idea.length} caractères</span>
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-text-secondary">
          Contexte additionnel (optionnel)
        </label>
        <textarea
          value={config.additionalContext}
          onChange={e => updateConfig('additionalContext', e.target.value)}
          placeholder="Références, études à inclure, angle personnel, public cible spécifique..."
          className="w-full h-24 bg-bg-card border border-border rounded-xl px-4 py-3 text-text-primary placeholder-text-muted resize-none focus:outline-none focus:border-border-active focus:ring-1 focus:ring-accent/30 transition-all"
        />
      </div>

      <div className="bg-bg-card border border-border rounded-xl p-4">
        <h3 className="text-sm font-semibold text-accent-light mb-2">Critères d'un bon sujet</h3>
        <ul className="space-y-1 text-sm text-text-secondary">
          <li>→ <strong>Spécificité</strong> : résumable en une phrase claire ?</li>
          <li>→ <strong>Valeur intrinsèque</strong> : connecté aux frustrations/désirs/peurs/rêves ?</li>
          <li>→ <strong>Titrabilité</strong> : peut générer 3-5 titres accrocheurs ?</li>
          <li>→ <strong>Autonomie</strong> : l'idée tient même avec un packaging basique ?</li>
        </ul>
      </div>
    </div>
  )
}
