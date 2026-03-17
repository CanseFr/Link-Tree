# 🌳 LinkTree Clone — Monorepo React + NestJS

> **Un “Link-in-bio” open-source full-stack TypeScript, réuni dans un seul dépôt.**
> Frontend : **React + Vite** · Backend : **NestJS**

Ce repository contient **les deux applications du projet** :

* un **frontend React**
* un **backend NestJS**

Chaque application possède **son propre README avec les instructions d'installation et de configuration**.

👉 Merci de vous référer aux README présents dans chaque sous-dossier :

* `front/README.md`
* `back/README.md`

---

# ✨ Fonctionnalités

| Front (React)                             | Back (NestJS)           |
| ----------------------------------------- |-------------------------|
| ⚡ Vue publique profil / micro-landing page | 🗄️ API REST            |
| 🎨 Gestion des liens                      | 🔐 Authentification     |
| 📈 Compteur de clics                      | 📊 Endpoints analytics  |
| 🌗 Thèmes clair/sombre                    | ⚙️ Validation DTO       |
| 📱 Responsive                             | 📦 Prisma ORM           |
|                               | 📸 Stockage image cloud |

---

# 🏗️ Stack technique

* **Monorepo** : Node.js workspaces

* **Frontend** :

    * React
    * Vite 
    * TypeScript

* **Backend** :

    * NestJS
    * Prisma
    * MySQL
    * Cloudinary

---

# 🗂️ Structure du projet

```
.
├─ front/            # Application React (Vite)
│  ├─ doc/
│  ├─ src/
│  └─ README.md
│
├─ back/             # API NestJS
│  ├─ doc/
│  ├─ src/
│  ├─ prisma/
│  └─ README.md
│
├─ doc/             # Main documentation
│
├─ package.json      # scripts racine
└─ README.md
```

---

# 🚀 Getting Started

Clone the repository:

```bash
git clone https://github.com/votre-org/link-tree-clone.git
cd link-tree-clone
```

Installez les dépendances :

```bash
npm install
```

---

## ⚠️ Configuration

La configuration **du frontend et du backend est décrite dans leurs README respectifs** :

* 📄 `front/README.md`
* 📄 `back/README.md`

Ils expliquent notamment :

* l'installation
* les variables d'environnement
* le lancement en mode développement
* la base de données
* les tests

---

# 📜 Scripts

| Commande      | Description                           |
| ------------- | ------------------------------------- |
| `npm install` | installe les dépendances du projet    |
| `npm run dev` | lance le projet en mode développement |

---

# 🤝 Contribuer

1. Forkez le repo
2. Créez une branche

```bash
git checkout -b feat/ma-feature
```

3. Committez vos changements
4. Ouvrez une Pull Request 🚀

---

# 📄 Licence

MIT License
