var fs=require('fs')
var express = require('express');
var path = require('path');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var zoosRouter=require('./routes/zoos')
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/zoos',zoosRouter)

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});


app.get('/books',function (req,res) {
    res.json({id:1,name:"john"})
})

app.post('/upload',upload.single('avatar'),function (req,res) {
    let file= req.file
    fs.copyFile(__dirname+"/"+file.path,
        __dirname+"/public/images/"+file.originalname,
        function(err){
            if(!err) res.send("success")
            else res.send(err)
        })
})

module.exports = app;
