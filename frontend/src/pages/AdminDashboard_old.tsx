import { useState, useEffect } from 'react';
import { FaChartBar, FaHeart, FaFileAlt } from 'react-icons/fa';
import api from "../services/api";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  class?: string;
}

interface TimetableEntry {
  _id: string;
  class: string;
  subject: string;
  day: string;
  time: string;
  teacher?: { name: string };
}

interface Fee {
  _id: string;
  student?: { name: string };
  amount: number;
  dueDate: string;
  status: string;
}

interface Result {
  _id: string;
  student?: { name: string };
  subject: string;
  marks: number;
  examType: string;
}

interface SystemHealth {
  status: string;
  uptime: string;
  database: string;
  memory?: { rss: number };
  timestamp: string;
}

const sectionIcons = {
  Overview: <FaChartBar />,
  Users: <FaHeart />,
  Timetable: <FaFileAlt />,
  Attendance: <FaChartBar />,
  Results: <FaHeart />,
  Fees: <FaFileAlt />,
  Analytics: <FaChartBar />,
  System: <FaHeart />
};

type Section = keyof typeof sectionIcons;

function AdminDashboard() {
  const [studentCount, setStudentCount] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const [timetable, setTimetable] = useState<TimetableEntry[]>([]);
  const [fees, setFees] = useState<Fee[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [systemHealth, setSystemHealth] = useState<SystemHealth>({ status: '', uptime: '', database: '', timestamp: '' });
  const [section, setSection] = useState<Section>('Overview');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersRes, timetableRes, feesRes, resultsRes, healthRes] = await Promise.all([
        api.getUsers(),
        api.getTimetable(),
        api.getFees(),
        api.getResults(),
        api.getSystemHealth()
      ]);

      const usersData = usersRes.data;
      setUsers(usersData);
      setStudentCount(usersData.filter((user: User) => user.role === 'student').length);
      setTeacherCount(usersData.filter((user: User) => user.role === 'teacher').length);
      setTimetable(timetableRes.data);
      setFees(feesRes.data);
      setResults(resultsRes.data);
      setSystemHealth(healthRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const renderSection = () => {
    switch (section) {
      case 'Overview':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-500 text-white p-4 rounded-lg">
                <h3>Total Students</h3>
                <p className="text-2xl">{studentCount}</p>
              </div>
              <div className="bg-green-500 text-white p-4 rounded-lg">
                <h3>Total Teachers</h3>
                <p className="text-2xl">{teacherCount}</p>
              </div>
              <div className="bg-yellow-500 text-white p-4 rounded-lg">
                <h3>Total Fees</h3>
                <p className="text-2xl">${fees.length}</p>
              </div>
            </div>
          </div>
        );
      case 'Users':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Users</h2>
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Class</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{user.role}</td>
                    <td className="px-4 py-2">{user.class || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'Timetable':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Timetable</h2>
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th>Class</th>
                  <th>Subject</th>
                  <th>Day</th>
                  <th>Time</th>
                  <th>Teacher</th>
                </tr>
              </thead>
              <tbody>
                {timetable.map((entry) => (
                  <tr key={entry._id}>
                    <td className="px-4 py-2">{entry.class}</td>
                    <td className="px-4 py-2">{entry.subject}</td>
                    <td className="px-4 py-2">{entry.day}</td>
                    <td className="px-4 py-2">{entry.time}</td>
                    <td className="px-4 py-2">{entry.teacher?.name || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'Fees':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Fees</h2>
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Amount</th>
                  <th>Due Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {fees.map((fee) => (
                  <tr key={fee._id}>
                    <td className="px-4 py-2">{fee.student?.name || 'N/A'}</td>
                    <td className="px-4 py-2">${fee.amount}</td>
                    <td className="px-4 py-2">{new Date(fee.dueDate).toLocaleDateString()}</td>
                    <td className="px-4 py-2">{fee.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'Results':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Results</h2>
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Subject</th>
                  <th>Marks</th>
                  <th>Exam Type</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result) => (
                  <tr key={result._id}>
                    <td className="px-4 py-2">{result.student?.name || 'N/A'}</td>
                    <td className="px-4 py-2">{result.subject}</td>
                    <td className="px-4 py-2">{result.marks}</td>
                    <td className="px-4 py-2">{result.examType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'Attendance':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Attendance</h2>
            <p>Attendance management section.</p>
          </div>
        );
      case 'Analytics':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Analytics</h2>
            <p>Analytics and reports section.</p>
          </div>
        );
      case 'System':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">System Health</h2>
            <p><strong>Status:</strong> {systemHealth.status}</p>
            <p><strong>Uptime:</strong> {systemHealth.uptime}</p>
            <p><strong>Database:</strong> {systemHealth.database}</p>
            <p><strong>Memory Usage:</strong> {systemHealth.memory?.rss}</p>
            <p><strong>Timestamp:</strong> {new Date(systemHealth.timestamp).toLocaleString()}</p>
          </div>
        );
      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="flex mb-6">
        {Object.keys(sectionIcons).map((sec) => (
          <button
            key={sec}
            className={`mr-4 p-2 ${section === sec ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setSection(sec as Section)}
          >
            {sectionIcons[sec as Section]} {sec}
          </button>
        ))}
      </div>
      {renderSection()}
    </div>
  );
}

export default AdminDashboard;
