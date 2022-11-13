const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL);
const connection = mongoose.connection;

connection.on("connected", (err) => {
    if(err)
    return console.log("error");
  console.log("mongodb is connected sucessully");
});

module.exports = mongoose;
