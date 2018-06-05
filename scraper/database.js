

var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'fantasy'
});
 
module.exports = {
    connectDB: function() {connection.connect();
    
    connection.query('SELECT * FROM pet', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
    });
    
    connection.end();
    }
}