import { useState, useEffect } from 'react';

interface Result {
  _id: string;
  subject: string;
  marks: number;
  examType: string;
  student: {
    name: string;
  };
}

interface Child {
  _id: string;
  name: string;
  email: string;
}

function ViewChildResults() {
  const [children, setChildren] = useState<Child[]>([]);
  const [childResults, setChildResults] = useState<Record<string, Result[]>>({});
  const [loading, setLoading] = useState(true);
  const [selectedChild, setSelectedChild] = useState<string>('');

  useEffect(() => {
    fetchChildren();
  }, []);

  const fetchChildren = async () => {
    try {
      const user = localStorage.getItem('user');
      if (user) {
        const userObj = JSON.parse(user);
        // Fetch parent's children
        const response = await fetch(`https://school-system-4m52.onrender.com/api/users?role=student&parent=${userObj.email}`);
        const data = await response.json();
        setChildren(data);
        if (data.length > 0) {
          setSelectedChild(data[0].email);
          fetchResultsForChild(data[0].email);
        }
      }
    } catch (error) {
      console.error('Error fetching children:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchResultsForChild = async (childEmail: string) => {
    try {
      const response = await fetch(`https://school-system-4m52.onrender.com/api/results?student=${childEmail}`);
      const data = await response.json();
      setChildResults(prev => ({ ...prev, [childEmail]: data }));
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  const handleChildChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const childEmail = e.target.value;
    setSelectedChild(childEmail);
    if (!childResults[childEmail]) {
      fetchResultsForChild(childEmail);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  const currentResults = selectedChild ? childResults[selectedChild] || [] : [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-700 mb-4">View Child's Results</h1>
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Select Child</label>
          <select
            value={selectedChild}
            onChange={handleChildChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select a child</option>
            {children.map((child) => (
              <option key={child._id} value={child.email}>
                {child.name}
              </option>
            ))}
          </select>
        </div>
        {selectedChild ? (
          <div>
            <h2 className="text-lg font-semibold mb-2">Results for {children.find(c => c.email === selectedChild)?.name}</h2>
            {currentResults.length > 0 ? (
              <div className="space-y-2">
                {currentResults.map((result) => (
                  <div key={result._id} className="p-2 border rounded flex justify-between">
                    <span className="font-medium">{result.subject} ({result.examType})</span>
                    <span className="font-bold text-lg">{result.marks}/100</span>
                  </div>
                ))}
              </div>
            ) : (
              <p>No results available yet for this child.</p>
            )}
          </div>
        ) : (
          <p>Please select a child to view results.</p>
        )}
      </div>
    </div>
  );
}

export default ViewChildResults;
