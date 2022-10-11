const gamedb= require("../models/games.js");
const comments= require("../models/comment.js")



 const checkcommentowner= async(req,res,next)=>{if (req.isAuthenticated()){//check if the user is logged in //
 const Comments= await comments.findById(req.params.CommentsId).exec()
if(Comments.user.id.equals(req.user._id)){// if they own the games if they not redirect to show page //
next();
}else{//if not log in redire//	
res.redirect("back");//go back apage
}}
else{
res.redirect("/login");// if not login

}

}   
module.exports=checkcommentowner;