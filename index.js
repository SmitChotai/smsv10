// const functions = require("firebase-functions");
// const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

// ✅ Configure mail transport using Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sids.cse.234510331006@gmail.com",
    pass: "rlyr tcsy zyjb bzot"  // Use Gmail App Password, not your normal password
  }
});


exports.sendAssignmentMail = functions.firestore
  .document("assignments/{assignmentId}")
  .onCreate(async (snap, context) => {
    const data = snap.data();

    const mailOptions = {
      from: "sids.cse.234510331006@gmail.com",
      to: data.email,
      subject: "New Subject Assigned",
      html: `
        <p>Hello,</p>
        <p>You have been assigned a new subject:</p>
        <ul>
          <li><strong>Subject:</strong> ${data.subject}</li>
          <li><strong>Department:</strong> ${data.department}</li>
          <li><strong>Semester:</strong> ${data.semester}</li>
          <li><strong>Type:</strong> ${data.type}</li>
        </ul>
        <p>Thank you,<br/>Admin Panel</p>
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("Email sent to", data.email);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  });
