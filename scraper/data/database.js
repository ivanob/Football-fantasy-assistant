const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27018';

// Database Name
const dbName = 'fantasy'


// Use connect method to connect to the server
const openConnection = (teams, players) => {
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err)
    console.log("Connected successfully to server")
    const db = client.db(dbName)
    insertElement(db, client, 'a','a')
})
}

const closeConnection = (client) => {
  client.close()
}

const insertElement = (db, client, colName, obj) => {
  var collection = db.collection('test');
  // Insert some documents
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    closeConnection(client)
  });
}

module.exports = {openConnection: openConnection,
   closeConnection: closeConnection}