import React, { useState } from 'react';
import { clickButton, scrapeTable } from './scrapingFunctions';


const Popup = () => {
  const [tableData, setTableData] = useState(null); // State to store table data
  const [message, setMessage] = useState(''); // State for message container

  const handleScrapeTable = async () => {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      // Simulate button click and scrape the table
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: clickButton,
      });

      chrome.scripting.executeScript(
        {
          target: { tabId: tab.id },
          function: scrapeTable,
        },
        (injectionResults) => {
          const result = injectionResults[0].result;
          setTableData(result); // Update state with scraped data
          console.log(tableData);
        }
      );
    } catch (error) {
      console.error("Error executing script:", error);
      setMessage('Error executing script.');
    }
  };

  return (
    <div className="bg-gray-100" style={{ backgroundColor: 'rgb(223, 238, 251)', width: '400px', height: '200px', overflow: 'auto' }}>
      <h3 className="bg-gradient-to-r from-blue-200 to-blue-300 border border-blue-400 shadow-md p-2 text-center font-mono text-2xl rounded-b-md">
        Validate Student's Data
      </h3>
      <div className="p-3">
        {/* Table container */}
        <div id="tableContainer">
          {tableData ? (
            <table>
              <thead>
                <tr>
                  {/* Add relevant table headers based on the scraped data */}
                </tr>
              </thead>
              <tbody>
                {/* Render the scraped table data */}
                {tableData.map((row, index) => (
                  <tr key={index}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No table data available yet.</p>
          )}
        </div>

        {/* Message Container */}
        <div id="messageContainer">
          {message && (
            <div
              role="alert"
              style={{ border: '1px solid #3498db', backgroundColor: '#d1ecf1', padding: '15px', marginTop: '10px', borderRadius: '5px' }}
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                  style={{ color: '#3498db' }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M12 8h.01M21 12c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8z"
                  />
                </svg>
                <span style={{ color: '#3498db', fontSize: '0.8rem' }} className="pl-2 font-bold">
                  Student's data validator extension by KKS
                </span>
              </div>
              <div style={{ marginTop: '10px' }}>
                <ul style={{ listStyleType: 'disc', marginLeft: '20px', marginTop: '5px' }}>
                  <li>
                    <strong>Probation Status:</strong> Displays an alert if the student is on probation.
                  </li>
                  <li>
                    <strong>Credit Limit:</strong> Displays an alert if the student has credit limit issues.
                  </li>
                  <li>
                    <strong>Prerequisite Status:</strong> Displays an alert if courses violate prerequisites.
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center pb-3">
        <button onClick={handleScrapeTable} className="bg-blue-100 border border-blue-300 text-blue-700 font-medium py-2 mt-3 px-4 rounded hover:bg-blue-200 transition-all">
          Validate
        </button>
      </div>
    </div>
  );
};

export default Popup;
