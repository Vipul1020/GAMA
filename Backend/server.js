const express = require('express');
const mysql = require('mysql2/promise'); // Use mysql2/promise
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const moment = require('moment');
const setupWebSocketServer = require('./websocket');
const bcrypt = require('bcrypt');

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// MySQL connection setup with promises
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'attendance_tracking',
};

const pool = mysql.createPool(dbConfig); // Use connection pool for better performance

// Create HTTP server
const server = http.createServer(app);
const { broadcast } = setupWebSocketServer(server);

// Sign-Up Endpoint
app.post('/api/signup', async (req, res) => {
  const { name, email, password, position, role } = req.body;
  const createdAt = new Date();

  const sql = `INSERT INTO employees (name, email, password, position, role, created_at) VALUES (?, ?, ?, ?, ?, ?)`;
  try {
    await pool.query(sql, [name, email, password, position, role, createdAt]);
    res.send('Sign-up successful');
  } catch (err) {
    console.error('Error during sign-up:', err);
    res.status(500).send('Error during sign-up');
  }
});

// Login Endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  const sql = `SELECT * FROM employees WHERE email = ? AND password = ?`;
  try {
    const [results] = await pool.query(sql, [email, password]);
    if (results.length > 0) {
      const user = results[0];
      res.send({
        name: user.name,
        role: user.role,
        employeeId: user.id
      });
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).send('Error during login');
  }
});

// Profile Endpoint
app.post('/api/profile', async (req, res) => {
  const { email } = req.body;

  const sql = `SELECT name, email, position FROM employees WHERE email = ?`;
  try {
    const [results] = await pool.query(sql, [email]);
    if (results.length > 0) {
      res.send(results[0]);
    } else {
      res.status(404).send('Profile not found');
    }
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).send('Error fetching profile');
  }
});

app.put('/api/update-profile', async (req, res) => {
  const { email, name, position, oldPassword, newPassword, role } = req.body;

  try {
    // Fetch the user's current data (including password, name, and role)
    const [results] = await pool.query('SELECT password, name, role FROM employees WHERE email = ?', [email]);
    if (results.length === 0) {
      return res.status(404).send({ message: 'User not found' });
    }

    const user = results[0];

    // Update the password if oldPassword and newPassword are provided
    if (oldPassword && newPassword) {
      if (oldPassword !== user.password) { // Compare the plain text old password
        return res.status(400).send({ message: 'Incorrect old password' });
      }

      // Update only the password field
      await pool.query('UPDATE employees SET password = ? WHERE email = ?', [newPassword, email]);
    }

    // Update name and position if provided
    if (name && position) {
      await pool.query('UPDATE employees SET name = ?, position = ? WHERE email = ?', [name, position, email]);
    }

    // Update role if provided
    if (role) {
      await pool.query('UPDATE employees SET role = ? WHERE email = ?', [role, email]);
    }

    res.send({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).send({ message: 'Error updating profile' });
  }
});

// Automatic Check-In Endpoint
app.post('/checkin', async (req, res) => {
  const { employeeId, latitude, longitude, officeId, officeName } = req.body;
  const location = `${latitude}, ${longitude}`;

  // If office details are provided, include them in the attendance record
  const sql = `INSERT INTO attendance (employee_id, check_in_time, location, office_id, office_name) VALUES (?, NOW(), ?, ?, ?)`;
  try {
    await pool.query(sql, [employeeId, location, officeId, officeName]);

    const checkInData = {
      employeeId,
      location,
      officeId,
      officeName,
      check_in_time: new Date()
    };
    broadcast({ type: 'CHECKIN', data: checkInData });
    res.send('Check-in successful');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error during check-in');
  }
});

// Manual Check-In Endpoint
app.post('/manual-checkin', async (req, res) => {
  const { employeeId, officeId } = req.body;

  const sql = `SELECT * FROM offices WHERE id = ?`;
  try {
    const [results] = await pool.query(sql, [officeId]);
    if (results.length === 0) {
      return res.status(400).send('Invalid office selected');
    }

    const office = results[0];
    const checkInSql = `INSERT INTO attendance (employee_id, check_in_time, location, office_id, office_name) VALUES (?, NOW(), ?, ?, ?)`;
    await pool.query(checkInSql, [employeeId, `${office.latitude}, ${office.longitude}`, office.id, office.name]);

    const manualCheckInData = {
      employeeId,
      location: `${office.latitude}, ${office.longitude}`,
      office: office.name,
      officeId: office.id,
      check_in_time: new Date()
    };
    broadcast({ type: 'MANUAL_CHECKIN', data: manualCheckInData });
    res.send(`Manually checked in at ${office.name}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error during manual check-in');
  }
});

// Check-Out Endpoint
app.post('/checkout', async (req, res) => {
  const { employeeId } = req.body;

  const sql = `SELECT id, check_in_time FROM attendance WHERE employee_id = ? AND check_out_time IS NULL ORDER BY check_in_time DESC LIMIT 1`;
  try {
    const [result] = await pool.query(sql, [employeeId]);
    if (result.length === 0) {
      return res.status(400).send('No active check-in found');
    }

    const attendanceId = result[0].id;
    const updateSql = `UPDATE attendance SET check_out_time = NOW() WHERE id = ?`;
    await pool.query(updateSql, [attendanceId]);

    const verifySql = `SELECT * FROM attendance WHERE id = ?`;
    const [updatedResult] = await pool.query(verifySql, [attendanceId]);

    const updatedRecord = updatedResult[0];
    const checkOutData = {
      employeeId,
      check_in_time: updatedRecord.check_in_time,
      check_out_time: updatedRecord.check_out_time
    };
    broadcast({ type: 'CHECKOUT', data: checkOutData });
    res.send('Check-out successful');
  } catch (err) {
    console.error('Error during check-out:', err);
    res.status(500).send('Error during check-out');
  }
});

// Manual Check-Out Endpoint
app.post('/manual-checkout', async (req, res) => {
  const { employeeId } = req.body;

  const sql = `UPDATE attendance SET check_out_time = NOW() WHERE employee_id = ? AND check_out_time IS NULL`;
  try {
    await pool.query(sql, [employeeId]);

    broadcast({ type: 'MANUAL_CHECKOUT', data: { employeeId, check_out_time: new Date() } });
    res.send('Manual check-out successful');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error during manual check-out');
  }
});

app.get('/api/employees', async (req, res) => {
  try {
    const [employees] = await pool.query('SELECT id, name, email, position, role FROM employees');
    res.json(employees);
  } catch (err) {
    console.error('Error fetching employees:', err);
    res.status(500).send('Error fetching employees');
  }
});

// Get a single employee's details by ID
app.get('/api/employees/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [employee] = await pool.query('SELECT id, name, email, position, role FROM employees WHERE id = ?', [id]);
    if (employee.length > 0) {
      res.json(employee[0]);
    } else {
      res.status(404).send('Employee not found');
    }
  } catch (err) {
    console.error('Error fetching employee:', err);
    res.status(500).send('Error fetching employee');
  }
});

// Add a new employee
app.post('/api/employees', async (req, res) => {
  const { name, email, position, role, password } = req.body;
  try {
    await pool.query('INSERT INTO employees (name, email, position, role, password) VALUES (?, ?, ?, ?, ?)', [name, email, position, role, password]);
    res.status(201).send('Employee added successfully');
  } catch (err) {
    console.error('Error adding employee:', err);
    res.status(500).send('Error adding employee');
  }
});

// Update an employee's details
app.put('/api/employees/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, position, role, password } = req.body;

  let query = 'UPDATE employees SET name = ?, email = ?, position = ?, role = ? WHERE id = ?';
  let params = [name, email, position, role, id];

  if (password) {
    query = 'UPDATE employees SET name = ?, email = ?, position = ?, role = ?, password = ? WHERE id = ?';
    params.push(password); // Add password to the params if provided
  }

  try {
    const [result] = await pool.query(query, params);
    if (result.affectedRows > 0) {
      res.status(200).send('Employee updated successfully');
    } else {
      res.status(404).send('Employee not found');
    }
  } catch (err) {
    console.error('Error updating employee:', err);
    res.status(500).send('Error updating employee');
  }
});

// Delete an employee
app.delete('/api/employees/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    // Ensure the ID is a valid number
    if (isNaN(id)) {
      return res.status(400).send('Invalid employee ID');
    }

    // Query to delete the employee
    const [result] = await pool.query('DELETE FROM employees WHERE id = ?', [id]);

    if (result.affectedRows > 0) {
      res.status(200).send('Employee deleted successfully');
    } else {
      res.status(404).send('Employee not found');
    }
  } catch (err) {
    console.error('Error deleting employee:', err);
    res.status(500).send('Error deleting employee');
  }
});

// Attendance Records Routes

// Get attendance records for a specific employee
app.get('/api/attendance/:employeeId', async (req, res) => {
  const { employeeId } = req.params;
  const sql = `SELECT * FROM attendance WHERE employee_id = ? ORDER BY check_in_time DESC`;

  try {
    const [result] = await pool.query(sql, [employeeId]);
    res.json(result);
  } catch (err) {
    console.error('Error fetching attendance records:', err);
    res.status(500).send('Error fetching attendance records');
  }
});

app.put('/api/attendance/approve/:attendanceId', async (req, res) => {
  const { attendanceId } = req.params;
  const { approved } = req.body;  // You would send 'approved' in the request body.

  const sql = `UPDATE attendance SET approved = ? WHERE id = ?`;

  try {
    const [result] = await pool.query(sql, [approved, attendanceId]);
    if (result.affectedRows > 0) {
      res.status(200).send('Attendance status updated successfully');
    } else {
      res.status(404).send('Attendance record not found');
    }
  } catch (err) {
    console.error('Error updating attendance approval:', err);
    res.status(500).send('Error updating attendance approval');
  }
});

// Approve multiple attendance records
app.put('/api/attendance/approve', async (req, res) => {
  const { attendanceIds } = req.body;

  if (!attendanceIds || attendanceIds.length === 0) {
    return res.status(400).send('No attendance records provided for approval');
  }

  // Prepare query to update multiple records
  const sql = `UPDATE attendance SET approved = 1 WHERE id IN (?)`;

  try {
    await pool.query(sql, [attendanceIds]); // Use the IN clause to update multiple records
    res.status(200).send('Attendance records approved successfully');
  } catch (err) {
    console.error('Error approving attendance records:', err);
    res.status(500).send('Error approving attendance records');
  }
});

// Office Locations Route

// Get all office locations
app.get('/offices', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT id, name, latitude, longitude FROM offices');
    res.json(results);
  } catch (error) {
    console.error('Error fetching offices:', error);
    res.status(500).send('Error fetching office locations');
  }
});


// Total Hours Calculation Endpoint
app.get('/total-hours', async (req, res) => {
  const { employeeId, date } = req.query;
  const selectedDate = date || new Date().toISOString().split('T')[0];

  const sql = `SELECT check_in_time, check_out_time FROM attendance WHERE employee_id = ? AND DATE(check_in_time) = ? AND check_out_time IS NOT NULL`;
  try {
    const [results] = await pool.query(sql, [employeeId, selectedDate]);

    let totalMinutes = 0;
    results.forEach(record => {
      const checkIn = new Date(record.check_in_time);
      const checkOut = new Date(record.check_out_time);
      if (checkOut > checkIn) {
        const diffMs = checkOut - checkIn;
        const diffMins = diffMs / (1000 * 60);
        totalMinutes += diffMins;
      }
    });

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    res.json({ totalHours: `${hours} hours and ${minutes} minutes` });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching attendance records');
  }
});

// Start server
const PORT = 5003;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
