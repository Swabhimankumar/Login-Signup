const express=require('express');
const bodyParser=require('body-Parser');
const mongodb=require('mongodb');
const mongoose=require('mongoose');
const user=require('./routes/user');
const {check,validationResult } = require('express-validator');

const app=express();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/login";

mongoose.connect(url,{ useNewUrlParser: true,useUnifiedTopology: true ,useCreateIndex: true,useFindAndModify: false }, function(err, db) {
  if (err) throw err;
  console.log("Connected to Database");
  //db.close();
});
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
//app.use(validationResult());
app.get('/',(req,res)=>{
    res.json({
        status:1,
        msg:"Welcome"
    })
})

app.use('/user',user);

const Port=process.env.PORT || 3000;

app.listen(Port,console.log(`server started at ${Port}`));