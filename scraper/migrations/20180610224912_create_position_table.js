
exports.up = function(knex, Promise) {
  //This is gonna be the position in the pitch
  return knex.schema.createTable('Position', function (t) {
    t.increments('id').primary()
    t.string('name').notNullable()
  })
};

exports.down = function(knex, Promise) {
  
};
