const Admin= require("../models/adminmodel");

const admin={
  email:"test@gmail.com",
  password:"password!"
}

Admin.sync({ force:true })
.then(()=>{
      return Admin.create(admin)
})
.then(result=>{
  console.log(result.get())
})
.catch(e=>{
  console.error(e)
})


