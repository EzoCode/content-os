import { useState } from 'react'

function renderMarkdown(text) {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  const html = escaped
    .replace(/^### (.+)$/gm, '<h3 class="text-base font-bold text-accent-light mt-4 mb-1">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-lg font-bold text-accent-light mt-5 mb-2">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-xl font-bold text-accent-light mt-6 mb-2">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-text-primary font-semibold">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^[-*] (.+)$/gm, '<li class="ml-4 list-disc">$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4 list-decimal">$1. $2</li>')
    .replace(/---/g, '<hr class="border-border my-4" />')
    .replace(/\n{2,}/g, '<br/><br/>')
    .replace(/\n/g, '<br/>')

  return html
}

export function ResultPanel({ results, selectedConcepts }) {
  const [expandedKey, setExpandedKey] = useState(null)

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
                        navigator.clipboard.writeText(entry.result.text)
                      }}
                      className="text-xs px-3 py-1 rounded-lg bg-success/20 text-success hover:bg-success/30 transition-all"
                    >
                      Copier
                    </button>
                  )}
                  <span className="text-text-muted text-sm">{isExpanded ? '▼' : '▶'}</span>
                </div>
              </button>

              {isExpanded && (
                <div className="fade-in px-5 py-4 bg-bg-primary border-t border-border">
                  {entry.result.error ? (
                    <pre className="whitespace-pre-wrap text-sm font-sans leading-relaxed text-danger">
                      {entry.result.text}
                    </pre>
                  ) : (
                    <div
                      className="prose-sm text-sm leading-relaxed text-text-secondary"
                      dangerouslySetInnerHTML={{ __html: renderMarkdown(entry.result.text) }}
                    />
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
