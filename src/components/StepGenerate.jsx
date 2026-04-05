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
          model: 'claude-sonnet-4-20250514',
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
      <div className="bg-bg-card border border-border rounded-xl p-6 space-y-3">
        <h3 className="text-lg font-semibold text-accent-light">Récapitulatif</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <SummaryItem label="Idée" value={config.idea?.substring(0, 80) + (config.idea?.length > 80 ? '...' : '')} />
          <SummaryItem label="Concept Psy" value={config.psychoConcept?.name} />
          <SummaryItem label="Hook Category" value={config.hookCategory?.name} />
          {config.hookSubFormat && <SummaryItem label="Sous-format" value={config.hookSubFormat} />}
          <SummaryItem label="Format Mécanique" value={config.formatMecanique?.name} />
          <SummaryItem label="Format Contenu" value={config.contentFormat?.name} />
          <SummaryItem label="Type Hook" value={config.hookType?.name} />
          <SummaryItem label="Type Lead" value={config.leadType?.name} />
          <SummaryItem label="Émotion Closing" value={config.closingEmotion?.name} />
        </div>
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

function SummaryItem({ label, value }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-text-muted">{label}:</span>
      <span className="text-text-primary font-medium">{value || '—'}</span>
    </div>
  )
}
