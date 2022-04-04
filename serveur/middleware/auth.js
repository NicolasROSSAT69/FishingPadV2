const jwt = require('jsonwebtoken');
require('dotenv').config();
const KEY = process.env.KEY;

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, KEY);
    const loged = decodedToken.loged;
    if (req.body.loged && req.body.loged !== loged) {
      throw 'ID utilisateur non valide';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Requete incorrect!')
    });
  }
};