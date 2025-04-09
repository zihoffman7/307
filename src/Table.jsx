function Table({ characterData }) {
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
            <td>{char.name}</td>
            <td>{char.job}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
