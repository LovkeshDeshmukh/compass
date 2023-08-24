/* eslint-disable no-undef */
const jsonServer = require("json-server");
const app = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const { v4: uuidv4 } = require("uuid");

app.use(middlewares);
app.use(jsonServer.bodyParser);
app.use(async (req, res, next) => {
  console.log(req)
  if (req.method === "POST") {
    try {
      req.body.id = uuidv4();
      next();
    } catch (error) {
      res.status(500).json({
        message: "Server error",
      });
    }
  } else if (req.path==="/backup"){
    try {
      console.log("hi")
      let db = require("./db.json")
      delete require.cache[require.resolve("./db.json")]
      db = require("./db.json")
      res.status(200).json(db)
    } catch (error) {
      console.log(error)
      res.status(500).json({
        message: "Server error",
      });
    }
 
  }
  else {
    next();
  }
});
app.use(router);
app.listen(5001, () => {
  console.log("JSON Server is running");
});