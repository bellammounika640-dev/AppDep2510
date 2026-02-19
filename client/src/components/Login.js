import React, { useEffect } from 'react'
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
function Login() {
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let emailInputRef = useRef();
    let passwordInputRef = useRef();
// this line means on component load i will get  email and password we set email and password in local storage now we are get values
    useEffect(()=>{
        if( localStorage.getItem("token") ){
        //  onLogin();
        // onValidateToken();
        }
        // why this function call heare beacause i dont wont click on button also directly goto dashbord.This is autologin functionality 
      
    },[])
    let onValidateToken = async ()=>{
        let dataToSend = new FormData();
        dataToSend.append("token",localStorage.getItem("token"))
        let reqOption ={
            method:"post",
            body:dataToSend,
        }
        let JSONData = await fetch("http://localhost:1213/validateToken",reqOption)
        let JSOData =await JSONData.json()
        console.log(JSOData)
        alert(JSOData.message)
        if(JSOData.status=== "Sucess"){
// we are writing Auto login fuctionality thats why we use local storage it permanantly stored
            // localStorage.setItem("email",emailInputRef.current.value)
            // localStorage.setItem("password",passwordInputRef.current.value)
// these lines are clearly visible email and password to hide email and password we use Jsonweb token
          
            dispatch({type:"login",data:JSOData.data});
          navigate("/dashbord")

        }
    }

    let onLogin = async ()=>{
        let dataToSend = new FormData();
        dataToSend.append("email",emailInputRef.current.value)
        dataToSend.append("password",passwordInputRef.current.value)
        let reqOption ={
            method:"post",
            body:dataToSend,
        }
        let JSONData = await fetch("http://localhost:1213/login",reqOption)
        let JSOData =await JSONData.json()
        console.log(JSOData)
        alert(JSOData.message)
        if(JSOData.status=== "Sucess"){
// we are writing Auto login fuctionality thats why we use local storage it permanantly stored
            // localStorage.setItem("email",emailInputRef.current.value)
            // localStorage.setItem("password",passwordInputRef.current.value)
// these lines are clearly visible email and password to hide email and password we use Jsonweb token
          localStorage.setItem("token",JSOData.data.token)
            dispatch({type:"login",data:JSOData.data});
          navigate("/dashbord")

        }
    }
   return (
    <div>
      <form>
        <h2>Login</h2>
        <div>
            <label>Email</label>
            <input ref={emailInputRef}></input>
        </div>
        <div>
            <label>Password</label>
            <input ref={passwordInputRef}></input>
        </div>
        <div>
            <button type='button' onClick={()=>{
                onLogin();
            }}>login</button>
        </div>
      </form>
      <br></br>
      <br></br>
      <Link to='/signup'>Signup</Link>
    </div>
  )
}

export default Login
