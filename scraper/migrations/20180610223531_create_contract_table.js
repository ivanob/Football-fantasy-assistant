
exports.up = function(knex, Promise) {
  return knex.schema.createTable('Contract', function (t) {
    t.increments('id').primary()
    t.string('name').notNullable()
    t.string('link').notNullable()
  })
};

exports.down = function(knex, Promise) {
  
};
