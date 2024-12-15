import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OfficeLocations = () => {
  const [offices, setOffices] = useState([]);
  const [newOffice, setNewOffice] = useState({ name: '', latitude: '', longitude: '' });

  // Fetch all offices on component mount
  useEffect(() => {
    axios.get('http://localhost:5003/api/offices')
      .then(response => setOffices(response.data))
      .catch(error => console.error('Error fetching office locations:', error));
  }, []);

  const handleAddOffice = () => {
    axios.post('http://localhost:5003/api/offices', newOffice)
      .then(response => {
        setOffices([...offices, response.data]);
        setNewOffice({ name: '', latitude: '', longitude: '' }); // Reset form
      })
      .catch(error => console.error('Error adding office:', error));
  };

  const handleUpdateOffice = (id, updatedOffice) => {
    axios.put(`http://localhost:5003/api/offices/${id}`, updatedOffice)
      .then(response => {
        const updatedOffices = offices.map(office =>
          office.id === id ? response.data : office
        );
        setOffices(updatedOffices);
      })
      .catch(error => console.error('Error updating office:', error));
  };

  const handleDeleteOffice = (id) => {
    if (window.confirm('Are you sure you want to delete this office?')) {
      axios.delete(`http://localhost:5003/api/offices/${id}`)
        .then(() => {
          setOffices(offices.filter(office => office.id !== id));
        })
        .catch(error => console.error('Error deleting office:', error));
    }
  };

  return (
    <div className="office-locations">
      <h2>Office Locations</h2>
      <div>
        <h3>Add New Office</h3>
        <input 
          type="text" 
          placeholder="Office Name" 
          value={newOffice.name}
          onChange={(e) => setNewOffice({ ...newOffice, name: e.target.value })}
        />
        <input 
          type="text" 
          placeholder="Latitude"
          value={newOffice.latitude}
          onChange={(e) => setNewOffice({ ...newOffice, latitude: e.target.value })}
        />
        <input 
          type="text" 
          placeholder="Longitude"
          value={newOffice.longitude}
          onChange={(e) => setNewOffice({ ...newOffice, longitude: e.target.value })}
        />
        <button onClick={handleAddOffice}>Add Office</button>
      </div>

      <div>
        <h3>Existing Offices</h3>
        <ul>
          {offices.map(office => (
            <li key={office.id}>
              <span>{office.name} - {office.latitude}, {office.longitude}</span>
              <button onClick={() => handleUpdateOffice(office.id, { ...office, name: 'Updated Name' })}>Edit</button>
              <button onClick={() => handleDeleteOffice(office.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OfficeLocations;
