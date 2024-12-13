const BorrowerService = require('../services/borrowersService')
const register = async (req , res , next) => {
    const body = req.body
    try {
        const borrowers = await BorrowerService.register(body);
        res.status(201).send(borrowers);
      } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
      }
}
const login = async (req , res , next) => {
    const body = req.body
    try {
        const response = await BorrowerService.login(body);
        res.status(200).send(response);
      } catch (err) {
        console.error(err);
        res.status(400).json({ message: err.message });
      }
}
const update = async (req, res, next) => {
  const { borrower_id } = req.params; // Get borrower_id from route params
  const updatedData = req.body; // Get the updated data from the request body
  try {
      const updatedBorrower = await BorrowerService.update(borrower_id, updatedData);
      res.status(200).json({
          message: 'Borrower updated successfully',
          borrower: updatedBorrower
      });
  } catch (err) {
      console.error(err);
      res.status(400).json({
          message: err.message
      });
  }
};
module.exports = {register , login , update}