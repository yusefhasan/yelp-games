const express= require("express");
const router=express.Router();



router.get( "", (req,res)=>{

res.render("landing");
})



router.get("/account" ,isloggedin, (req,res)=>{// here we add the // authoriziton  below// 


res.render("account")

});
// authoriziton // 

function isloggedin( req ,res, next) {
// if the user logged in //
//if yes ,continue //
if (req.isAuthenticated()){
 return next();
	
}else{// if no , redirect  to /login //

res.redirect("/login")

}};	



module.exports=router;
