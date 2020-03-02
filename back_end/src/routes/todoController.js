const uuidv1=require('uuid/v1');
const todoModel=require('../models/todoModel');
const userModel = require('../models/userModel');

const createTodo =  async (req,res) => {
  try{
    let body_data=req.body;
    const userInfo = await userModel.findOne(body_data);
    let response = {}
    if (userInfo === null) {
      const userData = await new userModel(body_data);
      await userData.save();
      response =[{text:"Eat Breakfast Daily",isCompleted : false, userId :userData._id },
      {text:"Need to wake up early tomorrow",isCompleted : false, userId :userData._id},
      {text:"Try something New",isCompleted :true, userId :userData._id}]
      for (let eachObj of response) {
        let eachtoDo = await new todoModel(eachObj);
        await eachtoDo.save();
      }   
    } else {
      const id = userInfo._id;
      response = await todoModel.find({userId:id});
    }
    res.json({data:response});
  }catch(err){
    throw err;
  }
};

const updateTodoList = async (req, res) => {
  try{
    let body_data=req.body;
    const updatedData = await todoModel.updateOne({_id: body_data._id},body_data);
    res.json({id:body_data._id,updated:true});
  } catch(err){
    throw err;
  }
};

const deleteTodoList = async (req, res) => {
  try{
    const deletedData = await todoModel.deleteOne({ _id: req.body.id });
    res.json({id:req.body.id,deleted:true});
  }catch(err){
    throw err;
  }
};

const insertTodoList =  async (req,res) => {
  try {
    const body_data=req.body;
    const insertedData = await todoModel.insertMany(body_data);
    res.json({id:insertedData._id,inserted:true});
  } catch(err) {
    throw err;
  }
}


module.exports= { createTodo, updateTodoList, deleteTodoList, insertTodoList};
