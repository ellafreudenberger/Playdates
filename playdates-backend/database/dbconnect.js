require('dotenv').config();
const mongoose = require('mongoose');


//make db connect: async call
const connection = async()=>{
    try{
        await mongoose.connect(process.env.DATABASE,{});
    
        console.log('Database has successfully connected');
    }
    catch(err){
    console.log(err);
}
}

module.exports = connection;