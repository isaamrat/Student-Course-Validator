import React, { useEffect } from 'react';

import { cseCoursesPrerequisite } from '../data/dynamicData';  // Adjust the path as needed
import { csCoursesPrerequisite } from '../data/dynamicData';  // Adjust the path as needed



// Two-dimensional array representation of the table
const dummyGradeSheet = [
  [
    "Course No",
    "Course Title",
    "Course Credit",
    "Credit Earned",
    "Grade",
    "Grade Point",
  ],
  ["SEMESTER :", "FALL 2023", "", "", "", ""],
  ["CSE110", "PROGRAMMING LANGUAGE I", "3.0", "3.0", "D", "1.0"],
  ["ENG101", "FUNDAMENTALS OF ENGLISH", "3.0", "3.0", "B+", "3.3"],
  [
    "MAT110",
    "MATHEMATICS I: DIFFERENTIAL CALCULUS & COORDINATE GEOMETRY",
    "3.0",
    "3.0",
    "A",
    "4.0",
  ],
  [
    "SEMESTER",
    "Credits Attempted",
    "9.0",
    "Credits Earned",
    "9.0",
    "GPA",
    "2.77",
  ],
  [
    "CUMULATIVE",
    "Credits Attempted",
    "9.0",
    "Credits Earned",
    "9.0",
    "CGPA",
    "2.77",
  ],
  ["SEMESTER :", "SPRING 2024", "", "", "", ""],
  ["CSE110", "PROGRAMMING LANGUAGE I", "3.0", "0.0", "F", "0.0"],
  ["PHY111", "PRINCIPLES OF PHYSICS I", "3.0", "0.0", "F", "0.0"],
  [
    "STA201",
    "ELEMENTS OF STATISTICS AND PROBABILITY",
    "3.0",
    "0.0",
    "F",
    "0.0",
  ],
  [
    "SEMESTER",
    "Credits Attempted",
    "9.0",
    "Credits Earned",
    "0.0",
    "GPA",
    "0.0",
  ],
  [
    "CUMULATIVE",
    "Credits Attempted",
    "18.0",
    "Credits Earned",
    "9.0",
    "CGPA",
    "1.66",
  ],
];

function checkCourseCompletion(course, coursesPrerequisite, gradeSheet) {
  // Helper function to check if a course exists in the gradeSheet with a grade point greater than 0.
  const isCourseCompleted = (course, gradeSheet) => {
    return gradeSheet.some(
      (row) => row[0] === course && row[5] !== undefined && row[5] > 0
    );
  };

  // Base case: if course is already completed, return success.
  if (isCourseCompleted(course, gradeSheet)) {
    return null;
  }

  // Check if the course exists in the prerequisite dictionary.
  if (!(course in coursesPrerequisite)) {
    return null; // Course not found in prerequisites
  }

  const { preRequisite, fullChainPreRequisite } = coursesPrerequisite[course];
  const unmetPrerequisites = []; // To hold all unmet prerequisites

  // Use a for loop to iterate through each prerequisite course.
  for (const prereq of preRequisite) {
    const prereqCourse = prereq.split(" ")[0]; // Extract course code without the grade.

    // Check if the prerequisite course is completed.
    if (!isCourseCompleted(prereqCourse, gradeSheet)) {
      unmetPrerequisites.push(prereq); // Collect unmet prerequisites
    }
  }

  // If there are unmet prerequisites, return them.
  if (unmetPrerequisites.length > 0) {
    return [unmetPrerequisites, fullChainPreRequisite];
  }

  // If all prerequisites are completed, return success.
  return null;
}

const PrerequisiteCheck = ({ gradeSheet, program, noIssueTrackerSetter }) => {
  const currentSemesterCourses = [];
  let rowIndx = gradeSheet.length - 3; // Start 3 rows from the end

  // Collect courses and semester
  while (rowIndx >= 0) {
    const temp = gradeSheet[rowIndx];
    if (temp[0] === "SEMESTER :") {
      currentSemesterCourses.push(temp[1]); // Assuming the semester value is at index 1
      break; // Break if the semester line is found
    } else {
      currentSemesterCourses.push(temp[0]); // Push the course code
    }
    rowIndx--; // Decrement the index to move up the array
  }

  currentSemesterCourses.reverse(); // Reverse to maintain the order of courses

  //   const dummyCurrentSemesterCourses = ["f", "CSE420", "CSE421"];

  const msg = [];
  if (program === "CSE") {
    for (let index = 1; index < currentSemesterCourses.length; index++) {
      const tempMsg = checkCourseCompletion(
        currentSemesterCourses[index],
        cseCoursesPrerequisite,
        gradeSheet
      );
      if (tempMsg) {
        msg.push([currentSemesterCourses[index], tempMsg]);
      }
    }
  } else if (program === "CS") {
    for (let index = 1; index < currentSemesterCourses.length; index++) {
      const tempMsg = checkCourseCompletion(
        currentSemesterCourses[index],
        csCoursesPrerequisite,
        gradeSheet
      );
      if (tempMsg) {
        msg.push([currentSemesterCourses[index], tempMsg]);
      }
    }
  }


  // useEffect to add "no issue" message only once when msg is empty
  useEffect(() => {
    if (msg.length === 0) {
      noIssueTrackerSetter((prev) => {
        const message = "No issue with the pre-requisite found.";
        if (!prev.includes(message)) {
          return [...prev, message]; // Add message if not already present
        }
        return prev; // No change if the message is already present
      });
    }
  }, [msg, noIssueTrackerSetter]);

  return (
    <div>
      {msg.length > 0 ? (
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
            <span
              style={{ color: "#e74c3c" }}
              className="pl-2 font-bold text-md"
            >
              Prerequisite Alert!
            </span>
          </div>

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
            <tbody>
              {msg.map(([course, message], index) => {
                // Ensure message[0] is an array
                const unmetPrerequisites = Array.isArray(message[0])
                  ? message[0]
                  : [];

                const isSpecial = unmetPrerequisites.some((prereq) =>
                  prereq.endsWith("(HP)")
                ); // Check if any unmet prerequisite has "(HP)"

                const rowStyle = {
                  backgroundColor: !isSpecial ? "#fce8b2" : "#f8d7da", // Light orange for "(SP)"
                  color: !isSpecial ? "#c65d0c" : "#e74c3c", // Darker color for orange background
                };

                return (
                  <tr key={index} style={rowStyle}>
                    <td
                      style={{
                        padding: "8px",
                        fontSize: "12px",
                        borderBottom: "1px solid #e74c3c",
                        color: rowStyle.color,
                      }}
                    >
                      <span className="font-bold">{course}</span> prerequisite
                      not met:
                      {unmetPrerequisites.map((prereq, prereqIndex) => (
                        <li key={prereqIndex}>
                          <span>
                            Pre-req:{" "}
                            <span className=" font-semibold">{prereq}</span> is
                            not completed.
                          </span>
                        </li>
                      ))}
                      {message[1] && (
                        <li>
                          <span>
                            Full Chain of pre-req:
                            <div>{message[1]}</div>
                          </span>
                        </li>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default PrerequisiteCheck;
