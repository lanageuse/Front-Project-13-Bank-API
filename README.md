# ArgentBank – Frontend

Projet front-end basé sur le **template officiel Redux : vite-template-redux**

## Technologies utilisées

- **Vite** – Serveur de développement rapide  
- **React** – Interface utilisateur  
- **Redux Toolkit** – Gestion d’état centralisée  
- **RTK Query** – Gestion des requêtes API et du cache  
- **TypeScript** – Typage strict  
- **React Router** – Navigation  
- **React Toastify** – Notifications utilisateur  

## Structure du projet

L’application est organisée autour de :

- `features/` – Slices Redux & services RTK Query  
- `middleware/` – Middlewares (auth, erreurs, stockage…)  
- `pages/` – Pages principales  
- `components/` – Composants UI réutilisables  
- `utils/` – Fonctions utilitaires  
- `styles/` – Styles globaux  

## Fonctionnalités principales

- Authentification utilisateur  
- Gestion centralisée des erreurs via middlewares  
- Pages sécurisées avec redirection en cas de session expirée  
- Gestion du profil via RTK Query  
- Persistance du token et du "remember me"

## 🛠️ Scripts

- `dev` – Démarre le serveur de développement  
- `build` – Génère la version de production  
- `preview` – Prévisualise le build  
- `test` – Lance les tests (pas encore en place 😞)  

## 📦 Installation

```sh
npm install
npm run dev
