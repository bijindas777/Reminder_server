//import express
const express = require('express')

//server app creating express
const app = express()
//import cors
const cors = require('cors')
//import jsonweb token
const jwt=require('jsonwebtoken')

//import dataservice
const DataService=require('./Service/data_service')
//cors use in app
app.use(cors({
    origin:'http://localhost:4200'
}))
//parse json data
app.use(express.json())

//token verify
const jwtMiddleware =(req,res,next)=>{
// to fetch token
try{
    token=req.headers['reminder-token']
    const data=jwt.verify(token,'reminderkey123')
    req.currentUserid = data.currentUserid
    next()
}catch{
    res.status(401).json({
        status:false,
        statusCode:401,
        message:'please login001'
    })
}
}


//register API
app.post('/register',(req,res)=>{
    DataService.register(req.body.username,req.body.userid,req.body.password)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})
//login API
app.post('/login',(req,res)=>{
    DataService.login(req.body.userid,req.body.password)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})
// add event API
app.post('/addEvent',jwtMiddleware,(req,res)=>{
    DataService.addEvent(req,req.body.date,req.body.message)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})
// get event API
app.post('/getEvent',jwtMiddleware,(req,res)=>{
    DataService.getEvent(req,req.currentUserid)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})
//removeEvent API
app.post('/removeEvent',jwtMiddleware,(req,res)=>{
    DataService.removeEvent(req,req.k)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})














//setup port number to server app
app.listen(3000,()=>{
    console.log("server started at 3000");
})