const express = require("express");
const app = express();

const hbs = require("hbs");

// for nocache
const nocache = require("nocache");
app.use(nocache());//calilng nocache


// setting the view engine
app.use(express.static('public'));
app.set('view engine','hbs')


// session setting as middleware
const session = require("express-session");
app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized:true,
}))
// data sharing as string
app.use(express.urlencoded({extended:true}));
app.use(express.json());



// userRouter requiring
const userRoute = require('./routes/user');

// app.get("/user/:id",(req,res)=>{
//     res.send(`Welcome ${req.params.id}`);
//     // res.send("welcome aswin");
// });

// routing
app.use("/",userRoute);

// server creating..
app.listen(3001,()=> console.log("server is running on port 3001"));
