const users = require("../db/models/users")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const { use } = require("../routes/authRoutes");
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

    static async login(data){
        const {email , password} = data;
        if(!email || !password){
            throw new Error("Please provide email and password");
        }
        const result = await users.findOne({where : {email}});
        if(!result){
            throw new Error("Invalid credentials!");
        }
        const isPasswordMatched = await bcrypt.compare(password , result.password);
        
        if(isPasswordMatched){
            const token = BorrowerService.generateToken({
                id : result.id
            })
            return {
                'status' : 'success',
                'token' : token
            }
        }else{
            throw new Error("Invalid credentials!");
        }
    }
}

module.exports = BorrowerService