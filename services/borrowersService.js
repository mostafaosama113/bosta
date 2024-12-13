const users = require("../db/models/users")

class BorrowerService{
    static async register(data){
        const newUser = await users.create({
                usertype : '0' , // create only borrowers accounts
                firstName : data.firstName ,
                lastName : data.lastName,
                email : data.email,
                password : data.password,
                
            })
        if(!newUser){
            throw new Error("This user already exits!");
        }
        return newUser;
    }
}

module.exports = BorrowerService