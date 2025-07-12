import React, { useState } from 'react';
import axios from 'axios';

const typeOptions = [
  { label: 'String', value: 'string' },
  { label: 'Number', value: 'number' },
  { label: 'Boolean', value: 'boolean' },
  { label: 'Array', value: 'array' },
  { label: 'Object', value: 'object' },
];

const DynamicUserForm = () => {
  const [fields, setFields] = useState([{ key: '', value: '', type: 'string' }]);

  const handleFieldChange = (index, field, value) => {
    const updated = [...fields];
    updated[index][field] = value;
    setFields(updated);
  };

  const addField = () => {
    setFields([...fields, { key: '', value: '', type: 'string' }]);
  };

  const removeField = (index) => {
    const updated = [...fields];
    updated.splice(index, 1);
    setFields(updated);
  };

  const parseValue = (value, type) => {
    switch (type) {
      case 'number':
        return Number(value);
      case 'boolean':
        return value === 'true' || value === true;
      case 'array':
        // Split by comma, trim whitespace
        return value.split(',').map((v) => v.trim());
      case 'object':
        try {
          return JSON.parse(value);
        } catch {
          return {};
        }
      case 'string':
      default:
        return value;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {};
    fields.forEach(({ key, value, type }) => {
      if (!key) return;
      payload[key] = parseValue(value, type);
    });
    try {
      await axios.post('http://localhost:4000/add-user', payload);
      alert('User added successfully');
      setFields([{ key: '', value: '', type: 'string' }]);
    } catch (err) {
      console.error(err);
      alert('Failed to add user');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded space-y-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold">Dynamic User Form</h2>
      {fields.map((field, index) => (
        <div key={index} className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Key"
            value={field.key}
            onChange={(e) => handleFieldChange(index, 'key', e.target.value)}
            className="border px-2 py-1 rounded w-1/4"
            required
          />
          <select
            value={field.type}
            onChange={(e) => handleFieldChange(index, 'type', e.target.value)}
            className="border px-2 py-1 rounded w-1/4"
          >
            {typeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          {field.type === 'boolean' ? (
            <select
              value={field.value}
              onChange={(e) => handleFieldChange(index, 'value', e.target.value)}
              className="border px-2 py-1 rounded w-1/4"
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          ) : field.type === 'object' ? (
            <input
              type="text"
              placeholder='{"key": "value"}'
              value={field.value}
              onChange={(e) => handleFieldChange(index, 'value', e.target.value)}
              className="border px-2 py-1 rounded w-1/4"
              required
            />
          ) : field.type === 'array' ? (
            <input
              type="text"
              placeholder="Comma separated values"
              value={field.value}
              onChange={(e) => handleFieldChange(index, 'value', e.target.value)}
              className="border px-2 py-1 rounded w-1/4"
              required
            />
          ) : (
            <input
              type={field.type === 'number' ? 'number' : 'text'}
              placeholder="Value"
              value={field.value}
              onChange={(e) => handleFieldChange(index, 'value', e.target.value)}
              className="border px-2 py-1 rounded w-1/4"
              required
            />
          )}
          <button
            type="button"
            onClick={() => removeField(index)}
            className="text-red-600 font-bold"
          >
            ×
          </button>
        </div>
      ))}
      <div className="flex justify-between">
        <button type="button" onClick={addField} className="bg-gray-200 px-4 py-1 rounded">
          + Add Field
        </button>
        <button type="submit" className="bg-blue-600 text-white px-6 py-1 rounded">
          Submit
        </button>
      </div>
    </form>
  );
};

export default DynamicUserForm;
