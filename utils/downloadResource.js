import { Parser } from 'json2csv';

const downloadResource = (res, fileName, fields, data) => {
  const json2csv = new Parser({ fields });
  console.log(data);
  const csv = json2csv.parse(data);
  res.header('Content-Type', 'text/csv');
  res.attachment(fileName);
  return res.send(csv);
};

export default downloadResource;