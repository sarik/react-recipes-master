const mongoose = require("mongoose");
const userSchema = require("./userSchema");
const User = mongoose.model("User", userSchema,"User");

async function createUser(username) {
  return new User({
    username,
    created: Date.now()
  }).save();
}

async function findUser(username) {
  return await User.findOne({ username });
}

(async () => {
  const uri =

  'mongodb://sariksid:sariksid@cluster0-shard-00-00-qgjn6.mongodb.net:27017,cluster0-shard-00-01-qgjn6.mongodb.net:27017,cluster0-shard-00-02-qgjn6.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';
  
  const connector = mongoose.connect(uri);
  //const username = process.argv[2].split("=")[1];
  const username = 'bobby';
  let user = await connector.then(async () => {
    return findUser(username);
  }).catch(console.log);

  if (!user) {
    user = await createUser(username);
  }

  console.log(user);
  process.exit(0);
})();
