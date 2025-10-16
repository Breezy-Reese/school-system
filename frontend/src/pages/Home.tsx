import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

// Define a type for feature cards
type Feature = {
  id: number;
  title: string;
  desc: string;
  icon: React.ReactNode;
};

const features: Feature[] = [
  {
    id: 1,
    title: "Attendance",
    desc: "Quickly mark and review daily attendance with detailed reports.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7H3v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Exams & Results",
    desc: "Create exams, enter marks, and generate report cards instantly.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M3 7v10a4 4 0 004 4h10a4 4 0 004-4V7L12 3 3 7z"
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Timetables",
    desc: "Manage class schedules and avoid clashes with a visual timetable editor.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7H3v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Fees & Reports",
    desc: "Track payments, generate invoices and view financial reports easily.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-7 h-7"
        fill="none"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M12 8v4l3 3M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
];

export default function Home() {
  const [studentCount, setStudentCount] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);
  const [parentCount, setParentCount] = useState(0);

  useEffect(() => {
    // Fetch dynamic stats
    fetch("http://localhost:5000/api/users/count?role=student")
      .then(res => res.json())
      .then(data => setStudentCount(data.count))
      .catch(err => console.error(err));

    fetch("http://localhost:5000/api/users/count?role=teacher")
      .then(res => res.json())
      .then(data => setTeacherCount(data.count))
      .catch(err => console.error(err));

    fetch("http://localhost:5000/api/users/count?role=parent")
      .then(res => res.json())
      .then(data => setParentCount(data.count))
      .catch(err => console.error(err));
  }, []);

  const pieData = {
    labels: ['Students', 'Teachers', 'Parents'],
    datasets: [
      {
        data: [studentCount, teacherCount, parentCount],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
      <main className="container mx-auto px-6 py-12">
        {/* HERO */}
        <section id="hero" className="text-center py-20">
          <h1 className="text-5xl font-bold mb-6">
            Welcome to <span className="text-indigo-400">SchoolMS</span>
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            The complete school management solution for modern educational institutions.
            Streamline attendance, results, fees, and more with our powerful platform.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/login"
              className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Get Started
            </Link>
            <Link
              to="/dashboard"
              className="border border-white/30 hover:bg-white/10 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              View Dashboard
            </Link>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="py-20">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="bg-white/5 backdrop-blur-sm p-6 rounded-xl hover:bg-white/10 transition-colors"
              >
                <div className="text-indigo-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-300">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* STATS */}
        <section id="stats" className="container mx-auto px-6 py-12">
          <div className="rounded-xl bg-white/5 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-sm text-slate-300">
                Trusted by schools worldwide
              </p>
              <h3 className="text-3xl font-bold mt-2">
                Join {studentCount + teacherCount + parentCount}+ users using SchoolMS
              </h3>
            </div>
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-2xl font-bold">{studentCount}</p>
                <p className="text-sm text-slate-300">Students</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{teacherCount}</p>
                <p className="text-sm text-slate-300">Teachers</p>
              </div>
              <div>
                <p className="text-2xl font-bold">99.9%</p>
                <p className="text-sm text-slate-300">Uptime</p>
              </div>
            </div>
          </div>
        </section>

        {/* PIE CHART */}
        <section id="chart" className="py-20">
          <h2 className="text-3xl font-bold text-center mb-12">User Distribution</h2>
          <div className="flex justify-center">
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl w-full max-w-md">
              <Pie data={pieData} />
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-12 border-t border-white/6">
          <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h4 className="font-bold text-white">SchoolMS</h4>
              <p className="text-slate-300 text-sm mt-2">
                Built for schools — simple, secure and fast.
              </p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-slate-300 hover:text-white">
                Contact
              </a>
              <a href="#" className="text-sm text-slate-300 hover:text-white">
                Privacy
              </a>
              <a href="#" className="text-sm text-slate-300 hover:text-white">
                Docs
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
