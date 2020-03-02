const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const userSchema = new Schema(
  {
    email:String,
    password:String
  },
  { collection: 'user_info' }
);
module.exports=mongoose.model('user_info', userSchema);
