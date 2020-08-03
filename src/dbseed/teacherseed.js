// this will create working dummy data for teachers..

const Teacher=require("../models/teacher-mod");

const Student= require("../models/stud-mod");

const teacherdata=[
{
  Firstname:"Sriram",
  Lastname:"Sundar",
  Age:24,
  Gender:"male"
},
{
  Firstname:"Senbaga",
  Lastname:"Lingesh",
  Age:37,
  Gender:"male"
},
{
  Firstname:"Abinaya",
  Lastname:"Chandra",
  Age:28,
  Gender:"female"
},
{
  Firstname:"Lakshmi",
  Lastname:"Priya",
  Age:26,
  Gender:"female"
},
{
  Firstname:"Aditi",
  Lastname:"surya",
  Age:29,
  Gender:"male"
}

];

const student={
    Firstname:"Preetha",
    Lastname:"Sinha",
    Age:35,
    Gender:"female"
}

const Dbseeder=()=>{
 
  Student.sync({ force: true })
  .then(()=>{
      Student.create(student)
      .then(studresult=>{
          const { id }= studresult.get();
          Teacher.sync({ force:true })
          .then(()=>{
              teacherdata.forEach(teacher=>{
                Teacher.create({
                  ...teacher,
                  studentID:id   
                })
                 .then(result=>{
                  console.log(result.get())
                  })
                 .catch(e=>{
                     console.error(e)
                  })
          })
        })
        .catch(e=>{
          console.error(e)
        }) 
      })
      .catch(e=>{
        console.error(e)
      })
  })
  .catch(e=>{
    console.error(e)
  })
}

Dbseeder();

module.exports=Dbseeder;