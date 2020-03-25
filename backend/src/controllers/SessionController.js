const connection = require('../database/connection');

module.exports = {
    async create(req, res){
        const { ong_id } = req.body;

        const ong = await connection('ong').where('ong_id', ong_id)
        .select('ong_name')
        .first();

        if(!ong)
            return res.status(400).json({error: "No ong found with this ID"});
        
        return res.json(ong);

    }
}