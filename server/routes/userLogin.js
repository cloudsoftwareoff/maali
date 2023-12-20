const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); 
const { decrypt } = require('../tools/cryptoUtils');
const router = express.Router();
const fixedSalt= process.env.SALT;
router.post('/', async (req, res) => {
  const { cardNumber, birth, fingerprint, code } = req.body;
 
  try {
    const hashedcardNumber = await bcrypt.hash(cardNumber, fixedSalt);
    const hashedbirth = await bcrypt.hash(birth, fixedSalt);
    const hashedfingerprint = await bcrypt.hash(fingerprint, fixedSalt);
    const hashedCode = await bcrypt.hash(code, fixedSalt);
    console.log(hashedcardNumber);
    const user = await User.findOne({
      cardNumber: hashedcardNumber,
      birth: hashedbirth,
      fingerprint: hashedfingerprint,
      code: hashedCode,
    });
    console.log(user);
    //hash md5
//     maali1 => 123FTFTFTdfrffvezv
//     maali <KEY> hdiuhuç"éç_"yçdjdd

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    if (user.code !== hashedCode) {
      return res.status(401).json({ error: 'Invalid credentials: Incorrect code' });
    }

    if (user.birth !== hashedbirth) {
      return res.status(401).json({ error: 'Invalid credentials: Incorrect birthdate' });
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

module.exports = router;
