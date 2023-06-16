require('dotenv').config()
const express = require('express');
const app = express()
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash')
const MongoStore = require('connect-mongo');
const passport = require('passport')


const PORT = process.env.PORT || 3000

// DATABASE CONNECTION

// const MONGO_URL = 'mongodb://localhost:27017/pizza'
mongoose.connect((process.env.MONGO_URL),{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const connection = mongoose.connection;
connection.once('open',()=>{
    console.log('Database connected..');
}).on('error',(err) => {
    console.log(err);
});


// Session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized:false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        collection: "sessions"
    }),
    cookie:{maxAge: 1000 * 60*60*24}
}))

app.use(flash())


// Passport config
const passportInit = require('./app/config/passport.js')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())


// Assets 
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
// global middleware

app.use((req,res,next)=>{
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})

// set template engine
app.use(expressLayout)
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')

require('./routes/web')(app);


app.listen(PORT,()=>{
    console.log(`Server Running ons nodemon:${PORT}`)
})