const mongoose = require("mongoose");
//database conncetion
async function DatabaseConn() {
  mongoose
    .connect(process.env.Mongo_DB)
    .then(() => {
      console.log("connected");
    })
    .catch(() => {
      console.log("disconnected");
    });
}

module.exports = DatabaseConn;
