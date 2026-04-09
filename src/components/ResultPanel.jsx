import { useState, useCallback, useRef, useEffect } from 'react'

export function ResultPanel({ results, selectedConcepts }) {
  const [expandedKey, setExpandedKey] = useState(null)
  const [copiedKey, setCopiedKey] = useState(null)
  const copyTimerRef = useRef(null)

  useEffect(() => {
    return () => { if (copyTimerRef.current) clearTimeout(copyTimerRef.current) }
  }, [])

  const handleCopy = useCallback((key, text) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current)
    copyTimerRef.current = setTimeout(() => setCopiedKey(null), 2000)
  }, [])

  const entries = selectedConcepts
    .filter(c => results[c.key])
    .map(c => ({ ...c, result: results[c.key] }))

  const exportAll = useCallback(() => {
    const text = entries
      .filter(e => !e.result.error)
      .map(e => {
        const label = e.subConcept
          ? `${e.concept.name} → ${e.subConcept.name}`
          : e.concept.name
        return `=== ${label} ===\n\n${e.result.text}`
      })
      .join('\n\n' + '='.repeat(60) + '\n\n')
    return text
  }, [entries])

  const handleCopyAll = useCallback(() => {
    navigator.clipboard.writeText(exportAll())
    setCopiedKey('__all__')
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current)
    copyTimerRef.current = setTimeout(() => setCopiedKey(null), 2000)
  }, [exportAll])

  const handleDownload = useCallback(() => {
    const blob = new Blob([exportAll()], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `scripts-${new Date().toISOString().slice(0, 10)}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }, [exportAll])

  if (entries.length === 0) return null
  const successCount = entries.filter(e => !e.result.error).length

  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-text-primary">
          Scripts generes ({entries.length})
        </h2>
        {successCount > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyAll}
              className="text-xs px-3 py-1.5 rounded-lg bg-accent/20 text-accent-light hover:bg-accent/30 transition-all"
            >
              {copiedKey === '__all__' ? '✓ Copie !' : `Copier tout (${successCount})`}
            </button>
            <button
              onClick={handleDownload}
              className="text-xs px-3 py-1.5 rounded-lg bg-bg-card border border-border text-text-secondary hover:text-text-primary transition-all"
            >
              Telecharger .txt
            </button>
          </div>
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
