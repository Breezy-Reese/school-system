# School Management System

A comprehensive full-stack web application for managing school operations, built with modern technologies. The system supports multiple user roles including administrators, teachers, students, and parents, providing a complete solution for attendance tracking, fee management, academic results, and timetable scheduling.

## Features

### User Management
- **Role-based Access Control**: Separate dashboards and permissions for Admin, Teacher, Student, and Parent roles
- **User Registration & Authentication**: Secure login system with JWT tokens
- **Profile Management**: Create, update, and delete user accounts

### Attendance Management
- **Mark Attendance**: Teachers can record daily attendance for their classes
- **View Attendance**: Students can check their attendance records, parents can view their child's attendance
- **Attendance Analytics**: Track attendance patterns and statistics

### Fee Management
- **Fee Creation**: Administrators can create and assign fees to students
- **Fee Tracking**: Monitor payment status and due dates
- **Parent Access**: Parents can view their child's fee information

### Academic Results
- **Result Upload**: Teachers can upload student exam results
- **Result Viewing**: Students can check their results, parents can view their child's results
- **Grade Management**: Support for different exam types and subjects

### Timetable Management
- **Schedule Creation**: Teachers and admins can create class timetables
- **Timetable Viewing**: Students can view their class schedules
- **Subject Assignment**: Link subjects to specific teachers and time slots

### Dashboard & Analytics
- **Role-specific Dashboards**: Customized interfaces for each user type
- **Data Visualization**: Charts and graphs for attendance, fees, and user statistics
- **Real-time Stats**: Dynamic statistics on the home page

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Frontend
- **React** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Chart.js** - Data visualization
- **React Chart.js 2** - React wrapper for Chart.js

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or cloud service like MongoDB Atlas)
- **Git** (for cloning the repository)

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd school-management-system
   ```

2. **Set up the Backend:**

   ```bash
   cd backend
   npm install
   ```

   Create a `.env` file in the backend directory:
   ```
   MONGO_URI=mongodb://localhost:27017/school-management
   # or for MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/school-management
   PORT=5000
   JWT_SECRET=your-secret-key-here
   ```

3. **Set up the Frontend:**

   ```bash
   cd ../frontend
   npm install
   ```

4. **Seed the Database (Optional):**

   If you have a seed script, run it to populate the database with sample data:
   ```bash
   cd ../backend
   npm run seed
   ```

## Usage

1. **Start the Backend Server:**
   ```bash
   cd backend
   npm run dev
   ```
   The backend will run on `http://localhost:5000`

2. **Start the Frontend Development Server:**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

3. **Access the Application:**
   - Open your browser and navigate to `http://localhost:5173`
   - Register or login with appropriate credentials
   - Access role-specific features based on your user type

## API Endpoints

### Authentication
- `GET /` - Welcome message
- `GET /api/test` - Database connection test

### User Management
- `GET /api/users` - Get users (filter by role, email, parent)
- `GET /api/users/count` - Get user count by role
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Attendance
- `POST /api/attendance` - Mark attendance
- `GET /api/attendance` - Get attendance records (filter by date or student)

### Fees
- `GET /api/fees` - Get fees (filter by student)
- `POST /api/fees` - Create fee
- `PUT /api/fees/:id` - Update fee status
- `DELETE /api/fees/:id` - Delete fee

### Results
- `GET /api/results` - Get results (filter by student)
- `POST /api/results` - Upload result
- `PUT /api/results/:id` - Update result
- `DELETE /api/results/:id` - Delete result

### Timetable
- `GET /api/timetable` - Get timetable (filter by class)
- `POST /api/timetable` - Create timetable entry
- `PUT /api/timetable/:id` - Update timetable entry
- `DELETE /api/timetable/:id` - Delete timetable entry

## Project Structure

```
school-management-system/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Attendance.js
│   │   ├── Fee.js
│   │   ├── Results.js
│   │   └── Timetable.js
│   ├── package.json
│   ├── server.js
│   └── seed.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── TeacherDashboard.tsx
│   │   │   ├── StudentDashboard.tsx
│   │   │   ├── ParentDashboard.tsx
│   │   │   └── ...
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.ts
│   └── README.md
├── package.json
├── TODO.md
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Support

For support, please contact the development team or create an issue in the repository.

---

**Note:** This system is designed for educational institutions and should be deployed in a secure environment with proper authentication and authorization measures in place.
