import React from 'react'
import TopNavigation from './TopNavigation'
import { useSelector } from 'react-redux'

function Leaves() {
  let userDetails = useSelector((store)=>{
     return store.userDetails
  })
  console.log(userDetails)
  return (
    <div>
        <TopNavigation></TopNavigation>
      <h2>Welcome to Leaves</h2>
      <h2>Name : {userDetails.firstName} {userDetails.lastName}</h2>
      <h2>Age : {userDetails.age}</h2>
      <img src={`/${userDetails.profilePic}` }></img>
    </div>
  )
}

export default Leaves
