var Banquet = require("../models/doctor");
var Comment = require("../models/comment");
var Manufacturer = require("../models/manufacturer");

var middlewareObj = {};

middlewareObj.checkDoctorOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Banquet.findById(req.params.id, function(err, foundDoctor){
            if(err || !foundDoctor){
                req.flash("error", "Doctor not found");
                res.redirect("back");
            }else{
                if(foundDoctor.author.id.equals(req.user.id)){
                    next();
                }else{
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
                
            }
        });
    }else{
        req.flash("error", "You need to be logged in to do that!!");
        res.redirect("back");
    }
}

middlewareObj.checkManufacturerOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Manufacturer.findById(req.params.id, function(err, foundManufacturer){
            if(err || !foundManufacturer){
                req.flash("error", "Manufacturer not found");
                res.redirect("back");
            }else{
                if(foundManufacturer.author.id.equals(req.user.id)){
                    next();
                }else{
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
                
            }
        });
    }else{
        req.flash("error", "You need to be logged in to do that!!");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err || !foundComment){
                req.flash("error","Comment not found");
                res.redirect("back");
            }else{
                if(foundComment.author.id.equals(req.user.id)){
                    next();
                }else{
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
                
            }
        });
    }else{
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that!!");
    res.redirect("/login");
}

middlewareObj.isLoggedIns = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that!!");
    res.redirect("/login1");
}

module.exports = middlewareObj;