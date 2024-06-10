const fs = require('fs');
const jsonReader = require('./fileReadWrite');

let tag;

if (process.env.tag.includes(',')) {
  tag = process.env.tag.split(',').join(" or ");
}else if(process.env.tag){
  tag = process.env.tag
}else {
  tag = ""
}


//Updating the BaseConfig.JSON file and Updating the ENV and Branch ID as per the input from runtime. 

jsonReader("./config/baseConfig.json", (err, template) => {
  if (err) {
    console.log("Error reading file:", err);
    return;
  }
  template.env.TAGS = tag;


  fs.writeFile("./config/baseConfig.json", JSON.stringify(template, null, "\t"), err => {
    if (err) console.log("Error writing file:", err);
  });
  console.log(`==>***** Tag is set as expected *****<==`);
});
