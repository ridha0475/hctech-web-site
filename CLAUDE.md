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
- Ne pas vérifier/tester l'affichage mobile pour l'instant (décision du
  2026-09-05) : on finit le desktop d'abord, la passe mobile viendra
  ensuite séparément.
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
