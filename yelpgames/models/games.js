const mongoose = require("mongoose");

const gameshcema = new  mongoose.Schema({
     title:String,
     description:String,
     creater:String,
	 puplisher:String,
	 date:Date,
	 price:Boolean,
	 rating:Number,
	 type:String,
     image:String,
	 owner:{ id:{
     type:mongoose.Schema.Types.ObjectId,
	 ref:"user"} ,
	 username:String}

});
gameshcema.index({
'$**':'text'
})
const games=  mongoose.model('games', gameshcema);
module.exports=games;
