import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import userService from "./user-services/user-service.js";

const app = express();
const port = 8000;
dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
mongoose
  .connect(MONGO_CONNECTION_STRING + "users")
  .catch((error) => console.log(error));

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const name = req.query["name"];
  const job = req.query["job"];

  userService
    .getUsers(name, job)
    .then((result) => {
      const usersWithId = result.map(user => {
        const { _id, ...rest } = user.toObject();
        return { id: _id, ...rest };
      });

      res.send({ users_list: usersWithId });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("An error occurred in the server.");
    });
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"];
  userService.findUserById(id).then((result) => {
    if (result === undefined || result === null)
      res.status(404).send("Resource not found.");
    else res.send({ users_list: result });
  });
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  console.log(id)
  userService.deleteUserById(id).then((result) => {
    console.log(result)
    res.status(204).send();
  });

  //
  // const id = req.params["id"];
  // try {
  //   deleteUserById(id);
  //
  // } catch (err) {
  //   res.status(404).send('User not found');
  // }
});

app.post("/users", (req, res) => {
  const user = req.body;

  userService.addUser(user)
    .then((savedUser) => {
      if (savedUser) {
        const { _id, ...rest } = savedUser.toObject();
        res.status(201).send({ id: _id, ...rest });
      } else {
        res.status(500).end();
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("An error occurred while creating the user.");
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
