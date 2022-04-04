const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require("path");

router.use(bodyParser.urlencoded({extended:true}))

const storage = multer.diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
        cb(null, file.filename + '-' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage
});
router.post('/uploadMultiFile',upload.array('myFile',5),
    (req,res,next)=>{
        const files = req.files;
        if(!files){
            const error = new Error('Please choose files');
            error.status = 400;
        return next(error);
      }
      else if(files !== []) {
          res.send(files)
      }
    })

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(__dirname + '/index.html');
  res.render('index', { title: 'Express' });
});

module.exports = router;
