export function clickButton() {
    const button = document.querySelector('#result-button');
    if (button) {
      button.click();
    } else {
      console.error("Result button not found.");
    }
  }
  
  export function scrapeTable() {
    return new Promise((resolve, reject) => {
      const observer = new MutationObserver(() => {
        const table = document.querySelector("table.previous-result-table");
        const studentInfo = document.querySelector("div[style*='font-size: 13px']");
        const additionalTable = document.querySelector("table");
  
        const creditLimitDiv = document.getElementById("creditLimit");
        const creditTakenDiv = document.getElementById("creditTaken");
  
        if (table && studentInfo && additionalTable && creditLimitDiv && creditTakenDiv) {
          observer.disconnect(); // Stop observing once elements are found
          const tableData = Array.from(table.querySelectorAll("tr")).map(row =>
            Array.from(row.querySelectorAll("th, td")).map(cell => cell.textContent.trim())
          );
  
          const studentID = studentInfo.children[0].children[0].textContent.split(":").slice(-1)[0]?.trim();
          const studentName = studentInfo.children[0].children[1].textContent.split(":").slice(-1)[0]?.trim();
          const program = studentInfo.children[1].children[0].textContent.split(":").slice(-1)[0]?.trim();
  
          resolve({
            tableData,
            studentID,
            studentName,
            program,
            creditLimit: creditLimitDiv.textContent.trim(),
            creditTaken: creditTakenDiv.textContent.trim(),
          });
        }
      });
  
      observer.observe(document.body, { childList: true, subtree: true });
  
      setTimeout(() => {
        observer.disconnect();
        reject("Table or student info did not load in time.");
      }, 20000);
    });
  }
  