const mongoose = require('mongoose');
const { emit } = require('../app');

mongoose.connect('mongodb://127.0.0.1:27017/Dezcorb')
.then(()=>{
    console.log('mongoDb connected');
})
.catch(()=>{
    console.log('failed to connect');
})

const logInSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    
})

const collection = new mongoose.model('users',logInSchema)

module.exports= collection