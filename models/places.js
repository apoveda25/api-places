// const arangojs = require("arangojs");
// const dbConfig = require("../config/database");

// const DB = new arangojs.Database({
//   url: dbConfig.url
// });
// DB.useDatabase(dbConfig.database);
// DB.useBasicAuth(dbConfig.username, dbConfig.password);
const DB = require("../config/database");

const Place = DB.collection("Places");

// exports.create = async place => {
//   return await Place.save(place);
// };

class Places {
  static async findAll() {
    return await Place.all();
  }

  static async create(place) {
    return await Place.save(place);
  }
}

module.exports = Places;
