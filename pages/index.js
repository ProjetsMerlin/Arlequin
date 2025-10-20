import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bienvenue dans Next.js !</h1>
      <p className={styles.subtitle}>Mon premier mini-projet React + Next.js</p>
      <Link href="/events">
        <button className={styles.button}>Voir les événements</button>
      </Link>
    </div>
  );
}
