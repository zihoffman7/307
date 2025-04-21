function Table({ characterData, removeCharacter }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Job</th>
        </tr>
      </thead>
      <tbody>
        {characterData.map((char, index) => (
          <tr key={index}>
            <td>{char.id}</td>
            <td>{char.name}</td>
            <td>{char.job}</td>
            <td>
              <button onClick={() => removeCharacter(char.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
