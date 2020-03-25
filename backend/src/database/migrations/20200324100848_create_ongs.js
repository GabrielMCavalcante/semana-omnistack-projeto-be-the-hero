
exports.up = function(knex) 
{
    return knex.schema.createTable('ong', function(table)
    {
        table.string('ong_id').primary();
        table.string('ong_name', 20).notNullable();
        table.string('ong_email', 30).notNullable();
        table.string('ong_whatsapp', 15).notNullable();
        table.string('ong_city', 10).notNullable();
        table.string('ong_uf', 2).notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('ong');
};
