const express=require('express');
const todoController=require('./todoController');

const router = express.Router();

router.post('/userLogin', todoController.createTodo);

router.put('/updateTodoList', todoController.updateTodoList);

router.delete('/deleteTodoList', todoController.deleteTodoList);

router.post('/insertTodoList', todoController.insertTodoList);


module.exports = router;
