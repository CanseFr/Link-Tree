# 🔄 Mise à jour schéma Prisma

Lorsqu’une modification est apportée au fichier `schema.prisma`, il est nécessaire de créer et d’appliquer une **migration** afin de synchroniser la base de données avec le schéma Prisma.

## 1. Modifier le schéma

Ajouter le nouveau champ dans le modèle concerné dans `schema.prisma`.

Exemple :

```prisma
model User {
  id         Int     @id @default(autoincrement())
  email      String  @unique
  pictureUrl String? // ici
}
```

## 2. Générer et appliquer la migration

Dans le terminal, exécuter la commande suivante :

```bash
npx prisma migrate dev --name add-picture-url
```

Cette commande va :

1. Générer un fichier de migration SQL.
2. Appliquer automatiquement la migration à la base de données.
3. Mettre à jour le client Prisma.

## 3. Vérifier la migration

Après l’exécution de la commande, le nouveau champ doit être présent dans la table correspondante de la base de données.

---

💡 **Astuce :**
Pour visualiser facilement les données et la structure de la base, vous pouvez utiliser :

```bash
npx prisma studio
```
