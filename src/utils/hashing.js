
/// HASHING SERVICE ENCRYPTS THE DATA

const bcrypt= require("bcrypt");
//It basically tells how much time algorithm should run for encryption logic
const saltRounds= 10;

exports.generateHash= plainTextPassword=>{
    const salt= bcrypt.genSaltSync(saltRounds);
    const hash= bcrypt.hashSync(plainTextPassword,salt);
    return hash;
}





exports.compareHash = (plainTextPassword, passwordHash)=>{
return new Promise((resolve,reject)=>{
    bcrypt.compare(plainTextPassword,passwordHash,(err,result)=>{
        if(!err){
            resolve(result);
        }
        else{
            reject(err);
        }
    })
})
}

// const password= "Hello"

// console.log("Password",password)
// console.log("Generated Hash")
// const hash= generateHash(password)

// compareHash(password,hash)
// .then(result=>{
//     console.log("Password match", result)
// })
// .catch(console.error)