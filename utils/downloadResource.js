// ==============================================
// downloadResource.js - Utility to convert JSON to CSV and trigger a file download
// ==============================================

import { Parser } from 'json2csv';

/**
 * Converts JSON data into CSV format and triggers a file download response.
 *
 * @param {Object} res - Express response object
 * @param {String} fileName - Desired name of the downloaded file (e.g., "logs.csv")
 * @param {Array} fields - Field descriptors for json2csv (includes labels and keys)
 * @param {Array} data - Array of JSON objects to be converted into CSV
 */
const downloadResource = (res, fileName, fields, data) => {
  const json2csv = new Parser({ fields });

  // Uncomment for debugging: Logs the raw JSON data before converting
  // console.log(data);

  // Convert JSON to CSV
  const csv = json2csv.parse(data);

  // Set response headers to indicate file download and type
  res.header('Content-Type', 'text/csv');
  res.attachment(fileName);

  // Send the CSV data as the response body
  return res.send(csv);
};

export default downloadResource;
