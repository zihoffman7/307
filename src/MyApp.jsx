import { useState } from 'react';
import Table from './Table';
import Form from './Form';

function MyApp() {
  const [characters, setCharacters] = useState([]);

  return (
    <div className="container">
      <Table characterData={characters} />
      <Form handleSubmit={setCharacters} />
    </div>
  );
}

export default MyApp;
