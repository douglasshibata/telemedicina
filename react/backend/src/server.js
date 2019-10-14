//Importando o express
const express  = require('express');

const app = express();

app.use(express.json());
app.get('/',(req,res)=>{

});

app.listen(3333);