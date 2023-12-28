const bcrypt = require('bcrypt');
const fixedSalt = process.env.SALT;

async function generateId(userId) {
  const timestamp = new Date().toISOString();
  const randomPart = Math.random().toString(36).substring(2, 15);

  try {
    const hashedCode = await bcrypt.hash(`${timestamp}${randomPart}`, fixedSalt);
    return hashedCode;
  } catch (error) {
    console.error('Error generating id:', error);
   return userId;
  }
}

module.exports = generateId;
