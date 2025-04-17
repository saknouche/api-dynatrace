const express = require('express');
const app = express();
const PORT = 3000;

// Token que Dynatrace doit envoyer dans le header Authorization\
const AUTH_TOKEN = 'mytoken';


export default function handler(req, res) {
  if(req.method !== "POST") {
      return res.status(405).json({message: 'Méthode non authorisée !'})
  }

  const auth = req.headers.authorization;

  if(!auth || auth !== `Bearer ${AUTH_TOKEN}`) {
    return res.status(403).json({ message: 'Forbidden' })
  }

  const alert = req.body;

  console.log('Nouvelle alerte Dynatrace :');
  console.log(`Problème : ${alert.title}`);
  console.log(`Gravité : ${alert.severity}`);
  console.log(`Impact : ${alert.impact}`);
  console.log(`Statut : ${alert.state}`);
  console.log(`Voir : ${alert.url}`);
  console.log(`Tags : ${(alert.tags || []).map(t => `${t.key}=${t.value}`).join(', ')}`);

  res.status(200).json({ message: 'Alerte reçue avec succès !' });
  res.status(200).json(alert);
}

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur en écoute sur http://localhost:${PORT}`);
  console.log(`Endpoint : POST /receive-alerts`);
});
