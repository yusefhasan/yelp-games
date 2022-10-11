
//npm install//
const express= require("express");
const app=express();
const mongoose = require('mongoose');
const localstrategy= require("passport-local").Strategy;
const passport= require("passport")
const expressSession = require('express-session')

//development//

const morgan = require('morgan')


const bodyParser = require('body-parser') // req.body //
// data base config
const config= require("./config")
// models 
const gamedb= require("./models/games.js")
const comments= require("./models/comment.js")
const User = require ("./models/user.js");

//routes//
const gamesroutes=require("./routes/games.js")
const commentsroutes=require("./routes/comments.js")
const mainroutes= require("./routes/main.js")
const authrouters= require("./routes/auth.js")

const	methodOverride = require('method-override')





mongoose.connect(config.db.connection  );

app.set("view engine", "ejs" )
app.use(express.static("puplic"))
app.use(morgan('tiny'))

app.use(bodyParser.urlencoded({ extended: true}));
app.use(methodOverride('_method'))




// express session config// 

app.use(expressSession({
secret:"asdqwdqwdlqhwdlqklvefuliwygefoqwgdiougq;ohq;wdhdfsdfsdfwerwrwqowdh",
 resave: false,
  saveUninitialized: false,

}));

// passport config//
app.use(passport.initialize());
app.use(passport.session());// alow presistent session//
passport.serializeUser(User.serializeUser());
// encode data from the session  (from passport-local-mongoose )//
passport.deserializeUser(User.deserializeUser());
// decone data from the session (from passport-local-mongoose )//
const LocalStrategy= localstrategy.Strategy;
passport.use(new LocalStrategy(User.authenticate()));

// current user middleware passing all the route //

  app.use((req,res,next)=>{
  res.locals.user = req.user || null;
  next();	
})

//use routes//
app.use("/",mainroutes);
app.use("/",authrouters);

app.use("/games",gamesroutes);
app.use("/games/:id/comments",commentsroutes);


app.listen(3000,()=>{
console.log("yelpgames")

});

  