const borrower = require('../models/borrowerModel')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

class BorrowerService{
    static generateToken(payload) {
        return jwt.sign(payload , process.env.SECRET_KEY , {
            expiresIn : process.env.JWT_EXPIRES_IN
        })
    }
    static async register(data){
        if(!data || !data.password || !data.first_name || !data.last_name || !data.email){
            throw new Error('All fields are required');
        }
        try{
            data.password = bcrypt.hashSync(data.password , 12)
            const newUser = await borrower.create(data.first_name , data.last_name , data.email , data.password)
            const result = JSON.parse(JSON.stringify(newUser))
            delete result.password;
            result.token = BorrowerService.generateToken({
                id : result.borrower_id
            })
            return result;
        }catch(err){
            throw new Error("This user already exits!");
        }
        
    }

    static async login(data){
        const {email , password} = data;
        if(!email || !password){
            throw new Error("Please provide email and password");
        }
        
        const result = await borrower.getByEmail(email);
        
        if(!result){
            throw new Error("Invalid credentials!");
        }
        
        const isPasswordMatched = await bcrypt.compare(password , result.password);
        if(isPasswordMatched){
            const token = BorrowerService.generateToken({
                id : result.borrower_id
            })
            return {
                'status' : 'success',
                'token' : token
            }
        }else{
            throw new Error("Invalid credentials!");
        }
    }
    static async update(borrower_id, updatedData) {
        if(!borrower_id || !updatedData){
            throw new Error('All fields are required');
        }
        try {
            const updatedBorrower = await borrower.update(borrower_id, updatedData);
            return updatedBorrower;  
        } catch (err) {
            throw new Error('Error updating borrower: ' + err.message);
        }
    }
    static async delete(borrower_id) {
        if(!borrower_id){
            throw new Error('All fields are required');
        }
        try {
            const result = await borrower.delete(borrower_id);
            return result;
        } catch (err) {
            console.error(err);
            throw new Error('Error deleting borrower');
        }
    }
    static async getAll() {
        try {
            const borrowers = await borrower.getAll();
            const borrowersWithoutPassword = borrowers.map(borrower => {
                const { password, ...borrowerWithoutPassword } = borrower; // Destructure and remove password
                return borrowerWithoutPassword;
            });
            
            return borrowersWithoutPassword;
        } catch (err) {
            console.error(err);
            throw new Error('Error fetching borrowers');
        }
    }
}

module.exports = BorrowerService