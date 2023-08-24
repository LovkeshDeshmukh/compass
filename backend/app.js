/* eslint-disable no-undef */
const jsonServer = require("json-server");
const app = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

app.use(middlewares);
app.use(jsonServer.bodyParser);
app.use(async (req, res, next) => {
  if (req.path.includes("/new/")) {
    const newTable = req.path.replace("/new/", "");

    let db = require("./db.json");
    delete require.cache[require.resolve("./db.json")];
    db = require("./db.json");
    db[newTable] = db[newTable] || [];

    fs.writeFile("./db.json", JSON.stringify(db), (error) => {
      if (error) {
        res.status(500).json({
          message: "Server error",
        });
      } else {
        res.status(200).json({
          message: "Data written successfully to disk",
        });
      }
    });
  } else if (req.path.includes("/deleteall")) {
    const table = req.path.replace("/deleteall", "").replace("/", "");

    let db = require("./db.json");
    delete require.cache[require.resolve("./db.json")];
    db = require("./db.json");
    db[table] = [];

    fs.writeFile("./db.json", JSON.stringify(db), (error) => {
      if (error) {
        res.status(500).json({
          message: "Server error",
        });
      } else {
        res.status(200).json({
          message: "Data written successfully to disk",
        });
      }
    });
  } else if (req.path.includes("/deletemultiple")) {
    const table = req.path.replace("/deletemultiple", "").replace("/", "");

    let db = require("./db.json");
    delete require.cache[require.resolve("./db.json")];
    db = require("./db.json");
    const ids = req.body.ids
    db[table] = db[table].filter((i)=>!ids.includes(i.id))

    fs.writeFile("./db.json", JSON.stringify(db), (error) => {
      if (error) {
        res.status(500).json({
          message: "Server error",
        });
      } else {
        res.status(200).json({
          message: "Data written successfully to disk",
        });
      }
    });
  } else if (req.path.includes("/drop")) {
    const table = req.path.replace("/drop", "").replace("/", "");

    let db = require("./db.json");
    delete require.cache[require.resolve("./db.json")];
    db = require("./db.json");
    delete db[table];

    fs.writeFile("./db.json", JSON.stringify(db), (error) => {
      if (error) {
        res.status(500).json({
          message: "Server error",
        });
      } else {
        res.status(200).json({
          message: "Data written successfully to disk",
        });
      }
    });
  } else if (req.method === "POST") {
    try {
      req.body.id = uuidv4();
      next();
    } catch (error) {
      res.status(500).json({
        message: "Server error",
      });
    }
  } else if (req.path === "/backup") {
    try {
      let db = require("./db.json");
      delete require.cache[require.resolve("./db.json")];
      db = require("./db.json");
      res.status(200).json(db);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Server error",
      });
    }
  } else {
    next();
  }
});
app.use(router);
app.listen(5001, () => {
  console.log("JSON Server is running");
});
