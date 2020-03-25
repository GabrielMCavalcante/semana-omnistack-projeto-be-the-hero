const connection = require('../database/connection');

module.exports = {
    async create(req, res)
    {
        /* Gets request body */
        const {incident_title, incident_desc, incident_value} = req.body;
        
        /* Gets ong id */
        const ong_id = req.headers.authorization;
        
        /* Inserts values on table */
        const [incident_id] = await connection('incident').insert({
            incident_title,
            incident_desc,
            incident_value,
            ong_id
        })

        return res.json({ incident_id });
    },
    async index(req, res)
    {
        const { page = 1 } = req.query;
        
        const [count] = await connection('incident').count();
        res.header('X-Total-Count', count['count(*)']);
        
        /* Returns all incidents registered */
        const incidents = await connection('incident')
        .join('ong', 'ong.ong_id', '=', 'incident.ong_id')
        .limit(5)
        .offset((page-1)*5)
        .select('incident.*',
                'ong.ong_email', 
                'ong.ong_whatsapp',
                'ong.ong_city',
                'ong.ong_uf');

        return res.json(incidents);
    },
    async delete(req, res){
        /* Gets the incident´s id which is going to be deleted */
        const { incident_id } = req.params;

        /* Verifies if incident exists */
        const findIncident = await connection('incident').where('incident_id', incident_id);
        if(findIncident.length == 0)
            return res.status(404).json({error: 'no incident found'});
        
        /* Finds incident´s respective ong id */
        const ong_id = req.headers.authorization;
        const incident = await connection('incident').select('*').where('incident_id', incident_id).select('ong_id').first();

        /* Compares the id of incident´s ong id 
        with the id of the ong which is trying to delete it */
        if(incident.ong_id != ong_id) //If the ids are different 
            return res.status(401).json({error: "Operation not permitted."});     

        /* Finally deletes the incident */
        await connection('incident').where('incident_id', incident_id).delete();
        
        /* Returns success status with no content */
        return res.status(204).send();
    }
};