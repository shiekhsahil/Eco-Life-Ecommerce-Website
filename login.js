var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
const app =express();
app.use(express.static("assets"))
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//app.use(express.static(__dirname+"/assets"));
mongoose.set('useFindAndModify', false);
mongoose.connect("mongodb://localhost:27017/ecolife" , {useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    name : String,
    email : String,
    password: String
});
const User = mongoose.model("data", userSchema);

app.get('/', (req, res) => {
   
return res.redirect("/register");
  
});
app.get('/index',(req,res)=>{
    return res.sendFile(path.join(__dirname+"/index.html"))
})
app.get("/login",(req,res)=>{
    return res.sendFile(path.join(__dirname+"/login.html"))
})
app.post("/login",async (req,res)=>{
    var Username = req.body.username;
    var password = req.body.userpassword;
    //console.log(Username,password);
    try{

    const existinguser =await User.findOne({name:Username })
    if(existinguser){
        if(existinguser.password===password){
            return res.redirect("/index")
        }
        else{
            console.log("password Invalid");
            return res.redirect("/")
        }
    }
    else{
        console.log("User Dosent exist");
        return res.redirect("/")
    }
}catch(err){
    console.log(err);
    return res.redirect('/')
}
})


app.get("/register",(req,res)=>{
    return res.sendFile(path.join(__dirname+"/register.html"))
})
app.post ('/register',async (req,res)=>{

    // console.log(req.body);
    
    var Username = req.body.username;
    var password = req.body.userpassword;
    var Email = req.body.useremail;
 try{
    const newUser = new User({
        name: Username,
        email: Email,
        password: password
    });
    
    // console.log(newUser);
    
    await newUser.save();

    return res.redirect("/index");
}catch(err){
    console.log(err)
    return res.redirect('/')
}
});

app.listen(3000, ()=>{
    console.log("Server has been started at 3000!----")
});