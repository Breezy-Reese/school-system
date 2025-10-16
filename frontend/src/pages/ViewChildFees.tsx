import { useState, useEffect } from 'react';

interface Fee {
  _id: string;
  childName: string;
  amount: number;
  dueDate: string;
  status: string;
  description: string;
}

function ViewChildFees() {
  const [fees, setFees] = useState<Fee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFees();
  }, []);

  const fetchFees = async () => {
    const user = localStorage.getItem('user');
    const userObj = user ? JSON.parse(user) : null;
    if (!userObj || userObj.role !== 'parent') {
      setError('You must be logged in as a parent to view child fees.');
      setLoading(false);
      return;
    }

    try {
      // Fetch children of the parent
      const responseChildren = await fetch(`http://localhost:5000/api/users?role=student&parent=${userObj.email}`);
      if (!responseChildren.ok) {
        throw new Error('Failed to fetch children');
      }
      const children = await responseChildren.json();

      // Fetch fees for each child
      const feePromises = children.map(async (child: any) => {
        const responseFees = await fetch(`http://localhost:5000/api/fees?student=${child.email}`);
        if (!responseFees.ok) {
          throw new Error('Failed to fetch fees for child');
        }
        const feeData = await responseFees.json();
        return { childName: child.name, fees: feeData };
      });

      const feeResults = await Promise.all(feePromises);

      // Flatten fee records with child name
      const records = feeResults.flatMap((result: any) =>
        result.fees.map((fee: any) => ({
          _id: fee._id,
          childName: result.childName,
          amount: fee.amount,
          dueDate: fee.dueDate,
          status: fee.status,
          description: fee.description,
        }))
      );

      setFees(records);
    } catch (err: any) {
      setError(err.message || 'Error fetching fees');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6">Loading child fees...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-orange-700 mb-4">View Child Fees</h1>
      {fees.length === 0 ? (
        <p>No fee records found for your children.</p>
      ) : (
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Student</th>
              <th className="py-2 px-4 border-b">Amount</th>
              <th className="py-2 px-4 border-b">Due Date</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Description</th>
            </tr>
          </thead>
          <tbody>
            {fees.map((fee) => (
              <tr key={fee._id} className={fee.status === 'paid' ? 'text-green-600' : 'text-red-600'}>
                <td className="py-2 px-4 border-b">{fee.childName}</td>
                <td className="py-2 px-4 border-b">${fee.amount}</td>
                <td className="py-2 px-4 border-b">{new Date(fee.dueDate).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">{fee.status}</td>
                <td className="py-2 px-4 border-b">{fee.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewChildFees;
