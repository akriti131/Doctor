var express = require("express");
var router = express.Router();
var Manufacturer = require("../models/manufacturer");
var middleware  = require("../middleware");

router.get("/",middleware.isLoggedIns, function(req, res){
    Manufacturer.find({}, function(err,allManufacturer){
        if(err){
            console.log(err);
        }else{
            res.render("manufacturer/index", {manufacturers: allManufacturer, currentUser: req.user});
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
    var newManufacturer = {name:name,price:price, image:image, description: desc, author: author};
    
    //Create a new campground and save on DB
    Manufacturer.create(newManufacturer, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            //redirect back to campground page
            res.redirect("/manufacturer");
        }
    })
});

router.get("/new",middleware.isLoggedIns, function(req, res){
    res.render("manufacturer/new");
});

router.get("/:id", function(req, res){
    Manufacturer.findById(req.params.id).populate("comments").exec(function(err, foundManufacturer){
        if(err || !foundManufacturer){
            res.flash("error","Manufacturer not found");
            res.redirect("back");
        }else{
            res.render("manufacturer/show", {manufacturer: foundManufacturer});
        }
    });
});

router.get("/:id/edit",middleware.checkManufacturerOwnership, function(req, res){
    Manufacturer.findById(req.params.id, function(err, foundManufacturer){
            res.render("manufacturer/edit", {manufacturer: foundManufacturer});
        }); 
});

router.put("/:id",middleware.checkManufacturerOwnership, function(req, res){
    Manufacturer.findByIdAndUpdate(req.params.id, req.body.manufacturer, function(err, updatedManufacturer){
        if(err){
            res.redirect("/manufacturer");
        }else{
            res.redirect("/manufacturer/" + req.params.id);
        }
    });
});

router.delete("/:id",middleware.checkManufacturerOwnership, function(req, res){
    Manufacturer.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/manufacturer");
        }else{
            res.redirect("/manufacturer");
        }
    })
});

module.exports = router;
