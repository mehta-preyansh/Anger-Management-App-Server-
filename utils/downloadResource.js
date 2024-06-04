const json2csv = require('json2csv');
const Parser = json2csv.Parser;
const downloadResource = (res, fileName, fields, data) => {
  const json2csv = new Parser({ fields });
  console.log(data)
  const csv = json2csv.parse(data);
  res.header('Content-Type', 'text/csv');
  res.attachment(fileName);
  return res.send(csv);
}

module.exports = downloadResource