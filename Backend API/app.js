const express = require('express')
var bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3001
const publicRouter = require('./Router/public')
const mongoose = require('mongoose');
const mongoURI = 'mongodb://127.0.0.1:27017/movieplus'

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// using routes that are available to everyone
app.use('/files', express.static('uploads'))
app.use('/', publicRouter)

//? is it correct
app.use((req,res,next)=>{
    return res.status(404).json({
        message:"Couldn't find what you were looking for",
        
    })
})

//run server, connect to database and log

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
    mongoose.connect(mongoURI).then(()=>{
        console.log('Database Connected');
    }).catch((err)=>{
        console.log(err);
    })
})
