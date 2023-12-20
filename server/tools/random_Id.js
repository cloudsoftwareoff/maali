const bcrypt = require('bcrypt');
const fixedSalt= process.env.SALT;

function generateId(userId) {
    const timestamp = new Date().toISOString(); // Get current timestamp
    const randomPart = Math.random().toString(36).substring(2, 15); // Generate random string
    const hashedCode =  bcrypt.hash(`${timestamp}-${userId}-${randomPart}`, fixedSalt);
 
    return hashedCode;
  }

module.exports = generateId;