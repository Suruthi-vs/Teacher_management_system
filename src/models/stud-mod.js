const sequelize= require("sequelize");
//importing the url over here..
const classDB= require("../config/dbconfig");

const Student= classDB.define("student",{
    
  id:{
    type:sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  Firstname:{
    type:sequelize.STRING,
    allowNull:false,
    field:"first_name"
  },
  Lastname:{
    type:sequelize.STRING,
    allowNull:false,
    field:"last_name"
  },
  
 Age:{
   type:sequelize.INTEGER,
   allowNull:false,
   validate:{
     min:21
   }
 },
 Gender:{
   type:sequelize.ENUM,
   allowNull:false,
  values:["male","female"]
 }
})

module.exports=Student;