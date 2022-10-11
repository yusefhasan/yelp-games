const express= require("express");
const router=express.Router({mergeParams :true}); // to read the id from hidden input//
const gamedb= require("../models/games.js")
const comments= require("../models/comment.js")
const isloggedin =require("../utils/isloggedin");
const checkgameowner=require("../utils/checkgameowner")

router.get( "/new",	isloggedin,	(req,res)=>{

res.render("games_new");
})
//search route//
router.get("/search" , async(req,res)=>{
try{
const games= await gamedb.find({
$text:{
$search:req.query.term
}
})
res.render("games" ,{games})

}catch(err){
console.log(err);
res.send("u have an error ..../fail to do post route")	
}})










//show//
router.get("/:id", async (req,res)=>{
	try{
	 const games= await gamedb.findById(req.params.id)
     const Comments= await comments.find({Gamesid:req.params.id})
      res.render("show",{games,Comments})

		  } catch(err){
console.log(err);
res.send("u have an error ..../fail to do get  route")	
}

	


 }) ;
// create route //
router.post( "/",isloggedin ,async(req,res)=>{
	console.log(req.body)
	const newgames={
    title:req.body.title,
	description:req.body.description,
	image:req.body.image,
	creater:req.body.creater,
	puplisher:req.body.puplisher,	
	date:req.body.date,	
	price:!!req.body.price,	
	rating:req.body.rating,
	type:req.body.type,
	owner:	{
    id :req.user._id,
	username:req.user.username
}
  }; try {
	const Gamedb= await gamedb.create(newgames)
     console.log(gamedb)
	res.redirect("/games/"	+Gamedb._id)

	}catch(err){
console.log(err);
res.send("u have an error ..../fail to do post route")	
}})







//index//
router.get( "/", async (req,res)=>{
	console.log(req.user);

try{
const games=await gamedb.find().exec();
res.render("games", {games}); // passing user to the route ///



}catch(err){
console.log(err);
res.send("u have an error ..../index")	
}
})
	


router.get("/:id/edit" ,checkgameowner,	async(req,res)=>{
	 const Games= await gamedb.findById(req.params.id).exec()
       res.render("games-edit",{Games});
})



router.put	("/:id",checkgameowner,	async (req,res)=>{
	console.log(req.body)
	const games={
    title:req.body.title,
	description:req.body.description,
	image:req.body.image,
	creater:req.body.creater,
	puplisher:req.body.puplisher,	
	date:req.body.date,	
	price:!!req.body.price,	
	rating:req.body.rating,
	type:req.body.type
}    
try{
  const updatedgames = await gamedb.findByIdAndUpdate(req.params.id,games,{new :true})
.exec()
	console.log(updatedgames)
res.redirect(`/games/${req.params.id}`)
	
	

}catch(err){
console.log(err);
res.send("u have an error ..../index")}	


})  
	 
router.delete("/:id",checkgameowner, async(req,res)=>{
	try{
   
 await gamedb.findByIdAndRemove(req.params.id)
.exec()
res.redirect("/games/")


	
	
}catch(err){
console.log(err);
res.send("u have an error ..../index")}	})
	

module.exports=router;
