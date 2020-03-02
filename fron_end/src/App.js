// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './App.css';

function TodoForm({addTodo}){
  const [value,setValue] = useState("")
  const handleSubmit = e => {
    e.preventDefault();
    if(!value) return ;
    addTodo(value);
    setValue("");
  }
  return (
  <form onSubmit = {handleSubmit}>
    <input
    type = "text"
    className = "todoinputclass"
    value = {value}
    placeholder = 'Add your task press enter'
    onChange = {e => setValue(e.target.value)} /> </form>   
  )
}
function loginUser(email,password) {
  const useremail = document.getElementById('email').value;
  const userpass = document.getElementById('password').value;
  if(useremail === '' || userpass === '')
  return alert('Login with email and password If you are not registerd it will register and login for you');
  axios({
    method: 'post',
    url:'http://localhost:5001/todo/userLogin',
    data: {email:useremail,password:userpass},
    headers: { 
      contentType : 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  }).then(response => {
    // const sample_data = [{text:"Sudarshan",isCompleted : false},
    // {text:"Need to wake up early",isCompleted : false},
    // {text:"Try something New",isCompleted :false}];
    appendApplicaion(response.data.data)
  }).catch(err =>{
      console.log(err)
  })
}
function appendApplicaion(data) {
  ReactDOM.render(<App data={data}/>, document.getElementById('root'));
};
function userLogout(){
  const loginForm=
    <div>       
        <div id="login" className='login_div'>
            <input type="email" id="email" className= 'loginInputEmailtext' placeholder="Email" required/><br></br><br></br><br></br>
            <input type="password" id="password" className = 'loginInputpasstext' placeholder="Password" required/><br></br><br></br><br></br><br></br>
            <button className= 'loginButton' id="send" onClick={loginUser}>Submit</button>
        </div>
    </div>
  ReactDOM.render(loginForm, document.getElementById('root'));
}
const Todo = ({todo,index,completeTodo,removeTodo}) => <div className= "todo"> {todo.text}<div>
  <button id={index} onClick = {() => completeTodo(index)}>Completed</button>
  <button onClick = {() => removeTodo(index)}>X</button>
  </div></div>
function App(data) {
  if (Object.keys(data).length === 0) {
    data = [{text:"Learn about React",isCompleted : false},
    {text:"Meet Friend",isCompleted : false},
    {text:"Need to celebrate new year event",isCompleted :false}];
  } else {
    data = data.data;
  }
  const [todos, setTodos] = useState(data)
  const addTodo = text => {
    const newTodos = [...todos,{text}];
    console.log(newTodos)
    const userId = newTodos[0].userId;
    const newTodoObj = {
      text:text,
      isCompleted:false,
      isDeleted:false,
      userId:userId
    }
    axios({
      method: 'post',
      url:'http://localhost:5001/todo/insertTodoList',
      data: newTodoObj,
      headers: { 
        contentType : 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }).then(response => {
      console.log(response)
    }).catch(err =>{
        console.log(err)
    })
    setTodos(newTodos)
  }
  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
    axios({
      method: 'put',
      url:'http://localhost:5001/todo/updateTodoList',
      data: newTodos[index],
      headers: { 
        contentType : 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }).then(response => {
      console.log(response)
      document.getElementById(index).style.background='#00ff00';
    }).catch(err =>{
        console.log(err)
    })
  }
  const removeTodo = index => {
    const newTodos = [...todos];
    
    console.log(newTodos,index)
    axios({
      method: 'delete',
      url:'http://localhost:5001/todo/deleteTodoList',
      data: {id: newTodos[index]._id},
      headers: { 
        contentType : 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }).then(response => {
      console.log(response);
      newTodos.splice(index,1);
      setTodos(newTodos);
    }).catch(err =>{
        console.log(err)
    })
  }
  
  useEffect(() => {
    //eslint-disable-next-line
    todos.map((todo, idx) => {
      if (todo.isCompleted) {
       return  document.getElementById(idx).style.background='#00ff00';
      }
    })
  });
  return (
    <div className="App">
    <div className='header_div'>Hello {'Sudarshan'}<button className = 'logOutbutton' onClick={userLogout}>LOGOUT</button></div>
      <div className="todo-list">
      {todos.map((todo,idx) => (
        <Todo key={idx} todo={todo} index={idx}
        completeTodo ={completeTodo} removeTodo = {removeTodo}/>
      ))}<TodoForm addTodo={addTodo}/>
      </div>
    </div>
  );
}

export default App;
