const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

console.log('DB::users', db.has('users').value());
console.log('DB::goals', db.has('goals').value());

if (!db.has('users').value()) {
  db.set('users', [])
  .write();
}

if (!db.has('goals').value()) {
  db.set('goals', [])
  .write();
}

module.exports = db;