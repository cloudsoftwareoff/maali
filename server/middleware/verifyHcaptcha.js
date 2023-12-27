//site
//3442d3a6-59fe-4543-bb39-a557d3d517d6
//secret 
//ES_b8eee231bba04eccaff76f2fb6fb63a6

const express = require('express');
const router = express.Router();
const hcaptcha = require('hcaptcha');

router.post('/', async (req, res, next) => {
  const { hcaptchaToken } = req.body;

  try {
    const verification = await hcaptcha.verify(process.env.HCAPTCHA_SECRET_KEY, hcaptchaToken);

    if (verification.success) {
      // The hCaptcha response is valid
      next();
    } else {
      // The hCaptcha response is invalid
      res.status(400).json({ success: false, error: 'Invalid hCaptcha response' });
    }
  } catch (error) {
    console.error('Error verifying hCaptcha:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

module.exports = router;
