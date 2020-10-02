var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment    = require("./models/comment");

var data    =    [
    {
        name: "Clouds Rest",
        image: "https://farm8.staticflickr.com/7338/9627572189_12dbd88ebe.jpg",
        description: "A nice place for camping but even better with your friends."
        
    },
    {
        name: "Dessert Desk",
        image: "https://farm8.staticflickr.com/7148/6622139405_9753433ff9.jpg",
        description: "Play with sand like a pro show your skills."
        
    },
    {
        name: "Shimla Camp",
        image: "https://farm6.staticflickr.com/5596/14960325051_794df65c1d.jpg",
        description: "A beautiful place for fun loving lads."
        
    }
]


function seedDB(){
    
    //REMOVE ALL CAMPGROUNDS 
            Campground.remove({},function(err){
                if(err){
                    console.log(err);
                }    
                console.log("removed campgrounds");
           
                //ADD A NEW CAMPGROUNDS
                data.forEach(function(seed){
                    Campground.create(seed,function(err, campground){
                      if(err){
                          console.log(err);
                      } else{  
                          console.log("added a campground");
                          //create a comment
                          Comment.create({text: "this place is great but, wish i had internet here!",
                                          author: "homer"
                          }, function(err, comment){
                                if(err){
                                    console.log(err);
                                }else{
                                        campground.comments.push(comment);
                                        campground.save();
                                        console.log("created new comment")
                                }
     
                          });
                      }
                    });  
                });
            });
}

module.exports = seedDB;