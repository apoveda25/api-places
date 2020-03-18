// const arangojs = require("arangojs");
// const db = new arangojs.Database({
//   url: "http://localhost:8529"
// });

// db.useDatabase("places");
// db.useBasicAuth("places", "placesdevelop");

// module.exports = {
//   db
// };

// module.exports = {
//   url: "http://127.0.0.1:8529", // The default URL for a local server
//   database: "places", // The database name

//   // Database user credentials to use
//   username: "places",
//   password: "placesdevelop"
// };

const arangojs = require("arangojs");
// const dbConfig = require("../config/database");
const dbConfig = {
  url: "http://127.0.0.1:8529", // The default URL for a local server
  database: "places", // The database name

  // Database user credentials to use
  username: "places",
  password: "placesdevelop"
};

const DB = new arangojs.Database({
  url: dbConfig.url
});
DB.useDatabase(dbConfig.database);
DB.useBasicAuth(dbConfig.username, dbConfig.password);

module.exports = DB;
