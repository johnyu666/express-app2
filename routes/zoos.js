const fs=require('fs')
const express=require('express')
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var router=express.Router();

router.get('/',function (req,res) {
    res.send("all zoos")
})
router.post('/upload',upload.single('avatar'),function (req,res) {

   let file= req.file
    fs.copyFile("../"+file.path,
        __dirname+"/public/images/"+file.originalname,
        function(err){
        if(!err) res.send("success")
        else res.send(err)
    })


})
module.exports=router