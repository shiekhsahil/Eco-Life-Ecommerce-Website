const express = require("express")
const mongoose = require("mongoose")
const app= express();
const path = require("path");
const internal = require("stream");
app.use(express.static("assets"))
app.use(express.urlencoded({extended:true}));
app.use(express.json());
mongoose.set("useFindAndModify",false);
mongoose.connect("mongodb://localhost:27017/ecolife",{useNewUrlParser:true,useUnifiedTopology:true})

const UserSchema =  new mongoose.Schema({
    firstname:String,
    lastname:String,
    email:String,
    mobilenumber:String,
    fax:String,

});
const Details =   mongoose.model("info",UserSchema);
app.get("/",(req,res)=>{
    return res.redirect('/account')
})
app.get("/account",(req,res)=>{
    return res.sendFile(path.join(__dirname+'/my-account.html'))

})
app.post("/account",async(req,res)=>{
 var firstname = req.body.firstname;
 var lastname = req.body.lastname;
 var email = req.body.email;
 var mobno = req.body.mobno;
 var fax = req.body.fax;
 try {
     const newDetails = new Details({
        firstname:firstname,
        lastname:lastname,
        email:email,
        mobilenumber:mobno,
        fax:fax,
     });
     await newDetails.save();
     console.log("Data registered ")
     return res.redirect('/')
 }
 catch(err){
     console.log(err)
     return res.redirect('/')
 }

});


app.listen(5000,()=>{
    console.log("Server connected")
})