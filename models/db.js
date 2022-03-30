const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI , (err) =>{
    if(!err){
        console.log("Mongo Db Connection is successfully Connect");
    }else{
        console.log("Error in Mongo Db ion :"+JSON.stringify(err , undefiend , 2));
    }
})