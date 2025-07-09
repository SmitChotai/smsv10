// seed.js
import { initializeApp } from "firebase/app";
import {
  getFirestore, collection, addDoc, setDoc, doc
} from "firebase/firestore";

// ✅ Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBgXG-oIsLygIUwC4H5xUcduHqWa1Kba5w",
  authDomain: "studentattendancesystem-e3f6c.firebaseapp.com",
  projectId: "studentattendancesystem-e3f6c",
  storageBucket: "studentattendancesystem-e3f6c.appspot.com",
  messagingSenderId: "385675923275",
  appId: "1:385675923275:web:945301f83c5a7d182162ce",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔁 Seeding Function
async function seedFirestore() {
  try {
    // ✅ Add Teacher
    const teacherRef = await addDoc(collection(db, "users"), {
      email: "teacher1@gmail.com",
      role: "teacher",
      name: "Anita Sharma",
      department: "CSE",
      semester: "6",
    });
    const teacherId = teacherRef.id;

    // ✅ Add Student
    const studentRef = await addDoc(collection(db, "users"), {
      email: "student1@gmail.com",
      role: "student",
      name: "Rahul Singh",
      department: "CSE",
      semester: "6",
    });
    const studentId = studentRef.id;

    // ✅ Add Subjects
    await addDoc(collection(db, "subjects"), {
      name: "Maths",
      type: "Lecture",
      semester: "6",
      department: "CSE",
      teacherId: teacherId,
    });

    await addDoc(collection(db, "subjects"), {
      name: "Physics Lab",
      type: "Lab",
      semester: "6",
      department: "CSE",
      teacherId: teacherId,
    });

    // ✅ Add Attendance
    await addDoc(collection(db, "attendance"), {
      studentId: studentId,
      subject: "Maths",
      type: "Lecture",
      status: "Present",
      date: "2025-04-07",
      semester: "6",
      department: "CSE",
    });

    await addDoc(collection(db, "attendance"), {
      studentId: studentId,
      subject: "Physics Lab",
      type: "Lab",
      status: "Absent",
      date: "2025-04-07",
      semester: "6",
      department: "CSE",
    });

    console.log("🔥 Seeding complete!");
  } catch (error) {
    console.error("❌ Error seeding Firestore:", error);
  }
}

seedFirestore();
