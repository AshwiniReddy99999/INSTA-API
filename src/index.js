const express=require('express');
const app=express();
const dotenv=require('dotenv');
const mongoose=require('mongoose');
const cors=require('cors')
mongoose.set('strictQuery', true);
app.use(cors());
const proute=require('./routes/user')

dotenv.config();
console.log(process.env.DATABASE_url)
mongoose.connect(process.env.DATABASE_url,{useNewUrlParser: true},(err)=>{
    if(err){
        console.log(err.message)
    }else{
    console.log('connected to db')
    }
})

app.use('/', proute);


app.listen(5000,()=>{
    console.log("server is running ...")
})