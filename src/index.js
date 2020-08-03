// To initialize the express dependency added we are using below code
const express = require("express");
//App(Express Application) is an object which has methods for routing HTTP requests and much more tasks.
const app = express();

const teacherroute=require("./routers/teacherroute");

const teachermodel = require("./models/teachermodel");

const adminroute= require("./routers/adminroute");

const teachermod= require("./models/teacher-mod");

const bodyParser=require("body-parser");

const cookieParser = require("cookie-parser");

const {validateToken} = require("./utils/jwtservice");

const authmiddleware= require("./middleware/auth-middleware");

const formatIndex=require("../src/views/helpers/formatindex");
const ifEquality=require("../src/views/helpers/ifEquality");

const expressHbs = require("express-handlebars");
const path = require("path");
const hbs = expressHbs.create({
  extname: ".hbs",
  layoutsDir: path.join(__dirname, "./views/layouts"),
  partialsDir: path.join(__dirname, "./views/partials"),
  helpers:{
    formatIndex,
    ifEquality
  }
});


app.use(bodyParser.json());

app.use(cookieParser());

app.use(authmiddleware)
app.use(bodyParser.urlencoded());

app.use("/admin",adminroute)


// Define which engines are available
app.engine(".hbs", hbs.engine);
// Set default engine to use
app.set("view engine", ".hbs");
// Let express know where all the views are present
app.set("views", path.join(__dirname, "./views"));


app.get("/", (req, res) => {
  res.render("home", {
    layout: "hero",
    pageTitle: "Home",
    isadminlogged: !!req.admin
  });
});


app.use("/api/teachers",teacherroute)

app.get("/teachers", async (req, res) => {
try{
    const teachdata= await teachermod.findAll();
    const arrdata=teachdata.map(each=>each.get());

    res.render("teachers", {
    layout: "navigation",
    pageTitle: "Teachers",
    teachermodel:arrdata
  });
}
catch(e){
  console.error(e);
  res.status(500).send("Internal Server Error!!")
}
});
 
app.get("/add", (req,res)=>{

    
      res.render("add",{
        layout:"navigation",
        pageTitle:"Add details",
        action: "/api/teachers",
        method:"POST",
        mode:"add"
      })
})


app.get("/edit/:id", async (req,res)=>{
  
  const editinfo= await teachermod.findByPk(parseInt(req.params.id))
 
  const teacher= editinfo.get()


  try {
    
    if (teacher) {
      res.render("edit",{
        layout:"navigation",
        pageTitle:"Add details",
        action: "/api/teachers/"+teacher.id,
        method:"PATCH",
        mode:"edit",
        teacher
      })
    } else {
      res.status(400).send("No such  Employee Exist");
    }
  } catch {
    res.status(500).send("Internal Server Error!!!");
  }

})
app.get("/delete/:id", async (req,res)=>{
  try {
    
    const deleteinfo= await teachermod.findByPk(parseInt(req.params.id));

    const teacher= deleteinfo.get()

    if(teacher){
      deleteinfo.destroy();
      res.redirect("/teachers");
    }
    else{
      res.status(400).send("Invalid Student")
    }
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error!!!");
  }
})
//The Express object listens to the port 8080 and a callback is arranged which prints the statement given below
app.listen(8080, () => {
  console.log("Server Starttad!");
});
