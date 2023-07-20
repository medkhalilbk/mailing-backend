const csvtojsonV2= require("csvtojson/v2"); 


const readCsvFromRequest = async (file) => {
    try {
csv()
.fromFile(file)
.then((jsonObj)=>{
	console.log(jsonObj); 
}) 
    } catch (error) {
        console.log(error)
    }
/* const jsonArray=await csv().fromFile(file); */
}
module.exports = { readCsvFromRequest }