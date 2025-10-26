import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL as string;

interface StrapiArticle {
  documentId: string;
  title: string;
  publishedAt: string;
  cover?: {
    formats?: {
      large?: { url: string };
      medium?: { url: string };
      thumbnail?: { url: string };
    };
  };
  blocks?: Array<{
    __component?: string;
    body?: string;
  }>;
}

interface ArticlePageProps {
  article: StrapiArticle;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${STRAPI_URL}/api/articles?fields=documentId`);
  const json = await res.json();
  
  const paths = json.data.map((article: StrapiArticle) => ({
    params: { id: article.documentId },
  }));
  
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };
  
  const res = await fetch(`${STRAPI_URL}/api/articles/${id}?populate[cover]=true&populate[blocks]=true`);
  
  const json = await res.json();
  
  return {
    props: { article: json.data as StrapiArticle },
    revalidate: 60,
  };
};

export default function ArticlePage({ article }: ArticlePageProps) {
  const { title, blocks, publishedAt, cover } = article;

const richTextBodies = (blocks ?? [])
  .filter(block => block.__component === "shared.rich-text")
  .map(block => block.body);

  const imageUrl =
  cover?.formats?.large?.url ||
  cover?.formats?.medium?.url ||
  cover?.formats?.thumbnail?.url;
  
  return (
    <article style={{ maxWidth: '1024px', margin: "48px auto" }}>
      <a style={{textDecoration: "none"}} href="/articles">
        Retour
      </a>
      <br></br>
      <br></br>
    {imageUrl && (
      <Image
      style={{borderRadius: "8px", width: "100%", height: "auto"}}
      src={`${STRAPI_URL}${imageUrl}`}
      alt={title}
      width={800}
      height={500}
      />
    )}
    <p>
    <i>Publié le {new Date(publishedAt).toLocaleDateString()}</i>
    </p>
    
    <h1>{title}</h1>

    <div>
      {richTextBodies.map((body, index) => (
        <ReactMarkdown key={index}>
          {body}
        </ReactMarkdown>
      ))}
    </div>
    
    </article>
  );
}