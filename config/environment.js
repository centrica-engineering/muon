const fs = require('fs');
const readJSON = require('./json-handler');

let tag = "";

const envTags = process.env.tag;
if (envTags) {
  tag = envTags.includes(',') ? envTags.split(',').join(' or ') : envTags;
}


//Updating the BaseConfig.JSON file and Updating the ENV and Branch ID as per the input from runtime. 

readJSON("./config/base-config.json", (err, template) => {
  if (err) {
    console.log("Error reading file:", err);
    return;
  }
  template.env.tags = tag;


  fs.writeFile("./config/base-config.json", JSON.stringify(template, null, "\t"), err => {
    if (err) console.log("Error writing file:", err);
  });
  console.log(`==>***** Tag is set as expected *****<==`);
});
