import React, { useState } from 'react';
import axios from 'axios';

const AddUserForm = () => {
  const [formData, setFormData] = useState({ id: '', name: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/add-user', formData);
      alert('User added successfully!');
      setFormData({ id: '', name: '' });
    } catch (err) {
      console.error(err);
      alert('Failed to add user');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-sm mx-auto border rounded shadow">
      <h2 className="text-lg font-bold mb-4">Add User</h2>
      <input
        type="text"
        name="id"
        placeholder="User ID (optional)"
        value={formData.id}
        onChange={handleChange}
        className="block w-full mb-2 border p-2 rounded"
      />
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="block w-full mb-2 border p-2 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default AddUserForm;
