const express = require('express');


const server = express();

server.listen(3000);

server.use((req,res,next)=>{
  console.time('');
  console.log("Required");
  console.timeEnd('');
  next();
});

function checkUserInArray(req,res,next){
  const user = users[req.params.index];
  if(!user){
    return res.status(400).json({error: 'User does not exists'});
  }
  req.user = user;

  return next();

}

function checkUserExists(req,res,next){
  const user = req.body.nome;
  if(!user){
    return res.status(400).json({error:'User Name is Required!'});
  }



  return next();
}





server.use(express.json());

const users = ["talita", 'paloma', 'dina'];
server.get('/users', (req,res)=>{

  return res.send(users);
  

});
server.get('/users/:index',checkUserInArray,(req,res)=>{
  const { index} = req.params;
  return res.json(req.user);
});

server.post('/users', checkUserExists,(req,res)=>{
  const {nome} = req.body;
  users.push(nome);
  res.json(users);
  

});

server.put('/users/:index',checkUserInArray ,checkUserExists,(req,res)=>{
  const {index} = req.params;
  const {nome} = req.body;
  users[index] = nome;
  return res.json(users);


});

server.delete('/users/:index',checkUserInArray, (req,res)=>{
  const {index} = req.params;
  users.splice(index,1);
  return res.json({message: 'User excludes with success!!'});

});

