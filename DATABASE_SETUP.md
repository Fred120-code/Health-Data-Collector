# 🗄️ Configuration de la Base de Données - Health Data Collector

## 🔧 Choix de la Base de Données

### Option 1: PostgreSQL Local _(Recommandé pour le développement)_

**Pré-requis:**

- PostgreSQL installé et en cours d'exécution
- psql CLI disponible

**Étapes:**

```bash
# 1. Créer la base de données
createdb health_data_db

# 2. Vérifier la connexion
psql -U postgres -d health_data_db -c "SELECT version();"

# 3. Ajouter la DATABASE_URL au fichier .env
# Faire ceci dans /server/.env
DATABASE_URL="postgresql://postgres:password@localhost:5432/health_data_db"
```

**Format de connexion:**

```
postgresql://[user]:[password]@[host]:[port]/[database]
```

- `user` - Utilisateur PostgreSQL (par défaut: `postgres`)
- `password` - Mot de passe PostgreSQL
- `host` - Serveur (par défaut: `localhost`)
- `port` - Port (par défaut: `5432`)
- `database` - Nom de la DB (ex: `health_data_db`)

---

### Option 2: Neon _(Recommandé pour la production)_

**Qu'est-ce que Neon?**

- PostgreSQL entièrement géré dans le cloud
- Plan gratuit avec limite de stockage
- Parfait pour le déploiement

**Étapes:**

#### 2.1 Créer un Compte Neon

1. Aller sur https://neon.tech
2. S'inscrire (email ou GitHub)
3. Créer un projet nouveau

#### 2.2 Récupérer la Connection String

1. Dans la console Neon, allez à **Connection details**
2. Copiez la chaîne `postgresql://...`

Exemple:

```
postgresql://neon_user:abc123xyz@ep-old-shape-123.eu-central-1.neon.tech/neon_db?sslmode=require
```

#### 2.3 Ajouter à .env

Dans `/server/.env`:

```
DATABASE_URL="postgresql://neon_user:abc123xyz@ep-old-shape-123.eu-central-1.neon.tech/neon_db?sslmode=require"
PORT=3000
```

⚠️ **Important:** Ne jamais commiter ce fichier avec cette clé! Ajouter `.env` à `.gitignore`

---

### Option 3: Autres Services Cloud

#### AWS RDS

```
postgresql://user:password@mydb.xxxxx.eu-west-1.rds.amazonaws.com:5432/healthdb
```

#### Azure Database for PostgreSQL

```
postgresql://user:password@myserver.postgres.database.azure.com/dbname?ssl=true
```

#### Supabase (Simple Alternative)

1. Aller sur https://supabase.com
2. Créer un projet
3. Copier la connection string

---

## ⚙️ Configuration Prisma

### 1. Migrer le Schéma

Après avoir configuré `DATABASE_URL`:

```bash
cd server
npx prisma migrate dev --name init
```

Cela:

- ✅ Crée les tables dans votre DB
- ✅ Génère le client Prisma
- ✅ Crée un fichier de migration

### 2. Vérifier la Configuration

```bash
npx prisma studio
```

Ouvre une interface graphique pour voir les tables.

---

## 📋 Schéma de Base de Données

Le schéma Prisma crée une table `HealthData`:

```sql
CREATE TABLE "HealthData" (
  "id" SERIAL PRIMARY KEY,
  "age" INTEGER NOT NULL,
  "tension" DOUBLE PRECISION NOT NULL,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🧪 Test de Connexion

### Tester avec psql (PostgreSQL local)

```bash
psql -U postgres -d health_data_db

# Puis dans psql:
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public';
```

### Tester avec Prisma

```bash
cd server
npx prisma db execute --stdin < query.sql
```

### Tester avec l'API

```bash
curl http://localhost:3000/data
```

---

## 🔑 Gestion des Secrets

### ❌ À NE PAS FAIRE

```bash
git add .env                    # ❌ Exposer les secrets!
git push                        # ❌ Secrets sur GitHub!
```

### ✅ À FAIRE

```bash
# Ajouter .env à .gitignore
echo ".env" >> .gitignore

# Commiter .env.example au lieu
git add .env.example
git commit -m "Add .env.example template"

# En production, définir via variables d'environnement
# (pas via fichier .env)
```

---

## 🛠️ Troubleshooting

### ❌ "ECONNREFUSED"

**Problème:** Impossible de se connecter à la base de données

**Solutions:**

1. PostgreSQL ne fonctionne pas

   ```bash
   # Redémarrer PostgreSQL
   sudo systemctl restart postgresql  # Linux
   brew services restart postgresql   # macOS
   ```

2. Mauvaise DATABASE_URL
   - Vérifier le format
   - Vérifier le port (5432 par défaut)
   - Test avec psql directement

### ❌ "Error: P1000"

**Problème:** Impossible d'accéder à la base de données

**Solution:**

```bash
# Recréer la migration
npx prisma migrate reset
```

⚠️ **Attention:** Cela supprime TOUTES les données!

### ❌ "Cannot find type PrivLevelError"

**Problème:** Problème de compatibilité Prisma

**Solution:**

```bash
npm reinstall @prisma/client
npx prisma generate
```

---

## 📊 Monitoring

### Vérifier la Taille de la DB

```bash
# PostgreSQL local
psql -U postgres -d health_data_db -c "SELECT pg_size_pretty(pg_database_size('health_data_db'));"

# Neon
# Aller au dashboard Neon → "Storage"
```

### Voir les Migrations Appliquées

```bash
npx prisma migrate status
```

---

## 🚀 Déploiement avec Database Cloud

### Exemple: Déployer sur Railway

1. **Créer un compte Railway.app**
2. **Créer une base PostgreSQL**
   - Railway crée automatiquement l'instance
3. **Copier la DATABASE_URL fournie**
4. **Ajouter à votre backend (env vars Railway)**

Railway gérera automatiquement les sauvegardes et la scalabilité!

---

## 📚 Ressources

- [Prisma Documentation](https://www.prisma.io/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Neon Docs](https://neon.tech/docs/)
- [Connection Strings Prisma](https://www.prisma.io/docs/concepts/database-connectors/postgresql)

---

## 💡 Conseils

✅ **Développement:** PostgreSQL local est plus rapide

✅ **Production:** Utiliser un service cloud comme Neon/Railway

✅ **Sauvegardes:** Toujours configurer les sauvegardes automatiques

✅ **Performance:** Ajouter des index sur les colonnes fréquemment interrogées

```prisma
model HealthData {
  id        Int     @id @default(autoincrement())
  age       Int     @db.Integer
  tension   Float
  createdAt DateTime @default(now()) @db.Timestamp(6)

  @@index([createdAt])  // Index pour les queries par date
}
```

---

## ✨ Prochaines Étapes

1. ✅ Configurer DATABASE_URL
2. ✅ Exécuter les migrations
3. ✅ Lancer le serveur
4. ✅ Ajouter des données via l'API
5. ✅ Vérifier les données dans Prisma Studio

Bonne chance! 🎉
