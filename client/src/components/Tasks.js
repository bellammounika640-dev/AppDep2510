import React from 'react'
import TopNavigation from './TopNavigation'
import { useSelector } from 'react-redux'

function Tasks() {
  let userDetails = useSelector((store)=>{
     return store.userDetails
  })
  console.log(userDetails)
  return (
    <div>
        <TopNavigation></TopNavigation>
      <h1>Welcome toTasks</h1>
      <h2>Name : {userDetails.firstName} {userDetails.lastName}</h2>
      <h2>Age : {userDetails.age}</h2>
      <img src={`/${userDetails.profilePic}`}></img>
    </div>
  )
}

export default Tasks
