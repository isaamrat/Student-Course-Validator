import { useState, useEffect } from "react";
import CreditLimitAlert from "./components/creditLimitAlert";
import CheckProbationAlert from "./components/checkProbationAlert";
import StudentInfo from "./components/studentInfo";
import RetakeRepeatCheck from "./components/retakeRepeatCheck";
import PrerequisiteCheck from "./components/checkPreRequisite";
import AppBar from "./components/appBar";
import InfoContainer from "./components/infoContainer";
import MultipleFailCheck from "./components/multipleFailCheck";

function App() {
  const [tableData, setTableData] = useState([]);
  const [additionalData, setAdditionalData] = useState(null);
  const [studentId, setStudentId] = useState(null); // State for Student ID
  const [name, setName] = useState(null); // State for Name
  const [cgpa, setCgpa] = useState(-1.0); // State for CGPA
  const [warning, setWarning] = useState(""); // State for warning messages
  const [noIssueTracker, setNoIssueTracker] = useState([]); // State for no issue messages

  const handleScrapeTable = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0].id;

      chrome.scripting.executeScript(
        {
          target: { tabId: tabId },
          files: ["contentScript.js"],
        },
        () => {
          chrome.tabs.sendMessage(
            tabId,
            { type: "SCRAPE_TABLE" },
            (response) => {
              if (response) {
                if (response.success) {
                  setTableData(response.tableData);
                  setAdditionalData(response.additionalData);
                  setStudentId(response.studentId); // Set the scraped Student ID
                  setName(response.name); // Set the scraped Name
                  setCgpa(response.tableData.at(-1).at(-1));
                  setWarning(""); // Clear any previous warning
                } else {
                  setWarning(response.message); // Set warning message
                  console.error(
                    "No grade sheet found. Please ensure you are on the BRACU USIS advising page, click on the 'Previous Result' button, and confirm that the grade sheet is visible."
                  );
                }
              }
            }
          );
        }
      );
    });
  };

  // Use useEffect to update noIssueTracker based on additionalData
  useEffect(() => {
    if (additionalData && additionalData.creditTaken <= 0) {
      setNoIssueTracker((prev) => [
        ...prev,
        "Could not check for Retake/Repeat policy as no credit taken this semester.",
        "Could not check for Pre Requisites policy as no credit taken this semester.",
      ]);
    }
  }, [additionalData]); // Dependency array includes additionalData

  return (
    <div style={{ backgroundColor: "#dfeefb" }}>
      <AppBar />

      <div className="p-4 w-96">
        {!warning && !studentId && (
          <div className="">
            <InfoContainer />
          </div>
        )}
        {/* Display Warning Message */}
        {warning && <WarningMessage message={warning} />}

        {/* Display Student ID and Name */}
        {studentId && name && (
          <StudentInfo
            studentId={studentId}
            name={name}
            cgpa={cgpa}
            additionalData={additionalData}
          />
        )}
        {/* Conditionally render CreditLimitAlert only if additionalData is available */}
        {additionalData && cgpa && (
          <CheckProbationAlert
            stCgpa={cgpa}
            stEnrolledSession={additionalData.enrolledSession}
            noIssueTrackerSetter={setNoIssueTracker}
          />
        )}
        {tableData && studentId && (
          <MultipleFailCheck
            gradeSheet={tableData}
            noIssueTrackerSetter={setNoIssueTracker}
          />
        )}
        {additionalData && (
          <CreditLimitAlert
            stCreditTaken={additionalData.creditTaken}
            stMaxCreditLimit={additionalData.creditLimit}
            noIssueTrackerSetter={setNoIssueTracker}
          />
        )}
        {tableData && additionalData && additionalData.creditTaken > 0 && (
          <PrerequisiteCheck
            gradeSheet={tableData}
            program={additionalData.program}
            noIssueTrackerSetter={setNoIssueTracker}
          />
        )}
        {tableData && studentId && additionalData.creditTaken > 0 && (
          <RetakeRepeatCheck
            gradeSheet={tableData}
            noIssueTrackerSetter={setNoIssueTracker}
          />
        )}

        <NoIssueTrackerDisplay noIssueTracker={noIssueTracker} />
        <div className="flex justify-center">
          <button
            id="scrapeTable"
            onClick={handleScrapeTable}
            className="bg-blue-100 border border-blue-300 text-[#326c9c] font-medium py-2 mt-3 px-4 rounded hover:bg-blue-200 transition-all"
          >
            Validate
          </button>
        </div>
      </div>
    </div>
  );
}

// WarningMessage Component
const WarningMessage = ({ message }) => {
  return (
    <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-md mt-4">
      <strong>Warning:</strong>
      <div>{message}</div>
    </div>
  );
};

const NoIssueTrackerDisplay = ({ noIssueTracker }) => {
  if (noIssueTracker.length === 0) return null; // Don't render if no messages

  return (
    <div
      role="alert"
      className="border border-green-500 bg-green-100 p-4 mt-2 rounded-lg"
    >
      <div className=" ml-1 flex items-center">
        <svg
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="20px" // Width adjusted to match the required size
          height="20px" // Height adjusted to match the required size
          viewBox="0 0 98.25 98.25"
          fill="#4caf50" // Green fill for the SVG
        >
          <g>
            <g>
              <path d="M49.125,0C22.037,0,0,22.038,0,49.125S22.037,98.25,49.125,98.25S98.25,76.212,98.25,49.125S76.213,0,49.125,0z M49.125,88.25C27.551,88.25,10,70.699,10,49.125S27.551,10,49.125,10S88.25,27.551,88.25,49.125S70.699,88.25,49.125,88.25z" />
              <path d="M77.296,33.027L71.02,26.75c-0.442-0.442-1.227-0.442-1.668,0L39.67,56.432L28.898,45.661c-0.441-0.442-1.225-0.442-1.668,0l-6.276,6.276c-0.222,0.222-0.346,0.521-0.346,0.834c0,0.313,0.124,0.613,0.346,0.834l17.882,17.881c0.23,0.229,0.531,0.346,0.834,0.346c0.301,0,0.604-0.115,0.834-0.346l36.792-36.792c0.222-0.221,0.347-0.521,0.347-0.834S77.518,33.248,77.296,33.027z" />
            </g>
          </g>
        </svg>
        <span
          className="pl-2 font-bold text-md text-green-600" // Using Tailwind CSS classes for text color
        >
          Comment for this student:
        </span>
      </div>

      <ul className="mt-2 pl-5 list-disc">
        {noIssueTracker.map((message, index) => (
          <li key={index} className=" text-green-600">
            {message}
          </li>
        ))}
        <li className="text-green-600 italic font-semibold">
          For further inspection please use the Grade Sheet Validator.
        </li>
      </ul>
    </div>
  );
};

export default App;
