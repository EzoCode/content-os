import { useState, useCallback, useEffect } from 'react'
import { StepIndicator } from './components/StepIndicator'
import { StepIdea } from './components/StepIdea'
import { StepPsychoConcept } from './components/StepPsychoConcept'
import { StepHookCategory } from './components/StepHookCategory'
import { StepFormatMecanique } from './components/StepFormatMecanique'
import { StepContentFormat } from './components/StepContentFormat'
import { StepHookLead } from './components/StepHookLead'
import { StepClosingScores } from './components/StepClosingScores'
import { StepGenerate } from './components/StepGenerate'

const STEPS = [
  { id: 1, label: 'Idée', icon: '💡' },
  { id: 2, label: 'Concept Psy', icon: '🧠' },
  { id: 3, label: 'Hook', icon: '🎣' },
  { id: 4, label: 'Format', icon: '🎬' },
  { id: 5, label: 'Contenu', icon: '📋' },
  { id: 6, label: 'Hook & Lead', icon: '🎯' },
  { id: 7, label: 'Closing & Scores', icon: '⭐' },
  { id: 8, label: 'Générer', icon: '🚀' },
]

const STORAGE_KEY = 'content-os-config'
const STEP_KEY = 'content-os-step'

function loadSavedConfig() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      return {
        idea: parsed.idea || '',
        psychoConcept: parsed.psychoConcept || null,
        hookCategory: parsed.hookCategory || null,
        hookSubFormat: parsed.hookSubFormat || null,
        formatMecanique: parsed.formatMecanique || null,
        contentFormat: parsed.contentFormat || null,
        hookType: parsed.hookType || null,
        leadType: parsed.leadType || null,
        closingEmotion: parsed.closingEmotion || null,
        scores: parsed.scores || { succes: {}, nouveaute: {} },
        additionalContext: parsed.additionalContext || '',
        apiKey: localStorage.getItem('claude-api-key') || '',
      }
    }
  } catch { /* ignore parse errors */ }
  return null
}

function loadSavedStep() {
  try {
    const saved = localStorage.getItem(STEP_KEY)
    if (saved) return Math.max(1, Math.min(8, parseInt(saved, 10)))
  } catch { /* ignore */ }
  return 1
}

function App() {
  const [step, setStep] = useState(loadSavedStep)
  const [config, setConfig] = useState(() => loadSavedConfig() || {
    idea: '',
    psychoConcept: null,
    hookCategory: null,
    hookSubFormat: null,
    formatMecanique: null,
    contentFormat: null,
    hookType: null,
    leadType: null,
    closingEmotion: null,
    scores: { succes: {}, nouveaute: {} },
    additionalContext: '',
    apiKey: localStorage.getItem('claude-api-key') || '',
  })

  // Persist config to localStorage on every change
  useEffect(() => {
    const { apiKey: _key, ...configWithoutKey } = config
    localStorage.setItem(STORAGE_KEY, JSON.stringify(configWithoutKey))
  }, [config])

  // Persist current step
  useEffect(() => {
    localStorage.setItem(STEP_KEY, String(step))
  }, [step])

  const updateConfig = useCallback((key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }))
  }, [])

  const canGoNext = () => {
    switch (step) {
      case 1: return config.idea.trim().length > 10
      case 2: return config.psychoConcept !== null
      case 3: return config.hookCategory !== null
      case 4: return config.formatMecanique !== null
      case 5: return config.contentFormat !== null
      case 6: return config.hookType !== null && config.leadType !== null
      case 7: return config.closingEmotion !== null
      default: return true
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1: return <StepIdea config={config} updateConfig={updateConfig} />
      case 2: return <StepPsychoConcept config={config} updateConfig={updateConfig} />
      case 3: return <StepHookCategory config={config} updateConfig={updateConfig} />
      case 4: return <StepFormatMecanique config={config} updateConfig={updateConfig} />
      case 5: return <StepContentFormat config={config} updateConfig={updateConfig} />
      case 6: return <StepHookLead config={config} updateConfig={updateConfig} />
      case 7: return <StepClosingScores config={config} updateConfig={updateConfig} />
      case 8: return <StepGenerate config={config} updateConfig={updateConfig} />
      default: return null
    }
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <header className="border-b border-border px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎬</span>
            <h1 className="text-xl font-bold text-text-primary">Content OS</h1>
          </div>
          <div className="flex items-center gap-4">
            {config.idea && (
              <span className="text-text-muted text-xs max-w-[200px] truncate hidden md:inline" title={config.idea}>
                {config.idea.substring(0, 40)}{config.idea.length > 40 ? '...' : ''}
              </span>
            )}
            <button
              onClick={() => {
                if (confirm('Recommencer un nouveau script ? Ta configuration actuelle sera effacée.')) {
                  setConfig({
                    idea: '',
                    psychoConcept: null,
                    hookCategory: null,
                    hookSubFormat: null,
                    formatMecanique: null,
                    contentFormat: null,
                    hookType: null,
                    leadType: null,
                    closingEmotion: null,
                    scores: { succes: {}, nouveaute: {} },
                    additionalContext: '',
                    apiKey: config.apiKey,
                  })
                  setStep(1)
                }
              }}
              className="text-xs text-text-muted hover:text-danger transition-colors"
            >
              Nouveau script
            </button>
          </div>
        </div>
      </header>

      {/* Step Indicator */}
      <StepIndicator steps={STEPS} currentStep={step} onStepClick={setStep} config={config} />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="fade-in" key={step}>
          {renderStep()}
        </div>
      </main>

      {/* Navigation */}
      {step < 8 && (
        <footer className="fixed bottom-0 left-0 right-0 bg-bg-secondary/80 backdrop-blur-md border-t border-border px-6 py-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <button
              onClick={() => setStep(s => Math.max(1, s - 1))}
              disabled={step === 1}
              className="px-6 py-2.5 rounded-lg border border-border text-text-secondary hover:text-text-primary hover:border-border-active transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Retour
            </button>

            <div className="text-text-muted text-sm">
              Étape {step} / {STEPS.length}
            </div>

            <button
              onClick={() => setStep(s => Math.min(STEPS.length, s + 1))}
              disabled={!canGoNext()}
              className="glow-btn px-8 py-2.5 rounded-lg text-white font-medium"
            >
              {step === 7 ? 'Générer le Script' : 'Suivant'}
            </button>
          </div>
        </footer>
      )}
    </div>
  )
}

export default App
