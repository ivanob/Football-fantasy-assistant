const MongoClient = require('mongodb').MongoClient;
import { Team, Player } from '../types/TypesFantasy'
const assert = require('assert');

// const insertElement = (db, client, colName, teams: Team[]) => {
//   var collection = db.collection(colName);
//   teams.map((team: Team) => db.collection(colName).update({ name: team.name }, team, {upsert: true, multi: true},function(err, res) {}))
//   // Insert some documents
//   /*collection.insertMany(obj, function(err, result) {
//     assert.equal(err, null);
//     console.log("Inserted Teams into the collection");
//     closeConnection(client)
//   });*/
// }

// export const readDDBB = (db) => {
//   db.collection("teams").find().toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//   });
// }