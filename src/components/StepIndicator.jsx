export function StepIndicator({ steps, currentStep, onStepClick, config }) {
  const isStepAccessible = (stepId) => {
    if (stepId === 1) return true
    if (stepId <= currentStep) return true
    switch (stepId) {
      case 2: return config.idea.trim().length > 10
      case 3: return config.psychoConcept !== null
      case 4: return config.hookCategory !== null
      case 5: return config.formatMecanique !== null
      case 6: return config.contentFormat !== null
      case 7: return config.hookType !== null && config.leadType !== null
      case 8: return config.closingEmotion !== null
      default: return false
    }
  }

  return (
    <div className="border-b border-border bg-bg-secondary/50">
      <div className="max-w-6xl mx-auto px-6 py-3">
        <div className="flex items-center gap-1 overflow-x-auto">
          {steps.map((s, i) => {
            const active = s.id === currentStep
            const completed = s.id < currentStep
            const accessible = isStepAccessible(s.id)

            return (
              <div key={s.id} className="flex items-center">
                <button
                  onClick={() => accessible && onStepClick(s.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all whitespace-nowrap ${
                    active
                      ? 'bg-accent/20 text-accent-light border border-border-active'
                      : completed
                        ? 'text-success cursor-pointer hover:bg-bg-card'
                        : accessible
                          ? 'text-text-secondary cursor-pointer hover:bg-bg-card'
                          : 'text-text-muted cursor-not-allowed opacity-40'
                  }`}
                  disabled={!accessible}
                >
                  <span>{completed ? '✓' : s.icon}</span>
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
                {i < steps.length - 1 && (
                  <div className={`w-6 h-px mx-1 ${completed ? 'bg-success' : 'bg-border'}`} />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
