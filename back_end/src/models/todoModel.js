const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const todoSchema = new Schema(
  { 
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user_info'
    },
    text:String,
    isCompleted: {
      type :Boolean,
      default : false
    },
    isDeleted: {
      type :Boolean,
      default: false 
    }
  },
  { collection: 'userTodos' }
);
module.exports=mongoose.model('userTodos', todoSchema);
