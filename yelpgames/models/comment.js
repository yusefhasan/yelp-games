const mongoose = require("mongoose");

const commentshcema = new  mongoose.Schema({
     user:{
	 id:{
     type:mongoose.Schema.Types.ObjectId,
	 ref:"user"} ,
	 username:String},
	
	 text:String,
	 Gamesid:{
     type: mongoose.Schema.Types.ObjectId,
	 ref:"games" 
}
});


const comments= mongoose.model("comments", commentshcema);

module.exports=comments;
