# 🌳 LinkTree Clone — Monorepo React + NestJS

> **Un “Link-in-bio” open-source, full-stack TypeScript, réuni dans un seul dépôt.**  
> Front : React + Vite. Back : NestJS. Gestion des workspaces avec pnpm (ou npm ≥ 7).

---

## ✨ Fonctionnalités

| Front (React) | Back (NestJS) |
|---------------|---------------|
| ⚡ Vue publique profil / micro‑landing page | 🗄️ API REST + Swagger |
| 🎨 Éditeur drag‑and‑drop des liens | 🔐 Auth JWT + refresh |
| 📈 Compteur de clics temps‑réel | 📊 Endpoints analytics |
| 🌗 Thèmes clair/sombre | ⚙️ Validation DTO (class‑validator) |
| 📱 Responsive 100 % | 📦 Prisma ORM (PostgreSQL par défaut) |

---

## 🏗️ Stack technique

- **Monorepo** : pnpm workspaces · TypeScript partout
- **Front** : React 18 · Vite 5 · Zustand / TanStack Query · TailwindCSS
- **Back** : NestJS 10 · Prisma · class‑validator / class‑transformer
- **Tests** : Vitest (front) · Jest (back)
- **Dev tooling** : eslint + prettier · Husky + lint‑staged · concurrently

---

## 🗂️ Arborescence

```
.
├─ front/            # React + Vite
│  ├─ src/
│  └─ vite.config.ts
├─ back/             # NestJS
│  ├─ src/
│  └─ prisma/
├─ .env.example
├─ package.json      # scripts racine
```

---

## 🚀 Prise en main

### 1. Prérequis

- **Node ≥ 18**
- **pnpm ≥ 9** (ou npm ≥ 7 / yarn ≥ 1.22)
- MySql local (ou changez la connexion dans `.env`)

### 2. Cloner + installer

```bash
git clone https://github.com/votre-org/link-tree-clone.git
cd link-tree-clone
npm install       
```

### 3. Variables d’environnement

```bash
cp .env.example .env
# ➜ remplissez MYSQL_URL
```

### 4. Démarrage dev (front + back)

```bash
npm run db:init        # init db and seed 
npm run dev            # lance Nest à :3000 et Vite à :5173
```

### 5. Accès

- **Frontend** : http://localhost:5173
- **API**      : http://localhost:3000
- **Swagger**  : http://localhost:3000/api

---

## 📜 Scripts utiles

| Commande racine       | Action |
|-----------------------|--------|
| \`npm run dev\`       | Exécute \`back\` (\`nest start --watch\`) **et** \`front\` (\`vite\`) via concurrently |
| \`npm lint\`          | ESLint sur tout le repo |
| \`npm prisma:migrate\` | Migration Prisma |

*Remarque :* chaque dossier conserve ses propres scripts (\`front/package.json\`, \`back/package.json\`).

---

## 🤝 Contribuer

1. Forkez le repo
2. \`git checkout -b feat/ma-fonction\`
3. Commitez (Convention Commit)
4. Ouvrez une Pull Request 🚀

---

## 📄 Licence

[MIT](LICENSE)

---

> *Made with ♥ & TypeScript.*
