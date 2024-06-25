const mongoose = require('mongoose');
const bcrypt = require('bcrypt')      // Password is hideen in the Hashes
const validator = require('validator');


const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});


    //  Static Signup method 
userSchema.statics.signup = async function (email , password) {


    // validation by validator package

     if(!email || !password) {
        throw Error('Fill kar le bhai')
     }
     if(!validator.isEmail(email)) {
        throw Error('Email chuktoi taktana')
     }
     if(!validator.isStrongPassword(password)){
        throw Error('Password Avghd taka')
     }

    const exists = await this.findOne({email})

    if(exists) {
        throw Error('Email Already Present')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email,password:hash})

    return user;
}



// Now Static Login MEthod

userSchema.statics.login = async function (email, password) {
    // Validation by validator package
    if (!email || !password) {
        throw Error('Fill kar le bhai');
    }
    if (!validator.isEmail(email)) {
        throw Error('Email chuktoi taktana');
    }

    const user = await this.findOne({ email });

    if (!user) {
        throw Error('Email Not Found');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw Error('Incorrect Password');
    }

    return user;
}

module.exports = mongoose.model('User', userSchema);
