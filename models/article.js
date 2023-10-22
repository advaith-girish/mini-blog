//to store our articles

const mongoose=require('mongoose');
const articleschema=new mongoose.Schema({
    title:{
        // required:true,
        type:String
    },
    description:{
        type:String
    },
    markdown:{
        type:String
    },
    createdAt:{
        type:Date,
        default: Date.now
    }
});

module.exports=mongoose.model('Article',articleschema);