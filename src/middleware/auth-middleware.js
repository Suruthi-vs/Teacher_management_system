const {validateToken}=  require("../utils/jwtservice");

const authmiddleware= (req,res,next)=>{
  console.log("----------")
  console.log(req.cookies.jwt)
  console.log("----------")
  const jwtdata=validateToken(req.cookies.jwt);
  if(jwtdata){
    req.admin= jwtdata
  }
  next()
}

module.exports= authmiddleware