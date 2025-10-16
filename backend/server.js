import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import User from "./models/User.js";
import Attendance from "./models/Attendance.js";
import Fee from "./models/Fee.js";
import Timetable from "./models/Timetable.js";
import Result from "./models/Results.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: 'https://school-system-jade-six.vercel.app/',
  credentials: true
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Basic route
app.get("/", (req, res) => {
    res.send("School Management System Backend Running 🚀");
});

// Test API route to check DB connection
app.get("/api/test", (req, res) => {
    res.json({ message: "Database connected successfully to frontend!" });
});

// API route for user counts by role
app.get("/api/users/count", async (req, res) => {
    try {
        const { role } = req.query;
        if (!role) {
            return res.status(400).json({ error: 'Role parameter is required' });
        }
        const count = await User.countDocuments({ role });
        res.json({ count });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all users by role or email
app.get("/api/users", async (req, res) => {
  try {
    const { role, parent, email } = req.query;
    let query = {};
    if (role) query.role = role;
    if (email) query.email = email;
    if (parent) {
      const parentUser = await User.findOne({ email: parent });
      if (parentUser) query.parent = parentUser._id;
    }
    const users = await User.find(query);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new user
app.post("/api/users", async (req, res) => {
    try {
        const { name, email, role, class: userClass, subject } = req.body;
        const newUser = new User({ name, email, role, class: userClass, subject });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a user
app.put("/api/users/:id", async (req, res) => {
    try {
        const { name, email, role, class: userClass, subject } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { name, email, role, class: userClass, subject },
            { new: true }
        );
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a user
app.delete("/api/users/:id", async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Mark attendance
app.post("/api/attendance", async (req, res) => {
    try {
        const { date, teacher, attendances } = req.body;
        const teacherUser = await User.findOne({ email: teacher });
        if (!teacherUser) {
            return res.status(400).json({ error: 'Teacher not found' });
        }
        const attendanceRecords = attendances.map(att => ({
            student: att.student,
            teacher: teacherUser._id,
            date,
            status: att.status,
        }));
        const savedAttendances = await Attendance.insertMany(attendanceRecords);
        res.status(201).json(savedAttendances);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/attendance", async (req, res) => {
    try {
        const { date, student } = req.query;
        if (student) {
            // Find attendance records for the specific student
            const user = await User.findOne({ email: student });
            if (!user) {
                return res.status(404).json({ error: "Student not found" });
            }
            const attendances = await Attendance.find({ student: user._id })
                .populate('teacher', 'name email')
                .sort({ date: -1 });
            return res.json(attendances);
        } else if (date) {
            // Find attendance records for the date
            const attendances = await Attendance.find({ date })
                .populate('student', 'name')
                .populate('teacher', 'name');
            return res.json(attendances);
        } else {
            // Return all attendance records if no filter
            const attendances = await Attendance.find()
                .populate('student', 'name')
                .populate('teacher', 'name');
            return res.json(attendances);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get fees
app.get("/api/fees", async (req, res) => {
    try {
        const { student } = req.query;
        if (student) {
            const user = await User.findOne({ email: student });
            if (!user) {
                return res.status(404).json({ error: "Student not found" });
            }
            const fees = await Fee.find({ student: user._id }).populate('student', 'name email');
            return res.json(fees);
        } else {
            const fees = await Fee.find().populate('student', 'name email');
            return res.json(fees);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create fee
app.post("/api/fees", async (req, res) => {
    try {
        const { student, amount, dueDate, description } = req.body;
        const studentUser = await User.findOne({ email: student });
        if (!studentUser) {
            return res.status(400).json({ error: 'Student not found' });
        }
        const newFee = new Fee({ student: studentUser._id, amount, dueDate, description });
        await newFee.save();
        res.status(201).json(newFee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update fee
app.put("/api/fees/:id", async (req, res) => {
    try {
        const { status } = req.body;
        const updatedFee = await Fee.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json(updatedFee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete fee
app.delete("/api/fees/:id", async (req, res) => {
    try {
        await Fee.findByIdAndDelete(req.params.id);
        res.json({ message: "Fee deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Results API routes
app.get("/api/results", async (req, res) => {
    try {
        const { student } = req.query;
        if (student) {
            const user = await User.findOne({ email: student });
            if (!user) {
                return res.status(404).json({ error: "Student not found" });
            }
            const results = await Result.find({ student: user._id }).populate('student', 'name email');
            return res.json(results);
        } else {
            const results = await Result.find().populate('student', 'name email');
            return res.json(results);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/api/results", async (req, res) => {
    try {
        const { student, subject, marks, examType } = req.body;
        const studentUser = await User.findOne({ email: student });
        if (!studentUser) {
            return res.status(400).json({ error: 'Student not found' });
        }
        const newResult = new Result({ student: studentUser._id, subject, marks, examType });
        await newResult.save();
        res.status(201).json(newResult);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put("/api/results/:id", async (req, res) => {
    try {
        const { subject, marks, examType } = req.body;
        const updatedResult = await Result.findByIdAndUpdate(req.params.id, { subject, marks, examType }, { new: true });
        res.json(updatedResult);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete("/api/results/:id", async (req, res) => {
    try {
        await Result.findByIdAndDelete(req.params.id);
        res.json({ message: "Result deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Timetable API routes
app.get("/api/timetable", async (req, res) => {
    try {
        const { class: className } = req.query;
        if (className) {
            const timetable = await Timetable.find({ class: className }).populate('teacher', 'name email');
            return res.json(timetable);
        } else {
            const timetable = await Timetable.find().populate('teacher', 'name email');
            return res.json(timetable);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/api/timetable", async (req, res) => {
    try {
        const { class: className, day, subject, time, teacher } = req.body;
        const teacherUser = await User.findOne({ email: teacher });
        if (!teacherUser) {
            return res.status(400).json({ error: 'Teacher not found' });
        }
        const newTimetable = new Timetable({ class: className, day, subject, time, teacher: teacherUser._id });
        await newTimetable.save();
        res.status(201).json(newTimetable);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put("/api/timetable/:id", async (req, res) => {
    try {
        const { class: className, day, subject, time, teacher } = req.body;
        const teacherUser = await User.findOne({ email: teacher });
        if (!teacherUser) {
            return res.status(400).json({ error: 'Teacher not found' });
        }
        const updatedTimetable = await Timetable.findByIdAndUpdate(req.params.id, {
            class: className, day, subject, time, teacher: teacherUser._id
        }, { new: true });
        res.json(updatedTimetable);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete("/api/timetable/:id", async (req, res) => {
    try {
        await Timetable.findByIdAndDelete(req.params.id);
        res.json({ message: "Timetable entry deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
