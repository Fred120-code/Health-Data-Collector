# Configuration

## Pour modifier l'URL du serveur backend

Si votre backend fonctionne sur un port différent, vous pouvez:

### Option 1: Modifier le fichier App.jsx directement

Dans `/client/src/App.jsx`, ligne 5:

```javascript
const API_BASE_URL = "http://localhost:3000"; // Changer le port ici
```

### Option 2: Utiliser des variables d'environnement (recommandé)

1. Créer un fichier `.env.local` dans `/client`:

```
VITE_API_URL=http://localhost:3000
```

2. Modifier `/client/src/App.jsx` pour utiliser:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
```

---

## Variables d'environnement disponibles

### Backend (/server/.env)

- `DATABASE_URL` - Chaîne de connexion PostgreSQL
- `PORT` - Port du serveur (défaut: 3000)

### Frontend (/client/.env.local - optionnel)

- `VITE_API_URL` - URL du serveur backend
