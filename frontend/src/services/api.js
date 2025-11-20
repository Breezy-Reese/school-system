const API_BASE_URL = 'https://school-system-4m52.onrender.com/api';

const api = {
  // Users
  getUsers: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/users?${query}`);
    return response.json();
  },

  getUserCount: async (role) => {
    const response = await fetch(`${API_BASE_URL}/users/count?role=${role}`);
    return response.json();
  },

  getUserDistribution: async () => {
    const response = await fetch(`${API_BASE_URL}/users/distribution`);
    return response.json();
  },

  createUser: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  updateUser: async (id, userData) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  deleteUser: async (id) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },

  // Attendance
  getAttendance: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/attendance?${query}`);
    return response.json();
  },

  markAttendance: async (attendanceData) => {
    const response = await fetch(`${API_BASE_URL}/attendance`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(attendanceData),
    });
    return response.json();
  },

  // Fees
  getFees: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/fees?${query}`);
    return response.json();
  },

  createFee: async (feeData) => {
    const response = await fetch(`${API_BASE_URL}/fees`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(feeData),
    });
    return response.json();
  },

  updateFee: async (id, feeData) => {
    const response = await fetch(`${API_BASE_URL}/fees/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(feeData),
    });
    return response.json();
  },

  deleteFee: async (id) => {
    const response = await fetch(`${API_BASE_URL}/fees/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },

  // Results
  getResults: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/results?${query}`);
    return response.json();
  },

  createResult: async (resultData) => {
    const response = await fetch(`${API_BASE_URL}/results`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(resultData),
    });
    return response.json();
  },

  updateResult: async (id, resultData) => {
    const response = await fetch(`${API_BASE_URL}/results/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(resultData),
    });
    return response.json();
  },

  deleteResult: async (id) => {
    const response = await fetch(`${API_BASE_URL}/results/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },

  // Timetable
  getTimetable: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/timetable?${query}`);
    return response.json();
  },

  createTimetable: async (timetableData) => {
    const response = await fetch(`${API_BASE_URL}/timetable`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(timetableData),
    });
    return response.json();
  },

  updateTimetable: async (id, timetableData) => {
    const response = await fetch(`${API_BASE_URL}/timetable/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(timetableData),
    });
    return response.json();
  },

  deleteTimetable: async (id) => {
    const response = await fetch(`${API_BASE_URL}/timetable/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },

  // Admin endpoints
  getAdminUsers: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/users`);
    return response.json();
  },

  getAdminFees: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/fees`);
    return response.json();
  },

  getAdminAttendance: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/attendance`);
    return response.json();
  },

  getAdminResults: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/results`);
    return response.json();
  },

  getAdminTimetable: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/timetable`);
    return response.json();
  },

  // Reports
  getReports: async (type) => {
    const [salesRes, usersRes] = await Promise.all([
      fetch(`${API_BASE_URL}/admin/reports/sales`),
      fetch(`${API_BASE_URL}/admin/reports/users`)
    ]);
    const sales = await salesRes.json();
    const users = await usersRes.json();
    return { sales, users };
  },

  // System Health
  getSystemHealth: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/system/health`);
    return response.json();
  },

  // Advanced Reports
  getAdvancedReports: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/reports/advanced`);
    return response.json();
  },

  // Activity Logs
  getActivityLogs: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/logs/activity`);
    return response.json();
  },

  // Admin actions
  deleteUser: async (id) => {
    const response = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },

  updateFeeStatus: async (id, status) => {
    const response = await fetch(`${API_BASE_URL}/fees/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    return response.json();
  },

  // Generic methods
  get: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    return response.json();
  },

  put: async (endpoint, data = null) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: data ? { 'Content-Type': 'application/json' } : {},
      body: data ? JSON.stringify(data) : null,
    });
    return response.json();
  },

  delete: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
    });
    return response.json();
  },
};

export default api;
