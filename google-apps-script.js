/**
 * Google Apps Script to handle Form Submissions and Cal.com Webhooks
 * 
 * INSTRUCTIONS:
 * 1. Create a NEW Google Sheet (e.g., "WFG Leads").
 * 2. In the Sheet, go to **Extensions** > **Apps Script**.
 * 3. Paste this code into the editor (replace existing code).
 * 4. Save the project (e.g., "WFG Form Handler").
 * 5. Click "Deploy" -> "New deployment".
 * 6. Select type: "Web app".
 * 7. Description: "v1".
 * 8. Execute as: "Me".
 * 9. Who has access: "Anyone" (IMPORTANT).
 * 10. Click "Deploy".
 * 11. Copy the "Web app URL".
 * 12. Add this URL to your .env file as VITE_GOOGLE_SHEET_SCRIPT_URL.
 */

const SHEET_NAME = "Submissions";

function doPost(e) {
    const lock = LockService.getScriptLock();
    lock.tryLock(10000);

    try {
        const doc = SpreadsheetApp.getActiveSpreadsheet();
        let sheet = doc.getSheetByName(SHEET_NAME);

        if (!sheet) {
            sheet = doc.insertSheet(SHEET_NAME);
            // Create Header Row
            sheet.appendRow([
                "Timestamp",
                "Name",
                "Email",
                "Company",
                "Challenge",
                "Budget",
                "Timeline",
                "Booking Date",
                "Booking Time",
                "Status"
            ]);
        }

        const data = JSON.parse(e.postData.contents);

        // Check if this is a booking update (has email and booking details)
        if (data.type === 'booking') {
            // Find the row with this email and update it
            const email = data.email;
            const lastRow = sheet.getLastRow();
            let found = false;

            // Only search if there are data rows (lastRow > 1)
            if (lastRow > 1) {
                const range = sheet.getRange(2, 3, lastRow - 1, 1); // Column C is Email
                const values = range.getValues();

                // Search backwards to find the most recent submission
                for (let i = values.length - 1; i >= 0; i--) {
                    if (values[i][0] === email) {
                        const rowIndex = i + 2; // +2 because of header and 0-index
                        sheet.getRange(rowIndex, 8).setValue(data.date); // Booking Date
                        sheet.getRange(rowIndex, 9).setValue(data.time); // Booking Time
                        sheet.getRange(rowIndex, 10).setValue("Booked"); // Status
                        found = true;
                        break;
                    }
                }
            }

            if (!found) {
                // If no previous submission found, create a new row
                sheet.appendRow([
                    new Date(),
                    data.name || "Unknown",
                    data.email,
                    "Unknown",
                    "Booking Only",
                    "-",
                    "-",
                    data.date,
                    data.time,
                    "Booked"
                ]);
            }

        } else {
            // Standard Form Submission
            sheet.appendRow([
                new Date(),
                data.name,
                data.email,
                data.company,
                data.challenge,
                data.budget,
                data.timeline,
                "", // Booking Date (Empty initially)
                "", // Booking Time (Empty initially)
                "Lead" // Status
            ]);
        }

        return ContentService.createTextOutput(JSON.stringify({ result: "success" }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (e) {
        return ContentService.createTextOutput(JSON.stringify({ result: "error", error: e.toString() }))
            .setMimeType(ContentService.MimeType.JSON);
    } finally {
        lock.releaseLock();
    }
}
