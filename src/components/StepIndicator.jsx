export function StepIndicator({ steps, currentStep, onStepClick }) {
  return (
    <div className="border-b border-border bg-bg-secondary/50">
      <div className="max-w-6xl mx-auto px-6 py-3">
        <div className="flex items-center gap-1 overflow-x-auto">
          {steps.map((s, i) => {
            const active = s.id === currentStep
            const completed = s.id < currentStep

            return (
              <div key={s.id} className="flex items-center">
                <button
                  onClick={() => onStepClick(s.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all whitespace-nowrap cursor-pointer ${
                    active
                      ? 'bg-accent/20 text-accent-light border border-border-active'
                      : completed
                        ? 'text-success hover:bg-bg-card'
                        : 'text-text-secondary hover:bg-bg-card'
                  }`}
                >
                  <span>{completed ? '✓' : s.icon}</span>
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
                {i < steps.length - 1 && (
                  <div className={`w-8 h-px mx-1 ${completed ? 'bg-success' : 'bg-border'}`} />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
