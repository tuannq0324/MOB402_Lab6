const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require("path");
const e = require("express");

router.use(bodyParser.urlencoded({extended:true}))

const storage = multer.diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
        cb(null, file.filename + '-' + Date.now() + path.extname(file.originalname));
    },
});

function checkFileType(file,cb){
    const fileType =/jpeg|jpg/;
    const extname = fileType.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileType.test(file.mimetype);

    if (mimetype && extname){
        return cb(null,true)
    }
    else {
        cb("Err : jpg only!");
    }
}

const upload = multer({
    storage: storage,
    limits : {fileSize : 2000000},
    fileFilter : function (req, file, cb){
        checkFileType(file,cb);
    }
}).array('myFile',5);

router.post('/uploadMultiFile',
    (req,res,next)=>{

        const files = req.files;
        upload(req,res,(err)=>{
            if(err) {
                res.render('index', {mes: err, title: 'Express' });
            }
            else {
                res.render('index', {mes: 'Succes', title: 'Express' });
                res.send(files);
            }
        })

    })

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {mes:'', title: 'Express' });
});

module.exports = router;
