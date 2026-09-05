# TODO — Site HCTECH

Liste de travail classée par priorité. Les contenus techniques et réglementaires doivent être validés avant publication définitive.

## Priorité 1 — Contenu à terminer

- [ ] **Page L'équipe** — noms et fonctions en place (Belajouza, BenHamoud, astreinte technique 24/7) ; reste à fournir biographies courtes et portraits validés.
- [x] **Page Notre vision** — définir la mission HCTECH, l'ambition pour la Tunisie et 3 engagements concrets.
- [x] **Page À propos** — compléter l'histoire de HCTECH, son rôle exact, sa zone d'intervention et son offre de services.
- [x] **Fiche technique GEVLR-II** — données officielles GECO intégrées (dimensions, poids, débit, puissance, consommation, capacité de récupération, conditions d'exploitation, supervision/maintenance). ⚠️ La fiche et le certificat ATEX de GECO couvrent le modèle générique « GEVLR », pas une fiche distincte « GEVLR-II » — à faire confirmer par GECO (détail dans les notes internes, hors de ce dépôt).
- [ ] **Composants de la vue éclatée** — faire valider par le fabricant les six désignations et leur position dans l'illustration avant de présenter celle-ci comme une vue technique contractuelle.
- [x] **Certifications** — organisme (ECM, Ente Certificazione Macchine srl, n° 1282), référence, dates de validité (15/11/2022 → 14/11/2027) et marquage (Ex d IIB T4) affichés sur la page Avantages. Reste : récupérer le PDF officiel du certificat (actuellement lien externe vers gecokorea.com) et demander à GECO le module D/E pour la production + la déclaration UE de conformité (module B ne couvre que la conception).
- [ ] **Revendication « technologie brevetée »** — ⚠️ ne rien publier du type « technologie brevetée GECO » tant que la titularité des brevets n'est pas confirmée par écrit par le fournisseur. Détail, pièces et suivi : notes internes, hors de ce dépôt.
- [ ] **Allégations commerciales** — valider et sourcer les chiffres de récupération, réduction des COV, consommation, maintenance et retour sur investissement.
- [x] **Page Le modèle économique** — nouveau sous-menu sous « La solution ». Principe (zéro investissement, partage 60 % HCTech / 40 % exploitant, maintenance incluse) et le pourcentage de partage publiés à la demande explicite du client (2026-09-04).

## Priorité 2 — Conversion commerciale

- [x] **Demande d'étude** — le calculateur (page dédiée) transmet prix du litre, volume vendu/jour et volume de cuve au message de contact pré-rempli. Le formulaire de contact demande aussi les carburants distribués, la fréquence des livraisons et la localisation de la station (2026-09-05).
- [ ] **Formulaire réellement envoyé** — décision du 2026-09-04 : le client garde le `mailto:` actuel (pas de service tiers type FormSubmit/Formspree). Reste peu fiable (dépend de l'app mail du visiteur), sans accusé de réception ni protection antispam — à revoir si les demandes reçues sont insuffisantes.
- [ ] **Coordonnées professionnelles** — téléphone tranché le 2026-09-04 : **+216 50 329 252** fait foi (le `wa.me/21658240640` du plan initial est caduc, ne pas le réintroduire). Raison sociale et siège confirmés et publiés dans les mentions légales. Reste : remplacer l'adresse Gmail par une adresse du domaine HCTECH quand le domaine sera actif.
- [x] **Étude de rentabilité** — calculateur sur sa page dédiée (`calculateur.html`, entrée de menu propre) : 3 curseurs gradués (prix du litre, litres vendus/jour, volume de cuve) et 2 blocs de résultats (litres récupérés jour/mois/an ; part station en DT TTC dont TVA 19 %). Taux 5 ‰, part 40 % et TVA 19 % sont des hypothèses internes non validées terrain, affichées avec disclaimer. Calcul couvert par `src/site/calculator.test.mjs` (node).
- [ ] **Preuves terrain** — ajouter une galerie de photos réelles, une installation type et, lorsqu'ils seront disponibles, un témoignage ou un cas client autorisé.
- [x] **Appels à l'action** — libellé unique « Demander une étude » partout, toutes les occurrences pointent vers `contact.html#contact-form` (descend au formulaire) ; « Contact » reste un lien discret vers le haut de la page. Reste à faire : suivre les demandes reçues.

## Priorité 3 — Qualité du site

- [x] **Traductions** — les 11 pages sont trilingues : 299 clés alignées FR/EN/AR, aucun texte codé en dur. `technologie.html` et `probleme.html` étaient entièrement en français (68 textes), désormais câblées et traduites (relecture croisée : « benzène » rendu البنزول et non البنزين, qui signifie « essence » en arabe et faisait lire « l'essence est cancérogène »). 13 clés mortes supprimées. Reste : relecture humaine par un locuteur natif avant mise en ligne définitive.
- [ ] **Relecture générale** — uniformiser GEVLR-II/GLRV-II, « évent », « cuve », « vapeur », ponctuation et majuscules.
- [ ] **Mobile et navigateurs** — vérifier chaque page sur Chrome, Safari, Firefox, iPhone et Android, notamment le menu, les titres et les schémas.
- [ ] **Menu mobile** — sous 760 px, le header empile les liens sur 4 lignes (~194 px, un quart de l'écran d'un iPhone) au lieu de les cacher derrière un bouton. Remplacer par un menu hamburger sous ce même seuil ; le desktop (≥900 px, une seule ligne) n'a pas besoin d'y toucher. Les sous-menus utilisent déjà de vrais `<details>`, donc le tap fonctionne nativement sans JS supplémentaire (constaté le 2026-09-05).
- [ ] **Accessibilité** — contrôler le clavier, le contraste, le zoom à 200 %, les textes alternatifs et le sens de lecture en arabe.
- [ ] **Performance** — convertir les images lourdes en WebP/AVIF, fournir des tailles adaptées et vérifier le temps de chargement mobile.
- [ ] **SEO** — ajouter URL canonique, image de partage, Open Graph, sitemap, robots.txt et données structurées de l'entreprise.
- [x] **Mentions légales** — page `mentions-legales.html` (trilingue, liée depuis le pied de page des 12 pages) : identification complète (SARL, capital 50 000 DT, siège Ariana, RNE 1953633L, gérant, tél. +216 50 329 252), hébergeur GitHub Pages, propriété intellectuelle, liens tiers, non-contractualité du calculateur. Volet données personnelles conforme à la réalité technique vérifiée : zéro cookie, zéro traceur, zéro ressource tierce (polices et bibliothèques auto-hébergées), formulaire `mailto:` sans serveur, seul `localStorage` local (langue + curseurs). Droits d'accès au titre de la loi organique n° 2004-63. ⚠️ **Rédigé sans conseil juridique** — à faire valider par l'expert-comptable ou un avocat avant la mise en ligne définitive, notamment le matricule fiscal (introuvable dans les documents, non affiché) et l'opportunité de mentionner le capital.
- [ ] **Nom de domaine** — connecter le domaine définitif HCTECH et activer les adresses e-mail associées.

## Ordre proposé pour la suite

1. L'équipe
2. Notre vision
3. À propos
4. Fiche technique et certifications
5. Demande d'étude et contact
6. Traductions
7. Relecture, tests, SEO et mise en ligne finale
