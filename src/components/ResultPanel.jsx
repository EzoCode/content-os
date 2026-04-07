import { useState } from 'react'

export function ResultPanel({ results, selectedConcepts, onClearResults }) {
  const [expandedKey, setExpandedKey] = useState(null)
  const [copiedKey, setCopiedKey] = useState(null)

  const entries = selectedConcepts
    .filter(c => results[c.key])
    .map(c => ({ ...c, result: results[c.key] }))

  // Also show results for concepts no longer selected (from localStorage)
  const orphanKeys = Object.keys(results).filter(k => !selectedConcepts.some(c => c.key === k))

  if (entries.length === 0 && orphanKeys.length === 0) return null

  const handleCopy = async (key, text) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedKey(key)
      setTimeout(() => setCopiedKey(null), 2000)
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea')
      textarea.value = text
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopiedKey(key)
      setTimeout(() => setCopiedKey(null), 2000)
    }
  }

  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-text-primary">
          Scripts generes ({entries.length + orphanKeys.length})
        </h2>
        {onClearResults && (
          <button
            onClick={onClearResults}
            className="text-sm text-text-muted hover:text-danger transition-all"
          >
            Tout effacer
          </button>
        )}
      </div>

      <div className="space-y-3">
        {entries.map(entry => {
          const isExpanded = expandedKey === entry.key
          const label = entry.subConcept
            ? `${entry.concept.emoji} ${entry.concept.name} → ${entry.subConcept.name}`
            : `${entry.concept.emoji} ${entry.concept.name}`

          return (
            <div
              key={entry.key}
              className={`border rounded-xl overflow-hidden transition-all ${
                entry.result.error ? 'border-danger/30' : 'border-success/30'
              }`}
            >
              <button
                onClick={() => setExpandedKey(isExpanded ? null : entry.key)}
                className="w-full flex items-center justify-between px-5 py-3 bg-bg-card hover:bg-bg-card-hover transition-all"
              >
                <span className="font-medium text-text-primary text-sm">{label}</span>
                <div className="flex items-center gap-3">
                  {!entry.result.error && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleCopy(entry.key, entry.result.text)
                      }}
                      className={`text-xs px-3 py-1 rounded-lg transition-all ${
                        copiedKey === entry.key
                          ? 'bg-success/30 text-success'
                          : 'bg-success/20 text-success hover:bg-success/30'
                      }`}
                    >
                      {copiedKey === entry.key ? 'Copie !' : 'Copier'}
                    </button>
                  )}
                  <span className="text-text-muted text-sm">{isExpanded ? '▼' : '▶'}</span>
                </div>
              </button>

              {isExpanded && (
                <div className="fade-in px-5 py-4 bg-bg-primary border-t border-border">
                  <pre className={`whitespace-pre-wrap text-sm font-sans leading-relaxed ${
                    entry.result.error ? 'text-danger' : 'text-text-primary'
                  }`}>
                    {entry.result.text}
                  </pre>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
