var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");


// Index Campgrounds route
router.get("/",function(req, res){
   //Get all campgrounds from DB
   Campground.find({},function(err, allcampgrounds){
       if(err){
           console.log(err);
       }else{
           res.render("campgrounds/index",{campgrounds:allcampgrounds});
       }
   });
    // res.render("campgrounds",{campgrounds:campgrounds});
});

router.post("/", middleware.isLoggedIn,function(req, res){
        var name = req.body.name;
        var image = req.body.image;
        var desc = req.body.description;
        var author = {
            id: req.user._id,
            username: req.user.username
        } 
        var newCampground = {name: name, image: image, description: desc, author: author};
        
        //Create a new campground and save to DB
        Campground.create(newCampground,function(err, newlyCreated){
            if(err){
                console.log(err);
            }else{
                    //redirect to campground page
                    res.redirect("/campgrounds");        
            }
        });
        
});

router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

//SHOW  - shows more info about one campground
router.get("/:id",function(req, res){
        //find the Campground with provided ID
        Campground.findById(req.params.id).populate("comments").exec ( function(err, foundCampground){
           if(err){
               console.log(err);
           }else{
                console.log(foundCampground);
                //render show template with that campground
                res.render("campgrounds/show",{campground: foundCampground});        
           }
        });
        /*req.params.id*/
        
            
});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership,function(req, res){
        Campground.findById(req.params.id, function(foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

//UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
   //find and update the correct background
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
           res.redirect("/campgrounds");
       }else{
           res.redirect("/campgrounds/" + req.params.id);
       }
   });
   //redirect somewhere (show page)
});


//Destroy Campground Route
router.delete("/:id", middleware.checkCampgroundOwnership,function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/campgrounds");
       } else{
           res.redirect("/campgrounds");
       }
    });
});

module.exports = router;