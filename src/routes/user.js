const express = require('express');
const UserPost = require('../models/User');
const cloudinary = require('../cloudinary/cloudinary');
const { json } = require('body-parser');

const app=express();
app.use(express.json());

app.get('/getPosts',async(req,res)=>{
    try{
        const post=await UserPost.find();
       console.log(post)
        res.status(200).json(post)
    }catch(err){
        res.status(403).json({
            message:err.message
        })
    }
})


app.post('/posts', async (req, res) => {
    console.log(req.body)
    const { name, location, description, image } = req.body;
    try {
        const uploadedImage = await cloudinary.uploader.upload(image, {
            
            folder: "posts"},
            function(error, result) {
                if (error) {
                    console.log(error)
                }
                console.log(result);
                var data=result;
            }
        )
           console.log(uploadedImage)
        const postdata = await UserPost.create({
            name: name,
            location: location,
            description: description,
            postImage: uploadedImage.secure_url,
        })
        res.status(200).json({
            status:"success",
            message:"Post Created",
            data:postdata
        })
    }catch(err){
        console.log(err)
        res.status(403).json({
            status:"failure",
            message:err.message
        })
    }

})
module.exports=app;