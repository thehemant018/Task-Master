require('dotenv').config();
const mongoose = require('mongoose');
const MONGOURL=process.env.MONGO_URL;

const connectToMongo=()=>{
    mongoose.connect(MONGOURL)
        console.log('connected mongodb successfully')
};

module.exports=connectToMongo;