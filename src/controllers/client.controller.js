const userModel = require('../models/user.model');
const { v4: uuidv4 } = require('uuid');
const clientModel = require('../models/client.model'); 
 
const getClients =  (async (req, res) => {
    try {
        const mails = await clientModel.find({ userId: req.locals.userId });
        console.warn(mails);
        return res.send({ message: mails });
    } catch (error) {
        console.log(error)
        return res.code(501).send({message:"error fetching"})
    }
});

module.exports = { getClients };
