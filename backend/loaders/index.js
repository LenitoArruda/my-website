const mongoDb = require("./mongodb");

class Loaders {
  start() {
    mongoDb();
  }
}

module.exports = new Loaders();
