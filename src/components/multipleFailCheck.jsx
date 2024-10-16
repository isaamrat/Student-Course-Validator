import React, { useEffect } from "react";
import { failAllowed } from '../data/dynamicData';  // Adjust the path as needed

const MultipleFailCheck = ({gradeSheet, noIssueTrackerSetter }) => {
  const  dummyGradeSheet = [
    [
      "Course No",
      "Course Title",
      "Course Credit",
      "Credit Earned",
      "Grade",
      "Grade Point",
    ],
    ["SEMESTER :", "SPRING 2023", "", "", "", ""],
    ["CSE110", "PROGRAMMING LANGUAGE I", "3.0", "0.0", "F", "0.0"],
    ["CSE230", "DISCRETE MATHEMATICS", "3.0", "0.0", "F", "0.0"],
    [
      "MAT110",
      "MATHEMATICS I: DIFFERENTIAL CALCULUS & COORDINATE GEOMETRY",
      "3.0",
      "3.0",
      "C+",
      "2.3",
    ],
    ["PHY111", "PRINCIPLES OF PHYSICS I", "3.0", "3.0", "D-", "0.7"],
    [
      "SEMESTER",
      "Credits Attempted",
      "12.0",
      "Credits Earned",
      "6.0",
      "GPA",
      "0.75",
    ],
    [
      "CUMULATIVE",
      "Credits Attempted",
      "12.0",
      "Credits Earned",
      "6.0",
      "CGPA",
      "0.75",
    ],
    ["SEMESTER :", "SUMMER 2023", "", "", "", ""],
    ["CSE111", "PROGRAMMING LANGUAGE-II", "3.0", "0.0", "I", "0.0"],
    ["PHY112", "PRINCIPLES OF PHYSICS II", "3.0", "0.0", "I", "0.0"],
    [
      "SEMESTER",
      "Credits Attempted",
      "0.0",
      "Credits Earned",
      "0.0",
      "GPA",
      "0.0",
    ],
    [
      "CUMULATIVE",
      "Credits Attempted",
      "12.0",
      "Credits Earned",
      "6.0",
      "CGPA",
      "0.75",
    ],
    ["SEMESTER :", "FALL 2023", "", "", "", ""],
    ["CSE110", "PROGRAMMING LANGUAGE I", "3.0", "0.0", "F", "0.0"],
    ["CSE230", "DISCRETE MATHEMATICS", "3.0", "0.0", "F", "0.0"],
    [
      "MAT110",
      "MATHEMATICS I: DIFFERENTIAL CALCULUS & COORDINATE GEOMETRY",
      "3.0",
      "3.0",
      "C+",
      "2.3",
    ],
    ["PHY111", "PRINCIPLES OF PHYSICS I", "3.0", "3.0", "D-", "0.7"],
    [
      "SEMESTER",
      "Credits Attempted",
      "12.0",
      "Credits Earned",
      "6.0",
      "GPA",
      "0.75",
    ],
    [
      "CUMULATIVE",
      "Credits Attempted",
      "12.0",
      "Credits Earned",
      "6.0",
      "CGPA",
      "0.75",
    ],
    ["SEMESTER :", "SPRING 2024", "", "", "", ""],
    ["CSE111", "PROGRAMMING LANGUAGE-II", "3.0", "0.0", "I", "0.0"],
    ["PHY112", "PRINCIPLES OF PHYSICS II", "3.0", "0.0", "I", "0.0"],
    [
      "SEMESTER",
      "Credits Attempted",
      "0.0",
      "Credits Earned",
      "0.0",
      "GPA",
      "0.0",
    ],
    [
      "CUMULATIVE",
      "Credits Attempted",
      "12.0",
      "Credits Earned",
      "6.0",
      "CGPA",
      "0.75",
    ],
    ["SEMESTER :", "SUMMER 2024", "", "", "", ""],
    ["CSE110", "PROGRAMMING LANGUAGE I", "3.0", "0.0", "F", "0.0"],
    ["CSE230", "DISCRETE MATHEMATICS", "3.0", "0.0", "F", "0.0"],
    [
      "MAT110",
      "MATHEMATICS I: DIFFERENTIAL CALCULUS & COORDINATE GEOMETRY",
      "3.0",
      "3.0",
      "C+",
      "2.3",
    ],
    ["PHY111", "PRINCIPLES OF PHYSICS I", "3.0", "3.0", "D-", "0.7"],
    [
      "SEMESTER",
      "Credits Attempted",
      "12.0",
      "Credits Earned",
      "6.0",
      "GPA",
      "0.75",
    ],
    [
      "CUMULATIVE",
      "Credits Attempted",
      "12.0",
      "Credits Earned",
      "6.0",
      "CGPA",
      "0.75",
    ],
    ["SEMESTER :", "FALL 2024", "", "", "", ""],
    ["CSE111", "PROGRAMMING LANGUAGE-II", "3.0", "0.0", "I", "0.0"],
    ["PHY112", "PRINCIPLES OF PHYSICS II", "3.0", "0.0", "I", "0.0"],
    [
      "SEMESTER",
      "Credits Attempted",
      "0.0",
      "Credits Earned",
      "0.0",
      "GPA",
      "0.0",
    ],
    [
      "CUMULATIVE",
      "Credits Attempted",
      "12.0",
      "Credits Earned",
      "6.0",
      "CGPA",
      "0.75",
    ],
  ];

  // Create an object to store the fail count and semester for each course
  const failCounts = {};
  let currentSemester = "";

  // Iterate over the gradeSheet
  for (let i = 0; i < gradeSheet.length; i++) {
    const row = gradeSheet[i];

    // If we encounter a row that indicates the start of a new semester
    if (row[0] === "SEMESTER :" && row[1]) {
      currentSemester = row[1]; // Set the current semester
    }

    // If the row has a course and grade point
    if (row[0] && row[5] && row[0] !== "SEMESTER :" && !isNaN(row[5])) {
      const courseCode = row[0];
      const gradePoint = parseFloat(row[5]);

      // If grade point is 0 (fail), increment the fail count for that course
      if (gradePoint === 0) {
        if (!failCounts[courseCode]) {
          failCounts[courseCode] = {
            failCount: 0,
            semesters: new Set(),
          };
        }
        failCounts[courseCode].failCount += 1;
        failCounts[courseCode].semesters.add(currentSemester); // Track the semester
      }
    }
  }

  // Collect all relevant courses that have more than 3 fails
  const failDetails = Object.entries(failCounts)
    .filter(([courseCode, { failCount }]) => failCount > failAllowed)
    .map(([courseCode, { failCount, semesters }]) => ({
      courseCode,
      semesters: Array.from(semesters).join(", "), // Join semesters into a string
      failCount,
    }));

  useEffect(() => {
    if (failDetails.length === 0) {
      noIssueTrackerSetter((prev) => {
        const message = `No issue with courses having more than ${failAllowed} failing grades.`;
        if (!prev.includes(message)) {
          return [...prev, message];
        }
        return prev;
      });
    }
  }, [failDetails, noIssueTrackerSetter]);

  const failMessage =
    failDetails.length > 0
      ? `Refer the student to chairperson and hold their advising unless notified. \nThe following courses have failed grade (Grade Point 0) more than ${failAllowed} times:`
      : null;

  return (
    <div>
      {failMessage ? (
        <FailMessage message={failMessage} courses={failDetails} />
      ) : (
        <div></div>
      )}
    </div>
  );
};

const FailMessage = ({ message, courses }) => (
  <div
    role="alert"
    style={{
      border: "1px solid #e74c3c",
      backgroundColor: "#f8d7da",
      padding: "15px",
      marginTop: "10px",
      borderRadius: "8px",
    }}
  >
    <div className="flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
        style={{ color: "#e74c3c" }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <span style={{ color: "#e74c3c" }} className="pl-2 font-bold text-md">
        Multiple Fail Alert!
      </span>
    </div>
    <span style={{ color: "#e74c3c", whiteSpace: "pre-line" }}>{message}</span>

    {/* Table for Course Details */}
    <table
      style={{
        marginTop: "10px",
        width: "100%",
        borderSpacing: 0,
        borderCollapse: "collapse",
        borderRadius: "10px",
        border: "1px solid #e74c3c",
      }}
    >
      <thead>
        <tr>
          <th
            style={{
              padding: "4px",
              fontSize: "10px",
              textAlign: "center",
              color: "#e74c3c",
              borderTopLeftRadius: "8px",
              borderRight: "1px solid #e74c3c",
              borderBottom: "1px solid #e74c3c",
            }}
          >
            Course
          </th>
          <th
            style={{
              padding: "4px",
              fontSize: "10px",
              textAlign: "center",
              color: "#e74c3c",
              borderRight: "1px solid #e74c3c",
              borderBottom: "1px solid #e74c3c",
            }}
          >
            Semester(s)
          </th>
          <th
            style={{
              padding: "4px",
              fontSize: "10px",
              textAlign: "center",
              color: "#e74c3c",
              borderTopRightRadius: "8px",
              borderBottom: "1px solid #e74c3c",
            }}
          >
            Fail Count
          </th>
        </tr>
      </thead>
      <tbody>
        {courses.map(({ courseCode, semesters, failCount }) => (
          <tr key={courseCode}>
            <td
              style={{
                padding: "4px",
                fontSize: "10px",
                textAlign: "center",
                color: "#e74c3c",
                borderRight: "1px solid #e74c3c",
                borderBottom: "1px solid #e74c3c",
              }}
            >
              {courseCode}
            </td>
            <td
              style={{
                padding: "4px",
                fontSize: "10px",
                textAlign: "center",
                color: "#e74c3c",
                borderRight: "1px solid #e74c3c",
                borderBottom: "1px solid #e74c3c",
              }}
            >
              {semesters}
            </td>
            <td
              style={{
                padding: "4px",
                fontSize: "10px",
                textAlign: "center",
                color: "#e74c3c",
                borderBottom: "1px solid #e74c3c",
              }}
            >
              {failCount}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default MultipleFailCheck;
