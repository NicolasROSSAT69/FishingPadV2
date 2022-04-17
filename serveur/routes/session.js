const express = require('express')
const sql = require('mysql')
const router = express.Router()
const fs = require('fs')

const auth = require('../middleware/auth');
require('dotenv').config();
const sqlUser = process.env.SQL_USER;
const sqlPassword = process.env.SQL_PASSWORD;
const sqlHost = process.env.SQL_HOST;
const sqlPort = process.env.SQL_PORT;
const sqlDatabase = process.env.SQL_DATABASE;

// let con = sql.createConnection({
//     host: "localhost",
//     user: "root",
//     port: 8889,
//     password: "root",
//     //port: 3306,
//     //password: "",
//     database: "peche"
// });

let con = sql.createConnection({
    host: sqlHost,
    user: sqlUser,
    port: sqlPort,
    password: sqlPassword,
    database: sqlDatabase
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

// session/
router.get('/:idu', auth, function (req, res, next) {
    let idu = req.params.idu;
    con.query('SELECT * FROM session INNER JOIN utilisateur ON session.fk_utilisateur = utilisateur.idutilisateur WHERE utilisateur.idutilisateur = ' + idu + ' ORDER BY date', function (err, result) {
        if (err) throw err;
        res.json(result)
    });
})

router.post('/remove', auth, function (req, res, next) {
    let id = req.body.id
    let idutilisateur = req.body.idutilisateur
    let img = req.body.img
    let path = `${__dirname}/public/${img}`

    if (img !== "image_default.jpg") {

        //Suppression image
        fs.unlink(path, (err) => {
            if (err) {
                console.error(err)
                return
            }
        })

    }

    con.query('DELETE FROM session WHERE idsession=' + id + ' AND fk_utilisateur=' + idutilisateur, function (err, result) {
        if (err) throw err;
        res.json("ok")
    });
})
router.post('/update', auth, function (req, res, next) {
    let id = req.body.id
    let description = req.body.description
    let img = req.body.img
    let lieu = req.body.lieu
    let idu = req.body.idu;
    let date = req.body.date

    con.query('UPDATE session SET date="' + date + '", description="' + description + '", img="' + img + '", lieu="' + lieu + '" WHERE idsession=' + id + ' AND fk_utilisateur=' + idu, function (err, result) {
        if (err) throw err;
        res.json("Session Modifié")
    });
});
router.post('/add', auth, function (req, res, next) {
    let date = req.body.date
    let description = req.body.description
    let img = req.body.img
    let lieu = req.body.lieu
    let idu = req.body.idu

    con.query('INSERT INTO `session` (`date`, `description`, `supprime`, `img`, `lieu`, `fk_utilisateur`) VALUES ("' + date + '", "' + description + '", 0, "' + img + '", "' + lieu + '", "' + idu + '")', function (err, result) {
        if (err) throw err;
        res.json("Session Ajouté")
    });
})
module.exports = router;