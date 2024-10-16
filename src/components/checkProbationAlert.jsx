


import { useEffect } from "react";
import { latestProbationThresholdCGPA } from "../data/dynamicData";

const CheckProbationAlert = ({ stCgpa, stEnrolledSession, noIssueTrackerSetter }) => {
  const studentCgpa = Number(stCgpa);
  const [semester, year] = stEnrolledSession.split(" ");

  useEffect(() => {
    // Logic for determining probation status
    if (Number(year) > 2022 || (Number(year) === 2022 && semester !== "Spring")) {
      // Condition for students admitted Summer 2022 and onwards
      if (studentCgpa < latestProbationThresholdCGPA) {
        return;
      }
    } else {
      // Condition for students admitted before Summer 2022
      if (studentCgpa < 1.5) {
        return;
      }
    }

    // If there is no issue with the probation, update the noIssueTracker
    noIssueTrackerSetter((prev) => [...prev, "No issue with the probation found."]);
  }, [studentCgpa, semester, year, noIssueTrackerSetter]);

  // Probation messages
  if (Number(year) > 2022 || (Number(year) === 2022 && semester !== "Spring")) {
    if (studentCgpa < latestProbationThresholdCGPA) {
      return (
        <ProbationMessage
          message={`Student CGPA is ${studentCgpa} which is below ${latestProbationThresholdCGPA}. Please refer to the probation advisors.`}
        />
      );
    }
  } else {
    if (studentCgpa < 1.5) {
      return (
        <ProbationMessage
          message={`Student CGPA is ${studentCgpa} which is below 1.5. Please refer to the probation advisors.`}
        />
      );
    }
  }

  // Return null if no probation alert is necessary
  return null;
};

// Reusable ProbationMessage component for rendering the alert
const ProbationMessage = ({ message }) => (
  <div
    role="alert"
    style={{
      border: "1px solid #e74c3c",
      backgroundColor: "#f8d7da",
      padding: "15px",
      marginTop: "10px",
      borderRadius: "5px",
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
        Probation Alert!
      </span>
    </div>
    <span style={{ color: "#e74c3c" }}>{message}</span>
  </div>
);

export default CheckProbationAlert;
