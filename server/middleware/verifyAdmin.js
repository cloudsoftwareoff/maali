const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

const VerifyAdminToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  //console.log('Retrieved token:', token);

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    console.log('Decoded JWT:', decoded);

    // Check if the decoded JWT contains 'cin' and 'password'
    if (decoded && decoded.cin && decoded.password) {
      req.user = decoded;
      next();
    } else {
      return res.status(401).json({ message: 'Unauthorized: Invalid token contents' });
    }
  });
};

module.exports = VerifyAdminToken;
