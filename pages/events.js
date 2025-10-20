import { useEffect, useState } from 'react';
import styles from '../styles/Events.module.css';

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => setEvents(data));
  }, []);

  return (
    <div className={styles.container}>
      <h1 className='title'>Événements à venir</h1>
      <ul className={styles.list}>
        {events.map(event => (
          <li key={event.id} className={styles.item + ` subtitle`}>
            <strong>{event.name}</strong> — {event.date}
          </li>
        ))}
      </ul>
    </div>
  );
}
