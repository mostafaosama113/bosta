const BorrowerService = require('../services/borrowersService')
const register = async (req , res , next) => {
    const body = req.body
    try {
        const borrowers = await BorrowerService.register(body);
        res.status(200).send(borrowers);
      } catch (err) {
        console.error(err);
        res.status(404).json({ message: err.message });
      }
}

module.exports = {register}