var mongoose = require("mongoose");
var Doctor = require("./models/doctor");
var Comment   = require("./models/comment");

var data = [
    {
        name: "Akash Singh", 
        image: "https://farm4.staticflickr.com/https://i.guim.co.uk/img/media/ce9c149506881191caa4b1f838575d0dbb07e520/734_381_6827_4098/master/6827.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=c38e5e77b9f3882e14b633932e18cea5/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Aviral", 
        image: "https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/317/317994/female-doctor-surrounded-by-men.jpg?w=1155&h=1541",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Ayush", 
        image: "https://s3-eu-west-1.amazonaws.com/intercare-web-public/wysiwyg-uploads%2F1569586526901-doctor.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]

function seedDB(){
   //Remove all banquets
   Doctor.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed doctors!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
           data.forEach(function(seed){
                Doctor.create(seed, function(err, doctor){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a doctor");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    Doctor.comments.push(comment);
                                    Doctor.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
           });
        });
     }); 
    //add a few comments
}

module.exports = seedDB;