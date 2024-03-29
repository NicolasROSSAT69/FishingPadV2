const express = require('express')
const sql = require('mysql')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { json } = require('body-parser')

const auth = require('../middleware/auth');
require('dotenv').config();
const KEY = process.env.KEY;
const sqlUser = process.env.SQL_USER;
const sqlPassword = process.env.SQL_PASSWORD;
const sqlHost = process.env.SQL_HOST;
const sqlPort = process.env.SQL_PORT;
const sqlDatabase = process.env.SQL_DATABASE;

let con = sql.createConnection({
    host: sqlHost,
    user: sqlUser,
    port: sqlPort,
    password: sqlPassword,
    database: sqlDatabase
});

let isLoged = function (mail) {
    return "SELECT utilisateur.idutilisateur as loged, utilisateur.mdp as pass, utilisateur.nom as nom, utilisateur.prenom as prenom, utilisateur.mail as mail FROM utilisateur WHERE utilisateur.mail = '" + mail + "'"
}

router.post('/login', function (req, res, next) {
    let mail = req.body.mail
    let passwordfront = req.body.password
    con.query(isLoged(mail), function (err, result) {
        if (result == "") {
            return res.status(401).json({ error: 'Mail incorrect !' })
        } else {
            bcrypt.compare(passwordfront, result["0"]["pass"])
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' })
                    }
                    res.status(200).json({
                        error: 'True',
                        loged: result["0"]["loged"],
                        nom: result["0"]["nom"],
                        prenom: result["0"]["prenom"],
                        mail: result["0"]["mail"],
                        token: jwt.sign(
                            { loged: result["0"]["loged"] },
                            KEY,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error: 'Erreur serveur' }))
        }
    });
});

let singup = function (nom, prenom, mail, hash, identifiant) {
    return "INSERT INTO utilisateur (nom, prenom, mail, mdp, identifiant) VALUES ('" + nom + "', '" + prenom + "', '" + mail + "', '" + hash + "', '" + identifiant + "')"
}

router.post('/signup', function (req, res, next) {
    let nom = req.body.nom
    let prenom = req.body.prenom
    let mail = req.body.mail
    let motdepasse = req.body.motdepasse
    let identifiant = req.body.identifiant
    bcrypt.hash(motdepasse, 10)
        .then(hash => {
            con.query(singup(nom, prenom, mail, hash, identifiant), function (err, result) {
                if (err) throw err;
                res.json(result)
            });
        }).catch(error => res.status(500).json({ error }));
});

router.get('/:idu', auth, function (req, res, next) {
    let idu = req.params.idu;
    con.query('SELECT * FROM utilisateur WHERE utilisateur.idutilisateur = ' + idu, function (err, result) {
        if (err) throw err;
        res.json(result)
    });
})

router.post('/update', auth, function (req, res, next) {

    let nom = req.body.nom
    let prenom = req.body.prenom
    let mail = req.body.mail
    let idu = req.body.idu

    con.query('UPDATE utilisateur SET nom="' + nom + '", prenom="' + prenom + '", mail="' + mail + '" WHERE idutilisateur=' + idu, function (err, result) {
        if (err) throw err;
        res.json("Utilisateur Modifié")
    });

});

router.post('/update/withmdp', auth, function (req, res, next) {

    let nom = req.body.nom
    let prenom = req.body.prenom
    let mail = req.body.mail
    let mdp = req.body.mdp
    let idu = req.body.idu


    bcrypt.hash(mdp, 10)
        .then(hash => {
            con.query('UPDATE utilisateur SET nom="' + nom + '", mdp="' + hash + '", prenom="' + prenom + '", mail="' + mail + '" WHERE idutilisateur=' + idu, function (err, result) {
                if (err) throw err;
                res.json("Utilisateur Modifié")
            });
        }).catch(error => res.status(500).json({ error }));

});


module.exports = router;
