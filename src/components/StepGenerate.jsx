import { useState, useRef } from 'react'
import { buildPrompt } from '../data/promptBuilder'

export function StepGenerate({ config, updateConfig }) {
  const [generating, setGenerating] = useState(false)
  const [result, setResult] = useState('')
  const [error, setError] = useState('')
  const [showPrompt, setShowPrompt] = useState(false)
  const resultRef = useRef(null)

  const prompt = buildPrompt(config)

  const handleGenerate = async () => {
    if (!config.apiKey) {
      setError('Ajoute ta clé API Claude pour générer')
      return
    }

    setGenerating(true)
    setResult('')
    setError('')

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': config.apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6-20250514',
          max_tokens: 8192,
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ]
        })
      })

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}))
        throw new Error(errData.error?.message || `Erreur API: ${response.status}`)
      }

      const data = await response.json()
      const text = data.content?.[0]?.text || 'Pas de réponse'
      setResult(text)

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } catch (err) {
      setError(err.message)
    } finally {
      setGenerating(false)
    }
  }

  const handleSaveKey = (key) => {
    updateConfig('apiKey', key)
    localStorage.setItem('claude-api-key', key)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(result)
  }

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(prompt)
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-text-primary">Générer le Script</h2>
        <p className="text-text-secondary">Vérifie ta configuration et lance la génération</p>
      </div>

      {/* Summary */}
      <div className="bg-bg-card border border-border rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-semibold text-accent-light">Récapitulatif</h3>

        {/* Idea */}
        <div className="border-b border-border pb-3">
          <div className="text-text-muted text-xs mb-1">Idée</div>
          <div className="text-text-primary text-sm">{config.idea}</div>
          {config.additionalContext && (
            <div className="text-text-muted text-xs mt-1">+ contexte additionnel</div>
          )}
        </div>

        {/* Config grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <SummaryItem emoji={config.psychoConcept?.emoji} label="Concept Psy" value={config.psychoConcept?.name} sub={config.psychoConcept?.source} />
          <SummaryItem emoji={config.hookCategory?.emoji} label="Hook" value={config.hookCategory?.name} sub={config.hookSubFormat} />
          <SummaryItem emoji={config.formatMecanique?.emoji} label="Format" value={config.formatMecanique?.name} sub={config.formatMecanique?.category} />
          <SummaryItem emoji={config.contentFormat?.emoji} label="Structure" value={config.contentFormat?.name} />
          <SummaryItem emoji={config.hookType?.emoji} label="Type Hook" value={config.hookType?.name} />
          <SummaryItem emoji={config.leadType?.emoji} label="Type Lead" value={config.leadType?.name} />
          <SummaryItem emoji={config.closingEmotion?.emoji} label="Closing" value={config.closingEmotion?.name} />
        </div>

        {/* Scores summary */}
        {(Object.keys(config.scores?.succes || {}).length > 0 || Object.keys(config.scores?.nouveaute || {}).length > 0) && (
          <div className="border-t border-border pt-3">
            <div className="text-text-muted text-xs mb-2">Scores de qualité visés</div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(config.scores?.succes || {}).map(([k, v]) => (
                <span key={k} className="px-2 py-1 bg-accent/10 text-accent-light text-xs rounded-lg">
                  {k}: {v}/5
                </span>
              ))}
              {Object.entries(config.scores?.nouveaute || {}).map(([k, v]) => (
                <span key={k} className="px-2 py-1 bg-success/10 text-success text-xs rounded-lg">
                  {k}: {v}/5
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* API Key */}
      <div className="bg-bg-card border border-border rounded-xl p-4 space-y-3">
        <label className="text-sm font-medium text-text-secondary">Clé API Claude</label>
        <input
          type="password"
          value={config.apiKey}
          onChange={e => handleSaveKey(e.target.value)}
          placeholder="sk-ant-..."
          className="w-full bg-bg-primary border border-border rounded-lg px-4 py-2.5 text-text-primary placeholder-text-muted focus:outline-none focus:border-border-active transition-all font-mono text-sm"
        />
        <p className="text-xs text-text-muted">Stocké localement dans ton navigateur uniquement.</p>
      </div>

      {/* Actions */}
      <div className="flex gap-3 justify-center">
        <button
          onClick={() => setShowPrompt(!showPrompt)}
          className="px-6 py-3 rounded-lg border border-border text-text-secondary hover:text-text-primary hover:border-border-active transition-all"
        >
          {showPrompt ? 'Masquer le Prompt' : 'Voir le Prompt'}
        </button>

        <button
          onClick={handleCopyPrompt}
          className="px-6 py-3 rounded-lg border border-border text-text-secondary hover:text-text-primary hover:border-border-active transition-all"
        >
          Copier le Prompt
        </button>

        <button
          onClick={handleGenerate}
          disabled={generating || !config.apiKey}
          className="glow-btn px-8 py-3 rounded-lg text-white font-semibold text-lg"
        >
          {generating ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin">⚡</span> Génération en cours...
            </span>
          ) : (
            '🚀 Générer le Script'
          )}
        </button>
      </div>

      {/* Prompt Preview */}
      {showPrompt && (
        <div className="fade-in bg-bg-card border border-border rounded-xl p-4">
          <pre className="text-xs text-text-secondary whitespace-pre-wrap max-h-96 overflow-y-auto font-mono">
            {prompt}
          </pre>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-danger/10 border border-danger/30 rounded-xl p-4 text-danger text-sm">
          {error}
        </div>
      )}

      {/* Result */}
      {result && (
        <div ref={resultRef} className="fade-in space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-success">Script Généré</h3>
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-lg bg-success/20 text-success text-sm hover:bg-success/30 transition-all"
            >
              Copier le Script
            </button>
          </div>
          <div className="bg-bg-card border border-success/30 rounded-xl p-6">
            <div className="prose prose-invert max-w-none">
              <pre className="whitespace-pre-wrap text-sm text-text-primary font-sans leading-relaxed">
                {result}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function SummaryItem({ emoji, label, value, sub }) {
  return (
    <div className="flex items-start gap-2">
      {emoji && <span className="text-base mt-0.5">{emoji}</span>}
      <div>
        <span className="text-text-muted text-xs">{label}</span>
        <div className="text-text-primary font-medium">{value || '—'}</div>
        {sub && <div className="text-text-muted text-xs">{sub}</div>}
      </div>
    </div>
  )
}
