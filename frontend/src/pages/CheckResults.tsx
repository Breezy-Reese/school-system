import { useState, useEffect } from 'react';

function CheckResults() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      // Get logged-in user from localStorage (assuming it's stored there)
      const user = localStorage.getItem('user');
      if (user) {
        const userObj = JSON.parse(user);
        const response = await fetch(`https://school-system-4m52.onrender.com/api/results?student=${userObj.email}`);
        const data = await response.json();
        setResults(data);
      }
    } catch (error) {
      console.error('Error fetching results:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-6">Loading results...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-indigo-700 mb-4">Check Results</h1>
      <div className="bg-white p-4 rounded-lg shadow">
        {results.length > 0 ? (
          <div className="space-y-2">
            {results.map((result, index) => (
              <div key={index} className="p-2 border rounded flex justify-between">
                <span className="font-medium">{result.subject} ({result.examType})</span>
                <span className="font-bold text-lg">{result.marks}/100</span>
              </div>
            ))}
          </div>
        ) : (
          <p>No results available yet.</p>
        )}
      </div>
    </div>
  );
}

export default CheckResults;
