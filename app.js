var mongoClient=require('mongodb').MongoClient;
var express=require('express');
var mongodb=require('mongodb');
require('dotenv').config();
var cors=require('cors');

var app=express();

const url= process.env.URL;
const dbName="NotesData"
 
mongoClient.connect(url,{useUnifiedTopology:true},(err,client)=>{
    if(err)
    {
        console.log("error connecting to database:"+err);
    }
    else
    {
        console.log("connected to database");
        db=client.db(dbName);
        Collection1=db.collection('Notes1')
    }
})

app.use(cors())
app.use(express.json())

app.get('/note', (req,res)=> {
    Collection1.find().toArray((err,result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(JSON.stringify(result));
        }
    })
})

app.post('/note', (req,res)=>{
    const order = req.body;
    Collection1.insertOne(order)
               .then(result => {
                    res.status(201).json(result);
               })
               .catch(err => {
                    res.status(500).json({err: 'could not create a new document'});
               })
})

app.put('/note', (req,res)=> {
    console.log(req.body);
    Collection1.updateMany(
        // {name : "charan"}
        {name : req.body.name},
        // {$set : {number : 1236458}}
        {$set : req.body}
    )
    res.send({status : "updated"})
})

app.delete('/note/:id', (req,res)=> {
    Collection1.deleteOne(
        {_id : mongodb.ObjectId(req.params.id)}
    )
    res.send({status : "deleted"})
})

app.listen(4000,()=>{console.log("server is running on port 4000")})