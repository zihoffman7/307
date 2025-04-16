import { useState } from 'react';

function Form({ handleSubmit }) {
  const [formData, setFormData] = useState({ name: '', job: '' })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  const submitForm = (e) => {
    e.preventDefault();
    handleSubmit(prev => [...prev, formData]);
    setFormData({ name: '', job: '' });
  }

  return (
    <form onSubmit={submitForm}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="job"
        placeholder="Job"
        value={formData.job}
        onChange={handleChange}
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default Form;
