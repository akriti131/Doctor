var express = require("express");
var router = express.Router({mergeParams:true});
var Doctor = require("../models/doctor");
var Comment = require("../models/comment");
var middleware  = require("../middleware");


//=====================================
//COMMENTS ROUTES
//=====================================

router.get("/new",middleware.isLoggedIn, function(req, res){
    Doctor.findById(req.params.id, function(err, doctor){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {doctor: doctor});
        }
    });
});

router.post("/",middleware.isLoggedIn, function(req, res){
    Doctor.findById(req.params.id, function(err, doctor){
        if(err){
            console.log(err);
            res.redirect("/doctors");
        }else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", "Something went wrong");
                    console.log(err);
                }else{
                    comment.author.id = req.user.id;
                    comment.author.username = req.user.username;
                    comment.save();
                    doctor.comments.push(comment);
                    doctor.save();
                    req.flash("success", "Successfully added comment");
                    res.redirect("/banquets/" + doctor.id );
                }
            });
        }
    });
});

router.get("/:comment_id/edit",middleware.checkCommentOwnership, function(req, res){
    Doctor.findById(req.params.id, function(err, foundDoctor){
        if(err || !foundDoctor){
            req.flash("error", "No doctor found");
            return res.redirect("back");
        }
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            }else{
                res.render("comments/edit", {banquet_id: req.params.id, comment : foundComment});
            }
        });
    });
});

router.put("/:comment_id",middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/doctors/" + req.params.id);
        }
    })
});

router.delete("/:comment_id",middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        }else{
            req.flash("success", "Comments deleted");
            res.redirect("/doctors/" + req.params.id);
        }
    });
});

module.exports = router;