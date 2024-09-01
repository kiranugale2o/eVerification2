const mongoose = require("mongoose");
//database conncetion
async function DatabaseConn() {
  const Mongo_DB="mongodb+srv://ugalekiran29:o98nm12JL1i7TyoI@cluster0.pniravn.mongodb.net/Everification";
  mongoose
    .connect(Mongo_DB)
    .then(() => {
      console.log("connected");
    })
    .catch(() => {
      console.log("disconnected");
    });
}

module.exports = DatabaseConn;
