import { conceptsPsy } from './concepts'

const conceptMap = new Map()
const subConceptMap = new Map()

for (const concept of conceptsPsy) {
  conceptMap.set(concept.id, concept)
  for (const sub of concept.subConcepts) {
    subConceptMap.set(`${concept.id}:${sub.id}`, { concept, subConcept: sub })
  }
}

export function rebuildSelectedConcepts(conceptKeys) {
  if (!conceptKeys || conceptKeys.length === 0) return []

  return conceptKeys.reduce((acc, key) => {
    if (key.includes(':')) {
      const entry = subConceptMap.get(key)
      if (entry) acc.push({ key, concept: entry.concept, subConcept: entry.subConcept })
    } else {
      const concept = conceptMap.get(key)
      if (concept) acc.push({ key, concept, subConcept: null })
    }
    return acc
  }, [])
}
