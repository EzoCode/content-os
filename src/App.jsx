import { useState, useCallback } from 'react'
import { StepIndicator } from './components/StepIndicator'
import { StepFond } from './components/StepFond'
import { StepConceptPsy } from './components/StepConceptPsy'
import { StepMecanique } from './components/StepMecanique'
import { StepScores } from './components/StepScores'
import { StepBridge } from './components/StepBridge'
import { StepGenerate } from './components/StepGenerate'

const STEPS = [
  { id: 1, label: 'Fond', icon: '💡' },
  { id: 2, label: 'Concept Psy', icon: '🧠' },
  { id: 3, label: 'Mécanique', icon: '🎬' },
  { id: 4, label: 'Scores', icon: '⭐' },
  { id: 5, label: 'Bridge', icon: '🌉' },
  { id: 6, label: 'Générer', icon: '🚀' },
]

function App() {
  const [step, setStep] = useState(1)
  const [config, setConfig] = useState({
    fond: '',
    bridge: '',
    conceptPsy: null,
    subConcept: null,
    formatMecanique: null,
    genreBeat: null,
    scores: { succes: {}, nouveaute: {} },
    additionalContext: '',
    apiKey: localStorage.getItem('claude-api-key') || '',
  })

  const updateConfig = useCallback((key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }))
  }, [])

  const renderStep = () => {
    switch (step) {
      case 1: return <StepFond config={config} updateConfig={updateConfig} />
      case 2: return <StepConceptPsy config={config} updateConfig={updateConfig} />
      case 3: return <StepMecanique config={config} updateConfig={updateConfig} />
      case 4: return <StepScores config={config} updateConfig={updateConfig} />
      case 5: return <StepBridge config={config} updateConfig={updateConfig} />
      case 6: return <StepGenerate config={config} updateConfig={updateConfig} />
      default: return null
    }
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      <header className="border-b border-border px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎬</span>
            <h1 className="text-xl font-bold text-text-primary">Content OS</h1>
          </div>
          <span className="text-text-muted text-sm">FOND × CONCEPT × MÉCANIQUE × BRIDGE</span>
        </div>
      </header>

      <StepIndicator steps={STEPS} currentStep={step} onStepClick={setStep} />

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="fade-in" key={step}>
          {renderStep()}
        </div>
      </main>

      {step < 6 && (
        <footer className="fixed bottom-0 left-0 right-0 bg-bg-secondary/80 backdrop-blur-md border-t border-border px-6 py-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <button
              onClick={() => setStep(s => Math.max(1, s - 1))}
              disabled={step === 1}
              className="px-6 py-2.5 rounded-lg border border-border text-text-secondary hover:text-text-primary hover:border-border-active transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Retour
            </button>
            <div className="text-text-muted text-sm">Étape {step} / {STEPS.length}</div>
            <button
              onClick={() => setStep(s => Math.min(STEPS.length, s + 1))}
              className="glow-btn px-8 py-2.5 rounded-lg text-white font-medium"
            >
              {step === 5 ? 'Générer le Script' : 'Suivant'}
            </button>
          </div>
        </footer>
      )}
    </div>
  )
}

export default App
