 const express = require("express");

const Admin= require("../models/adminmodel");

const {compareHash}= require("../utils/hashing");

const adminroute = express.Router();

const { createToken }= require("../utils/jwtservice");

adminroute
.get("/",(req,res)=>{

  res.render("adminlogin",{
    layout: "login",
    formTitle: "Admin Login",
    submitTarget: "/admin/login",
    submitMethod:"POST"
    
  });

})
.post("/login",async (req,res)=>{
    const {email, password }= req.body 
    const result= await Admin.findOne({
      where:{
        email
      }
    })
    if(!result){
      res.status(400).send("Invvalid User!")
    }
    else{
        const {password:passwordHash}= result.get()
        const compareresult= await compareHash(password,passwordHash)
        if(!compareresult){
          res.status(400).send("Invalid User!!")
        }
        else{
         
         const jwtToken= createToken({
            type: "admin",
            email
         })
         res.cookie("jwt", jwtToken, {httpOnly: true})
          //res.status(200).send("Valid User")
          res.redirect("/teachers");
        }
    }
})
.get("/logout",(req,res)=>{
  res.clearCookie("jwt");
  res.redirect("/");
})



module.exports =adminroute