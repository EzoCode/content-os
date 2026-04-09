const STORAGE_KEY = 'content-os-history'

export function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

export function saveToHistory(session) {
  const history = loadHistory()
  history.unshift({ ...session, id: Date.now(), date: new Date().toISOString() })
  if (history.length > 50) history.length = 50
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
  return history
}

export function deleteFromHistory(id) {
  const history = loadHistory().filter(s => s.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
  return history
}
