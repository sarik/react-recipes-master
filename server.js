var express = require("express");
require("dotenv").config({ path: "variables.env" });
const userSchema = require("./userSchema");
var mongoose = require("mongoose");
//const User = mongoose.model("user", userSchema, "user");
var bodyParser = require("body-parser");
var cors = require("cors");
var User = require("./models/User");
var Recipe = require("./models/Recipe");
const jwt = require("jsonwebtoken");

//Bring in graphql-express middleware
var { graphiqlExpress, graphqlExpress } = require("apollo-server-express");
var { makeExecutableSchema } = require("graphql-tools");

const { resolvers } = require("./resolvers");
const { typeDefs } = require("./schema");

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

/* Database connection*/
var mongoose = require("mongoose");
const connector = mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected");
    //return User.findOne({ username: "bob" });
  })
  .catch(err => console.log("err while connecting", err));
//.then(console.log);

const PORT = process.env.PORT || 4444;

/* Creating the express server*/
var app = express();

app.use(cors("*"));

app.use((req, res, next) => {
  const token = req.headers["authorization"];
  if (token !== "null" || token !== "" ) {
    try {
      const currUser = jwt.verify(token, process.env.secret);
      req.currUser = currUser;
    } catch (err) {
      console.log(err);
    }
  }
  next();
});

//app.use(bodyParser.json());
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

app.use(
  "/graphql",
  bodyParser.json(),
  // graphqlExpress((req passed here) =>
  graphqlExpress(({ currUser }) => ({
    schema,
    context: {
      Recipe,
      User,
      currUser
    }
  }))
);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
