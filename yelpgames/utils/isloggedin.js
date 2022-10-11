// authoriziton // 

const  isloggedin =( req ,res, next) =>{
// if the user logged in //
//if yes ,continue //
if (req.isAuthenticated()){
 return next();
	
}else{// if no , redirect  to /login //

res.redirect("/login")

}};	



module.exports=isloggedin;
