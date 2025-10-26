import Link from "next/link";
import Menu from "../components/Menu";
import "../styles/global.css";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Menu />
      <h1 className={styles.title}>Bienvenue dans Next.js !</h1>
      <p className={styles.subtitle}>Mon premier mini-projet React + Next.js</p>
      <Link href="/articles">
        <button className={styles.button}>Voir le Blog</button>
      </Link>
      <br></br>
      <br></br>
      <Link href="/a-propos">
        <button className={styles.button}>À propos</button>
      </Link>
    </div>
  );
}
