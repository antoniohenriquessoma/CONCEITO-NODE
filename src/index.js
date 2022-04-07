const express = require('express');
const cors = require('cors');
 const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

 const BD = [];
const todos = [];

function checksExistsUserAccount(req, res, next) {
 const { username } = req.headers;

 const users = BD.find((users) => users.username === username)
  console.log(users)
 if(!users){
    return res.status(400).json({error: "User not found"})
 }
 req.users = users
 return next()

}

app.post('/users', (req, res) => {
   
   const {name, username } = req.body 
  
   const id =  uuidv4();
   
    BD.push({
      id,
      name,
      username,
      todos,
    });

    return res.status(201).json({id, name, username, todos});
});

app.get('/todos', checksExistsUserAccount, (req, res) => {
    const { dados } = req;
    return res.json(dados);
});

app.post('/todos', (req, res) => {

  const { username } = req.headers;
  const { title, deadline } = req.body;

   const id = uuidv4();
   const { tarefa }  = req;
    
   const dados = {
      id,
      title,
      done: false,
      deadline: new Date(deadline),
      created_at: new Date()
    }
  // const todos = dados;
   //console.log(todos);
   return res.status(201).json(dados)



});

app.put('/todos/:id', checksExistsUserAccount, (req, res) => {
  // Complete aqui
});

app.patch('/todos/:id/done', checksExistsUserAccount, (req, res) => {
  // Complete aqui
});

app.delete('/todos/:id', checksExistsUserAccount, (req, res) => {
  // Complete aqui
});

module.exports = app;