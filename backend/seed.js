import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Attendance from "./models/Attendance.js";
import Fee from "./models/Fee.js";
import Result from "./models/Results.js";
import Timetable from "./models/Timetable.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await Attendance.deleteMany({});
    await Fee.deleteMany({});
    await Result.deleteMany({});
    await Timetable.deleteMany({});

    // Seed Parents
    const parents = [
      { name: "John Smith", email: "john.smith@example.com", role: "parent" },
      { name: "Jane Doe", email: "jane.doe@example.com", role: "parent" },
      { name: "Michael Johnson", email: "michael.johnson@example.com", role: "parent" },
      { name: "Sarah Wilson", email: "sarah.wilson@example.com", role: "parent" },
      { name: "David Brown", email: "david.brown@example.com", role: "parent" },
      { name: "Lisa Davis", email: "lisa.davis@example.com", role: "parent" },
      { name: "Robert Miller", email: "robert.miller@example.com", role: "parent" },
      { name: "Emily Garcia", email: "emily.garcia@example.com", role: "parent" },
      { name: "James Martinez", email: "james.martinez@example.com", role: "parent" },
      { name: "Anna Anderson", email: "anna.anderson@example.com", role: "parent" },
    ];

    const createdParents = await User.insertMany(parents);
    console.log("Parents seeded");

    // Seed Teachers
    const teachers = [
      { name: "Dr. Alice Thompson", email: "alice.thompson@school.com", role: "teacher", subject: "Mathematics" },
      { name: "Prof. Bob Lee", email: "bob.lee@school.com", role: "teacher", subject: "Science" },
      { name: "Ms. Carol White", email: "carol.white@school.com", role: "teacher", subject: "English" },
      { name: "Mr. Daniel Harris", email: "daniel.harris@school.com", role: "teacher", subject: "History" },
      { name: "Mrs. Eva Clark", email: "eva.clark@school.com", role: "teacher", subject: "Geography" },
      { name: "Mr. Frank Lewis", email: "frank.lewis@school.com", role: "teacher", subject: "Physics" },
      { name: "Ms. Grace Walker", email: "grace.walker@school.com", role: "teacher", subject: "Chemistry" },
      { name: "Dr. Henry Hall", email: "henry.hall@school.com", role: "teacher", subject: "Biology" },
      { name: "Mrs. Irene Young", email: "irene.young@school.com", role: "teacher", subject: "Art" },
      { name: "Mr. Jack King", email: "jack.king@school.com", role: "teacher", subject: "Music" },
    ];

    const createdTeachers = await User.insertMany(teachers);
    console.log("Teachers seeded");

    // Seed Students
    const students = [
      { name: "Emma Smith", email: "emma.smith@student.com", role: "student", class: "10A", parent: createdParents[0]._id },
      { name: "Liam Doe", email: "liam.doe@student.com", role: "student", class: "10A", parent: createdParents[1]._id },
      { name: "Olivia Johnson", email: "olivia.johnson@student.com", role: "student", class: "10B", parent: createdParents[2]._id },
      { name: "Noah Wilson", email: "noah.wilson@student.com", role: "student", class: "10B", parent: createdParents[3]._id },
      { name: "Ava Brown", email: "ava.brown@student.com", role: "student", class: "9A", parent: createdParents[4]._id },
      { name: "William Davis", email: "william.davis@student.com", role: "student", class: "9A", parent: createdParents[5]._id },
      { name: "Sophia Miller", email: "sophia.miller@student.com", role: "student", class: "9B", parent: createdParents[6]._id },
      { name: "Mason Garcia", email: "mason.garcia@student.com", role: "student", class: "9B", parent: createdParents[7]._id },
      { name: "Isabella Martinez", email: "isabella.martinez@student.com", role: "student", class: "10A", parent: createdParents[8]._id },
      { name: "James Anderson", email: "james.anderson@student.com", role: "student", class: "10B", parent: createdParents[9]._id },
      { name: "Charlotte Taylor", email: "charlotte.taylor@student.com", role: "student", class: "10A", parent: createdParents[0]._id },
      { name: "Benjamin Thomas", email: "benjamin.thomas@student.com", role: "student", class: "9B", parent: createdParents[1]._id },
      { name: "Amelia Jackson", email: "amelia.jackson@student.com", role: "student", class: "10A", parent: createdParents[2]._id },
      { name: "Lucas White", email: "lucas.white@student.com", role: "student", class: "10B", parent: createdParents[3]._id },
      { name: "Mia Harris", email: "mia.harris@student.com", role: "student", class: "9A", parent: createdParents[4]._id },
      { name: "Henry Martin", email: "henry.martin@student.com", role: "student", class: "9B", parent: createdParents[5]._id },
      { name: "Harper Thompson", email: "harper.thompson@student.com", role: "student", class: "10A", parent: createdParents[6]._id },
      { name: "Alexander Garcia", email: "alexander.garcia@student.com", role: "student", class: "10B", parent: createdParents[7]._id },
      { name: "Evelyn Martinez", email: "evelyn.martinez@student.com", role: "student", class: "9A", parent: createdParents[8]._id },
      { name: "Michael Robinson", email: "michael.robinson@student.com", role: "student", class: "9B", parent: createdParents[9]._id },
    ];

    const createdStudents = await User.insertMany(students);
    console.log("Students seeded");

    // Seed Admin
    const admin = { name: "Admin User", email: "admin@school.com", role: "admin" };
    await User.create(admin);
    console.log("Admin seeded");

    // Seed Attendance
    const attendanceRecords = [];
    const today = new Date().toISOString().split('T')[0];
    createdStudents.forEach(student => {
      attendanceRecords.push({
        student: student._id,
        teacher: createdTeachers[0]._id,
        date: today,
        status: Math.random() > 0.1 ? 'present' : 'absent', // 90% present
      });
    });
    await Attendance.insertMany(attendanceRecords);
    console.log("Attendance seeded");

    // Seed Fees
    const fees = createdStudents.map(student => ({
      student: student._id,
      amount: Math.floor(Math.random() * 500) + 100, // Random amount between 100-600
      dueDate: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Random due date within 30 days
      description: "Monthly Tuition Fee",
      status: Math.random() > 0.5 ? 'paid' : 'unpaid',
    }));
    await Fee.insertMany(fees);
    console.log("Fees seeded");

    // Seed Results
    const subjects = ["Mathematics", "Science", "English", "History", "Geography"];
    const results = [];
    createdStudents.forEach(student => {
      subjects.forEach(subject => {
        results.push({
          student: student._id,
          subject,
          marks: Math.floor(Math.random() * 41) + 60, // Random marks between 60-100
          examType: "regular",
        });
      });
    });
    await Result.insertMany(results);
    console.log("Results seeded");

    // Seed Timetable
    const timetableEntries = [
      { class: "10A", day: "Monday", subject: "Mathematics", time: "9:00 AM - 10:00 AM", teacher: createdTeachers[0]._id },
      { class: "10A", day: "Monday", subject: "Science", time: "10:00 AM - 11:00 AM", teacher: createdTeachers[1]._id },
      { class: "10A", day: "Tuesday", subject: "English", time: "9:00 AM - 10:00 AM", teacher: createdTeachers[2]._id },
      { class: "10A", day: "Tuesday", subject: "History", time: "10:00 AM - 11:00 AM", teacher: createdTeachers[3]._id },
      { class: "10B", day: "Monday", subject: "Mathematics", time: "9:00 AM - 10:00 AM", teacher: createdTeachers[0]._id },
      { class: "10B", day: "Monday", subject: "Geography", time: "10:00 AM - 11:00 AM", teacher: createdTeachers[4]._id },
      { class: "10B", day: "Tuesday", subject: "English", time: "9:00 AM - 10:00 AM", teacher: createdTeachers[2]._id },
      { class: "10B", day: "Tuesday", subject: "Physics", time: "10:00 AM - 11:00 AM", teacher: createdTeachers[5]._id },
      { class: "9A", day: "Monday", subject: "Mathematics", time: "9:00 AM - 10:00 AM", teacher: createdTeachers[0]._id },
      { class: "9A", day: "Monday", subject: "Chemistry", time: "10:00 AM - 11:00 AM", teacher: createdTeachers[6]._id },
      { class: "9A", day: "Tuesday", subject: "English", time: "9:00 AM - 10:00 AM", teacher: createdTeachers[2]._id },
      { class: "9A", day: "Tuesday", subject: "Biology", time: "10:00 AM - 11:00 AM", teacher: createdTeachers[7]._id },
      { class: "9B", day: "Monday", subject: "Mathematics", time: "9:00 AM - 10:00 AM", teacher: createdTeachers[0]._id },
      { class: "9B", day: "Monday", subject: "Art", time: "10:00 AM - 11:00 AM", teacher: createdTeachers[8]._id },
      { class: "9B", day: "Tuesday", subject: "English", time: "9:00 AM - 10:00 AM", teacher: createdTeachers[2]._id },
      { class: "9B", day: "Tuesday", subject: "Music", time: "10:00 AM - 11:00 AM", teacher: createdTeachers[9]._id },
    ];
    await Timetable.insertMany(timetableEntries);
    console.log("Timetable seeded");

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
