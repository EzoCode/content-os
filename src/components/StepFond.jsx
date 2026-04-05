export function StepFond({ config, updateConfig }) {
  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-24">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-text-primary">Le Fond</h2>
        <p className="text-text-secondary">L'idée brute avec tension intégrée + preuve</p>
        <p className="text-text-muted text-sm">"Tout le monde voit, personne n'en parle ?"</p>
      </div>

      <textarea
        value={config.fond}
        onChange={e => updateConfig('fond', e.target.value)}
        placeholder={"Ex: Le perfectionnisme paralyse. Les gens les plus comp\u00e9tents sont souvent ceux qui produisent le moins parce qu'ils attendent la \"version parfaite\" qui n'arrive jamais..."}
        className="w-full h-40 bg-bg-card border border-border rounded-xl px-4 py-3 text-text-primary placeholder-text-muted resize-none focus:outline-none focus:border-border-active focus:ring-1 focus:ring-accent/30 transition-all"
      />
      <div className="flex justify-between text-sm">
        <span className={config.fond.length > 10 ? 'text-success' : 'text-text-muted'}>
          {config.fond.length > 10 ? '✓ Fond défini' : 'Minimum 10 caractères'}
        </span>
        <span className="text-text-muted">{config.fond.length} caractères</span>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-text-secondary">
          Contexte additionnel (optionnel)
        </label>
        <textarea
          value={config.additionalContext}
          onChange={e => updateConfig('additionalContext', e.target.value)}
          placeholder="Références, études à inclure, angle personnel, public cible..."
          className="w-full h-20 bg-bg-card border border-border rounded-xl px-4 py-3 text-text-primary placeholder-text-muted resize-none focus:outline-none focus:border-border-active focus:ring-1 focus:ring-accent/30 transition-all"
        />
      </div>

      <div className="bg-bg-card border border-border rounded-xl p-4">
        <h3 className="text-sm font-semibold text-accent-light mb-3">Test du bon Fond</h3>
        <ul className="space-y-2 text-sm text-text-secondary">
          <li>→ <strong>Tension intégrée</strong> : il y a un "pourquoi X ?" — un paradoxe, un gap, un conflit</li>
          <li>→ <strong>Spécificité</strong> : résumable en une phrase claire</li>
          <li>→ <strong>Stick</strong> : pas de stick = pas de bon fond = on recommence</li>
          <li>→ <strong>Émotion</strong> : connecté aux frustrations / désirs / peurs / rêves</li>
        </ul>
      </div>
    </div>
  )
}
