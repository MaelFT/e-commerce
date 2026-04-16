# E-Commerce — Lancer le projet

## Prérequis

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installé et **démarré**
- (Optionnel) [Node.js](https://nodejs.org/) (v18+) si tu veux lancer le frontend hors Docker

---

## 1. Cloner le projet

```bash
git clone <url-du-repo>
cd e-commerce
```

---

## 2. Configurer le backend (optionnel)

Le `docker-compose.yml` s'occupe de créer `.env` dans le conteneur si besoin.

Si tu veux un `.env` local :

```bash
cp back/.env.example back/.env
```

---

## 3. Lancer les conteneurs Docker

```bash
docker compose up -d --build
```

Cela démarre :
- `ecommerce-app` — Laravel / PHP-FPM (port interne 9000)
- `ecommerce-nginx` — Nginx accessible sur **http://localhost:8000**
- `ecommerce-postgres` — PostgreSQL accessible sur `localhost:5434`
- `ecommerce-front` — Frontend Vite accessible sur **http://localhost:5173**

---

## 4. Initialiser le backend

```bash
# Générer la clé applicative
docker exec ecommerce-app php artisan key:generate --force

# Lancer les migrations + seeders
docker exec ecommerce-app php artisan migrate --seed --force
```

---

## 5. Frontend

Le frontend est accessible sur **http://localhost:5173**.

> Les appels `/api` sont automatiquement proxifiés vers l'API.

---

## Comptes de test

| Rôle  | Email              | Mot de passe |
|-------|--------------------|--------------|
| Admin | admin@amazone.fr   | admin1234    |
| User  | test@example.com   | password     |

Accès au panneau d'administration : **http://localhost:8000/admin**

---

## Commandes utiles

```bash
# Arrêter les conteneurs
docker compose down

# Voir les logs
docker compose logs -f

# Relancer les migrations depuis zéro
docker exec ecommerce-app php artisan migrate:fresh --seed --force
```

---

## (Optionnel) Lancer le front hors Docker

```bash
cd front
npm install
npm run dev
```

Le proxy `/api` du front pointe vers `http://localhost:8000`.
