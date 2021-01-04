var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/", function(req, res){
    res.render("landing");
});
//Auth Routes
router.get("/register", function(req, res){
    res.render("register");
});

router.post("/register", function(req,res){
    var newUser =  new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            return res.render("register", {"error": err.message});
        }else{
            passport.authenticate("local")(req, res, function(){
                req.flash("success", "Welcome to YelpCamp " + user.username);
                res.redirect("/banquets");
            });
        }
    });
});

router.get("/register1", function(req, res){
    res.render("register1");
});

router.post("/register1", function(req,res){
    var newUser =  new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            return res.render("register1", {"error": err.message});
        }else{
            passport.authenticate("local")(req, res, function(){
                req.flash("success", "Welcome to Manufacturer " + user.username);
                res.redirect("/manufacturer");
            });
        }
    });
});

router.get("/login1", function(req, res){
    res.render("login1");
});

router.post("/login1",passport.authenticate("local", 
    {
        successRedirect: "/manufacturer",
        failureRedirect: "/login1"
    }), function(req, res){   
});

router.get("/login", function(req, res){
    res.render("login");
});

router.post("/login",passport.authenticate("local", 
    {
        successRedirect: "/doctors",
        failureRedirect: "/login"
    }), function(req, res){   
});

router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out");
    res.redirect("/");
});


module.exports = router;