require("dotenv").config();
const express = require('express');
const mongoose= require('mongoose');
const session =require('express-session');
const passport = require('passport');
const cors= require('cors');
const cookieParser=require('cookie-parser');
const bodyParser = require("body-parser");
const passportLocalMongoose = require('passport-local-mongoose');
const bcrypt = require('bcryptjs');
const cookieSession= require("cookie-session");
const findOrCreate = require('mongoose-findorcreate');
var GoogleStrategy = require('passport-google-oauth20').Strategy;


const app=express();

app.use(
    cookieSession({
        maxAge: 30 *24 *60*60*1000,
        keys: ['fkfjeoinoeasdfanieojh']
    })
)

app.use(
    cors({
      origin: "http://localhost:3000", // <-- location of the react app 
      credentials: true,
    })
  );
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(session({
    secret: 'placeholderSecret',
    resave: false,
    saveUninitialized: true
}));
//middle ware required to initialize passport
app.use(passport.initialize());
//session is required to have a persisent login sesion
app.use(passport.session());


//connect to mongoose database
mongoose.connect("mongodb://localhost:27017/jobsDB", {useNewUrlParser: true, useUnifiedTopology: true});

//DB schema. User pass and stock list
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    googleId: String
})

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);


const jobSchema= new mongoose.Schema({
    company: String,
    jobTitle: String,
    date: Date,
    notes: String,
    offer: Boolean,
    reject: Boolean,
    interview: Boolean,
    phoneScreen: Boolean,
    open: Boolean,
    user:[
        {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
      ]

})

//bc of deprecation warning on findOneAndUpdate() function

const User = new mongoose.model("User", userSchema);
const Jobs = new mongoose.model("Jobs", jobSchema);

// //bc of deprecation warning on findOneAndUpdate() function
// mongoose.set('useFindAndModify', false);


app.use(cookieParser('placeholderSecret'));
//Simplified passport/ passport-local configuration. copied from passport-local-mongoose documentation @ npmjs.com 
passport.use(User.createStrategy());

//copied from  passportJS docs. This will work with every strategy for serializing/ deserializing users
passport.serializeUser(function(user, done){
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

//googleOauth
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/google/jobs",
    userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
  },
  //accessToken is what lets me get data of user from google. profile contains the info. 
  function(accessToken, refreshToken, profile, cb) {
    console.log("HERE!!!: " + profile.id);
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
//Routes
app.post("/register", (req,res)=>{
    User.register({username: req.body.username}, req.body.password, function(err, user){
        if(!err){
            passport.authenticate("local")(req, res, function(){
                res.send("new user added");                    
            })
        }else{
            console.log(err);
            res.redirect("/login");
        }
    })
    
});
//use passport to authenticate  with google strategy. scope is what we are getting from google. THe user profile
app.get("/auth/google/",
    passport.authenticate('google', { scope: ["profile"] })
);
//callbackURL from line 47. where google sends user after authentication
//app.get('path', middleware, function(req, res))
app.get("/auth/google/jobs", 
passport.authenticate('google', {failureRedirect: 'http://localhost:3000/login'}), function(req, res){
    res.redirect("http://localhost:3000/dashboard");
})
//login with passport local strategy    
app.route("/login")
    .post((req, res)=>{
        console.log("request recieved");
        const user = new User({
            username: req.body.username,
            password: req.body.password
        })
    
        req.login(user, function(err){
            console.log("AT the login");
            if (err) console.log(err);
            if(!err){

                passport.authenticate("local")(req,res, ()=>{
                        res.send('success');
                    })
                }
            })
    });

app.post("/job-app", (req, res)=>{
        
        console.log('here recieved')
        if(req.isAuthenticated()){
            const job= {
                company: req.body.company,
                jobTitle: req.body.jobTitle,
                date: req.body.date,
                notes: req.body.notes,
                offer: req.body.offer,
                interview: req.body.interview,
                phoneScreen: req.body.phoneScreen,
                user: req.user._id,
                reject: req.body.reject,
                open: req.body.open
            }
            console.log("authed");
            const saveJob = new Jobs(job);
            saveJob.save();
            console.log("successfully added job");
        }else{
            console.log('not authed')

        }
    })
app.get("/user-jobs", async (req, res)=>{
    if(req.isAuthenticated()){
        let userJobs = await Jobs.find({"user": req.user._id});
        res.send(userJobs);
    }else{
        console.log('notSigned in');
        res.send("sign in bitch");
    }
})
app.post("/onejob", async (req, res)=>{
    console.log("recieved");
    console.log(req.body);
    let specificJob = await Jobs.findOne({"_id": req.body.jobId});
    console.log(specificJob);
    res.send(specificJob);
});
app.post("/update-job", (req, res)=>{
    console.log(req.body)
    Jobs.findOneAndUpdate({_id: req.body.id}, {
        company: req.body.company,
        jobTitle: req.body.jobTitle,
        notes: req.body.notes,
        offer: req.body.offer,
        phoneScreen: req.body.phone,
        reject: req.body.reject,
        interview: req.body.interview,
        open: req.body.open

    }).then(()=>{
        console.log("updated record");
    })
})
app.post("/delete-job", (req, res)=>{
    console.log(req.body)
    Jobs.deleteOne({_id: req.body.id}).then(()=>{
        console.log("deleted");
        res.send("deleted");
    }).catch((err)=>{
        console.log(err);
    })
})
//checks if user signed in . 
//Returns false or user data
app.get("/signedin", function(req, res){
    //req.isauthenticated works because client axios sends withCrenentials
    //passport method checks if user is signed in 
    if(req.isAuthenticated()){
        console.log(req.user);
        console.log(typeof(req.user._id));
        res.send(req.user);
    }else{
        console.log("not Signed")
        res.send(false);
    }
})
app.get("/logout", function(req, res){
    //all thats needed to logout is .logout method from passport
    req.logout();
    res.send("signed out");
})


app.listen(3001, ()=>{
    console.log("Server started on port 3001");
})

