import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './App.css';
import App from './App'
function loginUser(email,password) {
    const useremail = document.getElementById('email').value;
    const userpass = document.getElementById('password').value;
    if(useremail === '' || userpass === '')
    return alert('Login with email and password If you are not registerd it will register and login for you');
    axios({
        method: 'post',
        url:'http://localhost:5001/todo/userLogin',
        data: {email:useremail,password:userpass}
    })
    .then(response => {
        console.log(response)
    //   const sample_data = [{text:"Sudarshan",isCompleted : false},
    //   {text:"Need to wake up early",isCompleted : false},
    //   {text:"Try something New",isCompleted :false}];
      appendApplicaion(response.data.data)
    }).catch(err =>{
        console.log(err)
    })
  }
function appendApplicaion(data) {
    ReactDOM.render(<App data={data}/>, document.getElementById('root'));
};
function LoginApp(){
    return (
        <div>       
            <div id="login" className='login_div'>
                <input type="email" id="email"  className= 'loginInputEmailtext' placeholder="Email" required/><br></br><br></br><br></br>
                <input type="password" id="password" className = 'loginInputpasstext' placeholder="Password" required/><br></br><br></br><br></br><br></br>
                <button className= 'loginButton' id="send" onClick={loginUser}>Submit</button>
            </div>
        </div>
    )
    //ReactDOM.render(loginForm, document.getElementById('root'));
}

export default LoginApp;