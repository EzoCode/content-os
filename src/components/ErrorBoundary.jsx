import { Component } from 'react'

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-bg-primary flex items-center justify-center p-6">
          <div className="bg-bg-card border border-danger/30 rounded-xl p-8 max-w-lg text-center">
            <h2 className="text-xl font-bold text-text-primary mb-3">Une erreur est survenue</h2>
            <p className="text-text-secondary text-sm mb-4">{this.state.error?.message || 'Erreur inconnue'}</p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-4 py-2 rounded-lg bg-accent text-white text-sm hover:bg-accent/80 transition-all"
            >
              Reessayer
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
