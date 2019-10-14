const User = require('../models/User');
module.exports = {
    async store(req, res) {
        const { email } = req.body;
        const { name } = req.body;
        const { date } = req.body;
        const { active } = req.body;
        const { password } = req.body;
        let user = await User.findOne({ email, name, date, active, password });

        if (!user) {
            user = await User.create({ email, name, date, active, password });
        }
        return res.json(user)
    }
};