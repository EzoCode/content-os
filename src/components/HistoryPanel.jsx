import { useState } from 'react'
import { loadHistory, deleteFromHistory } from '../data/history'

export function HistoryPanel({ onRestore }) {
  const [history, setHistory] = useState(loadHistory)
  const [expandedId, setExpandedId] = useState(null)

  if (history.length === 0) {
    return (
      <div className="text-center py-8 text-text-muted text-sm">
        Aucun historique. Les scripts generes apparaitront ici.
      </div>
    )
  }

  const handleDelete = (id) => {
    setHistory(deleteFromHistory(id))
  }

  const formatDate = (iso) => {
    const d = new Date(iso)
    return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="space-y-3">
      {history.map(session => {
        const isExpanded = expandedId === session.id
        const scriptCount = Object.values(session.results).filter(r => !r.error).length

        return (
          <div key={session.id} className="border border-border rounded-xl overflow-hidden">
            <button
              onClick={() => setExpandedId(isExpanded ? null : session.id)}
              className="w-full flex items-center justify-between px-4 py-3 bg-bg-card hover:bg-bg-card-hover transition-all text-left"
            >
              <div className="flex-1 min-w-0">
                <p className="text-text-primary text-sm font-medium truncate">{session.fond}</p>
                <p className="text-text-muted text-xs mt-0.5">
                  {formatDate(session.date)} — {scriptCount} script{scriptCount > 1 ? 's' : ''}
                </p>
              </div>
              <span className="text-text-muted text-sm ml-3">{isExpanded ? '▼' : '▶'}</span>
            </button>

            {isExpanded && (
              <div className="fade-in border-t border-border bg-bg-primary p-4 space-y-3">
                {session.bridge && (
                  <div>
                    <span className="text-xs text-text-muted">Bridge:</span>
                    <p className="text-text-secondary text-sm">{session.bridge}</p>
                  </div>
                )}

                <div className="text-xs text-text-muted">
                  Concepts: {session.conceptLabels?.join(', ') || 'N/A'}
                </div>

                {Object.entries(session.results).map(([key, result]) => {
                  const label = session.conceptLabels?.find((_, i) => session.conceptKeys?.[i] === key) || key
                  return (
                    <div key={key} className={`border rounded-lg p-3 ${result.error ? 'border-danger/20' : 'border-border'}`}>
                      <p className="text-xs text-text-muted mb-1">{label}</p>
                      <pre className={`whitespace-pre-wrap text-xs leading-relaxed max-h-40 overflow-y-auto ${result.error ? 'text-danger' : 'text-text-secondary'}`}>
                        {result.text.slice(0, 500)}{result.text.length > 500 ? '...' : ''}
                      </pre>
                    </div>
                  )
                })}

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => onRestore(session)}
                    className="text-xs px-3 py-1.5 rounded-lg bg-accent/20 text-accent-light hover:bg-accent/30 transition-all"
                  >
                    Restaurer
                  </button>
                  <button
                    onClick={() => handleDelete(session.id)}
                    className="text-xs px-3 py-1.5 rounded-lg bg-danger/20 text-danger hover:bg-danger/30 transition-all"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
