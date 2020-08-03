//sequelize is and orm for Node js. ORM is Object Relation
//Mapping. Objects is Javascript Objects and relation
//mpping is done for Javascript objects in postres tables..
//Sequelize is table database for node js..

const sequelize = require("sequelize");

//TO connect to my class Database.. we can connect through url in postgres

//create instance of classdb
const classDB= new sequelize(process.env.key);

classDB.authenticate()
.then(()=>{
  console.log("Successful!!!!")
})
.catch(e=>{
  console.error("Failed!!!");
  console.error(e);
})

module.exports=classDB;