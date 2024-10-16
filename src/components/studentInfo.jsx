// StudentInfo Component
const StudentInfo = ({ studentId, name, cgpa, additionalData }) => {
  return (
    <>
      {/* Display Student ID and Name */}
      {studentId && name && (
        <div
          style={{ backgroundColor: "#c1eef7" }}
          className="border border-blue-300 px-4 py-2 rounded-md"
          role="alert"
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
            <span className="pl-2 font-bold text-[#326c9c] text-[15px]">
              Student Information
            </span>
          </div>
          <div className="my-2">
            <hr className="border-black" />
          </div>

          <div className="text-xs">
            {/* Each label-value pair is now aligned in two columns using flex */}
            {[
              { label: "Name", value: name },
              { label: "Student ID", value: studentId },
              { label: "CGPA", value: cgpa, isHighlighted: false },
              { label: "Program", value: additionalData?.program },
              {
                label: "Enrolled Session",
                value: additionalData?.enrolledSession,
              },
              { label: "Credit Limit", value: additionalData?.creditLimit },
              { label: "Credit Selected", value: additionalData?.creditTaken },
            ].map(({ label, value, isHighlighted }, index) => (
              <div key={index} className="flex justify-start">
                <span className="text-blue-800 font-bold">{label}:</span>
                <span
                  className={`ml-2 ${
                    isHighlighted
                      ? "bg-blue-200 px-2 rounded-full font-bold"
                      : "text-black font-bold"
                  }`}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default StudentInfo;
