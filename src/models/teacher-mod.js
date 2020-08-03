//creating a database similar to our stuents models..

// ORM-- defeing the table in simple javascript object.

const sequelize= require("sequelize");
//importing the url over here..
const classDB= require("../config/dbconfig");

const Student= require("../models/stud-mod");

//creating teacher model..

//Am going to define the data by importing classDB
//and "Teachers is the table name"
//and I will have to give the data inside table created.

const teacher= classDB.define("Teachers",{
 //setting primaryKey as id
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
     field:"Age",
     validate:{
       min:21
     }
   },
   Gender:{
     type:sequelize.ENUM,
     allowNull:false,
     field:"Gender",
    values:["male","female"]
   },

   studentID:{
    type:sequelize.INTEGER,
    field:"stud-id",
    allowNull:false,
    references:{
      model:Student,
      key:"id",
      deferrable:sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
   }
});

module.exports= teacher;