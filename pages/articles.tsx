import { useEffect, useState } from "react";
import styles from "../styles/Articles.module.css";
import Image from 'next/image';
import { Button } from '../components/Button';

export interface Article {
  documentId: number | string;
  title: string;
  slug: string;
  createdAt: Date;
  url: string;
  cover?: Cover;
}

interface Cover {
  formats: {
    large?: ImageFormat;
    medium?: ImageFormat;
    small?: ImageFormat;
    thumbnail?: ImageFormat;
  };
}

interface ImageFormat {
  url: string;
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

function getImageUrl(cover: Article['cover'] | undefined): string | null {
  const baseUrl = STRAPI_URL;
  const formats = cover?.formats;
  const url =
  formats?.large?.url ||
  formats?.medium?.url ||
  formats?.small?.url ||
  formats?.thumbnail?.url
  
  return url ? baseUrl + url : null;
}

export default function Event() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };
  
  useEffect(() => {
    let mounted = true;
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(STRAPI_URL + "/api/articles?populate=cover");
        if (!res.ok) {
          setError(`Erreur réseau ${res.status} ${res.statusText}`);
          throw new Error(`Erreur réseau ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        if (!mounted) return;
        setArticles(data?.data || data);
      } catch (err: unknown) {
        console.error("fetchArticles error:", err);
        if (mounted) setError("Erreur inconnue");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchArticles();
    return () => {
      mounted = false;
    };
  }, []);
  
  return (
    <div className={styles.container}>
    <h1 className={styles.title}>Blog</h1>
    
    {loading && <p>Chargement...</p>}
    {error && <p style={{ color: "red" }}>Erreur: {error}</p>}
    
    <ul className={styles.flex}>
    {articles && articles.map((article) => (
      <li key={article.documentId} className={styles.item + ` subtitle`}>
      <a href={`article/` + article.documentId}>
      {article.cover &&
        <Image
        src={getImageUrl(article.cover) || ''}
        alt="Une belle photo"
        width={500}
        height={300}
        priority
        />
      }
      <span className={styles.subtitle}>
      {formatDate(article.createdAt)}
      </span>
      <h3 className={styles.titleItem}>{article.title}</h3>
        <Button onClick={() => alert('Clicked !')}>Clique-moi</Button>
      </a>
      </li>
    ))}
    </ul>
    </div>
  );
}