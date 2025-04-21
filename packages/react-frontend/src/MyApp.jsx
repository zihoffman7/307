import React, { useState, useEffect } from "react";

import Table from './Table';
import Form from './Form';



function MyApp() {
  const [characters, setCharacters] = useState([]);

  const removeCharacter = index => {
    const updatedCharacters = characters.filter((_, i) => i !== index)
    setCharacters(updatedCharacters)
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  function updateList(person) {
    postUser(person)
      .then((res) => {
        if (res.status === 201) {
          res.json()
          .then((data) => {
            console.log(data);
            setCharacters([...characters, data])
        })
    } else {
          console.log(`Bad status: ${res.status}`)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(person)
    });

    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;
