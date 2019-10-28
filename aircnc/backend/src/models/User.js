const mongoose = require('mongoose');
//Para indicar os campos que o usuário vai ter. ou seja o esquema do nosso usuário.
const UserSchema = new mongoose.Schema({
    email:String,
    //nome:String, crm:String,active:boolean
});
// PAra o mongo ter conhecimento de quantos campos deverá ser aceito
module.exports = mongoose.model('User',UserSchema);