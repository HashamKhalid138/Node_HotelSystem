const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const PersonSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        require:true
    },
    mobile:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    address:{
        type:String
    },
    salary:{
        type:Number,
        require:true
    },
    username:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
});

PersonSchema.pre('save',async function(next){
    const person = this;
    if(!person.isModified('password')) return next();
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(person.password, salt);
        person.password=hashedPassword;
        next();
    }catch(err){
        return next(err);
    }
})
PersonSchema.methods.comparePassword = async function (candidatePassword) {
    try{
       const isMatched = await bcrypt.compare(candidatePassword,this.password);
       return isMatched;
    }
    catch(err){
        throw err;
    }
    
}
const Person = mongoose.model('Person',PersonSchema);

module.exports = Person;
