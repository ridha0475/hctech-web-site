# hctech web site — règles de dépôt

- Chaque `git push origin main` déclenche automatiquement le déploiement
  GitHub Pages (`.github/workflows/deploy.yml`) — pas d'étape manuelle
  séparée. Site en ligne : https://ridha0475.github.io/hctech-web-site/
- Après chaque changement confirmé, committer et pousser sur `main` sans
  redemander confirmation à chaque fois : la relecture se fait sur le site
  déployé, dans Chrome. Vérifier localement dans le navigateur avant de
  pousser (décision du 2026-09-05).
- **Commits complets** : chaque commit embarque tous les fichiers modifiés
  du dépôt, `CLAUDE.md` et `TODO.md` compris. Relire `git status` avant de
  committer et ne rien laisser de côté — sinon les notes et le suivi
  divergent de ce qui est réellement publié.
- Cache-busting : toute modif de `styles/main.css`, `src/site/i18n.js`
  ou `src/site/contact.js` doit bumper son `?v=N` dans les pages HTML qui
  la chargent, sinon les visiteurs gardent l'ancienne version en cache.
- Sous-menus du header (`.nav__submenu`) : liens en ligne SANS fond ni
  bordure ni ombre de conteneur — la « bulle » de fond a été écartée le
  2026-09-05 ; juste du texte souligné avec `text-shadow` pour la
  lisibilité sur le fond animé, couleur `var(--accent)` au survol.
- **Passe mobile en cours depuis le 2026-09-06** — remplace la consigne du
  2026-09-05 qui disait de ne pas tester le mobile. Constat mesuré sur les 14
  pages en 390×844 et 360×800, FR et AR : aucun débordement horizontal, le
  formulaire passe déjà en une colonne, le RTL tient. Défauts relevés : bandeau
  de menu à 216 px (26 % de l'écran, le titre de l'accueil ne commence qu'à
  354 px), champs de formulaire à 15,2 px (Safari iOS zoome au focus sous
  16 px), ancre `#contact-form` en `scroll-margin-top: 0` sous un bandeau fixe,
  cibles tactiles sous 44 px (curseurs 26 px, boutons de langue 27 px, liens du
  pied de page 14 px).
- **La scène 3D reste sur les 14 pages** (décision du client, 2026-09-06). Ce
  n'est pas du poids mort : le `<canvas id="stage">` est sur toutes les pages et
  le voile vert est fait pour la laisser transparaître. three.js pèse ~700 Ko
  gzip (279 Ko `three.core.js` + 415 Ko `three.webgpu.js`), identique partout
  donc mis en cache après la première page — le coût réel est l'analyse des
  3,5 Mo décompressés au premier chargement, pas le réseau. **Ne pas proposer
  de la retirer** ; le levier est de ne pas bloquer le contenu pendant son
  chargement et de l'alléger sur mobile.
- **Survol des sous-menus du header : RÉSOLU** (2026-09-05). Cause racine :
  tant qu'un `<details>` est fermé, Chrome pose `content-visibility: hidden`
  sur `::details-content`, ce qui empêche tout rendu des descendants **quel
  que soit leur `display`**. Les règles `:hover`, `.is-hover-open` et
  `:focus-within` matchaient bien (`display` calculé = `flex`) mais ne
  pouvaient rien afficher — mesuré via `checkVisibility()`. Correctif : le
  survol bascule `details.open` en JS (`src/site/i18n.js`), seul état qui
  rend `::details-content` visible ; le CSS ne garde que
  `.nav__dropdown[open] .nav__submenu`. **Ne jamais réintroduire de règle
  CSS de survol sur ces sous-menus, elle sera silencieusement inopérante.**
  Vérifié par vrai déplacement de curseur : sous-menu affiché à l'écran,
  exclusivité mutuelle OK, fermeture après 250 ms OK. Les hypothèses
  d'empilement (canvas WebGPU, Lenis, pin GSAP) sont écartées : sous le
  curseur, `.nav__dropdown:hover summary` matche bien.
- `contact.html` contient 3 formulaires distincts (`form-etude`,
  `form-intervention`, `form-contact`), routés par `?sujet=etude|
  intervention|contact` dans `src/site/contact.js` — pas un formulaire
  unique. Liste des 5 enseignes carburant tunisiennes (menu « Enseigne /
  marque ») vérifiée le 2026-09-05 via le site du Ministère de l'Énergie
  et Vivo Energy : AGIL, Shell, TotalEnergies, Star Oil, OLA Energy.
- **Voile vert (2026-09-06)** : le contenu des pages n'est plus posé sur du
  quasi-noir. `.home-links, .detail-page` est en `rgba(10, 26, 8, 0.78)` avec
  `backdrop-filter: blur(14px)`, et le bandeau `.nav` reprend la même teinte à
  son alpha d'origine `0.28`. Le but est d'entrevoir la scène 3D derrière le
  contenu. **`--ink-faint` est redéfini à `0.6` sur ces panneaux** : la valeur
  globale `0.5` tombe sous le seuil AA au-dessus des parties claires de la
  scène. Toute baisse de l'alpha du voile impose de remonter `--ink-faint`
  d'autant : 0,82 → 0,55 · 0,78 → 0,58 · 0,70 → 0,64.
- **L'accueil a une seule URL : `./`** — jamais `./index.html`. Les deux
  servent le même fichier mais constituent deux entrées de cache distinctes
  côté navigateur, et la balise `canonical` comme le `sitemap.xml` déclarent la
  racine. Un lien interne vers `./index.html` casse l'alignement canonique et
  fait réapparaître des versions périmées (constaté le 2026-09-06).
- **Pied de page harmonisé (2026-09-06)** : identique sur les 14 pages, réduit
  à une seule ligne centrée — mentions légales, copyright, crédit « Site
  réalisé par **Nimbus** Tech » (orthographe vérifiée auprès du client). Les
  raccourcis de navigation précédent/suivant ont été retirés volontairement :
  ils différaient sur chaque page et c'était la source de la disparité. Le
  parcours guidé entre pages n'existe plus, la navigation passe par le header.
- **HUD de rendu retiré (2026-09-06)** : le bandeau « fps · brins · état » de
  l'accueil est supprimé du HTML et du CSS. `src/main.js` le calcule toujours,
  ses écritures sont gardées par un test de présence — remettre le `<div
  class="chrome hud">` suffit à le réafficher.
- **Contraste du bandeau du menu : non-conformité connue et acceptée**
  (2026-09-06). Les liens en `--ink-soft` sur un fond à `0.28` d'alpha varient
  de 2,05:1 (ciel clair derrière) à 6,34:1 (sol sombre) selon la scène. Le
  client a vu les chiffres et les options chiffrées, et a choisi de ne rien
  changer. **Ne pas le resignaler comme un défaut à corriger.** Pour mémoire,
  la seule piste qui atteignait l'AA sans opacifier complètement le bandeau
  était : alpha `0.50` + liens en `--ink` opaque = 4,76:1.
- **Tester le focus clavier** : le panneau de prévisualisation doit être au
  premier plan (`tabs_select`), sinon `document.hasFocus()` est faux et
  `:focus` ne matche jamais — `activeElement` peut être correct pendant que la
  règle CSS reste inerte, ce qui produit de faux échecs. Sur le site déployé,
  le premier Tab après chargement est absorbé par le chrome du navigateur :
  tabuler deux fois, ou revenir en `Shift+Tab`. Le `blur()` ne réinitialise pas
  le point de départ de navigation séquentielle, il faut recharger la page.
- **Le cache HTML n'a pas de `?v=N`** : la règle de cache-busting ne couvre que
  `main.css`, `i18n.js`, `contact.js` et `calculator.js`. Les pages elles-mêmes
  dépendent du `cache-control: max-age=600` de GitHub Pages. Une relecture faite
  dans les dix minutes qui suivent un push peut donc montrer l'ancienne version
  — `Cmd+Shift+R`, ou ajouter `?nocache=1` à l'URL pour trancher.
