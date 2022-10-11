const gamedb= require("../models/games.js");



 const checkgamesowner= async(req,res,next)=>{if (req.isAuthenticated()){//check if the user is logged in //
 const Games= await gamedb.findById(req.params.id).exec()
if(Games.owner.id.equals(req.user._id)){// if they own the games if they not redirect to show page //
next();
}else{//if not log in redire//	
res.redirect("back");//go back apage
}}
else{
res.redirect("/login")// if not login

}

}   
module.exports=checkgamesowner;
