import React, { useState } from "react";
import { failAllowed, retakeGapAllowed } from "../data/dynamicData";

const InfoContainer = () => {
  const [showEmail, setShowEmail] = useState(false);

  const handleClick = () => {
    setShowEmail(true);
  };

  return (
    <div>
      <div
        role="alert"
        className="border border-blue-500 bg-blue-100 p-4 rounded-md mt-0"
      >
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            style={{ color: "#326c9c" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 16h-1v-4h-1m1-4h.01M12 8h.01M21 12c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8z"
            />
          </svg>
          <span
            className="pl-2 font-bold"
            style={{ color: "#326c9c", fontSize: "0.8rem" }}
          >
            Student's Course validator tool by KKS
          </span>
        </div>
        <div className="mt-2">
          <p className=" font-bold">This tool validates the following:</p>
          <ul className="list-disc ml-5 mt-1">
            <li>
              <strong>Probation Status:</strong> Alerts if the student is on
              probation.
            </li>
            <li>
              <strong>Multiple Fail Status:</strong>{" "}
              {`Alerts if any course has more than ${failAllowed} failing grades.`}
            </li>
            <li>
              <strong>Credit Limit:</strong> Alerts for any credit limit issues.
            </li>
            <li>
              <strong>Prerequisite Status:</strong> Alerts if any courses taken
              this semester violate prerequisites.
            </li>
            <li>
              <strong>Semester gap for retake:</strong>{" "}
              {`Alerts if any courses
              retaken this semester have a gap of over ${retakeGapAllowed} semesters, excluding
              the RS semester.`}
            </li>
            <li>
              <strong className=" italic">
                Nb: Please manually verify any discrepancies and inform,
                <span
                  onClick={handleClick}
                  style={{ color: "blue", cursor: "pointer" }}
                >
                  {!showEmail && " Md. Khaliduzzaman Khan Samrat"}
                </span>
                {showEmail && (
                  <span>
                    {" at "}
                    <a
                      href="mailto:ext.md.khaliduzzaman@bracu.ac.bd"
                      style={{ color: "blue" }}
                    >
                      ext.md.khaliduzzaman@bracu.ac.bd
                    </a>
                  </span>
                )}
              </strong>
            </li>
            <li>
              <strong className=" italic">
                Note: This tool currently only works for the 'CSE' and 'CS'
                programs of BRACU.
              </strong>
            </li>
          </ul>
        </div>
      </div>
      {/* Usage container */}
      <UsageDropdown />
    </div>
  );
};

// import { useState } from "react";
function UsageDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border border-blue-500 bg-blue-100 p-4 rounded-md mt-2">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleDropdown}
      >
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            style={{ color: "#326c9c" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 16h-1v-4h-1m1-4h.01M12 8h.01M21 12c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8z"
            />
          </svg>
          <span
            className="pl-2 font-bold"
            style={{ color: "#326c9c", fontSize: "0.8rem" }}
          >
            Usage
          </span>
        </div>

        {/* Dropdown Arrow */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          style={{ color: "#326c9c" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {/* Conditionally render the rest of the content */}
      {isOpen && (
        <div className="mt-2">
          <ul className="list-disc ml-5 mt-1">
            <li>
              Go to <strong>Usis</strong> advising panel.
            </li>
            <li>
              Click on <strong>Previous Result</strong> button.
            </li>
            <li>
              When the student <strong>Gradesheet</strong> is visible, click on
              the validate button of the extension.
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default InfoContainer;
