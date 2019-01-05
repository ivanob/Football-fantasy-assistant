const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27018';

// Database Name
const dbName = 'fantasy'


// Use connect method to connect to the server
const openConnection = (teams) => {
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err)
    console.log("Connected successfully to server")
    const db = client.db(dbName)
    insertElement(db, client, 'teams', teams)
})
}

const closeConnection = (client) => {
  client.close()
}

const insertElement = (db, client, colName, obj) => {
  var collection = db.collection(colName);
  // Insert some documents
  console.log(obj)
  collection.insertMany(obj, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted Teams into the collection");
    closeConnection(client)
  });
}

module.exports = {openConnection: openConnection,
   closeConnection: closeConnection}