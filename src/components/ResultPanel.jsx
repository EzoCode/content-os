import { useState, useCallback } from 'react'

export function ResultPanel({ results, selectedConcepts }) {
  const [expandedKey, setExpandedKey] = useState(null)
  const [copiedKey, setCopiedKey] = useState(null)

  const handleCopy = useCallback((key, text) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }, [])

  const entries = selectedConcepts
    .filter(c => results[c.key])
    .map(c => ({ ...c, result: results[c.key] }))

  if (entries.length === 0) return null

  return (
    <div className="mt-8 space-y-4">
      <h2 className="text-xl font-bold text-text-primary">
        Scripts generes ({entries.length})
      </h2>

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
                      className="text-xs px-3 py-1 rounded-lg bg-success/20 text-success hover:bg-success/30 transition-all"
                    >
                      {copiedKey === entry.key ? '✓ Copie !' : 'Copier'}
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
