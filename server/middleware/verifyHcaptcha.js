const hcaptcha = require('hcaptcha');

const verifyHcaptcha = async (req, res, next) => {
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
};

module.exports = verifyHcaptcha;
