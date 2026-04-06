import { useState, useCallback, useRef } from 'react'
import { conceptsPsy } from './data/concepts'
import { buildPrompt } from './data/promptBuilder'
import { ConceptGrid } from './components/ConceptGrid'
import { ResultPanel } from './components/ResultPanel'
import { SettingsPanel } from './components/SettingsPanel'

function App() {
  const [fond, setFond] = useState('')
  const [selectedConcepts, setSelectedConcepts] = useState([])
  const [formatMecanique, setFormatMecanique] = useState(null)
  const [genreBeat, setGenreBeat] = useState(null)
  const [apiKey, setApiKey] = useState(localStorage.getItem('claude-api-key') || '')
  const [results, setResults] = useState({})
  const [generating, setGenerating] = useState(null)
  const [queue, setQueue] = useState([])
  const [showSettings, setShowSettings] = useState(false)
  const abortRef = useRef(false)

  const saveApiKey = (key) => {
    setApiKey(key)
    localStorage.setItem('claude-api-key', key)
  }

  const toggleConcept = useCallback((concept, subConcept) => {
    setSelectedConcepts(prev => {
      const key = subConcept ? `${concept.id}:${subConcept.id}` : concept.id
      const exists = prev.find(c => c.key === key)
      if (exists) return prev.filter(c => c.key !== key)
      return [...prev, { key, concept, subConcept }]
    })
  }, [])

  const isSelected = useCallback((conceptId, subConceptId) => {
    const key = subConceptId ? `${conceptId}:${subConceptId}` : conceptId
    return selectedConcepts.some(c => c.key === key)
  }, [selectedConcepts])

  const generateOne = async (entry) => {
    const config = {
      fond,
      bridge: '',
      conceptPsy: entry.concept,
      subConcept: entry.subConcept,
      formatMecanique,
      genreBeat,
      scores: { succes: {}, nouveaute: {} },
      additionalContext: '',
    }
    const prompt = buildPrompt(config)

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 8192,
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    if (!response.ok) {
      const err = await response.json().catch(() => ({}))
      throw new Error(err.error?.message || `Erreur API: ${response.status}`)
    }

    const data = await response.json()
    return data.content?.[0]?.text || 'Pas de réponse'
  }

  const handleGenerate = async () => {
    if (!apiKey || selectedConcepts.length === 0 || !fond.trim()) return

    abortRef.current = false
    const toGenerate = [...selectedConcepts]
    setQueue(toGenerate.map(c => c.key))

    for (const entry of toGenerate) {
      if (abortRef.current) break
      setGenerating(entry.key)
      try {
        const result = await generateOne(entry)
        setResults(prev => ({ ...prev, [entry.key]: { text: result, error: false } }))
      } catch (err) {
        setResults(prev => ({ ...prev, [entry.key]: { text: err.message, error: true } }))
      }
      setQueue(prev => prev.filter(k => k !== entry.key))
    }
    setGenerating(null)
    setQueue([])
  }

  const handleAbort = () => {
    abortRef.current = true
  }

  const selectedCount = selectedConcepts.length

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <header className="border-b border-border px-6 py-4">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎬</span>
            <h1 className="text-xl font-bold text-text-primary">Content OS</h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all ${showSettings ? 'bg-accent/20 text-accent-light' : 'text-text-muted hover:text-text-primary'}`}
            >
              Settings
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-6 py-6">
        {/* Settings Panel (collapsible) */}
        {showSettings && (
          <SettingsPanel
            apiKey={apiKey}
            onSaveKey={saveApiKey}
            formatMecanique={formatMecanique}
            onSetFormat={setFormatMecanique}
            genreBeat={genreBeat}
            onSetBeat={setGenreBeat}
          />
        )}

        {/* Fond Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Le Fond — L'idee brute avec tension integree
          </label>
          <textarea
            value={fond}
            onChange={e => setFond(e.target.value)}
            placeholder={"Ton idee avec tension : un paradoxe, un gap, un conflit..."}
            className="w-full h-28 bg-bg-card border border-border rounded-xl px-4 py-3 text-text-primary placeholder-text-muted resize-none focus:outline-none focus:border-border-active focus:ring-1 focus:ring-accent/30 transition-all"
          />
        </div>

        {/* Concepts Grid + Generate Bar */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">
            Concepts Psychologiques
            {selectedCount > 0 && (
              <span className="ml-2 text-sm font-normal text-accent-light">
                {selectedCount} selectionne{selectedCount > 1 ? 's' : ''}
              </span>
            )}
          </h2>
          <div className="flex items-center gap-3">
            {selectedCount > 0 && (
              <button
                onClick={() => setSelectedConcepts([])}
                className="text-sm text-text-muted hover:text-text-primary transition-all"
              >
                Tout deselectionner
              </button>
            )}
            {generating !== null ? (
              <button
                onClick={handleAbort}
                className="px-6 py-2.5 rounded-lg text-white font-medium bg-danger hover:bg-danger/80 transition-all"
              >
                Arreter la generation
              </button>
            ) : (
              <button
                onClick={handleGenerate}
                disabled={!fond.trim() || selectedCount === 0 || !apiKey}
                className="glow-btn px-6 py-2.5 rounded-lg text-white font-medium disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Generer {selectedCount} script{selectedCount > 1 ? 's' : ''}
              </button>
            )}
          </div>
        </div>

        <ConceptGrid
          concepts={conceptsPsy}
          selectedConcepts={selectedConcepts}
          toggleConcept={toggleConcept}
          isSelected={isSelected}
          results={results}
          generating={generating}
          queue={queue}
        />

        {/* Results */}
        {Object.keys(results).length > 0 && (
          <ResultPanel
            results={results}
            selectedConcepts={selectedConcepts}
          />
        )}
      </div>
    </div>
  )
}

export default App
