// Importation des modules nécessaires
const express = require('express');
const cors = require('cors');
const path = require('path');
const ejs = require('ejs');
const dotenv = require('dotenv');
// Configuration du fichier .env
dotenv.config({ path: path.resolve(__dirname, '.env') });
const connection = require('./db'); // Connexion à la base de données

// Initialisation d'une instance d'Express
const app = express();
const port = process.env.PORT || 8080;
const cookieParser = require('cookie-parser');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Connexion à la base de données
connection();
const convertBytesToMB = (bytes) => {
  return (bytes / (1024 * 1024)).toFixed(2);
};
app.locals.convertBytesToMB = convertBytesToMB;
// Importation des routes
const postalCodeRoute = require('./routes/laposteRoute');
const UserAuth = require('./routes/UserAuth');
const AdminRoute = require('./routes/AdminRoute');
const CandidatRoute = require('./routes/CandidateRoute');
const MakeVote = require('./routes/VoteRoute');
const ElectionRoute = require('./routes/electionRoute');
const serverStatsMiddleware = require('./middleware/stats');


// Activation du support CORS (Cross-Origin Resource Sharing)
app.use(cors());


// Configuration de la gestion des requêtes JSON et des cookies
app.use(express.json());
app.use(cookieParser());
app.use(serverStatsMiddleware);
// Définition des routes
// Route to get server stats
app.get('/', (req, res) => {
  res.render('index', { serverStats: req.serverStats });
});

app.use('/code', postalCodeRoute);
//user route
app.use('/u', UserAuth);
app.use('/api/admin', AdminRoute);
app.use('/api/candidate', CandidatRoute);
app.use('/vote', MakeVote);
app.use('/election', ElectionRoute);

// Lancement du serveur sur le port spécifié
app.listen(port, () => {
  console.log(`Le serveur écoute sur le port ${port}`);
});
