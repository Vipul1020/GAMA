import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = ({ onSelectUser, onSelectAttendance }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true); // To show loading state for employees

  // Fetch employees from API when the component mounts
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5003/api/employees');
        setEmployees(response.data); // Set employees to state
        setLoading(false); // Turn off loading when data is fetched
      } catch (error) {
        console.error('Error fetching employees:', error);
        setLoading(false); // Turn off loading if there is an error
      }
    };

    fetchEmployees();
  }, []);

  // Handle employee deletion
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      axios.delete(`http://localhost:5003/api/employees/${id}`)
        .then(response => {
          alert('Employee deleted successfully');
          setEmployees(employees.filter(employee => employee.id !== id)); // Remove the employee from the list
        })
        .catch(error => {
          console.error('Error deleting employee:', error);
          alert('Failed to delete employee. Please try again.');
        });
    }
  };

  // Render loading state for employee list
  const renderEmployeeList = () => {
    if (loading) {
      return <p>Loading employees...</p>; // Display loading message for employees
    }

    if (employees.length === 0) {
      return <p>No employees found.</p>; // Display message if no employees found
    }

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.position}</td>
              <td>{employee.role}</td>
              <td>
                <button className="btn btn-green" onClick={() => onSelectUser(employee.id)}>Edit</button>
                <button className="btn btn-blue" onClick={() => onSelectAttendance(employee.id)}>View Attendance</button>
                <button className="btn btn-red" onClick={() => handleDelete(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="card">
      <h2 className="card-title">Employee List</h2>
      {renderEmployeeList()} {/* Render employee list */}
    </div>
  );
};

export default UserList;
