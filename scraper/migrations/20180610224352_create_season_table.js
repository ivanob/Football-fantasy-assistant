
exports.up = function(knex, Promise) {
    return knex.schema.createTable('Season', function (t) {
        t.increments('id').primary()
        t.string('year').notNullable()
        t.integer('num_year').notNullable()
      })
};

exports.down = function(knex, Promise) {
  
};
