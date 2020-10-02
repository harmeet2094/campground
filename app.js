var express      = require("express"),
    app          = express(),
    bodyParser   = require("body-parser"),
    mongoose     = require("mongoose"),
    Campground   = require("./models/campground"),
    flash        = require("connect-flash"),
    passport     = require("passport"),
    LocalStrategy  = require("passport-local"),
    methodOverride =  require("method-override"),
    Comment      = require("./models/comment"),
    User         = require("./models/user"),
    seedDB       = require("./seeds")
    
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index")
    

// mongoose.connect("mongodb://localhost/yelp_camp_v6",{useMongoClient : true });
mongoose.connect("mongodb://harmeet2094:harmeet@ds159776.mlab.com:59776/yelpcamp2094",{useMongoClient : true });
//mongodb://harmeet2094:harmeet@ds159776.mlab.com:59776/yelpcamp2094
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); //seed the database

//Passport Configuration

app.use(require("express-session")({
    secret: "my name is harmeet singh",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/",indexRoutes);

app.listen(process.env.PORT, process.env.IP,function(){
   console.log("YelpCamp has started"); 
});

