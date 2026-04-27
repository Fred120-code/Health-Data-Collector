# ✅ Checklist d'Installation - Health Data Collector

Utilisez cette checklist pour suivre votre progression d'installation!

---

## 📋 Phase 1: Préparation

- [ ] **Node.js installé** (v16+)

  ```bash
  node --version  # Vérifier
  ```

- [ ] **npm installé**

  ```bash
  npm --version  # Vérifier
  ```

- [ ] **PostgreSQL installé** (local) OU compte **Neon** créé (cloud)

  ```bash
  psql --version  # Pour PostgreSQL local
  ```

- [ ] **Git installé** (optionnel)
  ```bash
  git --version
  ```

---

## 🗄️ Phase 2: Configuration Base de Données

- [ ] **Base de données créée**
  - Local: `createdb health_data_db`
  - Neon: Projet créé sur neon.tech

- [ ] **CONNECTION STRING récupérée**
  - Local: `postgresql://postgres:password@localhost:5432/health_data_db`
  - Neon: Copié depuis la console

- [ ] **Fichier `.env` créé** dans `/server`

  ```bash
  cd server
  cp .env.example .env
  ```

- [ ] **DATABASE_URL ajoutée** dans `/server/.env`

  ```
  DATABASE_URL="votre_connection_string_ici"
  PORT=3000
  ```

- [ ] **Fichier `.env` _ADD TO .gitignore_** (ne pas commit)

---

## ⚙️ Phase 3: Installation Backend

- [ ] **Naviguer dans le dossier server**

  ```bash
  cd server
  ```

- [ ] **Dépendances installées**

  ```bash
  npm install
  ```

  Attendre: ~30 secondes

- [ ] **Migrations Prisma appliquées**

  ```bash
  npx prisma migrate dev --name init
  ```

  Attendre: ~15 secondes

- [ ] **Base de données vérifiée** (optionnel)

  ```bash
  npx prisma studio
  ```

- [ ] **Serveur démarré avec succès**

  ```bash
  node index.js
  ```

  Voir: `✅ Server running at http://localhost:3000`

- [ ] **Serveur accessible**
  ```bash
  curl http://localhost:3000/health
  # Devrait retourner: {"status":"OK"}
  ```

✅ **Backend Prêt!** Maintenant passez au Frontend

---

## ⚛️ Phase 4: Installation Frontend

**Ouvrir un NOUVEAU terminal!**

- [ ] **Naviguer dans le dossier client**

  ```bash
  cd client
  ```

- [ ] **Dépendances installées**

  ```bash
  npm install
  ```

  Attendre: ~40 secondes

- [ ] **Serveur de développement démarré**

  ```bash
  npm run dev
  ```

  Voir: `VITE v5.0.8 ready in XX ms`

- [ ] **Application accessible**
  - Ouvrir http://localhost:5173
  - Voir: "💊 Health Data Collector"

- [ ] **Vérifier la connexion frontend-backend**
  - Attendre que la table se charge
  - Pas d'erreur CORS

---

## 🧪 Phase 5: Tests Fonctionnels

- [ ] **Ajouter une donnée via le formulaire**
  - Âge: 35
  - Tension: 120
  - Cliquer "➕ Add Data"
  - Voir le message "✅ Data added successfully!"

- [ ] **Donnée visible dans le tableau**
  - Voir la ligne 35 / 120 / date

- [ ] **Ajouter une deuxième donnée**
  - Âge: 40
  - Tension: 125
  - Vérifier que les deux sont dans le tableau

- [ ] **Calculer la Régression**
  - Cliquer "📊 Calculate Regression"
  - Voir le graphique avec la ligne de régression
  - Voir la formule: `tension = b0 + b1 × age`

- [ ] **Graphique affiché correctement**
  - Points en bleu
  - Ligne en rouge
  - Labels correctes (âge vs tension)

- [ ] **Rafraîchir les données**
  - Cliquer "🔄 Refresh"
  - Les données restent identiques

---

## 🔍 Phase 6: Tests de Validation

- [ ] **Validation - Âge négatif**
  - Entrer -5 comme âge
  - Voir erreur: "Age must be greater than 0"

- [ ] **Validation - Champs vides**
  - Laisser âge vide
  - Cliquer "➕ Add Data"
  - Voir erreur: "Please fill in all fields"

- [ ] **Validation - Non-numérique**
  - Entrer "abc" comme âge
  - Voir erreur

- [ ] **Erreur base de données**
  - Arrête le serveur backend
  - Essayez d'ajouter une donnée
  - Voir message d'erreur dans l'UI

---

## 📱 Phase 7: Tests Responsivité

- [ ] **Mobile (réduire la fenêtre)**
  - F12 → Toggle device toolbar
  - Réduire à 375px de largeur
  - Vérifier que tout est lisible

- [ ] **Tablette (768px)**
  - Layout s'adapte correctement

- [ ] **Desktop (1920px)**
  - Deux colonnes affichées (formulaire + graphique)

---

## 🚀 Phase 8: Prêt pour le Déploiement (Optionnel)

- [ ] **Construire le frontend**

  ```bash
  npm run build
  ```

  Créé dossier `dist/`

- [ ] **Dossier `dist/` créé**
  - Vérifier `client/dist/index.html`

- [ ] **Build préviewable**

  ```bash
  npm run preview
  ```

- [ ] **Serveur peut être déployé**
  - Prêt pour Railway/Render
  - DATABASE_URL configurée comme env var

---

## 🎉 Checklist Complète!

Si vous avez coché tous les éléments, **l'application est 100% fonctionnelle!**

---

## 🐛 Dépannage Rapide

| Problème                    | Solution                         |
| --------------------------- | -------------------------------- |
| "Cannot find module"        | `npm install`                    |
| Port 3000 en use            | Tuer le processus / Changer PORT |
| CORS Error                  | Backend pas sur localhost:3000   |
| Base de données non trouvée | Vérifier DATABASE_URL            |
| Prisma error                | `npx prisma migrate reset`       |
| Npm packages outdated       | `npm update`                     |

---

## 📞 Documents de Référence

- 📄 [README.md](./README.md) - Vue d'ensemble
- 📄 [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Installation détaillée
- 📄 [DATABASE_SETUP.md](./DATABASE_SETUP.md) - Config base de données
- 📄 [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) - Architecture complète
- 📄 [server/README.md](./server/README.md) - Documentation backend
- 📄 [client/README.md](./client/README.md) - Documentation frontend

---

## 💡 Conseils Finaux

✅ Gardez le backend démarré pendant le développement

✅ Vérifiez les DevTools (F12) pour les erreurs

✅ Les changements frontend se reflètent instantanément (Vite)

✅ Retartez le backend après modifications du code (index.js)

✅ Consultez les logs du terminal en cas d'erreur

---

**Bonne chance! 🚀**

Une fois complète, vous aurez une application production-ready pour la collecte de données de santé!
