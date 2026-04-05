export function StepBridge({ config, updateConfig }) {
  const suggestions = [
    { label: 'Célébrité', examples: 'Steve Jobs, Elon Musk, Alex Hormozi, Naval Ravikant...' },
    { label: 'Film / Série', examples: 'Matrix, Fight Club, Whiplash, Breaking Bad...' },
    { label: 'Expérience scientifique', examples: 'Milgram, Marshmallow, Stanford Prison, Pavlov...' },
    { label: 'Phénomène de société', examples: 'Hustle Culture, Syndrome imposteur, Cancel Culture...' },
    { label: 'Histoire / Mythologie', examples: 'Ulysse, Spartiate, Empire Romain, Samouraï...' },
    { label: 'Marque / Entreprise', examples: 'Apple vs Notion, Nike, Blendtec, Duolingo...' },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-24">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-text-primary">Le Bridge</h2>
        <p className="text-text-secondary">L'association inattendue qui devient le fil rouge</p>
        <p className="text-text-muted text-sm">Optionnel : si vide, l'IA trouvera le bridge via recherche internet</p>
      </div>

      <textarea
        value={config.bridge}
        onChange={e => updateConfig('bridge', e.target.value)}
        placeholder={"Ex: L'exp\u00e9rience du Marshmallow de Stanford - les enfants qui attendent pour avoir 2 marshmallows au lieu de 1. Mais retourn\u00e9 : les perfectionnistes attendent tellement qu'ils finissent avec 0..."}
        className="w-full h-32 bg-bg-card border border-border rounded-xl px-4 py-3 text-text-primary placeholder-text-muted resize-none focus:outline-none focus:border-border-active focus:ring-1 focus:ring-accent/30 transition-all"
      />
      <div className="flex justify-between text-sm">
        <span className={config.bridge.length > 5 ? 'text-success' : 'text-text-muted'}>
          {config.bridge.length > 5 ? '✓ Bridge défini' : 'Décris le bridge'}
        </span>
        <span className="text-text-muted">{config.bridge.length} caractères</span>
      </div>

      <div className="bg-bg-card border border-border rounded-xl p-4">
        <h3 className="text-sm font-semibold text-accent-light mb-3">Types de Bridge</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {suggestions.map(s => (
            <div key={s.label} className="space-y-1">
              <span className="text-sm font-medium text-text-primary">{s.label}</span>
              <p className="text-xs text-text-muted">{s.examples}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-accent/5 border border-border rounded-xl p-4">
        <p className="text-sm text-text-secondary">
          <strong className="text-accent-light">Rappel</strong> : Le bridge colore tout le contenu.
          C'est le fil rouge qui rend l'idée mémorable.
          <strong> 1 fond × 10 bridges × 22 concepts × 5 mécaniques = contenu infini.</strong>
        </p>
      </div>
    </div>
  )
}
