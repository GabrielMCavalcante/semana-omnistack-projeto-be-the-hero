const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async create(req, res)
    {
        const { ong_name, ong_email, ong_whatsapp, ong_city, ong_uf } = req.body;

        const ong_id = crypto.randomBytes(4).toString('HEX');
    
        await connection('ong').insert({
            ong_id,
            ong_name,
            ong_email,
            ong_whatsapp,
            ong_city,
            ong_uf
        })

        return res.json({ ong_id });
    },

    async index(req, res)
    {
        const ongs = await connection('ong').select('*');
        return res.json(ongs);
    }
};