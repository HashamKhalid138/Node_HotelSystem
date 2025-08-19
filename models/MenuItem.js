const mongoose = require('mongoose');

const menuSchema=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    taste:{
        type:String,
        enum:['sweet','spicy','sour'],
        require:true
    },
    is_drink:{
        type:Boolean,
        default:false
    },
    ingredients:{
        type:[String],
        default:[]
    },
    num_sale:{
        type:Number,
        default:0
    }
})
 
const MenuItem=mongoose.model('MenuItem',menuSchema);
module.exports=MenuItem;