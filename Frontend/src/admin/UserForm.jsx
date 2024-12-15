import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserForm = ({ employeeId, onSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState(''); // Password field

  useEffect(() => {
    if (employeeId) {
      axios.get(`http://localhost:5003/api/employees/${employeeId}`)
        .then(response => {
          const { name, email, position, role } = response.data;
          setName(name);
          setEmail(email);
          setPosition(position);
          setRole(role);
        })
        .catch(error => {
          console.error('Error fetching employee:', error);
        });
    }
  }, [employeeId]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const employeeData = { name, email, position, role };

    // Only include the password if it's provided
    if (password) {
      employeeData.password = password;
    }

    if (employeeId) {
      // Update the existing employee
      axios.put(`http://localhost:5003/api/employees/${employeeId}`, employeeData)
        .then(response => {
          alert('Employee updated successfully');
          onSuccess(); // Callback to reset the form or handle post-update actions
        })
        .catch(error => {
          console.error('Error updating employee:', error);
        });
    } else {
      // Add a new employee
      axios.post('http://localhost:5003/api/employees', employeeData)
        .then(response => {
          alert('Employee added successfully');
          onSuccess(); // Callback to reset the form or handle post-add actions
        })
        .catch(error => {
          console.error('Error adding employee:', error);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Position:</label>
        <input
          type="text"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Role:</label>
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password (leave empty to keep existing):</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default UserForm;
