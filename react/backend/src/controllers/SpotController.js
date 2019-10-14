const Spot = require('../models/Spot');
const User = require('../models/User');

module.exports = {

    async index(req,res) {
        const { especialidade} = req.query;
        const spots = await Spot.find({especialidade:especialidade});
        return res.json(spots)
    },

    async store(req, res) {
        const { filename } = req.file;
        const { empresa, especialidade, price } = req.body;
        const { user_id } = req.headers;

        const user = await User.findById(user_id);
        if (!user) {
            return res.status(400).json({ error: 'Usuário não existe' });
        }

        const spot = await Spot.create({
            user: user_id,
            imagem: filename,
            empresa,
            price,
            especialidade: especialidade.split(',').map(ex => ex.trim())
        });

        return res.json(spot)
    }
}