# CookingMama

Projet full-stack avec :
- Backend Ruby on Rails (API)
- Frontend React + Vite
- PostgreSQL uniquement dans Docker

## Prérequis
- Ruby 3.2+
- Node.js 18+
- Docker + Docker Compose

## Démarrage rapide

1. Démarrer PostgreSQL dans Docker :
   ```bash
   docker compose up -d db
   ```

2. Démarrer le backend Rails :
   ```bash
   cd backend
   export DB_HOST=localhost
   export DB_PORT=5432
   export DB_USERNAME=postgres
   export DB_PASSWORD=postgres
   export DB_NAME=cookingmama_development
   bundle exec rails server -p 3000 -b 0.0.0.0
   ```

3. Démarrer le frontend React :
   ```bash
   cd frontend
   npm install
   npm run dev -- --host 0.0.0.0 --port 5173
   ```

4. Vérifier les services :
   - Frontend : http://localhost:5173
   - Backend API : http://localhost:3000/api/health

## Variables d’environnement
Un fichier .env.example est fourni à la racine du projet.
Copiez-le en .env si vous voulez personnaliser la configuration locale.
