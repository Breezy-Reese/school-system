import { useState, useEffect } from 'react';

function UploadResults() {
  const [results, setResults] = useState({
    student: '',
    subject: '',
    marks: '',
    examType: 'regular',
  });
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users?role=student');
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setResults(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(results),
      });
      if (response.ok) {
        alert('Results uploaded successfully!');
        setResults({ student: '', subject: '', marks: '', examType: 'regular' });
      } else {
        alert('Error uploading results');
      }
    } catch (error) {
      console.error('Error uploading results:', error);
      alert('Error uploading results');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">Upload Results</h1>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow max-w-md">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Student</label>
          <select
            name="student"
            value={results.student}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Student</option>
            {students.map((student) => (
              <option key={student._id} value={student.email}>
                {student.name} ({student.email})
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Subject</label>
          <input
            type="text"
            name="subject"
            value={results.subject}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="e.g., Mathematics"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Marks</label>
          <input
            type="number"
            name="marks"
            value={results.marks}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="e.g., 85"
            min="0"
            max="100"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Exam Type</label>
          <select
            name="examType"
            value={results.examType}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="regular">Regular</option>
            <option value="midterm">Midterm</option>
            <option value="final">Final</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Upload Result
        </button>
      </form>
    </div>
  );
}

export default UploadResults;
