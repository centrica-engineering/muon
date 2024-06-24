const fs = require('fs');
const {readJSON, writeJSON} = require('./json-handler');

let tag = "";

const envTags = process.env.tags;
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

  writeJSON("./config/base-config.json", template)

});
