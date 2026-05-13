# LinkUp

LinkUp est une application de type réseau social construite avec Next.js (App Router), Prisma et PostgreSQL (Neon). Elle permet de publier des posts, liker du contenu, consulter des profils utilisateurs et naviguer dans un fil d’actualité paginé.

---

## 🚀 Stack technique

* Next.js 16 (App Router)
* Prisma ORM
* PostgreSQL (Neon)
* NextAuth (GitHub OAuth)
* Zod (validation serveur)
* Vercel (déploiement)

---

## 📁 Structure du projet

```
app/
 ├─ page.tsx                  # fil d’actualité
 ├─ posts/[id]/page.tsx      # détail d’un post
 ├─ profile/[id]/page.tsx    # profil utilisateur
 ├─ api/                     # routes API (posts, auth, users)
 ├─ loading.tsx             # loading global
 ├─ error.tsx               # gestion erreurs globale

components/
 ├─ NewPostForm.tsx
 ├─ PostCard.tsx
 ├─ AuthButton.tsx
 ├─ Pagination.tsx

lib/
 ├─ prisma.ts
 ├─ auth.ts
 ├─ posts.ts
 ├─ users.ts
```

---

## 🧠 Fonctionnement global

### 🔹 Authentification

* Connexion via GitHub OAuth (NextAuth)
* Session disponible côté client et serveur

### 🔹 Posts

* Création via Server Actions ou API Routes
* Stockage en base PostgreSQL (Neon)
* Likes persistants

### 🔹 Profils

* Chaque post est lié à un auteur
* Page profil accessible via `/profile/[id]`

---

## 📄 Fil d’actualité (Pagination)

Le fil d’actualité affiche **10 posts par page**.

### Fonctionnement :

* Paramètre URL : `/?page=1`
* Prisma utilise `skip` et `take`
* Comptage total via `prisma.post.count()`

### Exemple (page.tsx)

```ts
const page = Number(searchParams.page || "1");
const take = 10;
const skip = (page - 1) * take;

const [posts, total] = await Promise.all([
  prisma.post.findMany({
    skip,
    take,
    orderBy: { createdAt: "desc" },
    include: { author: true },
  }),
  prisma.post.count(),
]);

const totalPages = Math.ceil(total / take);
```

---

## 🔁 Pagination UI

* Bouton **Précédent / Suivant**
* Mise à jour de l’URL
* Composant client (`useRouter`)

---

## ⏳ loading.tsx

Affiché automatiquement pendant les transitions :

```tsx
export default function Loading() {
  return <p>Chargement...</p>;
}
```

---

## ❌ error.tsx

Gestion globale des erreurs :

```tsx
"use client";

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Une erreur est survenue</h2>
      <button onClick={reset}>Réessayer</button>
    </div>
  );
}
```

---

## 🧩 Server Actions

Les mutations (création de posts, likes) sont gérées via Server Actions :

* Pas de fetch manuel côté client
* Exécution directe côté serveur
* Revalidation automatique avec `revalidatePath`

---

## 🔐 Sécurité

* Authentification requise pour les actions sensibles
* Vérification ownership (auteur du post)
* Middleware pour protéger certaines routes

---

## 🌐 Déploiement

### Vercel

* Base de données : Neon PostgreSQL
* Variables d’environnement configurées sur Vercel
* Callback GitHub OAuth mis à jour avec URL production

### Build

* Prisma generate exécuté au build
* Next.js optimisé pour production

---

## 📌 Notes

* SQLite non supporté en production → remplacé par PostgreSQL
* Prisma utilisé en singleton pour éviter les connexions multiples
* UI simplifiée et responsive

---

## 🏁 Résultat

Une application fonctionnelle type réseau social avec :

* Feed paginé
* Auth GitHub
* Création de posts
* Likes persistants
* Profils utilisateurs
* Déploiement Vercel
