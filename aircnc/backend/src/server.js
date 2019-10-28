//Testar a porta para saber se  não tem um proxy por trás portquiz.net/PORTA
// Para rodar o projeto npm run dev
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://userD:senha123@aircnc-ayn1i.mongodb.net/semana09?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
//req.query = para acessar query params ( para filtros)
//req.params = acessar route params ( para edição, delete)
//req.body = acessar o corpo da requisição (para criação , edição)
app.use(cors());
app.use(express.json());
app.use(routes);
//mongodb+srv://userD:<password>@aircnc-ayn1i.mongodb.net/admin?retryWrites=true&w=majority

/* app.get('/users',(req,res)=>{
    return res.json({message:'Hello World'});
});
 *//* app.post('/users',(req,res)=>{
   return res.json({message:'Hello World'});
}); */
app.listen(3333);