const fs = require('fs');

// Function to read any JSON file.

function readJSON(filePath, cb) {
  fs.readFile(filePath, (err, fileData) => {
    if (err) {
      return cb && cb(err);
    }
    try {
      const object = JSON.parse(fileData);
      return cb && cb(null, object);
    } catch (err) {
      return cb && cb(err);
    }
  });
}

// Function to write any JSON file.

function writeJSON(filePath, template) {
  fs.writeFile(filePath, JSON.stringify(template, null, "\t"), err => {
    if (err) console.log("Error writing file:", err);
  });
  console.log(`==>***** Tag is set as expected *****<==`);
}

module.exports = {readJSON,writeJSON};
