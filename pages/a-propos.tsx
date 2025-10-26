import { useEffect, useState } from 'react';

export interface Menu {
  id: number;
  title: string;
  createdAt: string;
  slug: string;
}

export default function About() {
  const [menu, setmenu] = useState<Menu[]>([]);

  useEffect(() => {
    fetch('/api/menu')
      .then((res) => res.json())
      .then((data) => setmenu(data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1>Liste des liens</h1>
      <ul className='menu'>
        {menu.map((item) => (
          <li key={item.id}>
            <a href={`/${item.slug}`}>{item.title}</a>
             {/* — Créé le : {new Date(item.createdAt).toLocaleDateString()} */}
          </li>
        ))}
      </ul>
    </div>
  );
}