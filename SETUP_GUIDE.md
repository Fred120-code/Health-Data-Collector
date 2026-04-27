# 🚀 Guide de Configuration - Health Data Collector

## Étape 1: Préparer la Base de Données

### Option A: PostgreSQL Local

```bash
# Créer une base de données
createdb health_data_db
```

### Option B: Neon (Cloud)

1. Aller sur [neon.tech](https://neon.tech) et créer un compte gratuit
2. Créer un project
3. Copier la connection string

---

## Étape 2: Configuration du Backend

### 2.1 Accéder au dossier server

```bash
cd server
```

### 2.2 Créer le fichier .env

```bash
cp .env.example .env
```

### 2.3 Éditer .env avec votre DATABASE_URL

**Exemple Local:**

```
DATABASE_URL="postgresql://user:password@localhost:5432/health_data_db"
PORT=3000
```

**Exemple Neon:**

```
DATABASE_URL="postgresql://user:password@ep-xxxxx.eu-central-1.neon.tech/dbname?sslmode=require"
PORT=3000
```

### 2.4 Installer les dépendances

```bash
npm install
```

### 2.5 Créer la migration Prisma

```bash
npx prisma migrate dev --name init
```

### 2.6 Démarrer le serveur

```bash
node index.js
```

✅ Le serveur devrait afficher:

```
✅ Server running at http://localhost:3000
```

---

## Étape 3: Configuration du Frontend

### 3.1 Ouvrir un nouveau terminal et accéder au dossier client

```bash
cd client
```

### 3.2 Installer les dépendances

```bash
npm install
```

### 3.3 Démarrer le serveur de développement

```bash
npm run dev
```

✅ L'application devrait s'ouvrir sur **http://localhost:5173**

---

## 🧪 Test de l'Application

1. **Ajouter des données:**
   - Entrer un âge (ex: 35)
   - Entrer une tension (ex: 120)
   - Cliquer sur "➕ Add Data"

2. **Voir les données:**
   - Les données devraient apparaître dans la table

3. **Calculer la régression:**
   - Ajouter au moins 2 données
   - Cliquer sur "📊 Calculate Regression"
   - Voir le graphique avec la droite de régression

---

## 📝 Structure des Fichiers Créés

```
Health Data Collector/
├── README.md                  ← Documentation générale
├── SETUP_GUIDE.md            ← Ce fichier
│
├── server/                    ← Backend Express + Prisma
│   ├── index.js              ← Serveur principal
│   ├── package.json
│   ├── .env                  ← À créer (DATABASE_URL)
│   ├── .env.example
│   ├── prisma/
│   │   └── schema.prisma     ← Schéma de base de données
│   └── .gitignore
│
└── client/                    ← Frontend React + Vite
    ├── src/
    │   ├── App.jsx           ← Composant principal
    │   ├── main.jsx
    │   ├── index.css
    │   └── components/
    │       ├── DataForm.jsx        ← Formulaire
    │       ├── DataTable.jsx       ← Tableau
    │       └── RegressionChart.jsx ← Graphique
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── package.json
    └── .gitignore
```

---

## 🔧 Commandes Utiles

### Backend (dans /server)

```bash
npm install              # Installer les dépendances
npx prisma migrate dev   # Créer une migration
npx prisma studio       # Ouvrir l'interface Prisma
node index.js           # Démarrer le serveur
```

### Frontend (dans /client)

```bash
npm install      # Installer les dépendances
npm run dev      # Démarrer le serveur de développement
npm run build    # Construire pour la production
npm run preview  # Prévisualiser la build
```

---

## 🔗 Endpoints API

| Méthode | Route         | Description                     |
| ------- | ------------- | ------------------------------- |
| POST    | `/data`       | Ajouter une donnée de santé     |
| GET     | `/data`       | Récupérer toutes les données    |
| GET     | `/regression` | Calculer la régression linéaire |
| GET     | `/health`     | Vérifier la santé du serveur    |

---

## 🐛 Résoudre les Problèmes

### ❌ "Cannot find module '@prisma/client'"

```bash
cd server
npm install
```

### ❌ "ECONNREFUSED - La base de données ne réagit pas"

- Vérifier que PostgreSQL est en cours d'exécution
- Vérifier la DATABASE_URL dans .env

### ❌ "CORS Error"

- S'assurer que le backend est sur http://localhost:3000
- CORS est déjà activé dans le code

### ❌ "Port 3000 already in use"

- Changer PORT dans /server/.env
- Ou arrêter le processus utilisant le port

### ❌ "Cannot GET /regression"

- S'assurer que le backend est démarré
- Une erreur mineure: le backend est peut-être sur un autre port

---

## ✅ Vérifier que Tout Fonctionne

1. **Backend démarré?**

   ```bash
   curl http://localhost:3000/health
   ```

   Devrait retourner: `{"status":"OK"}`

2. **Frontend accessible?**

   ```
   Ouvrir http://localhost:5173 dans le navigateur
   ```

3. **API fonctionne?**
   ```bash
   curl -X GET http://localhost:3000/data
   ```

---

## 🎉 Succès!

Si vous avez atteint ce point, l'application est prête à être utilisée!

Prochaines étapes:

- Ajouter plus de fonctionnalités
- Déployer sur Vercel (frontend) et Render/Railway (backend)
- Ajouter l'authentification utilisateur
