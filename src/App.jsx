import { useState, useCallback, useRef } from 'react'
import { conceptsPsy } from './data/concepts'
import { rebuildSelectedConcepts } from './data/conceptLookup'
import { buildPrompt } from './data/promptBuilder'
import { ConceptGrid } from './components/ConceptGrid'
import { ResultPanel } from './components/ResultPanel'
import { SettingsPanel } from './components/SettingsPanel'
import { HistoryPanel } from './components/HistoryPanel'
import { saveToHistory } from './data/history'

function App() {
  const [fond, setFond] = useState('')
  const [bridge, setBridge] = useState('')
  const [selectedConcepts, setSelectedConcepts] = useState([])
  const [formatMecanique, setFormatMecanique] = useState(null)
  const [genreBeat, setGenreBeat] = useState(null)
  const [apiKey, setApiKey] = useState(localStorage.getItem('claude-api-key') || '')
  const [results, setResults] = useState({})
  const [generating, setGenerating] = useState(null)
  const [queue, setQueue] = useState([])
  const [currentBatchKeys, setCurrentBatchKeys] = useState([])
  const [showSettings, setShowSettings] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const abortRef = useRef(null)
  const cancelledRef = useRef(false)

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
    const controller = new AbortController()
    abortRef.current = controller
    let timedOut = false
    const timeout = setTimeout(() => { timedOut = true; controller.abort() }, 120_000)

    try {
      const config = {
        fond,
        bridge,
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
        signal: controller.signal,
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
    } catch (err) {
      if (timedOut) throw new Error('Timeout : la generation a depasse 2 minutes. Reessaye avec un concept plus simple.')
      throw err
    } finally {
      clearTimeout(timeout)
      abortRef.current = null
    }
  }

  const stopGeneration = useCallback(() => {
    cancelledRef.current = true
    if (abortRef.current) abortRef.current.abort()
  }, [])

  const handleGenerate = async () => {
    if (!apiKey || selectedConcepts.length === 0 || !fond.trim()) return

    cancelledRef.current = false
    const toGenerate = [...selectedConcepts]
    const batchKeys = toGenerate.map(c => c.key)
    setQueue(batchKeys)
    setCurrentBatchKeys(batchKeys)
    const generatedResults = {}

    for (const entry of toGenerate) {
      if (cancelledRef.current) break
      setGenerating(entry.key)
      try {
        const result = await generateOne(entry)
        const resultObj = { text: result, error: false }
        generatedResults[entry.key] = resultObj
        setResults(prev => ({ ...prev, [entry.key]: resultObj }))
      } catch (err) {
        if (cancelledRef.current) {
          const resultObj = { text: 'Generation annulee', error: true }
          generatedResults[entry.key] = resultObj
          setResults(prev => ({ ...prev, [entry.key]: resultObj }))
          break
        }
        const resultObj = { text: err.message, error: true }
        generatedResults[entry.key] = resultObj
        setResults(prev => ({ ...prev, [entry.key]: resultObj }))
      }
      setQueue(prev => prev.filter(k => k !== entry.key))
    }
    setGenerating(null)
    setQueue([])
    setCurrentBatchKeys([])
    cancelledRef.current = false

    // Save to history after generation
    const hasAnyResult = Object.values(generatedResults).some(r => !r.error)
    if (hasAnyResult) {
      saveToHistory({
        fond,
        bridge,
        results: generatedResults,
        conceptKeys: toGenerate.map(c => c.key),
        conceptLabels: toGenerate.map(c =>
          c.subConcept
            ? `${c.concept.emoji} ${c.concept.name} → ${c.subConcept.name}`
            : `${c.concept.emoji} ${c.concept.name}`
        ),
      })
    }
  }

  const restoreSession = (session) => {
    setFond(session.fond || '')
    setBridge(session.bridge || '')
    setResults(session.results || {})
    setSelectedConcepts(rebuildSelectedConcepts(session.conceptKeys))
    setShowHistory(false)
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
              onClick={() => { setShowHistory(!showHistory); if (!showHistory) setShowSettings(false) }}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all ${showHistory ? 'bg-accent/20 text-accent-light' : 'text-text-muted hover:text-text-primary'}`}
            >
              Historique
            </button>
            <button
              onClick={() => { setShowSettings(!showSettings); if (!showSettings) setShowHistory(false) }}
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

        {/* History Panel (collapsible) */}
        {showHistory && (
          <div className="fade-in mb-6 bg-bg-card border border-border rounded-xl p-5">
            <h3 className="text-sm font-semibold text-text-primary mb-3">Historique des generations</h3>
            <HistoryPanel onRestore={restoreSession} />
          </div>
        )}

        {/* Fond + Bridge Inputs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <div>
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
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Le Bridge — L'association inattendue (optionnel)
            </label>
            <textarea
              value={bridge}
              onChange={e => setBridge(e.target.value)}
              placeholder={"Celebrite, film, experience scientifique, phenomene de societe... Si vide, Claude en trouvera un."}
              className="w-full h-28 bg-bg-card border border-border rounded-xl px-4 py-3 text-text-primary placeholder-text-muted resize-none focus:outline-none focus:border-border-active focus:ring-1 focus:ring-accent/30 transition-all"
            />
          </div>
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
                onClick={stopGeneration}
                className="px-6 py-2.5 rounded-lg text-white font-medium bg-danger hover:bg-danger/80 transition-all"
              >
                Arreter
              </button>
            ) : (
              <div className="relative group">
                <button
                  onClick={handleGenerate}
                  disabled={!fond.trim() || selectedCount === 0 || !apiKey}
                  className="glow-btn px-6 py-2.5 rounded-lg text-white font-medium disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Generer {selectedCount} script{selectedCount > 1 ? 's' : ''}
                </button>
                {(!fond.trim() || selectedCount === 0 || !apiKey) && (
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 text-xs rounded-lg bg-bg-card border border-border text-text-secondary whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {!apiKey ? 'Ajoute ta cle API dans Settings' : !fond.trim() ? 'Ecris ton idee dans le Fond' : 'Selectionne au moins 1 concept'}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Progress bar during generation */}
        {generating !== null && currentBatchKeys.length > 0 && (
          <div className="mb-4 fade-in">
            <div className="flex items-center justify-between text-xs text-text-muted mb-1.5">
              <span>
                Generation en cours...
                {(() => {
                  const done = currentBatchKeys.filter(k => results[k] && k !== generating).length
                  return ` (${done + 1}/${currentBatchKeys.length})`
                })()}
              </span>
              <span>{selectedConcepts.find(c => c.key === generating)?.subConcept?.name || selectedConcepts.find(c => c.key === generating)?.concept.name || ''}</span>
            </div>
            <div className="w-full h-1.5 bg-bg-card rounded-full overflow-hidden">
              <div
                className="h-full bg-accent rounded-full transition-all duration-500"
                style={{
                  width: `${(currentBatchKeys.filter(k => results[k]).length / currentBatchKeys.length) * 100}%`,
                }}
              />
            </div>
          </div>
        )}

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
