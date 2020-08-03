const Teacher = require("../models/teacher-mod");

const Sheeba = {
   Firstname:"Sheeba",
   Lastname:"John",
   Age:25,
   Gender:"female"
}

//store these teacher details into the database..

Teacher.sync()
.then(()=>{
    Teacher.create(Sheeba)
    .then(result=>{
      console.log(result.get())
    })
    .catch(e=>{
      console.error(e)
    })
  })
.catch(e=>{
  console.error(e)
});

