import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManager = () => {
  const [formData, setFormData] = useState({ id: '', name: '' });
  const [users, setUsers] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:4000/users');
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editMode) {
      await axios.put(`http://localhost:4000/update-user/${formData.id}`, {
        name: formData.name
      });
    } else {
      await axios.post('http://localhost:4000/add-user', formData);
    }
    setFormData({ id: '', name: '' });
    setEditMode(false);
    fetchUsers();
  };

  const handleEdit = (user) => {
    setFormData(user);
    setEditMode(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:4000/delete-user/${id}`);
    fetchUsers();
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="mb-4 border rounded p-4 shadow">
        <h2 className="text-xl font-bold mb-2">{editMode ? 'Edit' : 'Add'} User</h2>
        <input
          type="text"
          name="id"
          placeholder="User ID"
          value={formData.id}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
          disabled={editMode}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="User Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 mb-2 border rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {editMode ? 'Update' : 'Add'}
        </button>
      </form>

      <h3 className="text-lg font-semibold mb-2">User List</h3>
      {users.map((user) => (
        <div key={user.id} className="flex justify-between items-center mb-2 border p-2 rounded">
          <span>{user.id}: {user.name}</span>
          <div>
            <button onClick={() => handleEdit(user)} className="mr-2 text-blue-600">Edit</button>
            <button onClick={() => handleDelete(user.id)} className="text-red-600">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserManager;
