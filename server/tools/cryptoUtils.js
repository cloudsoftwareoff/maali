
// import CryptoJS from 'crypto-js';
const CryptoJS = require('crypto-js');

const key = process.env.AES_KEY;

// Encryption function
 function encrypt(text) {
  const inputString = String(text);
  const encrypted = CryptoJS.AES.encrypt(inputString, key).toString();
  return encrypted;
}

// Decryption function
 function decrypt(encryptedText) {
  const decrypted = CryptoJS.AES.decrypt(encryptedText, key).toString(CryptoJS.enc.Utf8);
  return decrypted;
}
module.exports = { encrypt, decrypt };