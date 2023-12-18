const express = require("express");
const router = express.Router();
const bcrypt= require("bcrypt");
const collection= require('./mongodb')


//========dashboard router============================

router.get('/dash', async (req, res) => {
  try {
    const data = await collection.find();
    res.render('dashboard', { data });
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred');
  }
});

router.get('/signup',(req,res)=>{
  res.render('signup')
})

//================checking if user logged or not // session available or not======

router.get("/", function (req, res) {
  if (req.session.login) {
    res.redirect("/home");
  } else {
    res.render("login", { loginError: req.session.loginError });
    req.session.loginError = false;
  }                                           
});


//==========validation checking function=====

function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|icloud\.com|outlook\.com|yahoo\.com)$/;
  return regex.test(email);
}



//===================signup // adding to database========

router.post('/signup', async(req,res)=>{
  try{
  const data ={
    name: req.body.userName,
    email: req.body.email,
    password: req.body.pw
  
  }
  if (!validateEmail(data.email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }else{
  await collection.insertMany([data])
  }
  req.session.signup = true;
    res.redirect("/home");
}catch (err) {
  console.error(err);
  res.status(500).send('An error occurred');
}

})

//===========admin details====

const emailAdmin = "admin123@gmail.com";
const passwordDb = 1234;

//==============login=================

router.post("/login", (req, res) => {

  collection.findOne({email: req.body.email}).then((data)=>{
    let {email, pw} = req.body
    if (email == emailAdmin && pw == passwordDb) {
      req.session.login = true;
      res.redirect('/dash')
    }else if(req.body.pw == data.password){
    req.session.login = true;
    res.redirect("/home");
    }else{
      req.session.loginError = true;
    res.redirect("/");
    }
  }).catch((err)=>{
    req.session.loginError = true;
    res.redirect("/");
  })
  // console.log(req.body)
});

//=======================logout=============

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

//======================delete user============

router.get('/delete/:id', async (req, res) => {
  try {
    const itemId = req.params.id;
    await collection.deleteOne({ _id: itemId });
    res.redirect('/dash');
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred');
  }
});

//===============update form ================

router.get('/update/:id', async (req,res)=>{
  try{
  const itemId =req.params.id
  const items = await collection.findOne({_id: itemId});
  res.render('update',{items})
  } catch(err){
    console.error(err);
    res.status(500).send('An error occured')
  }
})

//===============update user data==============
router.post('/updateUser/:id', async(req,res)=>{
  try{
    const itemId= req.params.id
    const updateData ={
      name: req.body.upName,
      email: req.body.upEmail,
      password: req.body.upPw
    }
    if(updateData.name==""){
      res.render('/updateUser/:id')
    }else{
    await collection.updateOne({_id: itemId},{$set: updateData})
    res.redirect('/dash')}
  }catch(err){
    console.error(err);
    res.status(500).send('An error occured')
  }
})

//==========adduser form router======
router.get('/create',(req,res)=>{
  res.render('create')
})

//========admin adding user=====

router.post('/addUser', async (req,res)=>{
  const data ={
    name: req.body.userName,
    email: req.body.email,
    password: req.body.pw
  }
  await collection.insertMany([data])
    res.render("login");
})

//==========search user data===============

router.get('/search', async (req, res) => {
  const searchQuery = req.query.search;
  try {
    const searchData = await collection.find({
      $or: [
        { name: { $regex: searchQuery, $options: 'i' } },
        { email: { $regex: searchQuery, $options: 'i' } }
      ]
    }).lean().exec();
    res.render('dashboard', { data: searchData });
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred');
  }
});




module.exports = router;
