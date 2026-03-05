import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import TopNavigation from './TopNavigation';
import { useSelector } from 'react-redux';

function EditProfile() {
    let [profilePic,setProfilePic] = useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQJxKGGpPc9-5g25KWwnsCCy9O_dlS4HWo5A&s");
 let firstNameInputRef = useRef();
 let lastNameInputRef = useRef();
 let ageInputRef = useRef();
 let emailInputRef = useRef();
 let passwordInputRef = useRef();
 let mobileNoInputRef = useRef();
 let profilePicInputRef = useRef();

 let userDetails = useSelector((store)=>{
   return store.userDetails
 })
 
 useEffect(()=>{
    firstNameInputRef.current.value = userDetails.firstName  
    lastNameInputRef.current.value = userDetails.lastName  
    ageInputRef.current.value = userDetails.age  
    emailInputRef.current.value = userDetails.email 
    mobileNoInputRef.current.value = userDetails.mobileNo  
   setProfilePic(`/${userDetails.profilePic}`)
 },[])

 let onUpdateProfile = async ()=>{
    let dataToSend = new FormData();
    dataToSend.append("firstName",firstNameInputRef.current.value)
    dataToSend.append("lastName",lastNameInputRef.current.value)
    dataToSend.append("age",ageInputRef.current.value)
    dataToSend.append("email",emailInputRef.current.value)
    dataToSend.append("password",passwordInputRef.current.value)
    dataToSend.append("mobileNo",mobileNoInputRef.current.value)

    for(let i=0;i<profilePicInputRef.current.files.length;i++){
      dataToSend.append("profilePic",profilePicInputRef.current.files[i])
    }
    

    let reqOptions = {
        method : "PATCH",
        body:dataToSend
    }

    let JSONData = await fetch("/updateProfile",reqOptions);
    let JSOData = await JSONData.json();
    console.log(JSOData)

    alert(JSOData.message);


 }
  return (
    <div>
        <TopNavigation></TopNavigation>
      <form>
        <h2>Edit Profile</h2>
        <div>
            <label>First Name</label>
            <input ref={firstNameInputRef}></input>
        </div>
        <div>
            <label>Last Name</label>
            <input ref={lastNameInputRef}></input>
        </div>
        <div>
            <label>Age</label>
            <input ref={ageInputRef}></input>
        </div>
        <div>
            <label>Email</label>
{/* readeonly attribute means we cont change input cursor is not comming */}
            <input ref={emailInputRef} readOnly></input>
        </div>
        
        <div>
            <label>Password</label>
            <input ref={passwordInputRef}></input>
        </div>
        <div>
            <label>Mobile NO</label>
            <input ref={mobileNoInputRef}></input>
        </div>
        <div>
            <label>Profile Pic</label>
            <input ref={profilePicInputRef} type='file' onChange={()=>{
                let selectedPath = URL.createObjectURL(profilePicInputRef.current.files[0])
                setProfilePic(selectedPath);
            }}></input>
        </div>
        <div>
            <img src={profilePic} alt=''></img>
        </div>
        <div>
            <button type='button' onClick={()=>{
             onUpdateProfile();
            }}>Update</button>
        </div>
      </form>
      
      
    </div>
  )
}

export default EditProfile
