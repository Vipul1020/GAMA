import axios from 'axios';

const authService = {
  login: async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5003/api/login', { email, password });
      if (response.data.role) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('employeeId', response.data.employeeId); // Store the employee ID
        localStorage.setItem('userName', response.data.name); // Store user name
      }
      return response.data;
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }
};

export default authService;
