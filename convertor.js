const fs = require('fs');
const path = require('path');
const crypto = require('crypto')

const inputPwFile = path.join(process.cwd(), "darkweb2017.txt");
const outputFile = path.join(process.cwd(), "pw.json");

fs.readFile(inputPwFile, 'utf8', (err, data) => {
    if (err) {
        console.log("Error reading the file", inputPwFile);
        return;
    }
    const splitArray = data.split("\n").map(ele => ele.trim()).filter(ele => ele).map(ele => crypto.createHash('md5').update(ele).digest("hex"));

    const jsonData = JSON.stringify(splitArray, null, 2); 

    fs.writeFile(outputFile, jsonData, (err) => {
        if (err) {
            console.log("Error writing the file", outputFile);
            return;
        }
        console.log("Data written to", outputFile);
    });
});
