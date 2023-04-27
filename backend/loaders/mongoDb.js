const mongoose = require("mongoose");

async function startDb() {
  await mongoose.connect(
    "mongodb+srv://lenitoarruda:478811901@dbmywebsite.w8j4isr.mongodb.net/test"
  );
}

module.exports = startDb;
