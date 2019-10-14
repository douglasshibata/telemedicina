const mongoose = require('mongoose');

const SpotSchema = new mongoose.Schema({
    imagem: String,
    empresa: String,
    price:Number,
    especialidade:[String],
    user:{
        type :mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});


module.exports = mongoose.model('Spot', SpotSchema);