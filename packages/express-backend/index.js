import express from "express";

const app = express();
const port = 8000;

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};


app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});



const deleteUserById = (id) => {
  users["users_list"] = users["users_list"].filter(
    (user) => user["id"] !== id
  );
};

const findUserByData = (data) => {
  return users["users_list"].filter((user) => {
    if (data.name && data.job) {
      return user["name"] === data.name && user["job"] === data.job;
    } else if (data.name) {
      return user["name"] === data.name;
    } else if (data.job) {
      return user["job"] === data.job;
    } else {
      return true;
    }
  });
};

app.get("/users", (req, res) => {
  const { name, job } = req.query;

  let result = findUserByData({ name, job });
  result = { users_list: result };
  res.send(result);
});

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params["id"];
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  try {
    let result = deleteUserById(id);
  } catch (err) {
    res.status(500).send()
  }
  console.log(users)

  res.status(204).send()
});

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.send();
});


app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});
