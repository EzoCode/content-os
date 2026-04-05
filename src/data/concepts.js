// ============================================
// CONCEPTS PSYCHOLOGIQUES (22 catégories)
// Source: "All concept Psycologiques" Notion
// ============================================
export const conceptsPsy = [
  {
    id: 'educatif',
    name: 'Éducatif & Valeur',
    description: 'Activer le principe de réciprocité et le désir de compétence.',
    emoji: '📖',
    subConcepts: [
      { id: 'step-by-step', name: 'Step-by-Step Tutorial', description: 'Le guide linéaire classique pour passer de A à Z.' },
      { id: 'quick-win', name: 'The "Quick Win"', description: 'Astuce qui donne un résultat immédiat en moins de 5 minutes.' },
      { id: 'skill-transfer', name: 'Skill Transfer', description: 'Enseigner une compétence rare ou difficile de manière accessible.' },
      { id: 'common-mistakes', name: 'Common Mistakes', description: 'Les erreurs que tout le monde fait (peur de l\'échec).' },
      { id: 'audit', name: 'The Audit', description: 'Analyse critique d\'un exemple réel pour en tirer des leçons.' },
      { id: 'error-prevention', name: 'Error Prevention', description: 'Comment éviter un problème avant qu\'il n\'arrive.' },
      { id: 'conditional-solutions', name: 'Conditional Solutions', description: '"Si vous avez le problème X, faites Y. Si Z, faites W."' },
      { id: 'wrong-way-correction', name: 'Wrong Way Correction', description: 'Démontrer une erreur courante (Conflit) pour révéler la bonne méthode (Progression).' },
    ]
  },
  {
    id: 'storytelling',
    name: 'Storytelling',
    description: 'Créer de l\'empathie et de l\'identification (neurones miroirs).',
    emoji: '📕',
    subConcepts: [
      { id: 'origin-story', name: 'Origin Story', description: 'Le moment précis où tout a commencé (le "pourquoi").' },
      { id: 'rock-bottom', name: 'Rock Bottom', description: 'Le moment le plus bas avant la remontée (vulnérabilité).' },
      { id: 'transformation-moment', name: 'Transformation Moment', description: 'Le déclic qui a tout changé.' },
      { id: 'first-success', name: 'The "First Success"', description: 'La première petite victoire qui a validé le parcours.' },
      { id: 'mentor-wisdom', name: 'Mentor Wisdom', description: 'Une leçon apprise d\'un tiers respecté.' },
      { id: 'failure-lesson', name: 'Failure Lesson', description: 'Ce qu\'un échec cuisant vous a appris (humilité).' },
      { id: 'unexpected-journey', name: 'Unexpected Journey', description: '"Je pensais aller vers A, je suis arrivé à B."' },
      { id: 'past-vs-present', name: 'Past vs Present', description: 'Contraste visuel ou narratif entre "avant" et "maintenant".' },
      { id: 'sit-in-struggle', name: 'Sit in the Struggle', description: 'S\'attarder sur l\'échec/tristesse sans dialogue pour forcer l\'empathie avant résolution.' },
      { id: 'vicarious-joy', name: 'Vicarious Joy Ride', description: 'Ralentir pour montrer le pur plaisir du résultat — vivre la récompense par procuration.' },
    ]
  },
  {
    id: 'question-curiosite',
    name: 'Question / Curiosité',
    description: 'Ouvrir une boucle cognitive (Open Loop) que le cerveau veut fermer.',
    emoji: '❓',
    subConcepts: [
      { id: 'shocking-revelations', name: 'Shocking Revelations', description: 'Une vérité cachée ou peu connue.' },
      { id: 'counter-intuitive', name: 'Counter-Intuitive Facts', description: 'Un fait qui semble faux mais qui est vrai.' },
      { id: 'paradox', name: 'The Paradox', description: 'Deux vérités qui semblent contradictoires.' },
      { id: 'hidden-truth', name: 'Hidden Truth', description: 'Ce que personne n\'ose dire tout haut.' },
      { id: 'what-if', name: '"What If" Scenarios', description: 'Explorer une réalité alternative.' },
      { id: 'dream-result', name: 'Dream Result Timeline', description: '"Voici où vous pourriez être dans 6 mois."' },
      { id: 'scenario-collision', name: 'Scenario Collision', description: 'Que se passe-t-il si on mélange X et Y ?' },
      { id: 'possibility-questions', name: 'Possibility Questions', description: 'Poser une question qui élargit le champ des possibles.' },
    ]
  },
  {
    id: 'myth-busting',
    name: 'Myth Busting',
    description: 'Créer la dissonance cognitive et affirmer une autorité par la contrariété.',
    emoji: '💥',
    subConcepts: [
      { id: 'stop-believing', name: 'Stop Believing', description: 'Démontage d\'une croyance populaire.' },
      { id: 'industry-lies', name: 'Industry Lies', description: '"Ce que les experts ne vous disent pas."' },
      { id: 'wisdom-flip', name: 'Conventional Wisdom Flip', description: 'Prendre un conseil connu et prouver l\'inverse.' },
      { id: 'quote-debunk', name: 'Famous Quote Debunk', description: 'Expliquer pourquoi une citation célèbre est fausse/mal comprise.' },
      { id: 'objection-crusher', name: 'Objection Crusher', description: 'Construire le contenu autour d\'une croyance limitante et la déconstruire.' },
      { id: 'surprising-reality', name: 'Surprising Reality', description: 'La réalité décevante ou surprenante derrière le glamour.' },
      { id: 'method-failure', name: 'Method Failure', description: 'Pourquoi la méthode "classique" ne marche plus.' },
      { id: 'backwards-thinking', name: 'Backwards Thinking', description: 'Pourquoi il faut commencer par la fin.' },
    ]
  },
  {
    id: 'autorite',
    name: 'Autorité',
    description: 'Bâtir la confiance, le statut et la crédibilité (Ethos).',
    emoji: '🏆',
    subConcepts: [
      { id: 'numbers-proof', name: 'Numbers & Proof', description: 'Utilisation de data brute pour valider un point.' },
      { id: 'achievement-based', name: 'Achievement Based', description: '"Comment j\'ai atteint [Résultat X]."' },
      { id: 'client-pattern', name: 'Client Pattern', description: '"Ce que j\'ai remarqué après avoir aidé 100 clients."' },
      { id: 'failure-analysis', name: 'Failure Analysis', description: 'Analyse experte d\'un échec externe (montre la compétence).' },
      { id: 'show-dont-tell', name: 'Show Don\'t Tell Proof', description: 'Prouver sa légitimité en accomplissant la tâche devant la caméra.' },
      { id: 'bts-business', name: 'Behind-the-Scenes (Business)', description: 'Les coulisses stratégiques (pas juste lifestyle).' },
      { id: 'industry-secrets', name: 'Industry Secrets', description: 'Les mécanismes cachés de votre secteur.' },
      { id: 'unique-perspective', name: 'Unique Perspective', description: 'Une théorie ou un modèle propriétaire que vous avez inventé.' },
      { id: 'investment-learning', name: 'Investment Learning', description: '"J\'ai dépensé X€ pour apprendre ça, voici le résumé."' },
    ]
  },
  {
    id: 'comparaison',
    name: 'Comparaison',
    description: 'Simplifier la prise de décision et ancrer la valeur.',
    emoji: '⚖️',
    subConcepts: [
      { id: 'tier-ranking', name: 'Tier Ranking', description: 'Classer des éléments du pire au meilleur (S-Tier à F-Tier).' },
      { id: 'good-vs-great', name: 'Good vs Great', description: 'La nuance entre l\'amateur et le pro.' },
      { id: 'budget-levels', name: 'Low vs Mid vs High Budget', description: 'Ce qu\'on obtient pour différents prix.' },
      { id: 'dos-donts', name: 'Do\'s vs Don\'ts', description: 'Le bon geste vs le mauvais geste.' },
      { id: 'before-after', name: 'Before vs After', description: 'La preuve visuelle de la transformation.' },
      { id: 'smart-dumb', name: 'Smart vs Dumb Way', description: 'L\'efficacité contre l\'effort inutile.' },
      { id: 'old-new', name: 'Old Way vs New Way', description: 'L\'évolution des méthodes dans le temps.' },
    ]
  },
  {
    id: 'stakes-challenge',
    name: 'Stakes / Challenge',
    description: 'Activer l\'urgence, la peur de la perte (FOMO) ou la motivation.',
    emoji: '🎰',
    subConcepts: [
      { id: '30-day', name: '30-Day Challenge', description: 'S\'engager publiquement sur la durée.' },
      { id: 'money-time', name: 'Money/Time Challenge', description: '"Je dois réussir X avec seulement Y€/heures."' },
      { id: 'success-failure', name: 'Success or Failure', description: 'Expérience binaire avec risque d\'échec public.' },
      { id: 'proof-challenge', name: 'Proof Challenge', description: '"Je prouve que c\'est possible en le faisant devant vous."' },
      { id: 'deadline', name: 'Deadline Consequences', description: 'Ce qui arrive si on ne fait rien maintenant.' },
      { id: 'all-in', name: 'The "All-in" Bet', description: 'Parier gros sur une idée.' },
      { id: 'make-or-break', name: 'Make or Break', description: 'Le moment décisif où tout se joue.' },
    ]
  },
  {
    id: 'visuel-dynamique',
    name: 'Visuel Dynamique',
    description: 'Retenir l\'attention par la stimulation visuelle et la rupture de pattern.',
    emoji: '👁️',
    subConcepts: [
      { id: 'visual-comparison', name: 'Visual Comparison', description: 'Juxtaposition immédiate pour comprendre sans mots.' },
      { id: 'scale-shift', name: 'Scale/Perspective Shift', description: 'Changer l\'échelle pour surprendre (macro/micro).' },
    ]
  },
  {
    id: 'conversationnel',
    name: 'Conversationnel',
    description: 'Créer une tribu, de l\'appartenance et de l\'engagement.',
    emoji: '💬',
    subConcepts: [
      { id: 'qa', name: 'Q&A', description: 'Répondre aux besoins spécifiques.' },
      { id: 'help-seeking', name: 'Help/Advice Seeking', description: 'Demander sincèrement de l\'aide à l\'audience (vulnérabilité).' },
      { id: 'interactive', name: 'Interactive Exchange', description: '"Dites-moi X et je vous dirai Y."' },
      { id: 'relatable-rant', name: 'Relatable Rant', description: '"Coup de gueule" sur un sujet partagé.' },
      { id: 'surprise-response', name: 'Surprise Response', description: 'Réagir spontanément à une bonne/mauvaise nouvelle.' },
      { id: 'support-validation', name: 'Support/Validation', description: '"Si vous traversez ça, écoutez ceci."' },
    ]
  },
  {
    id: 'succession-series',
    name: 'Succession / Séries',
    description: 'Fidéliser et créer une habitude de consommation (Retention).',
    emoji: '📺',
    subConcepts: [
      { id: 'cliffhanger', name: 'Cliffhanger Ending', description: 'Couper au moment clé pour forcer le retour.' },
      { id: 'problem-attempt', name: 'Problem-Attempt-Breakthrough', description: 'Structure narrative sur plusieurs jours.' },
      { id: 'mini-win-ladder', name: 'Mini-Win Ladder', description: 'Segments offrant chacun une petite résolution satisfaisante (mini-payoff).' },
    ]
  },
  {
    id: 'day-in-life',
    name: 'Day in the Life',
    description: 'Satisfaire le voyeurisme et l\'authenticité.',
    emoji: '🌅',
    subConcepts: [
      { id: 'unfiltered', name: 'Unfiltered Reality', description: 'Montrer le désordre, la fatigue, le "non-instagrammable".' },
      { id: 'behind-closed', name: 'Behind Closed Doors', description: 'Ce qui se passe quand les clients ne regardent pas.' },
      { id: 'pov', name: 'POV Experiences', description: 'Filmer à la première personne.' },
      { id: 'expectation-reality', name: 'Expectation vs Reality', description: 'Ce qu\'on imagine vs ce qui se passe vraiment.' },
    ]
  },
  {
    id: 'random',
    name: 'Random / Surprise',
    description: 'Dopamine pure par la nouveauté et l\'inattendu.',
    emoji: '🎲',
    subConcepts: [
      { id: 'unexpected-combo', name: 'Unexpected Combo', description: 'Mélanger deux choses qui n\'ont rien à voir.' },
      { id: 'weird-solutions', name: 'Weird Solutions', description: 'Une solution stupide qui marche.' },
      { id: 'strange-facts', name: 'Strange Facts', description: 'Le savoir inutile mais fascinant.' },
      { id: 'plot-twist', name: 'Plot Twist', description: 'La fin contredit le début.' },
      { id: 'accidental-discovery', name: 'Accidental Discovery', description: '"Je cherchais X, j\'ai trouvé Y."' },
      { id: 'random-encounters', name: 'Random Encounters', description: 'Interactions spontanées avec des inconnus.' },
    ]
  },
  {
    id: 'identite',
    name: 'Identité & Appartenance',
    description: 'Contenu miroir, tribu, appartenance générationnelle.',
    emoji: '🪞',
    subConcepts: [
      { id: 'thats-so-me', name: '"That\'s So Me"', description: 'Situation si précise qu\'une petite audience se sent visée personnellement.' },
      { id: 'insider-nod', name: 'The Insider Nod', description: 'Jargon ou référence culturelle que seuls les initiés comprennent.' },
      { id: 'confirmation-bias', name: 'Validation des Croyances', description: 'Dire ce que l\'audience pense déjà tout bas pour qu\'elle se sente validée.' },
      { id: 'us-vs-world', name: 'Us vs The World', description: 'Créer un ennemi commun pour souder la communauté.' },
    ]
  },
  {
    id: 'emotion-pure',
    name: 'Émotion Pure & Connexion',
    description: 'Activation chimique du cerveau (Dopamine, Ocytocine).',
    emoji: '💗',
    subConcepts: [
      { id: 'nostalgie', name: 'Nostalgie (Reminiscence Bump)', description: 'Throwback Content — la nostalgie crée un confort immédiat.' },
      { id: 'indignation', name: 'Indignation / Débat', description: 'Contenu polarisant qui force à choisir un camp. Hot Takes.' },
      { id: 'espoir', name: 'L\'Espoir (Aspiration)', description: 'Non pas "ce que je veux avoir" mais "qui je veux devenir".' },
    ]
  },
  {
    id: 'monnaie-sociale',
    name: 'Monnaie Sociale',
    description: 'Pourquoi les gens partagent : paraître cool, intelligent ou drôle.',
    emoji: '💰',
    subConcepts: [
      { id: 'humble-brag', name: 'Humble Brag par procuration', description: 'Partager un contenu qui fait paraître intelligent sans avoir à le dire.' },
      { id: 'identifiant-statut', name: 'Identifiant de Statut', description: 'Contenu "Luxe" ou "Exclusif" pour signaler son appartenance.' },
      { id: 'altruisme', name: 'L\'Altruisme ("Care")', description: '"Envoie ça à quelqu\'un qui a besoin d\'entendre ça."' },
      { id: 'relatability-groupe', name: 'Relatability de Groupe', description: '"Regarde, c\'est exactement nous" (taguer un ami).' },
    ]
  },
  {
    id: 'pourquoi',
    name: '"Pourquoi...?" (Question Causale)',
    description: 'Activer le besoin fondamental de comprendre les causes.',
    emoji: '🔍',
    subConcepts: [
      { id: 'pourquoi-invisible', name: 'Pourquoi personne n\'en parle ?', description: 'Révèle un angle mort collectif. Accéder à une vérité cachée.' },
      { id: 'pourquoi-toi', name: 'Pourquoi ça ne marche pas pour toi ?', description: 'Diagnostic direct qui promet une explication personnalisée.' },
      { id: 'pourquoi-pas-faute', name: 'Pourquoi tu n\'y arrives pas (c\'est pas ta faute)', description: 'Diagnostic + déculpabilisation = soulagement cognitif.' },
      { id: 'pourquoi-trompe', name: 'Pourquoi tout le monde se trompe sur X ?', description: 'Peur d\'être dans l\'erreur + promesse de correction.' },
      { id: 'pourquoi-toxique', name: 'Pourquoi le conseil X est toxique ?', description: 'Retourne une croyance acceptée.' },
      { id: 'pourquoi-reussit', name: 'Pourquoi X réussit toujours ?', description: 'Promet un pattern reproductible.' },
      { id: 'pourquoi-marche', name: 'Pourquoi ça marche vraiment ?', description: 'Dépasse le "comment" pour le mécanisme profond.' },
      { id: 'pourquoi-inevitable', name: 'Pourquoi c\'est inévitable ?', description: 'Crée urgence + fatalisme stratégique.' },
      { id: 'pourquoi-penses', name: 'Pourquoi tu penses comme ça ?', description: 'Introspection forcée.' },
      { id: 'pourquoi-erreur', name: 'Pourquoi tu fais toujours la même erreur ?', description: 'Pattern personnel révélé.' },
    ]
  },
  {
    id: 'analyse',
    name: 'Analyse (Décortiquer)',
    description: 'Satisfaire le besoin de comprendre "comment ça marche vraiment".',
    emoji: '🔬',
    subConcepts: [
      { id: 'breakdown', name: 'Breakdown/Déconstruction', description: 'Décomposer comment un succès a atteint un résultat impressionnant.' },
      { id: 'dissection', name: 'Dissection', description: 'Analyser un sujet populaire pièce par pièce.' },
      { id: 'elements-caches', name: 'Éléments cachés', description: 'Expliquer via les éléments dont personne ne parle.' },
      { id: 'research-reveal', name: 'Research Reveal', description: 'Partager les découvertes après X heures d\'analyse.' },
      { id: 'rabbit-hole', name: 'Rabbit Hole', description: 'Aller au fond d\'un sujet pour révéler ce qui est caché.' },
      { id: 'reverse-engineering', name: 'Reverse Engineering', description: 'Déconstruire la stratégie d\'un top performer.' },
      { id: 'anatomy', name: 'Anatomy', description: 'Décomposer un contenu viral en ses composants.' },
      { id: 'transformation-analysis', name: 'Transformation Analysis', description: 'Comment une personne est passée de A à B.' },
      { id: 'pattern-recognition', name: 'Pattern Recognition', description: 'Étudier plusieurs success stories pour trouver le pattern commun.' },
      { id: 'psychology-behind', name: 'Psychology Behind', description: 'Expliquer pourquoi quelque chose fonctionne (la psychologie derrière).' },
      { id: 'exact-mechanism', name: 'Exact Mechanism', description: 'Le mécanisme exact qui rend une méthode efficace.' },
    ]
  },
  {
    id: 'humour',
    name: 'Humour / Comédie',
    description: 'Incongruité, catharsis et supériorité. Dopamine + monnaie sociale.',
    emoji: '😂',
    subConcepts: [
      { id: 'pov-situations', name: 'POV Situations', description: 'Situation ultra-spécifique que le spectateur reconnaît instantanément.' },
      { id: 'elephant-room', name: 'Elephant in the Room', description: 'Nommer tout haut ce que tout le monde pense tout bas.' },
      { id: 'pop-culture-parody', name: 'Pop Culture Parody', description: 'Détourner une référence que tout le monde connaît.' },
      { id: 'self-deprecating', name: 'Self-Deprecating Humor', description: 'Se moquer de soi-même pour créer de la proximité.' },
      { id: 'exaggerated-failure', name: 'Exaggerated Failure', description: 'Amplifier un échec au point de le rendre absurde.' },
    ]
  },
  {
    id: 'jugement',
    name: 'Jugement / Opinion Tranchée',
    description: 'Forcer l\'accord ou le désaccord. Polarisation par le jugement public.',
    emoji: '⚔️',
    subConcepts: [
      { id: 'overrated-underrated', name: 'Overrated/Underrated', description: 'Déclarer ce qui est surévalué ou sous-évalué.' },
      { id: 'honest-review', name: 'Honest Review', description: 'Avis tranché et non diplomatique. Authenticité perçue.' },
      { id: 'hot-takes', name: 'Hot Takes', description: 'Opinion forte et non consensuelle. "Fight or flight" cognitif.' },
      { id: 'ranking-subjectif', name: 'Ranking / Tier List Subjectif', description: 'Classer selon son propre jugement. Chaque placement = micro-débat.' },
      { id: 'unpopular-opinion', name: 'Unpopular Opinion', description: 'Assumer publiquement un avis minoritaire.' },
      { id: 'call-out', name: 'The Call-Out', description: 'Nommer publiquement un problème, une personne ou une tendance.' },
    ]
  },
  {
    id: 'nostalgie-culture',
    name: 'Nostalgie & Culture',
    description: 'Activer le Reminiscence Bump — souvenirs liés à l\'identité.',
    emoji: '📼',
    subConcepts: [
      { id: 'throwback', name: 'Throwback Content', description: 'Évoquer une époque spécifique qui a marqué l\'audience.' },
      { id: 'started-vs-going', name: 'How It Started vs Going', description: 'Montrer l\'évolution dans le temps. Preuve de progression.' },
      { id: 'founding-artifacts', name: 'Founding Story Artifacts', description: 'Montrer objets, screenshots, documents des origines.' },
      { id: 'ref-generationnelle', name: 'Référence Culturelle Générationnelle', description: 'Film, musique, événement que toute une génération partage.' },
      { id: 'shared-memory', name: '"On a tous vécu ça"', description: 'Expérience universelle d\'une époque (ex: "MSN le soir après les cours").' },
      { id: 'cultural-comparison', name: 'Cultural Artifact Comparison', description: 'Comparer un objet d\'hier avec son équivalent d\'aujourd\'hui.' },
    ]
  },
  {
    id: 'fond-forme',
    name: 'Fond-Forme (Format = Levier Psy)',
    description: 'Le format de production EST le mécanisme psychologique.',
    emoji: '🎭',
    subConcepts: [
      { id: 'expert-interview', name: 'Expert Interview', description: 'Transfert d\'autorité par procuration. Le tiers crée la crédibilité.' },
      { id: 'street-interview', name: 'Street Interview / Micro-trottoir', description: 'Preuve sociale brute + imprévisibilité. Le format random = hook psy.' },
      { id: 'hot-seat', name: 'Hot Seat / Interview sous pression', description: 'Tension interpersonnelle réelle. Le face-à-face crée les stakes.' },
      { id: 'reaction-video', name: 'Reaction Video', description: 'Validation sociale en temps réel. Neurones miroirs activés par le visage.' },
      { id: 'expert-reacts', name: 'Expert Reacts', description: 'Autorité + réaction = double levier.' },
      { id: 'debate', name: 'Debate / Face-à-face', description: 'La polarisation naît du format. Tension cognitive et mise en scène.' },
      { id: 'collab', name: 'Collab / Feat', description: 'Croisement d\'audiences = novelty + social proof croisé.' },
      { id: 'storytime-facecam', name: 'Storytime Face-Cam', description: 'Seul face caméra, sans montage. La forme brute = signal de sincérité.' },
    ]
  },
];

// ============================================
// FORMAT MÉCANIQUES
// Source: "All Format Mecaniques" Notion
// ============================================
export const formatMecaniques = [
  {
    id: 'selfie-video',
    name: 'Selfie Video',
    description: 'Vidéo brute, téléphone à la main, sans montage complexe.',
    category: 'Face Caméra',
    emoji: '🤳'
  },
  {
    id: 'walk-talk',
    name: 'Walk & Talk',
    description: 'Filmer en marchant pour ajouter du dynamisme visuel.',
    category: 'Face Caméra',
    emoji: '🚶'
  },
  {
    id: 'floating-head',
    name: 'Floating Head (Green Screen)',
    description: 'Tête détourée au-dessus d\'un contenu.',
    category: 'Face Caméra',
    emoji: '🟢'
  },
  {
    id: 'multiple-actions',
    name: 'Content with Multiple Actions',
    description: 'Maquillage, hot ones, activité en fond.',
    category: 'Face Caméra',
    emoji: '🎬'
  },
  {
    id: 'skit',
    name: 'The Skit (Scénette)',
    description: 'Jouer plusieurs rôles avec costumes/perruques pour illustrer.',
    category: 'Mise en Scène',
    emoji: '🎭'
  },
  {
    id: 'modern-commercial',
    name: 'Modern Commercial',
    description: 'Vidéo haute production type pub TV scriptée pour le web.',
    category: 'Mise en Scène',
    emoji: '📺'
  },
  {
    id: 'cinematic-vlog',
    name: 'Cinematic Vlog',
    description: 'Montage soigné racontant une journée ou un événement.',
    category: 'Mise en Scène',
    emoji: '🎥'
  },
  {
    id: 'voiceover',
    name: 'Voiceover (Voix off)',
    description: 'Narrer une histoire par-dessus des images filmées séparément.',
    category: 'Montage',
    emoji: '🎙️'
  },
  {
    id: 'duet',
    name: 'Duet (Duo)',
    description: 'Vidéo à côté de celle d\'un autre, réagissant en temps réel.',
    category: 'Remix & Interaction',
    emoji: '🔀'
  },
  {
    id: 'stitch',
    name: 'Stitch (Collage)',
    description: 'Prendre les 5 premières secondes d\'une vidéo virale + votre réponse.',
    category: 'Remix & Interaction',
    emoji: '✂️'
  },
  {
    id: 'green-screen-commentary',
    name: 'Green Screen Commentary',
    description: 'Commenter par-dessus une capture d\'écran d\'article, tweet ou vidéo.',
    category: 'Remix & Interaction',
    emoji: '🖥️'
  },
  {
    id: 'setting-change',
    name: 'Setting Change',
    description: 'Changer de lieu entre les cuts pour maintenir l\'attention.',
    category: 'Dynamique Visuel',
    emoji: '🔄'
  },
  {
    id: 'shot-angle',
    name: 'Shot/Angle Change',
    description: 'Multiplier les angles de caméra sur un même sujet.',
    category: 'Dynamique Visuel',
    emoji: '📐'
  },
  {
    id: 'whiteboard',
    name: 'Whiteboard / Visualisation',
    description: 'Dessiner/écrire en temps réel pour expliquer un concept.',
    category: 'Dynamique Visuel',
    emoji: '🖊️'
  },
  {
    id: 'visual-framework',
    name: 'The Visual Framework',
    description: 'Concept complexe via schéma mental simple (infographie, mind map).',
    category: 'Dynamique Visuel',
    emoji: '🗺️'
  },
  {
    id: 'dos-vs-donts',
    name: 'Do\'s vs Don\'ts',
    description: 'Montrer côte à côte ce qu\'il faut faire et ne pas faire.',
    category: 'Comparaison Visuelle',
    emoji: '✅'
  },
  {
    id: 'before-after',
    name: 'Before vs After',
    description: 'Transformation visible avant/après.',
    category: 'Comparaison Visuelle',
    emoji: '🔁'
  },
  {
    id: 'tier-list-visual',
    name: 'Tier List / Ranking',
    description: 'Classement visuel d\'éléments (S/A/B/C).',
    category: 'Comparaison Visuelle',
    emoji: '📊'
  },
  {
    id: 'multi-part',
    name: 'Multi-Part Series',
    description: 'Contenu découpé en épisodes numérotés.',
    category: 'Série & Documentaire',
    emoji: '📺'
  },
  {
    id: 'daily-progress',
    name: 'Daily Progress',
    description: 'Documenter un projet jour après jour.',
    category: 'Série & Documentaire',
    emoji: '📅'
  },
  {
    id: 'day-in-life-format',
    name: 'Day in the Life',
    description: 'Documenter une journée complète en format immersif.',
    category: 'Série & Documentaire',
    emoji: '🌅'
  },
  {
    id: 'pov-experiences',
    name: 'POV Experiences',
    description: 'Filmer en vue subjective pour immerger le spectateur.',
    category: 'Série & Documentaire',
    emoji: '👁️'
  },
  {
    id: 'street-interview-format',
    name: 'Street Interview (Micro-trottoir)',
    description: 'Interviewer des inconnus dans la rue avec un micro visible.',
    category: 'Contenu Terrain',
    emoji: '🎤'
  },
  {
    id: 'public-challenge',
    name: 'Public Challenge',
    description: 'Demander à un inconnu de faire quelque chose.',
    category: 'Contenu Terrain',
    emoji: '🏆'
  },
  {
    id: 'bts',
    name: 'Behind the Scenes (BTS)',
    description: 'Filmer l\'équipe en train de préparer le "vrai" contenu.',
    category: 'Contenu Terrain',
    emoji: '🎬'
  },
  {
    id: 'notes-screenshot',
    name: 'Notes App Screenshot',
    description: 'Capture d\'écran d\'un texte dans l\'app "Notes" (intime/urgent).',
    category: 'Statique & Écrit',
    emoji: '📝'
  },
  {
    id: 'tweet-graphic',
    name: 'Tweet Graphic',
    description: 'Capture d\'écran d\'un post X/Twitter repostée sur Instagram/LinkedIn.',
    category: 'Statique & Écrit',
    emoji: '🐦'
  },
  {
    id: 'educational-carousel',
    name: 'Educational Carousel',
    description: 'Suite d\'images enseignant un concept étape par étape.',
    category: 'Statique & Écrit',
    emoji: '🖼️'
  },
  {
    id: 'cheat-sheet',
    name: 'The Cheat Sheet',
    description: 'Résumé dense de tout ce qu\'il faut savoir sur un sujet.',
    category: 'Statique & Écrit',
    emoji: '📋'
  },
];

// ============================================
// BEATS DE GENRE (Booster de concept)
// ============================================
export const genreBeats = [
  { id: 'horreur-monstre', genre: 'Horreur', beat: 'Le Monstre Attaque', hook: '"Pendant que tu fais X, Y te détruit déjà"' },
  { id: 'horreur-double', genre: 'Horreur', beat: 'Double Ending', hook: '"Tu crois avoir vaincu X ? Il revient toujours"' },
  { id: 'action-impro', genre: 'Action', beat: 'Improvisation', hook: '"Mon plan a échoué — ce que j\'ai fait ensuite"' },
  { id: 'mythe-underworld', genre: 'Mythe', beat: 'Visit to Underworld', hook: '"Je suis allé dans la partie la plus sombre de X"' },
  { id: 'crime-justice', genre: 'Crime', beat: 'Poetic Justice', hook: '"Ils ont triché avec X — ils ont payé avec X"' },
  { id: 'love-joust', genre: 'Love Story', beat: 'The Joust', hook: '"On s\'est affrontés sur X — respect mutuel"' },
  { id: 'thriller-amateur', genre: 'Thriller', beat: 'Amateur in Danger', hook: '"Je ne suis pas expert mais si j\'arrête, je perds tout"' },
];

// ============================================
// CRITÈRES DE QUALITÉ
// ============================================
export const qualityCriteria = {
  succes: [
    { id: 'simple', name: 'Simple', description: 'L\'idée centrale est compréhensible rapidement ?' },
    { id: 'unexpected', name: 'Inattendu', description: 'Élément de surprise ?' },
    { id: 'credible', name: 'Crédible', description: 'Malgré la surprise, ça reste plausible ?' },
    { id: 'concret', name: 'Concret', description: 'Illustrable avec des exemples tangibles ?' },
    { id: 'emotion', name: 'Émotion', description: 'Réponse émotionnelle forte ?' },
    { id: 'story', name: 'Story', description: 'Se prête à une structure narrative ?' }
  ],
  nouveaute: [
    { id: 'contre-intuitif', name: 'Contre-intuitif', description: 'Défie une intuition commune' },
    { id: 'contre-narratif', name: 'Contre-narratif', description: 'Déconstruit un récit dominant' },
    { id: 'choc', name: 'Choc et effroi', description: 'Le choc/surprise comme moteur principal' },
    { id: 'articulation', name: 'Articulation élégante', description: 'Explication radicalement plus simple' }
  ]
};
