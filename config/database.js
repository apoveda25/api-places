const mongoose = require("mongoose");

const dbName = "api_places";

module.exports = {
  connect: () => {
    mongoose.connect(`mongodb://localhost/${dbName}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  },
  dbName,
  connection: () => {
    if (mongoose.connection) return mongoose.connection;
    return this.connect;
  }
};
