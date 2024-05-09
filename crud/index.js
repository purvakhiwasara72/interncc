const dbConnect=require("./mongodb");
const express=require('express');
const { response }=require('express');
const app=express();
app.use(express.json());

//get
app.get('/',async(req,res) =>{
    let result=await dbConnect();
    result = await result.find().toArray();
    res.send(result);
})

//post
app.post('/',async(req,res) =>{
    let result=await dbConnect();
    result = await result.insertOne(req.body);
    res.send("Data inserted successfully");
})

//put
app.put('/:name', async(req,res) =>{
    let result= await dbConnect();
    result = await result.updateOne({name:req.params.name},{$set:req.body});
    res.send("Data updated sucessfully")
})
//delete
app.delete('/:name',async(req,res) => {
    let result=await dbConnect();
    result = await result.deleteOne({name:req.params.name});
    res.send("Data deleted successfully");
})


app.listen(3000);