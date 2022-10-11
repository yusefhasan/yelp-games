const express= require("express");
const router=express.Router();
const User = require ("../models/user.js");
const passport= require("passport")



//signup new //

router.get("/signup" , (req,res)=>{
res.render("signup")

})

router.post("/signup" ,async (req,res)=>{
	
	try{

		const newUser= await User.register(new User({

         username: req.body.username,
		 email:req.body.email,
	

}),req.body.password
);
console.log(newUser);
		
passport.authenticate('local')(req, res ,()=>{
res.redirect('/games');

})		
		
}catch(err){
console.log(err)
res.send(err)	

}});


// log in show from //

router.get("/login" ,	(req,res)=>{

res.render("login");

});




// log in //

router.post("/login" ,
			passport.authenticate('local',{

successRedirect:"/games",
failureRedirect:"/login"	

}))
;

// log out // 

router.get("/logout", (req, res) => {
  req.logout(req.user, err => {
    if(err) return next(err);
    res.redirect("/games");
  });
});


module.exports=router;
