# 📋 Gestion de Projets

Application Full Stack de gestion de projets et de tâches permettant de créer, modifier, supprimer et suivre des projets et leurs tâches associées.

---

## 🏗️ Architecture du Projet

Le projet est divisé en deux parties principales :

```
gestiondeprojets/
├── backend/              # API REST Spring Boot
│   └── GestionDeProjets/
└── frontend/             # Application Angular
    └── GestionDeProjets/
```

---

## 🔧 Technologies Utilisées

### Backend
- **Framework** : Spring Boot 4.0.2
- **Langage** : Java 17
- **Build Tool** : Maven
- **Base de données** : PostgreSQL
- **ORM** : Hibernate / JPA
- **Documentation API** : Swagger / OpenAPI 3.0 (springdoc-openapi 2.1.0)
- **Librairies** : 
  - Lombok (génération automatique de code)
  - Spring Data JPA
  - Spring Web MVC

### Frontend
- **Framework** : Angular 19.1.0
- **Langage** : TypeScript 5.7.2
- **Build Tool** : Angular CLI 19.1.8
- **Librairies** :
  - RxJS 7.8.0
  - Angular Forms
  - Angular Router
  - Zone.js 0.15.0

### Base de données
- **SGBD** : PostgreSQL
- **Nom de la base** : `gestiondeprojets`
- **Port** : 5432
- **Utilisateur** : `postgres`
- **Mot de passe** : `postgres`

---

## 📦 Fonctionnalités

### Gestion des Projets
- ✅ Créer un nouveau projet
- ✅ Afficher la liste des projets
- ✅ Modifier un projet existant
- ✅ Supprimer un projet (avec confirmation)
- ✅ Voir les tâches associées à un projet

### Gestion des Tâches
- ✅ Créer une nouvelle tâche pour un projet
- ✅ Afficher les tâches d'un projet
- ✅ Modifier une tâche existante
- ✅ Supprimer une tâche (avec confirmation)
- ✅ Gérer les statuts : TODO, IN_PROGRESS, DONE
- ✅ Définir une date d'échéance

---

## 🚀 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Java JDK 17** ou supérieur
- **Maven 3.6+**
- **Node.js 18+** et **npm**
- **PostgreSQL 12+**
- **Angular CLI 19+** (optionnel, mais recommandé)

---

## ⚙️ Configuration de la Base de Données

### 1. Installer PostgreSQL
Téléchargez et installez PostgreSQL depuis [postgresql.org](https://www.postgresql.org/download/)

### 2. Créer la base de données

```sql
-- Se connecter à PostgreSQL
psql -U postgres

-- Créer la base de données
CREATE DATABASE gestiondeprojets;

-- Vérifier la création
\l
```

### 3. Configuration
Les paramètres de connexion sont dans `backend/GestionDeProjets/src/main/resources/application.properties` :

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/gestiondeprojets
spring.datasource.username=postgres
spring.datasource.password=postgres
```

> **Note** : Modifiez ces valeurs selon votre configuration PostgreSQL locale.

---

## 🏃 Démarrage du Backend

### Option 1 : Avec Maven Wrapper (recommandé)

```bash
# Se placer dans le dossier backend
cd backend/GestionDeProjets

# Windows
mvnw.cmd spring-boot:run

# Linux/Mac
./mvnw spring-boot:run
```

### Option 2 : Avec Maven installé

```bash
cd backend/GestionDeProjets
mvn clean install
mvn spring-boot:run
```

### Option 3 : Avec le JAR compilé

```bash
cd backend/GestionDeProjets
mvn clean package
java -jar target/GestionDeProjets-0.0.1-SNAPSHOT.jar
```

### Vérification du Backend
- **URL de l'API** : http://localhost:8081/GestionDeProjets/api
- **Swagger UI** : http://localhost:8081/GestionDeProjets/swagger-ui.html
- **Port** : 8081

Le backend démarre et crée automatiquement les tables dans PostgreSQL grâce à Hibernate (`spring.jpa.hibernate.ddl-auto=update`).

---

## 🎨 Démarrage du Frontend

### 1. Installer les dépendances

```bash
# Se placer dans le dossier frontend
cd frontend/GestionDeProjets

# Installer les dépendances npm
npm install
```

### 2. Démarrer le serveur de développement

```bash
# Démarrer Angular
npm start
# ou
ng serve
```

### 3. Ouvrir l'application

L'application sera disponible sur : **http://localhost:4200**

### Vérification du Frontend
- **Port** : 4200
- **Rechargement automatique** : Activé (hot reload)

---

## 📡 API Endpoints

### Projets
- `GET /api/projects` - Liste tous les projets
- `GET /api/projects/{id}` - Récupère un projet par ID
- `POST /api/projects` - Crée un nouveau projet
- `PUT /api/projects/{id}` - Met à jour un projet
- `DELETE /api/projects/{id}` - Supprime un projet

### Tâches
- `GET /api/projects/{projectId}/tasks` - Liste les tâches d'un projet
- `GET /api/tasks/{id}` - Récupère une tâche par ID
- `POST /api/projects/{projectId}/tasks` - Crée une tâche pour un projet
- `PUT /api/tasks/{id}` - Met à jour une tâche
- `DELETE /api/tasks/{id}` - Supprime une tâche

---

## 🗂️ Structure du Projet

### Backend
```
backend/GestionDeProjets/
├── src/main/java/com/esprit/microservice/gestiondeprojets/
│   ├── controllers/         # Contrôleurs REST
│   ├── entities/            # Entités JPA
│   ├── repositories/        # Repositories Spring Data
│   └── services/            # Logique métier
└── src/main/resources/
    └── application.properties  # Configuration
```

### Frontend
```
frontend/GestionDeProjets/
├── src/app/
│   ├── project-list/        # Liste des projets
│   ├── project-form/        # Formulaire projet
│   ├── task-list/           # Liste des tâches
│   ├── task-form/           # Formulaire tâche
│   └── services/            # Services HTTP
└── src/core/models/         # Modèles TypeScript
```

---

## 🔄 Workflow Complet

### 1. Démarrer PostgreSQL
```bash
# Démarrer le service PostgreSQL
# Windows (services.msc) ou
sudo service postgresql start
```

### 2. Démarrer le Backend
```bash
cd backend/GestionDeProjets
mvnw.cmd spring-boot:run
```

### 3. Démarrer le Frontend
```bash
cd frontend/GestionDeProjets
npm start
```

### 4. Accéder à l'application
Ouvrir un navigateur : **http://localhost:4200**

---

## 🛠️ Commandes Utiles

### Backend (Maven)
```bash
# Nettoyer et compiler
mvn clean install

# Exécuter les tests
mvn test

# Créer le package
mvn package

# Lancer l'application
mvn spring-boot:run
```

### Frontend (Angular)
```bash
# Installer les dépendances
npm install

# Démarrer en mode développement
npm start

# Compiler pour la production
npm run build

# Exécuter les tests
npm test
```

---

## 📝 Configuration des Ports

| Service | Port | URL |
|---------|------|-----|
| Frontend Angular | 4200 | http://localhost:4200 |
| Backend Spring Boot | 8081 | http://localhost:8081/GestionDeProjets |
| PostgreSQL | 5432 | localhost:5432 |
| Swagger UI | 8081 | http://localhost:8081/GestionDeProjets/swagger-ui.html |

---

## 🐛 Dépannage

### Erreur de connexion à la base de données
```bash
# Vérifier que PostgreSQL est démarré
# Vérifier les credentials dans application.properties
# Vérifier que la base 'gestiondeprojets' existe
```

### Port 8081 ou 4200 déjà utilisé
```bash
# Backend : modifier server.port dans application.properties
# Frontend : modifier dans angular.json ou utiliser
ng serve --port 4201
```

### Erreur CORS
Le backend est configuré pour accepter les requêtes depuis `http://localhost:4200`. Si vous utilisez un autre port, ajoutez la configuration CORS dans le backend.

---

## 📄 Documentation de l'API

Une fois le backend démarré, accédez à la documentation Swagger :

**http://localhost:8081/GestionDeProjets/swagger-ui.html**

Swagger fournit une interface interactive pour tester tous les endpoints de l'API.

---

## 👨‍💻 Auteur

**Ben Salem Ala - Software Engineer**

---

## 📜 Licence

Ce projet est réalisé dans un cadre éducatif.

---

## 🎯 Améliorations Futures

- [ ] Authentification et autorisation (Spring Security + JWT)
- [ ] Pagination des résultats
- [ ] Filtrage et recherche avancée
- [ ] Upload de fichiers/pièces jointes
- [ ] Notifications en temps réel
- [ ] Dashboard avec statistiques
- [ ] Export des données (PDF, Excel)
- [ ] Tests unitaires et d'intégration
