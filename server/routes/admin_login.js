const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AdminUser = require('../models/adminModel');
const router = express.Router();
const fixedSalt = process.env.SALT;

router.post('/', async (req, res) => {
  const { cin, password } = req.body;
  console.log("cin:"+cin);
  try {
    const hashedcin = await bcrypt.hash(cin, fixedSalt);
    const hashedpassword = await bcrypt.hash(password, fixedSalt);
    console.log("cin:"+hashedcin);
    const admin = await AdminUser.findOne({
      cin: hashedcin,
      password: hashedpassword
    });
   
    

    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      {
        cin: admin.cin,
        password: admin.password
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    console.log(token);

    // Set the token in the Authorization header
    res.header('Authorization', `Bearer ${token}`).json({ message: 'Login successful', token });

  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

// // Create a new admin user
// const newAdmin = new AdminUser({
//   cin: cin,
//   password: password,
//   // Add other fields as needed
// });