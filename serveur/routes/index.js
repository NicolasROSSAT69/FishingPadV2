var express = require('express');
var router = express.Router();
const fileUpload = require('express-fileupload');
const cors = require('cors')

router.use(express.static('public')); //to access the files in public folder
router.use(cors()); // it enables all cors requests
router.use(fileUpload());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('hello')
});

router.post('/uploadFile', (req, res) => {
  if (!req.files) {
    return res.status(500).send({ msg: "file is not found" })
  }
    // accessing the file
  const myFile = req.files.file;
  console.log(`${__dirname}/public/${myFile.name}`);
   //mv() method places the file inside public directory
  myFile.mv(`${__dirname}/public/${myFile.name}`, function (err) {
      if (err) {
        console.log(err)
        return res.status(500).send({ msg: "Error occured" });
      }
      // returing the response with file path and name
      return res.send({name: myFile.name, path: `/${myFile.name}`});
  });
});

router.get('/getFile/:filename', (req, res) => {
  const { filename } = req.params;
  res.sendFile(__dirname + /public/ + filename); 
});

module.exports = router;