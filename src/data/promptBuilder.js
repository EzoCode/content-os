import { qualityCriteria } from './concepts.js';

const scoreLabels = {};
qualityCriteria.succes.forEach(c => { scoreLabels[c.id] = c.name; });
qualityCriteria.nouveaute.forEach(c => { scoreLabels[c.id] = c.name; });

export function buildPrompt(config) {
  const {
    idea,
    psychoConcept,
    hookCategory,
    hookSubFormat,
    formatMecanique,
    contentFormat,
    hookType,
    leadType,
    closingEmotion,
    scores,
    additionalContext
  } = config;

  const hasSuccesScores = scores?.succes && Object.keys(scores.succes).length > 0;
  const hasNouveauteScores = scores?.nouveaute && Object.keys(scores.nouveaute).length > 0;

  return `Tu es un scripteur de contenu vidéo expert, spécialisé dans la création de scripts viraux. Tu appliques un système de création de contenu rigoureux basé sur la psychologie humaine, la narration cinématographique et les mécaniques de rétention.

# BRIEF DE CRÉATION

## Idée / Sujet
${idea}

## Concept Psychologique Choisi
**${psychoConcept.name}** : ${psychoConcept.description}
${psychoConcept.source ? `Source : ${psychoConcept.source}` : ''}
${psychoConcept.example ? `Exemple d'application : ${psychoConcept.example}` : ''}
${psychoConcept.tone ? `Tonalité attendue : ${psychoConcept.tone}` : ''}

## Catégorie de Hook
**${hookCategory.name}** : ${hookCategory.description}
${hookCategory.tip ? `Conseil clé : ${hookCategory.tip}` : ''}
${hookSubFormat ? `→ Sous-format spécifique : **${hookSubFormat}**` : ''}

## Format Mécanique
**${formatMecanique.name}** : ${formatMecanique.description}
Catégorie : ${formatMecanique.category}
${formatMecanique.tip ? `Conseil de production : ${formatMecanique.tip}` : ''}
${formatMecanique.effort ? `Niveau d'effort : ${formatMecanique.effort}` : ''}

## Format de Contenu
**${contentFormat.name}** : ${contentFormat.description}
${contentFormat.example ? `Exemple : ${contentFormat.example}` : ''}
${contentFormat.tip ? `Conseil : ${contentFormat.tip}` : ''}

## Type de Hook (0-15 secondes)
**${hookType.name}** : ${hookType.description}
${hookType.example ? `Exemple : ${hookType.example}` : ''}
${hookType.tip ? `Conseil : ${hookType.tip}` : ''}

## Type de Lead (15-90 secondes)
**${leadType.name}** : ${leadType.description}
${leadType.example ? `Exemple : ${leadType.example}` : ''}
${leadType.tip ? `Conseil : ${leadType.tip}` : ''}

## Émotion de Closing
**${closingEmotion.name}** : ${closingEmotion.description}
${closingEmotion.effect ? `Effet recherché : ${closingEmotion.effect}` : ''}
${closingEmotion.example ? `Exemple : ${closingEmotion.example}` : ''}
${closingEmotion.bestFor ? `Idéal pour : ${closingEmotion.bestFor}` : ''}

${hasSuccesScores || hasNouveauteScores ? `## Scores de Qualité Visés
${hasSuccesScores ? `### SUCCES Framework (Engagement & Mémorabilité)
${Object.entries(scores.succes).map(([k, v]) => `- ${scoreLabels[k] || k}: ${v}/5`).join('\n')}` : ''}

${hasNouveauteScores ? `### Nouveauté (Innovation de l'angle)
${Object.entries(scores.nouveaute).map(([k, v]) => `- ${scoreLabels[k] || k}: ${v}/5`).join('\n')}` : ''}
` : ''}

${additionalContext ? `## Contexte Additionnel\n${additionalContext}` : ''}

---

# INSTRUCTIONS DE RÉDACTION

## Voix & Style
- Entonnoir inversé : partir d'un élément simple et concret pour aboutir à des réflexions complexes
- Conversationnel mais jamais relâché. Marques d'hésitation calculées ("euh", "bon", "bref")
- Affirmatif. "Je t'explique" et pas "Laisse-moi t'expliquer"
- Proximité directe. Passage du "je" au "nous" inclusif, adresser en "tu/toi"
- Alternance accélérations / ralentissements selon l'intensité
- Phrases longues accumulées dans les moments intenses, ruptures brutales par phrases courtes

## Règles NON NÉGOCIABLES
- Chaque phrase = sujet + verbe + complément. Pas de fragments.
- Max 1 virgule par phrase. S'il y en a 2, couper en 2 phrases.
- Voix active obligatoire.
- Mots de liaison permanents : "Parce que", "Du coup", "Après ça", "En gros", "Mais en réalité"
- Enchaîner en "mais / donc", jamais en "et puis"
- Vocabulaire niveau CE2. Le plus basique possible.
- Zéro adverbes (très, super, vraiment = interdit)
- Zéro mots mous (un peu, juste, probablement, peut-être)
- Expliquer CHAQUE concept nommé. Ne jamais supposer que le lecteur sait.
- Jamais d'annonce de plan. "Partie 1, 2, 3" = interdit.
- Jamais d'annonces dramatiques vides.
- La conclusion n'est PAS un résumé. Apporter une idée NOUVELLE et irrésistible.
- Interdiction d'utiliser le pattern "pas X, mais Y"

## Structure Obligatoire
1. **HOOK** (0-15 sec) : Valider le clic immédiatement + Pattern interrupt + Promesse claire
2. **LEAD** (15-90 sec) : Développer selon le type de lead choisi + Preuves initiales + Enjeux
3. **CORPS** : Développement avec mini-payoffs progressifs, tension permanente, pattern interrupts tous les 3 minutes
4. **CLIMAX** : Convergence de tous les fils + Payoff de la promesse du début
5. **CLOSING** : Émotion choisie + CTA intégré naturellement au milieu (jamais en fin)

## Tension & Climax (OBLIGATOIRE)
- Chaque script DOIT contenir une vraie tension et un vrai climax
- The Pledge : promettre que quelque chose d'intéressant va se passer
- Conflit permanent : chaque scène a un enjeu
- Sous-texte : ne jamais dire directement, glisser des indices
- Suspense long : information au spectateur → potentiel de collision → prendre son temps → escalade → pire scénario
- Le climax est l'inverse, la conséquence ou l'accomplissement du setup

## Mots Persuasifs Yale
Injecter de façon ciblée : résultats, économiser, prouvé, découvert, facile, garanti...

---

# OUTPUT ATTENDU

Fournis :
1. **5 hooks alternatifs** (variations du hook principal)
2. **Le script complet** structuré en sections claires
3. **Titres visuels** suggérés (pour les cartons/textes à l'écran)
4. **Description** courte pour la vidéo
5. **Notes de production** : suggestions visuelles, cuts, transitions

Le script doit faire entre 1500 et 3000 mots selon la complexité du sujet. Chaque mot doit servir. Rien de superflu.`;
}
