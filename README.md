# E-Commerce — Lancer le projet

## Prérequis

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installé et **démarré**
- [Node.js](https://nodejs.org/) (v18+)

---

## 1. Cloner le projet

```bash
git clone <url-du-repo>
cd e-commerce
```

---

## 2. Configurer le backend

Copier le fichier d'environnement et l'adapter :

```bash
cp back/.env.example back/.env
```

Modifier `back/.env` pour utiliser PostgreSQL (correspondant au docker-compose) :

```env
APP_KEY=                        # sera généré à l'étape suivante

DB_CONNECTION=pgsql
DB_HOST=postgres
DB_PORT=5432
DB_DATABASE=ecommerce
DB_USERNAME=postgres
DB_PASSWORD=password
```

---

## 3. Lancer les conteneurs Docker

```bash
docker compose up -d
```

Cela démarre :
- `ecommerce-app` — Laravel / PHP-FPM (port interne 9000)
- `ecommerce-nginx` — Nginx accessible sur **http://localhost:8000**
- `ecommerce-postgres` — PostgreSQL accessible sur `localhost:5433`

---

## 4. Initialiser le backend

```bash
# Générer la clé applicative
docker exec ecommerce-app php artisan key:generate

# Lancer les migrations + seeders
docker exec ecommerce-app php artisan migrate --seed
```

---

## 5. Lancer le frontend

```bash
cd front
npm install
npm run dev
```

Le frontend est accessible sur **http://localhost:5173**

> Les appels `/api` sont automatiquement proxifiés vers `http://localhost:8000`.

---

## Comptes de test

| Rôle  | Email              | Mot de passe  |
|-------|--------------------|---------------|
| Admin | admin@amazone.fr   | password123   |
| User  | test@test.fr       | password123   |

Accès au panneau d'administration : **http://localhost:8000/admin**

---

## Commandes utiles

```bash
# Arrêter les conteneurs
docker compose down

# Voir les logs
docker compose logs -f

# Relancer les migrations depuis zéro
docker exec ecommerce-app php artisan migrate:fresh --seed
```
