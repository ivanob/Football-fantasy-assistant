
exports.up = function(knex, Promise) {
    return knex('Position').insert([{name: 'GOALKEEPER'}, {name: 'DEFENSE'},
        {name: 'MIDFIELDER'}, {name: 'STRIKER'}]);
};

exports.down = function(knex, Promise) {
  
};
