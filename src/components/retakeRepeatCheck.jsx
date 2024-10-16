import React, { useEffect } from 'react';
import { retakeGapAllowed } from '../data/dynamicData';

const RetakeRepeatCheck = ({ gradeSheet, noIssueTrackerSetter }) => {
  const currentSemesterCourses = [];
  let rowIndx = gradeSheet.length - 3; // Start 3 rows from the end

   


  // Collect courses and semester
  while (rowIndx >= 0) {
    const temp = gradeSheet[rowIndx];
    if (temp[0] === "SEMESTER :") {
      currentSemesterCourses.push(temp[1]); // Assuming the semester value is at index 1
      break; // Break if the semester line is found
    } else {
      currentSemesterCourses.push([temp[0], temp[4]]); // Push the course code
    }
    rowIndx--; // Decrement the index to move up the array
  }

  currentSemesterCourses.reverse(); // Reverse to maintain the order of courses

  // Create the dictionary
  const currentCoursesGap = {
    semester: currentSemesterCourses[0] || "Unknown Semester", // Default value if empty
  };

  // Assign other elements as keys with their values
  for (let i = 1; i < currentSemesterCourses.length; i++) {
    currentCoursesGap[currentSemesterCourses[i][0]] = [
      0,
      currentCoursesGap.semester,
      currentSemesterCourses[i][1]
    ];
  }

  // Iterate over the currentCoursesGap to find gap counts
  for (const courseCode in currentCoursesGap) {
    if (courseCode !== "semester") {
      let gapCount = 0;
      let tempGradeSheetIndx = rowIndx - 1; // Adjusted to not start at the last checked index
      let foundRetake = false;
      let foundRs = false;

      while (tempGradeSheetIndx >= 0) {
        const temp = gradeSheet[tempGradeSheetIndx];

        if (temp[0] === courseCode) {
          foundRetake = true;
          currentCoursesGap[courseCode][2] = temp[4];
        }
        if (["BNG103", "EMB101", "HUM103"].includes(temp[0])) {
          foundRs = true;
        } else if (temp[0] === "SEMESTER :") {
          gapCount += 1;
          if (foundRetake) {
            if (foundRs) {
              gapCount -= 1;
            }
            currentCoursesGap[courseCode][0] = gapCount;
            currentCoursesGap[courseCode][1] = temp[1]; // Assuming temp[1] is the semester info
            
            break;
          }
        }
        tempGradeSheetIndx--; // Decrement index to avoid infinite loop
      }
    }
  }

  // Collect all relevant course messages in a single object
  const gapDetails = Object.entries(currentCoursesGap)
    .filter(([key, value]) => key !== "semester" && value[0] > retakeGapAllowed) // Filter for courses with a gap greater than retakeGapAllowed
    .map(([courseCode]) => ({
      courseCode,
      totalGap: currentCoursesGap[courseCode][0],
      lastTakenSemester: currentCoursesGap[courseCode][1],
      prevGrade: currentCoursesGap[courseCode][2]
    }));

    // useEffect to add "no issue" message only once when gapDetails is empty
    useEffect(() => {
      if (gapDetails.length === 0) {
        noIssueTrackerSetter((prev) => {
          const message = `No issue with the ${retakeGapAllowed} semester gap while retake found.`;
          if (!prev.includes(message)) {
            return [...prev, message]; // Add message if not already present
          }
          return prev; // No change if the message is already present
        });
      }
    }, [gapDetails, noIssueTrackerSetter]);

  const gapMessage =
    gapDetails.length > 0
      ? `The following courses have been taken after more than ${retakeGapAllowed} semesters:`
      : null;


  return (
    <div>
      {gapMessage ? (
        <GapMessage message={gapMessage} courses={gapDetails} />
      ) : (
        <div></div>
      )}
    </div>
  );
};

const GapMessage = ({ message, courses }) => (
    <div
      role="alert"
      style={{
        border: "1px solid #e74c3c",
        backgroundColor: "#f8d7da",
        padding: "15px",
        marginTop: "10px",
        borderRadius: "8px", // Keep border radius for the outer div
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
          Two Semester Gap Alert!
        </span>
      </div>
      <span style={{ color: "#e74c3c" }}>{message}</span>
  
      {/* Table for Course Details */}
      <table
        style={{
          marginTop: "10px",
          width: "100%",
          borderSpacing: 0,
          borderCollapse: "collapse", // Use collapse for internal row borders
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
                borderRight: "1px solid #e74c3c", // Internal column border
                borderBottom: "1px solid #e74c3c", // Row border
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
                borderRight: "1px solid #e74c3c", // Internal column border
                borderBottom: "1px solid #e74c3c", // Row border
              }}
            >
              Last Grade
            </th>
            <th
              style={{
                padding: "4px",
                fontSize: "10px",
                textAlign: "center",
                color: "#e74c3c",
                borderRight: "1px solid #e74c3c", // Internal column border
                borderBottom: "1px solid #e74c3c", // Row border
              }}
            >
              Gap (Sem)
            </th>
            <th
              style={{
                padding: "4px",
                fontSize: "10px",
                textAlign: "center",
                color: "#e74c3c",
                borderTopRightRadius: "8px",
                borderBottom: "1px solid #e74c3c", // Row border
              }}
            >
              Previously Taken
            </th>
          </tr>
        </thead>
        <tbody>
          {courses.map(({ courseCode, prevGrade,  totalGap, lastTakenSemester }) => (
            <tr key={courseCode}>
              <td
                style={{
                  padding: "4px",
                  fontSize: "10px",
                  textAlign: "center",
                  color: "#e74c3c",
                  borderRight: "1px solid #e74c3c", // Internal column border
                  borderBottom: "1px solid #e74c3c", // Internal row border
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
                  borderRight: "1px solid #e74c3c", // Internal column border
                  borderBottom: "1px solid #e74c3c", // Internal row border
                }}
              >
                {prevGrade}
              </td>
              <td
                style={{
                  padding: "4px",
                  fontSize: "10px",
                  textAlign: "center",
                  color: "#e74c3c",
                  borderRight: "1px solid #e74c3c", // Internal column border
                  borderBottom: "1px solid #e74c3c", // Internal row border
                }}
              >
                {totalGap}
              </td>
              <td
                style={{
                  padding: "4px",
                  fontSize: "10px",
                  textAlign: "center",
                  color: "#e74c3c",
                  borderBottom: "1px solid #e74c3c", // Internal row border
                }}
              >
                {lastTakenSemester}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  

export default RetakeRepeatCheck;
