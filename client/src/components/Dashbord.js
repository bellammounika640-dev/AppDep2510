import React from 'react'
import TopNavigation from './TopNavigation'
import { useSelector } from 'react-redux'

function Dashbord() {
  let userDetails = useSelector((store)=>{
     return store.userDetails
     
  })
  console.log(userDetails)

  let onDeleteAccount = async ()=>{
    let dataToSend = new FormData();
    dataToSend.append("email",userDetails.email)

    let reqOptions ={
      method:"delete",
      body:dataToSend,
    }
    let JSONData = await fetch("http://localhost:1213/deleteProfile",reqOptions)
    let JSOData = await JSONData.json()
    
    alert(JSOData.message)
  }
  return (
    <div>
      <TopNavigation></TopNavigation>
      <button type='button' onClick={()=>{
      onDeleteAccount();
      }}>Delete Profile</button>
      <h1>Welcome to Dashbord</h1>
      <h1>Name: {userDetails.firstName} {userDetails.lastName}</h1>
      <h2>Age: {userDetails.age}</h2>
      <img src={`http://localhost:1213/${userDetails.profilePic}`} alt=''></img>
    </div>
  )
}

export default Dashbord
