
exports.up = function(knex) {
    return knex.schema.createTable('incident', function(table){
        table.increments('incident_id');

        table.string('incident_title').notNullable();
        table.string('incident_desc').notNullable();
        table.decimal('incident_value').unsigned().notNullable();

        table.string('ong_id').notNullable();

        table.foreign('ong_id').references('ongId').inTable('ong');

    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('incident');
};
