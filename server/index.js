// Importation des modules nécessaires
const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
// Configuration du fichier .env
dotenv.config({ path: path.resolve(__dirname, '.env') });
const connection = require('./db'); // Connexion à la base de données

const cookieParser = require('cookie-parser');


// Connexion à la base de données
connection();

// Importation des routes
const postalCodeRoute = require('./routes/laposteRoute');
const UserAuth = require('./routes/UserAuth');
const AdminRoute = require('./routes/AdminRoute');
const CandidatRoute = require('./routes/CandidateRoute');
const MakeVote = require('./routes/VoteRoute');
const ElectionRoute = require('./routes/electionRoute');

// Initialisation d'une instance d'Express
const app = express();
const port = process.env.PORT || 8080;

// Activation du support CORS (Cross-Origin Resource Sharing)
app.use(cors());


// Configuration de la gestion des requêtes JSON et des cookies
app.use(express.json());
app.use(cookieParser());

// Définition des routes
app.use('/code', postalCodeRoute);
app.use('/u', UserAuth);
app.use('/api/admin', AdminRoute);
app.use('/api/candidate', CandidatRoute);
app.use('/vote', MakeVote);
app.use('/election', ElectionRoute);

// Lancement du serveur sur le port spécifié
app.listen(port, () => {
  console.log(`Le serveur écoute sur le port ${port}`);
});
