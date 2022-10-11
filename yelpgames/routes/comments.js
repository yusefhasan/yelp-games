const express= require("express");
const router=express.Router({mergeParams :true}); // to read the id from hidden input//
const comments= require("../models/comment.js")
const gamedb= require("../models/games.js")
const isloggedin =require("../utils/isloggedin");
const checkcommentowner=require("../utils/checkcommentowner")



//create comment in db add in //

router.post("/",isloggedin,async(req,res)=>{
	
try{
const Comments= await comments.create({
user:{
    id :req.user._id,
	username:req.user.username
},
text:req.body.text,
Gamesid:req.body.gamesid

});
	 res.redirect(`/games/${req.body.gamesid}`)	
 console.log(Comments);

}catch(err){
console.log(err);
res.send("u have an error ..../post/ comment ")	
}

})

router.get("/new", isloggedin,(req,res)=>{
res.render("comment-new",{gamesid:req.params.id})


})

// edit comment route // 

router.get( "/:CommentsId/Edit" ,checkcommentowner, async(req,res)=>{

try{
const Games= await  gamedb.findById(req.params.id).exec()
const Comments= await comments.findById(req.params.CommentsId).exec()
console.log("Games:" , Games)
console.log("Comments:" , Comments)

	
res.render("Comments-edit.ejs" ,{Games,Comments} );
	
	
	
}catch(err){
console.log(err);
res.send("u have an error .... broke edit rour for comments ")	
}

})

//UPDATE ROUTE //
router.put("/:CommentsId" ,checkcommentowner, async(req,res)=>{

	try{

  const comment = await comments.findByIdAndUpdate(req.params.CommentsId,{text:req.body.text},{new :true})
  res.redirect(`/games/${req.params.id}`)

}catch(err){
console.log(err);
res.send("u have an error .... broke with put route  ")	
}

})
router.delete("/:CommentsId", checkcommentowner,async(req,res)=>{
	try{
   
  await comments.findByIdAndRemove(req.params.CommentsId)
.exec()
res.redirect(`/games/${req.params.id}`)
}catch(err){
console.log(err);
res.send("u have an error .... broke with delete route  ")	
}
})














module.exports=router;

