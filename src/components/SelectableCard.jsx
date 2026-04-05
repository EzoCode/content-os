export function SelectableCard({ item, selected, onClick, compact = false }) {
  return (
    <button
      onClick={() => onClick(item)}
      className={`text-left p-4 rounded-xl border transition-all duration-200 ${
        selected
          ? 'selected-card border-border-active bg-accent/10'
          : 'border-border bg-bg-card hover:bg-bg-card-hover hover:border-border/80'
      } ${compact ? 'p-3' : 'p-4'}`}
    >
      <div className="flex items-start gap-3">
        {item.emoji && <span className="text-xl mt-0.5">{item.emoji}</span>}
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold text-text-primary ${compact ? 'text-sm' : 'text-base'}`}>
            {item.name}
          </h3>
          <p className={`text-text-secondary mt-1 ${compact ? 'text-xs' : 'text-sm'} line-clamp-2`}>
            {item.description}
          </p>
          {item.category && (
            <span className="inline-block mt-2 px-2 py-0.5 bg-accent/10 text-accent-light text-xs rounded-full">
              {item.category}
            </span>
          )}
        </div>
        {selected && (
          <span className="text-accent-light text-lg">✓</span>
        )}
      </div>
    </button>
  )
}
