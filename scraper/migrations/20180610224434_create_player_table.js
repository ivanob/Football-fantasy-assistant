
exports.up = function(knex, Promise) {
    return knex.schema.createTable('Player', function (t) {
        t.increments('id').primary()
        t.increments('team').notNullable()
        t.string('name').notNullable()
        t.string('position').notNullable()
        t.string('link').notNullable()
    })
};

exports.down = function(knex, Promise) {
  
};
