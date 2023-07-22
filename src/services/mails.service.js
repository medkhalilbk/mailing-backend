const csvtojsonV2 = require("csvtojson/v2");

const readCsvFromBuffer = (buffer) => {
  return new Promise((resolve, reject) => {
    const jsonArray = [];

    const csvStream = csvtojsonV2({ noheader: false  })
      .fromString(buffer.toString());

    csvStream
      .on('data', (jsonObj) => {
        jsonArray.push(jsonObj);
      })
      .on('done', (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(jsonArray);
        }
      });
  });
};

module.exports = { readCsvFromBuffer };
