# 🚀 Déploiement - Health Data Collector

Guide complet pour déployer l'application en production.

---

## 📋 Avant de Déployer

- [ ] Application fonctionnelle localement
- [ ] Tous les tests passent
- [ ] Variables .env configurées
- [ ] Base de données cloud créée
- [ ] Erreurs en console / logs résolues

---

## 🎯 Stratégies de Déploiement

### Option 1: Vercel + Railway (RECOMMANDÉ)

**Frontend (Vercel)** + **Backend (Railway)**

- Infrastructure gratuite avec limites généreuses
- Déploiement simple via Git
- SSL automatique

### Option 2: Netlify + Render

**Frontend (Netlify)** + **Backend (Render)**

- Alternative à Vercel/Railway
- Configuration similaire

### Option 3: Heroku (Payant)

**Frontend + Backend sur une plateforme**

- Cloud gratuit supprimé (Heroku charge maintenant)
- Uniquement si vous avez un budget

### Option 4: VPS (Advanced)

**AWS/DigitalOcean/Linode**

- Contrôle total
- Plus complexe
- Pour les applications à fort trafic

---

## 🎀 Déploiement Frontend - Vercel

### Étape 1: Créer un compte Vercel

1. Aller sur https://vercel.com
2. S'inscrire avec GitHub
3. Autoriser Vercel à accéder à GitHub

### Étape 2: Connect GitHub Repository

```bash
# Dans le dossier du projet
git add .
git commit -m "Initial commit"
git push origin main
```

### Étape 3: Créer Project sur Vercel

1. Cliquer "New Project" sur Vercel
2. Importer le repository GitHub
3. Sélectionner le dossier `client`
4. Settings:
   - **Framework:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

### Étape 4: Environment Variables

Sur Vercel, ajouter:

```
VITE_API_URL=https://votre-backend.onrender.com
```

### Étape 5: Deploy

Cliquer "Deploy" → Attendre ~2 minutes → ✅ Site en ligne!

**URL finale:** `https://health-data-collector.vercel.app`

---

## 🖥️ Déploiement Backend - Railway

### Étape 1: Créer Compte Railway

1. Aller sur https://railway.app
2. S'inscrire avec GitHub

### Étape 2: Créer Project

1. New Project
2. Deploy from GitHub
3. Sélectionner le repository

### Étape 3: Configurer Backend

1. Settings
2. Build Command: (laisser vide ou `npm install`)
3. Start Command: `node index.js`

### Étape 4: Ajouter une Base de Données

1. Plugin → PostgreSQL
2. Railway crée automatiquement la DB
3. Récupérer DATABASE_URL (copier-coller automatiquement)

### Étape 5: Environment Variables

Railway ajoute automatiquement:

- `DATABASE_URL` (depuis PostgreSQL)

Vous devez ajouter:

- `PORT=3000` (optionnel, Railway choisit un port automatiquement)

Pendant le déploiement, Railway log automatiquement:

```
DATABASE_URL=postgresql://...
```

### Étape 6: Deploy

1. Railway détecte `package.json`
2. Lance `npm install` automatiquement
3. Lance `node index.js`
4. **Service en ligne!**

**URL backend:** `https://health-data-collector-production.up.railway.app`

### Étape 7: Mettre à jour Frontend

Dans `/client/src/App.jsx`:

```javascript
const API_BASE_URL = "https://health-data-collector-production.up.railway.app";
```

Redéployer sur Vercel...

---

## 🔄 Alternative: Render.com

### Pour le Backend

1. Aller sur https://render.com
2. New → Web Service
3. Connect GitHub
4. Sélectionner le repository
5. Settings:
   - **Name:** health-data-collector
   - **Environment:** Docker (ou Node)
   - **Build Command:** `npm install`
   - **Start Command:** `node index.js`
6. Add Environment Variables:
   - `DATABASE_URL` → Neon PostgreSQL URL
7. Deploy

**URL:** `https://health-data-collector.onrender.com`

---

## 🗄️ Base de Données - Neon

### Créer une Base Cloud

1. Aller sur https://neon.tech
2. New Project
3. Région proche (ex: eu-west-1)
4. Copier connection string

**Exemple:**

```
postgresql://user:pass@ep-xxxxx.neon.tech/dbname?sslmode=require
```

### Ajouter à Backend

Sur Vercel/Railway, ajouter env var:

```
DATABASE_URL=postgresql://user:pass@ep-xxxxx.neon.tech/dbname?sslmode=require
```

### Migrations en Production

Railway/Render exécutent:

```bash
npx prisma migrate deploy
```

Automatiquement! ✅

---

## ✅ Checklist de Déploiement

### Avant de Pousser

- [ ] Aucune erreur en console (dev)
- [ ] `.env` ajouté à `.gitignore`
- [ ] Pas de clés sensibles en dur dans le code
- [ ] Tests API fonctionnent

### Frontend (Vercel)

- [ ] Compte Vercel créé
- [ ] Repository GitHub connecté
- [ ] Folder: `client`
- [ ] Framework: Vite
- [ ] Env var: `VITE_API_URL`

### Backend (Railway/Render)

- [ ] Compte créé
- [ ] PostgreSQL database provisionnée
- [ ] Env vars configurées:
  - `DATABASE_URL`
  - `PORT` (optionnel)

### Après Déploiement

- [ ] Frontend accessible via URL Vercel
- [ ] Backend accessible via URL Railway
- [ ] Pas d'erreur CORS
- [ ] API /health répond (curl)
- [ ] Ajouter une donnée → OK
- [ ] Récupérer les données → OK
- [ ] Régression → OK

---

## 🔗 Post-Déploiement

### Domain Custom (Optionnel)

**Frontend Vercel:**

1. Settings → Domains
2. Add custom domain
3. Configurer DNS chez votre registrar

**Backend Railway:**

1. Settings → Networking
2. Custom Domain
3. Configurer DNS

### SSL/HTTPS

Automatique pour:

- Vercel: ✅
- Railway: ✅
- Render: ✅
- Neon: ✅

---

## 📊 Monitoring & Logs

### Vercel

- Analytics → Performance
- Deployments → Logs
- Errors → Error tracking

### Railway

- Logs → Real-time
- Metrics → CPU, RAM, Disk

### Neon

- Monitoring → Queries
- Database → Inspect table sizes

---

## 🆘 Troubleshooting Déploiement

### ❌ "CORS Error"

**Cause:** Backend URL incorrecte dans frontend

**Solution:** Vérifier `VITE_API_URL` sur Vercel

### ❌ "DATABASE_URL not found"

**Cause:** Env var non configurée

**Solution:** Sur Railway/Render, vérifier Settings → Environment

### ❌ "Prisma Client not found"

**Cause:** `npm install` n'a pas été exécuté

**Solution:** Railway/Render exécutent automatiquement. Vérifier les logs!

### ❌ "Port already in use"

**Cause:** Service sur Railway
**Vérifier:**

```bash
Railway attribue automatiquement le port (via env var $PORT)
index.js doit lire: process.env.PORT || 3000
```

### ❌ "503 Service Unavailable"

**Cause:** Application redémarre trop souvent

**Check:**

```bash
# Vérifier les logs Railway
# Chercher "Error" ou "Exit code X"
```

---

## 📈 Scaling

### Si l'app ralentit

1. **Vérifier les logs** → Chercher les requêtes lentes
2. **Ajouter des index Prisma** → Base de données optimisée
3. **Caching** → Redis (avancé)
4. **CDN** → Vercel automatique

### Limites Gratuites

| Service | Limite                     | Dépassement  |
| ------- | -------------------------- | ------------ |
| Vercel  | Illimité                   | Payant       |
| Railway | $5/mois free tier          | Payant après |
| Neon    | 3 GB storage               | Payant après |
| Render  | Spin down après inactivité | Paid plan    |

---

## 🔐 Sécurité en Production

✅ **Toujours:**

- [ ] Utiliser HTTPS
- [ ] Ne pas commiter les secrets
- [ ] Valider les inputs (backend)
- [ ] CORS restrictive

⚠️ **À ajouter:**

- Rate limiting
- Input sanitization
- HTTPS only cookies
- CSP headers

---

## 📝 Logs en Production

### Railway

```bash
# Console Railway >> Logs
# Voir tous les erreurs en live
```

### Vercel

```bash
# Deployments >> Logs
# Consulter chaque déploiement
```

### Debugging

```bash
# Frontend: DevTools (F12)
# Backend: Logs Railway/Render
```

---

## 🚀 Prochaines Étapes

1. ✅ Deploy frontend
2. ✅ Deploy backend
3. ✅ Configurer DNS (optionnel)
4. ✅ Ajouter monitoring
5. ✅ Alertes emails si erreur

---

**Votre application est maintenant en ligne au monde! 🌍**
