// API route simulant des événements
export default function handler(req, res) {
  const events = [
    { id: 1, name: 'Conférence React', date: '2025-10-20' },
    { id: 2, name: 'Workshop Next.js', date: '2025-11-05' },
    { id: 3, name: 'Hackathon JS', date: '2025-12-12' },
  ];

  res.status(200).json(events);
}