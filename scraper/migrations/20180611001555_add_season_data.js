
exports.up = function(knex, Promise) {
    return knex('Season').insert([{year: '2017-2018', num_year:2017}, {year: '2016-2017', num_year:2016},
        {year: '2015-2016', num_year:2015}]);
};

exports.down = function(knex, Promise) {
  
};
