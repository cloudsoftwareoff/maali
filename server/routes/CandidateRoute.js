const express = require('express');
const router = express.Router();
const Candidate = require('../models/candidatModel');
const User = require('../models/userModel');
const verifyAdmin = require('../middleware/verifyAdmin');
const ElectionModel = require('../models/electionModel');

// Route pour obtenir les candidats
router.post('/get', async (req, res) => {
    const { card_number } = req.body;

    try {
        // Recherche de l'utilisateur par numéro de carte
        const user = await User.findByCardNumber(card_number);

        // Vérification si l'utilisateur a déjà voté
        if (card_number !== "view" && user.voted === 'yes') {
            return res.status(403).json({ error: 'L\'utilisateur a déjà voté.' });
        }

        // Récupération des données de l'élection active
        const activeElectionData = await ElectionModel.getCurrentActiveElectionData();

        if (activeElectionData) {
            let candidates;

            // Filtrage des candidats en fonction du type d'élection
            if (card_number !== "view" && activeElectionData.electionType === "1") {
                candidates = await Candidate.find({
                    electionId: activeElectionData.id,
                    location: user.locality
                });
            } else if (card_number !== "view" && activeElectionData.electionType === "2") {
                candidates = await Candidate.find({ electionId: activeElectionData.id, postalcode: user.postalcode });
            } else {
                candidates = await Candidate.find({ electionId: activeElectionData.id });
            }

            res.json(candidates);
        } else {
            res.json('Aucune élection en cours pour le moment.');
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des candidats :', error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
});

// Route pour ajouter un candidat
router.post('/add', verifyAdmin, async (req, res) => {
    try {
        // Corps de la requête
        const { cinNumber, electionId, name, imageUrl, position, postalcode, location, Delegation } = req.body;

        // Création d'une nouvelle instance de candidat
        const newCandidate = new Candidate({
            cin: cinNumber,
            electionId: electionId,
            name: name,
            imageUrl: imageUrl,
            position: position,
            location: location,
            postalcode: postalcode,
            Delegation: Delegation
        });

        // Sauvegarde du nouveau candidat dans la base de données
        await newCandidate.save();

        // Envoi d'une réponse de succès
        res.status(200).json({ message: 'Données du candidat enregistrées avec succès' });
    } catch (error) {
        // Vérification si l'erreur est due à une violation de clé dupliquée (code 11000)
        if (error.code === 11000) {
            console.error('Erreur lors de l\'enregistrement des données du candidat :', error);
            res.status(400).json({ error: 'Entrée en double. Un candidat avec la même position ou le même numéro de cinNumber existe déjà.' });
        } else {
            console.error('Erreur lors de l\'enregistrement des données du candidat :', error);
            res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    }
});

module.exports = router;
