# Arlequin

## Intro

Mon premier projet avec Next.js

## Théorie

- about.js ou blog.js créera automatiquement une route /about /blog
- import Image from 'next/image'; est un exemple de composant propre à next
- Il est aussi possible de créer une api interne avec un fichier .js

### exemple

```
export default function handler(req, res) {
  res.status(200).json({ message: 'Bonjour depuis l’API Next.js' });
}
```

## Commandes

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install react-markdown
npm run dev