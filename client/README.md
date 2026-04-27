# ⚛️ Frontend - Health Data Collector

Interface utilisateur React construit avec Vite, Tailwind CSS et Chart.js.

## 📋 Configuration Requise

- Node.js v16+
- npm ou yarn

## ⚙️ Installation

### 1. Installer les dépendances

```bash
npm install
```

### 2. Démarrer le serveur de développement

```bash
npm run dev
```

L'application ouvrira sur **http://localhost:5173**

---

## 🎨 Structure des Composants

### 1. **App.jsx** (Principal)

Gère:

- État global (données, régression, erreurs)
- Appels API vers le backend
- Layout principal

### 2. **DataForm.jsx**

Formulaire pour ajouter des données:

- Validation d'entrée locale
- Champs: âge, tension
- Messages d'erreur

### 3. **DataTable.jsx**

Affiche les données sous forme de tableau:

- Tri par date décroissante
- Formatage des dates
- Design responsive

### 4. **RegressionChart.jsx**

Graphique Chart.js:

- Nuage de points (data)
- Ligne de régression
- Légende et labels

---

## 🔄 Architecture des Données

```
App.jsx
├── État local (useState)
│   ├── data (array)
│   ├── regression (object)
│   ├── loading (boolean)
│   ├── error (string)
│   └── success (string)
│
├── Fonctions API
│   ├── fetchData()          → GET /data
│   ├── handleAddData()      → POST /data
│   └── handleCalculateRegression() → GET /regression
│
└── Composants
    ├── DataForm (entrée)
    ├── DataTable (affichage)
    └── RegressionChart (graphique)
```

---

## 📡 Communication Backend

### URL du Backend

```javascript
const API_BASE_URL = "http://localhost:3000";
```

Modifier dans `App.jsx` si le backend est sur un port différent.

### Endpoints utilisés

- `POST /data` - Ajouter une donnée
- `GET /data` - Récupérer les données
- `GET /regression` - Calculer la régression

---

## 🎨 Style avec Tailwind

Le projet utilise Tailwind CSS pour:

- Mise en page responsive
- Gradient de fond
- Cartes ombragées
- Boutons interactifs
- Formulaires stylisés
- Notifications (erreur/succès)

### Classes Tailwind utilisées

```
grid, lg:grid-cols-2, max-w-6xl, bg-gradient-to-br from-blue-50,
px-4, py-8, rounded-lg, shadow-lg, hover:bg-blue-600, disabled:opacity-50,
text-gray-800, font-semibold, border-gray-300, focus:ring-2, etc.
```

---

## 📊 Graphique Chart.js

Configure:

- **Type**: Scatter (nuage de points)
- **Datasets**: 2 (points de données + ligne de régression)
- **Axes**: X (âge), Y (tension)
- **Interactivité**: Hover, zoom, pan

---

## 🔄 Flux de l'Utilisateur

### 1. Ajouter une donnée

```
Utilisateur remplit le formulaire
    ↓
Validation locale (DataForm.jsx)
    ↓
POST /data (App.jsx)
    ↓
Récupère les données mises à jour (GET /data)
    ↓
Affiche dans DataTable
```

### 2. Calculer la régression

```
Utilisateur clique "Calculate Regression"
    ↓
GET /regression
    ↓
Affiche le graphique (RegressionChart)
```

---

## ⚡ États de Chargement

- `loading` - Affiche "⏳" dans les boutons
- `error` - Message d'erreur rouge
- `success` - Message de succès vert (3s)

---

## 🔧 Scripts Disponibles

```bash
npm install      # Installer les dépendances
npm run dev      # Démarrer le serveur de développement
npm run build    # Construire pour la production
npm run preview  # Prévisualiser la version production
```

---

## 📁 Structure

```
client/
├── src/
│   ├── App.jsx              # Composant principal
│   ├── main.jsx             # Point d'entrée
│   ├── index.css            # Styles globaux
│   └── components/
│       ├── DataForm.jsx
│       ├── DataTable.jsx
│       └── RegressionChart.jsx
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── .gitignore
```

---

## 🌐 Configuration CORS

Le backend expose l'API sur `http://localhost:3000` avec CORS activé.

Si vous avez des erreurs CORS:

1. Vérifier que le backend fonctionne
2. Vérifier que l'URL dans `App.jsx` est correcte
3. Redémarrer le serveur de développement

---

## 🛠️ Développement

### Ajouter une nouvelle dépendance

```bash
npm install <package-name>
```

### Modifier les styles Tailwind

Les styles sont appliqués dans `index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 🚀 Production

### Build

```bash
npm run build
```

Crée un dossier `dist/` avec les fichiers optimisés.

### Déploiement sur Vercel

1. Configurer `vite.config.js` (si nécessaire)
2. Déployer avec Vercel:

```bash
npm install -g vercel
vercel
```

---

## 📦 Dépendances

- **react** - Bibliothèque d'interface utilisateur
- **vite** - Build tool rapide
- **tailwindcss** - Framework CSS utilitaire
- **chart.js** - Graphiques
- **react-chartjs-2** - Composant React pour Chart.js

---

## 🔗 Liens Utiles

- [Documentation React](https://react.dev)
- [Documentation Vite](https://vitejs.dev)
- [Documentation Tailwind](https://tailwindcss.com)
- [Documentation Chart.js](https://www.chartjs.org)
