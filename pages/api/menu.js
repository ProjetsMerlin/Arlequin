export default function handler(req, res) {
  const author = "Arlequin";

  const menus = [
    {
      id: 1,
      title: "À propos",
      slug: "a-propos",
      description: "Un projet intermédiaire pour apprendre Next.js avec Strapi",
      createdAt: "2025-10-20T21:24:49.793Z",
      author: author,
      category: "static page",
    },
  ];

  res.status(200).json(menus);
}
