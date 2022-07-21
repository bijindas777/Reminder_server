//connecting backend with mongo db
//make db connection

//import mongoose
const mongoose = require('mongoose')
//create connection
mongoose.connect('mongodb://localhost:27017/Reminder',{
    useNewUrlParser:true
})
//db model
const User = mongoose.model('User',{
    name:String,
    userid:String,
    password:Number,
    event:[]

})
module.exports={
    User
}
