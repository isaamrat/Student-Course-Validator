import React, { useEffect } from "react";

const CreditLimitAlert = ({
  stCreditTaken,
  stMaxCreditLimit,
  noIssueTrackerSetter,
}) => {
  const takenCredits = Number(stCreditTaken);
  const maxCreditLimit = Number(stMaxCreditLimit);

  useEffect(() => {
    if (
      maxCreditLimit > 0 &&
      takenCredits > 0 &&
      takenCredits >= 9 &&
      takenCredits <= maxCreditLimit
    ) {
      // If none of the conditions match, add a "no issue" message to noIssueTracker
      noIssueTrackerSetter((prev) => [
        ...prev,
        "No issue with the credit limit found.",
      ]);
    }
  }, [takenCredits, maxCreditLimit, noIssueTrackerSetter]);

  // Determine the message based on the credit conditions
  if (maxCreditLimit <= 0) {
    return <AlertMessage message="Credit limit is 0. Contact registrar." />;
  }

  if (takenCredits <= 0) {
    return (
      <AlertMessage message="No courses were taken this semester. Special permission is required." />
    );
  }

  if (takenCredits < 9) {
    return (
      <AlertMessage message="Less than 9 credits taken. Special permission required." />
    );
  }

  if (takenCredits > maxCreditLimit) {
    return (
      <AlertMessage
        message={`Exceeds credit limit of ${maxCreditLimit}. Special permission required.`}
      />
    );
  }

  // If none of the conditions match, return nothing (no alert)
  return null;
};

// Reusable AlertMessage component for rendering the alert
const AlertMessage = ({ message }) => (
  <div
    role="alert"
    style={{
      border: "1px solid #f39c12",
      backgroundColor: "#fce8b2",
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
        style={{ color: "#c65d0c" }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <span style={{ color: "#c65d0c" }} className="pl-2 font-bold text-md">
        Credit Limit Alert!
      </span>
    </div>
    <span style={{ color: "#c65d0c" }}>{message}</span>
  </div>
);

export default CreditLimitAlert;
