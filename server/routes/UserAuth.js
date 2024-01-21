const express = require('express');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const generateRandomCode = require('../tools/code');
const sendEmail = require('../models/sendEmail');
const verifyHcaptcha = require('../middleware/verifyHcaptcha');
const verifyAdminToken = require('../middleware/verifyAdmin');
const jwt = require('jsonwebtoken');
const { decrypt, encrypt } = require('../tools/cryptoUtils');
const fixedSalt= process.env.SALT
const router = express.Router();


// register nouveau utlisateur par l'ADMIN
  router.post('/register',verifyAdminToken ,async (req, res) => {
  try {
    const { user_number, user_birthdate, user_fingerprint,user_email ,user_name,locality,Delegation,postalcode} = req.body;
    
    // Validate incoming request
    if (!user_number || !user_birthdate || !user_fingerprint || !user_email) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    

    CODE = generateRandomCode();
    sendEmail(user_email,CODE);

    const user = new User({
        cardNumber: user_number,
        birth: user_birthdate,
        fingerprint: user_fingerprint,
        code: CODE,
        user_name:user_name,
        Delegation:Delegation,
        postalcode:postalcode,
        locality:locality
    });

    await user.save();

    
    res.status(200).json({ message: 'user added' });
    
  } catch (error) {
    console.error('Error registering ID card:', error);

    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: 'Validation error', details: error.message });
    }

    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Connexion utlisateur
router.post('/login' ,verifyHcaptcha,async (req, res) => {
    const { cardNumber, birth, fingerprint, code } = req.body;
  
    try {
      const hashedcardNumber = await bcrypt.hash(cardNumber, fixedSalt);
      const hashedbirth = await bcrypt.hash(birth, fixedSalt);
      const hashedfingerprint = await bcrypt.hash(fingerprint, fixedSalt);
      const hashedCode = await bcrypt.hash(code, fixedSalt);
      
      const user = await User.findOne({
        cardNumber: hashedcardNumber,
      
      });
  
      if (!user) {
        return res.status(401).json({ error: "numéro de carte d'identité invalide" });
      }
      if (user.birth !== hashedbirth) {
        return res.status(401).json({ error: 'Date de naissance invalide' });
      }
      if (user.fingerprint !== hashedfingerprint) {
        return res.status(401).json({ error: "numéro d'empreinte digitale invalide" });
      }
  
      if (user.code !== hashedCode) {
        return res.status(401).json({ error: 'Invalid credentials: Incorrect code' });
      }
  
      const token = jwt.sign(
        {
          cardNumber: user.cardNumber,
          birth: user.birth,
          fingerprint: user.fingerprint,
          code:user.code
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
        const name=decrypt(user.user_name );
      
      res.header('Authorization', `Bearer ${token}`).json({
        message: 'Login successful',
        token,
        user_name: name,
        card_number:user.cardNumber
      });
      
      
  } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

  // get tous les utilisateur apres de verify que le personne qui fait la requette est ADMIN
  router.get('/all',verifyAdminToken ,async (req, res) => {
    try {
      const users = await User.find({}, { _id: 0, __v: 0, code: 0, fingerprint: 0 }); 
      const decryptedUsers = User.decryptData(users);
      res.json({ decryptedUsers });
    } catch (error) {
      console.error('Error getting all users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Rechercher utilisateur par le CIN
  router.get('/:cardNumber', async (req, res) => {
    const cardNumber = req.params.cardNumber;
  
    try {
      enc_number=await bcrypt.hash(cardNumber, fixedSalt);
      const user = await User.findByCardNumber(enc_number);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      console.log(user.user_name);
      user.user_name = decrypt(user.user_name);
  
      
  
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
module.exports = router;
