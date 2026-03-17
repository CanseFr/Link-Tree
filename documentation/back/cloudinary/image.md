# 📸 Intégration de Cloudinary

## 1. Création d’un compte Cloudinary

Créer un compte **gratuit** sur Cloudinary :

[https://console.cloudinary.com/](https://console.cloudinary.com/)

Une fois inscrit, accéder au **Dashboard** et récupérer les informations suivantes :

* **Cloud name**
* **API Key**
* **API Secret**

---

## 2. Ajout des variables d’environnement

Ajouter ces informations dans le fichier `.env` du projet :

```env
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
```

---

# ⚙️ Installation des dépendances

Installer les dépendances suivantes :

* `cloudinary`
* `buffer-to-stream`

Exemple :

```bash
npm install cloudinary buffer-to-stream
```

---

# 1. Réception des fichiers avec NestJS

Pour gérer l’upload de fichiers côté backend :

* Utilisation de **`FileInterceptor`** de NestJS pour recevoir des fichiers envoyés en `multipart/form-data`.
* Installation de **Multer** et configuration en mode mémoire (`memoryStorage()`), afin que le fichier soit stocké **temporairement en mémoire sous forme de buffer**.
* Mise en place d’un **service** et d’un **contrôleur Media** pour gérer l’upload des fichiers.
* Utilisation d’un `console.log(file)` au départ pour vérifier que le fichier est bien reçu par le backend.

📚 Documentation NestJS :
[https://docs.nestjs.com/techniques/file-upload](https://docs.nestjs.com/techniques/file-upload)

---

# 2. Injection de Cloudinary dans NestJS

Pour intégrer Cloudinary dans l’application :

* Création d’un **provider NestJS** permettant de configurer le SDK Cloudinary à partir des variables d’environnement.
* Injection de ce provider dans le **MediaService** afin d’utiliser le client Cloudinary depuis la ressource Media.

📚 Documentation NestJS :
[https://docs.nestjs.com/fundamentals/custom-providers](https://docs.nestjs.com/fundamentals/custom-providers)

---

# 3. Upload d’images avec Cloudinary

L’upload de l’image se fait de la manière suivante :

* Le fichier reçu par NestJS est stocké en mémoire sous forme de **buffer**.
* Ce buffer est envoyé vers Cloudinary via la méthode **`upload_stream`** du SDK Cloudinary.
* Cloudinary stocke l’image et retourne plusieurs informations, notamment :

    * `secure_url`
    * `public_id`

Ces informations peuvent ensuite être stockées en base de données ou renvoyées au frontend pour afficher l’image.

📚 Documentation Cloudinary :
[https://cloudinary.com/documentation/node_image_and_video_upload](https://cloudinary.com/documentation/node_image_and_video_upload)

---

# 4. Fonctionnement global

Le processus complet d’upload est le suivant :

1. Postman effectue un `POST` en *form-data* d'une image sur le endpoint avec pour KEY **`file`** de type **File** et dans value un fichier png.
2. NestJS reçoit le fichier via `FileInterceptor`.
3. Multer stocke temporairement le fichier en mémoire sous forme de **buffer**.
4. Le buffer est envoyé à Cloudinary via `upload_stream`.
5. Cloudinary stocke l’image et retourne l’URL du fichier.
6. Le backend renvoie cette URL au frontend afin de pouvoir afficher l’image.
7. Une fois la requête effectuée, il est possible de vérifier l’image dans les **Assets / Media Library** du dashboard Cloudinary.

Documentation Cloudinary :
[https://cloudinary.com/documentation/node_image_and_video_upload](https://cloudinary.com/documentation/node_image_and_video_upload)
