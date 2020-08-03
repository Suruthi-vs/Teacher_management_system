const sequelize= require("sequelize");

const classdb= require("../config/dbconfig");

const { generateHash }= require("../utils/hashing");

const Admin= classdb.define("Admin",
{
      id:{
        type:sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:  true
      },
      email: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true,
        validate:{
          isEmail: true
        }
      },
      password:{
        type:sequelize.STRING,
        allowNull: false
      }
    },
{
setterMethods:{
  password(plainTextPassword){
    this.setDataValue("password",generateHash(plainTextPassword))
  }
}
}
)

module.exports= Admin;