const express = require('express');
const user = express.Router();

// so we want to set predefined username and password
const username = "aswin";
const password = "aswin@123";

user.get('/',(req,res)=>{
    if(req.session.user){
        res.render('home');
    }else{
        if(req.session.passwordWrong){
            res.render('login',{msg:"Invalid credentials"});
            req.session.passwordWrong = false;
        }else{
            //sendiing response when get request
            // res.send("HEllo world");
            res.render('login');
        }
    }
})

user.post('/verify',(req,res)=>{
    console.log(res.body);
    
    if(req.body.username == username && req.body.password == password){
        req.session.user = req.body.username;
        res.redirect('home');
    }else{
        req.session.passwordWrong = true;
        res.redirect('/');
    }
    // res.send("login successfully")
});

user.get("/home",(req,res)=>{
    if(req.session.user){
        req.session.passwordWrong = false;
        res.render('home');
    }else{
        if(req.session.passwordWrong){
            res.render('login',{msg:"Invalid credentials"});
        }else{
            res.render('login');
        }
    }
})

// router for logout
user.get('/logout',(req,res)=>{
    req.session.destroy();   
    res.render("login",{msg:"logout successfully"});
})


module.exports = user;
