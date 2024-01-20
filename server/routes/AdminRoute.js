const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AdminUser = require('../models/adminModel');
const VerifyAdminToken = require('../middleware/verifyAdmin');
const verifyHcaptcha = require('../middleware/verifyHcaptcha');
const router = express.Router();
const fixedSalt = process.env.SALT;

// Route pour la connexion d'administrateur
router.post('/login', verifyHcaptcha, async (req, res) => {
  const { cin, password } = req.body;

  try {
    // Hachage du numéro d'identification et du mot de passe
    const hashedcin = await bcrypt.hash(cin, fixedSalt);
    const hashedpassword = await bcrypt.hash(password, fixedSalt);

    // Recherche de l'administrateur dans la base de données
    const admin = await AdminUser.findOne({
      cin: hashedcin,
      password: hashedpassword
    });

    // Vérification des informations d'identification
    if (!admin) {
      return res.status(401).json({ error: 'Informations d\'identification invalides' });
    }

    // Génération du jeton d'authentification
    //JWT Token
    const token = jwt.sign(
      {
        cin: admin.cin,
        password: admin.password
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Vérification de la génération du token
    if (!token) {
      return res.status(401).json({ message: 'Non autorisé : aucun jeton fourni' });
    }

    // Définition du token dans l'en-tête Authorization
    res.header('Authorization', `Bearer ${token}`).json({ message: 'Connexion réussie', token });

  } catch (error) {
    console.error('Erreur de connexion :', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

// Route pour ajouter un administrateur
router.post('/add', VerifyAdminToken, async (req, res) => {
  const { cin, password } = req.body;

  try {
    // Création d'un nouvel administrateur
    const newAdmin = new AdminUser({
      cin: cin,
      password: password
    });

    // Sauvegarde du nouvel administrateur dans la base de données
    const savedAdmin = await newAdmin.save();

    res.status(201).json({ message: 'Administrateur ajouté avec succès', admin: savedAdmin });

  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'administrateur :', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

module.exports = router;
