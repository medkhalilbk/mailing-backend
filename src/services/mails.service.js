const csvtojsonV2 = require("csvtojson/v2");
const sgMail = require('@sendgrid/mail');

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
const sendEmail = async (reciever, from, subject, html) => {
  async () => {
   const msg = {
     to: reciever,
     from: from, 
     subject: subject,
     html: html,
   };
    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  }  ;
}

module.exports = { sendEmail };
