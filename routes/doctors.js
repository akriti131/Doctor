var express = require("express");
var router = express.Router();
var Doctor = require("../models/doctor");
var middleware  = require("../middleware");

//INDEX - show all campgrounds
router.get("/", function(req, res){
    Doctor.find({}, function(err,allDoctor){
        if(err){
            console.log(err);
        }else{
            res.render("doctors/index", {doctors: allDoctor, currentUser: req.user});
        }
    });
});

//CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req ,res){
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author ={
        id: req.user.id,
        username: req.user.username
    }
    var newDoctor = {name:name,price:price, image:image, description: desc, author: author};
    
    //Create a new campground and save on DB
    Doctor.create(newDoctor, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            //redirect back to campground page
            res.redirect("/doctors");
        }
    })
});

//NEW - show form to create new campground
router.get("/new",middleware.isLoggedIn, function(req, res){
    res.render("doctors/new");
});

//SHOW - shows more info about campgrounds
router.get("/:id", function(req, res){
    Doctor.findById(req.params.id).populate("comments").exec(function(err, foundDoctor){
        if(err || !foundDoctor){
            res.flash("error","Doctor not found");
            res.redirect("back");
        }else{
            res.render("doctors/show", {doctor: foundDoctor});
        }
    });
});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit",middleware.checkDoctorOwnership, function(req, res){
    Doctor.findById(req.params.id, function(err, foundDoctor){
            res.render("doctors/edit", {doctor: foundDoctor});
        }); 
});

router.put("/:id",middleware.checkDoctorOwnership, function(req, res){
    Doctor.findByIdAndUpdate(req.params.id, req.body.doctor, function(err, updatedDoctor){
        if(err){
            res.redirect("/doctors");
        }else{
            res.redirect("/doctors/" + req.params.id);
        }
    });
});

// DESTROY CAMPFROUNDS ROUTE
router.delete("/:id",middleware.checkDoctorOwnership, function(req, res){
    Doctor.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/doctors");
        }else{
            res.redirect("/doctors");
        }
    })
});

module.exports = router;

