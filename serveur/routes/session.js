const express = require('express')
const sql = require('mysql')
const router = express.Router()

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

let getAllSession = function () {
    return "SELECT * from session order by date"
}

// session/
router.get('/', auth, function (req, res, next) {
    con.query(getAllSession(), function (err, result) {
        if (err) throw err;
        res.json(result)
    });
})
router.post('/remove', auth, function (req, res, next) {
    let id = req.body.id
    con.query('UPDATE `session` SET `supprime`= 1 WHERE session.idsession = ' + id, function (err, result) {
        if (err) throw err;
        res.json("ok")
    });
})
router.post('/update', auth, function (req, res, next) {
    let id = req.body.id
    let description = req.body.description
    let meteo = req.body.meteo
    let img = req.body.img
    let lieu = req.body.lieu

    con.query('UPDATE session SET description="' + description + '",meteo="' + meteo + '",img="' + img + '",lieu="' + lieu + '" WHERE idsession=' + id, function (err, result) {
        if (err) throw err;
        res.json("Session Modifié")
    });
});
router.post('/add', auth, function (req, res, next) {
    let date = req.body.date
    let description = req.body.description
    let meteo = req.body.meteo
    let img = req.body.img
    let lieu = req.body.lieu

    con.query('INSERT INTO `session` (`date`, `description`, `supprime`, `meteo`, `img`, `lieu`) VALUES ("' + date + '", "' + description + '", 0,"' + meteo + '", "' + img + '", "' + lieu + '")', function (err, result) {
        if (err) throw err;
        res.json("ok")
    });
})
module.exports = router;