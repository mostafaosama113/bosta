const users = require("../db/models/users")
const jwt = require('jsonwebtoken')
class BorrowerService{
    static generateToken(payload) {
        return jwt.sign(payload , process.env.SECRET_KEY , {
            expiresIn : process.env.JWT_EXPIRES_IN
        })
    }
    static async register(data){
        const currentDate = new Date();
        const formatedCurrentDate =  currentDate.toISOString().split('T')[0];
        const newUser = await users.create({
                usertype : '0' , // create only borrowers accounts
                firstName : data.firstName ,
                lastName : data.lastName,
                email : data.email,
                password : data.password,
                registeredDate : formatedCurrentDate,
            })
        if(!newUser){
            throw new Error("This user already exits!");
        }
        const result = newUser.toJSON();
        if(result.usertype === '0') 
            result.usertype = 'borrower'
        else 
            result.usertype = 'maneger'

        delete result.password;
        delete result.updatedAt;
        delete result.createdAt;
        delete result.deletedAt;

        result.token = BorrowerService.generateToken({
            id : result.id
        })
        return result;
    }
}

module.exports = BorrowerService