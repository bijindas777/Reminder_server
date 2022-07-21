//imoprt db
const db =require('./db')
//import jsonwebtoken
const jwt = require('jsonwebtoken')

//register
const register = (username,userid,password)=>{
    return db.User.findOne({
        userid
    }).then(user=>{
        if(user){
            return {
                status:false,
                message:"user already exist",
                statusCode:401
            }
        }else{
                //insert to db 
                const newUser = new db.User({
                    name:username,
                    userid,
                    password,
                    event:[]
                })
                newUser.save()
                return{
                    status:true,
                    message:"Registered succcesfully",
                    statusCode:200
                }
            
        }
    })
}
//login
const login=(userid,password)=>{
    return db.User.findOne({
        userid,
        password:password
    }).then(user=>{
        if(user){
            currentUser=user.name 
            currentUserid=user.userid 
            //to create token
            token =jwt.sign({
                //to store userid inside the token
                currentUserid:userid
            },'reminderkey123')
              return{
                status:true,
                message:" login succcefully",
                statusCode:200,
                currentUser,
                 currentUserid,
                 token
              } 
        }else{
            return {
                status:false,
                message:"login faild.. invalid credential",
                statusCode:401
              }
            
        }
    })
}
const addEvent = (req,date,message)=>{
    let currentUserid=req.currentUserid
    console.log(currentUserid)
    return db.User.findOne({
        userid:currentUserid
    }).then(user=>{
        if(user){
            user.event.push({
                date:date,
                message:message
            })
            user.save()
            return{
                status:true,
                message:"new event is added",
                statusCode:200
            }
        }
        else{
            return{
                status:false,
                message:"invalid credentials",
                statusCode:401
            }

        }
    })
}
const getEvent=(req,currentUserid)=>{
    return db.User.findOne({
        userid:currentUserid
    }).then(user=>{
        if(user){
            return{
                status:true,
                statusCode:200,
                event:user.event 
            }
        }
        else{
            return{
                status:false,
                message:"user doesnot exist",
                statusCode:401
        }     }
    })
}

const removeEvent=(req,k)=>{
    let currentUserid = req.currentUserid
    return db.User.findOne({
        userid:currentUserid
    }).then(user=>{
        if(user){
            console.log("user")
            user.event.splice(k,1)
        }
      user.save()
      return{
             status:true,
                message:"event is deleted",
                statusCode:200
      }
    })
}






//export
module.exports={
    register,
    login,
    addEvent,
    getEvent,
     removeEvent

}
    
   
    
