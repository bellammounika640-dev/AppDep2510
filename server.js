const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt")

let app = express();
app.use(cors());

// express.static is a ,middleware function which is serve the files  server to client.this function only display files in browser 
app.use('/ProfilePics',express.static('ProfilePics'))
// this is conflicting where to satore and what name to satore destination means where to store and file name is what name to store
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,`ProfilePics`)
    },
    filename:function (req,file,cb){
        cb(null,`${Date.now()}_ ${file.originalname}`)
    }
})
// multer is external middlewhare function to handle 'FormData'
let upload = multer({storage:storage});

app.post("/validateToken",upload.none(),async (req,res)=>{
  console.log(req.body)
//   this line is decrepting token
  let decrptedCredintials =jsonwebtoken.verify(req.body.token,"brn");
  console.log(decrptedCredintials);
//   we can retrive email from database,in signup we are sending email same email we are gettintrough login
 let userArr= await user.find().and([{email:decrptedCredintials.email}]);
//  server generate  token  by using sign funtion

if(userArr.length  > 0){
    let dataToSend ={
        firstName : userArr[0].firstName,
        lastName : userArr[0].lastName,
        age : userArr[0].age,
        email : userArr[0].email,
        mobileNo : userArr[0].mobileNo,
        profilePic:userArr[0].profilePic,
        token:req.body.token
     }
// this line means if the both values are valid or not
    if(decrptedCredintials.password === userArr[0].password){
      res.json({status:"Sucess",message:"Credintials are correct" ,data:dataToSend})
    }else{
        res.json({status:"Failure",message:"Invalid Password"})
    }
}else{
    res.json({status:"Failed",message:"User Doesnot Exist" })
}
});
// This login API is 'R' part in CRUD operations. it meant we are retrive the data
app.post("/login",upload.none(),async (req,res)=>{
  console.log(req.body)
//   we can retrive email from database,in signup we are sending email same email we are gettintrough login
 let userArr= await user.find().and([{email:req.body.email}]);

 let isValidpassword = await bcrypt.compare(req.body.password,userArr[0].password)
//  server generate  token  by using sign funtion
 let token = jsonwebtoken.sign({email:req.body.email,password:req.body.password},"brn")
if(userArr.length  > 0){
    let dataToSend ={
        firstName : userArr[0].firstName,
        lastName : userArr[0].lastName,
        age : userArr[0].age,
        email : userArr[0].email,
        mobileNo : userArr[0].mobileNo,
        profilePic:userArr[0].profilePic,
        token:token
     }
// this line means if the both values are valid or not
    if(isValidpassword === true){
      res.json({status:"Sucess",message:"Credintials are correct" ,data:dataToSend})
    }else{
        res.json({status:"Failure",message:"Invalid Password"})
    }
}else{
    res.json({status:"Failed",message:"User Doesnot Exist" })
}
});
// This signup api is 'c' part in CRUD operations. it means we are inserting the data

app.post("/signup", upload.single("profilePic"), async (req,res)=>{

    console.log(req.body);   // now you will see data
    console.log(req.file);   // now file will be visible
    let hashedPassword = await bcrypt.hash(req.body.password,10)

    try{
        let student = new user({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            email: req.body.email,
            password: hashedPassword,
            mobileNo: req.body.mobileNo,  // FIXED NAME
            profilePic: req.file.path
        });

        await student.save();

        console.log("inserted details successfully");

        res.json({
            status:"Success",
            message:"Account Created Successfully"
        });

    }catch(err){
        console.log(err);
        console.log("details are not inserted");

        res.json({
            status:"Failed",
            message:"Unable to create account"
        });
    }
});
// This updateprofile API is 'U' part. it means Updating the data
app.patch("/updateProfile", upload.single("profilePic"), async (req,res)=>{
    try{
        if(req.body.firstName.trim().length>0){
        await user.updateMany({email:req.body.email},{firstName:req.body.firstName})
    }
    if(req.body.lastName.trim().length>0){
        await user.updateMany({email:req.body.email},{lastName:req.body.lastName})
    }
    if(req.body.age>0){
        await user.updateMany({email:req.body.email},{age:req.body.age})
    }
    if(req.body.password.trim().length>0){
        await user.updateMany({email:req.body.email},{password:req.body.password})
    }
    if(req.body.mobileNo>0){
        await user.updateMany({email:req.body.email},{mobileNo:req.body.mobileNo})
    }
    if(req.file){
        await user.updateMany({email:req.body.email},{profilePic:req.file.path})
    }
    res.json({status:"Sucess" , message:"User Updated Sucessfully"})
    }catch(err){
        res.json({status:"Failed" , message:"User Not Updated"})
    }  

})

// This Deletprofile API is 'D' part.it means delete profile
app.delete("/deleteProfile",upload.none(),async(req,res)=>{
 let delRes =   await user.deleteMany({email:req.body.email})
 if(delRes.deletedCount>0){
res.json({status:"Sucess",message:"User Deleted Sucessfully"})
 }else{
res.json({status:"Failed" , message:"User does not deleted"})
 }
})





app.listen(1213,()=>{
    console.log("1213 port is running on server")
})


let userSchema = mongoose.Schema({
    firstName:String,
    lastName:String,
    age:Number,
    email:String,
    password:String,
    mobileNo:Number,
    profilePic:String
})

let user = mongoose.model("users",userSchema,"userJWT")



let connectToMDB = async ()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/mernbatch");
        console.log("Sucessfully Connect to MongoDB")
    
    }catch(err){
        console.log("Unable to connect Mongodb")

    }
}
connectToMDB();