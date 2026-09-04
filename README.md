# Site HCTECH — GEVLR-II

Site statique multilingue prêt pour GitHub Pages. L'animation WebGPU est utilisée
sur les navigateurs compatibles ; une animation CSS légère prend automatiquement
le relais ailleurs.

## Publication

1. Créer un dépôt GitHub public et envoyer le contenu de ce dossier à sa racine.
2. Dans **Settings → Pages**, choisir **GitHub Actions** comme source.
3. Le workflow `Deploy GitHub Pages` publie chaque mise à jour de `main`.

Le formulaire ouvre l'application e-mail du visiteur avec un message prérempli,
car GitHub Pages ne peut pas exécuter de backend.

## Test local

```bash
python3 -m http.server 8991
```

Puis ouvrir <http://localhost:8991>.
