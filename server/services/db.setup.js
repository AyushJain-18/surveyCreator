const mongoose = require("mongoose");

const URL = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@${process.env.DB_Cluster}.mongodb.net/${process.env.DB_Name}?retryWrites=true&w=majority`;
// mongodb+srv://Ayush:<password>@cluster.7z2kq.mongodb.net/<dbname>?retryWrites=true&w=majority

let connectToDB = async()=>{
    try{
        await mongoose.connect(URL ,{ useNewUrlParser: true,useUnifiedTopology: true , useFindAndModify: false });
        console.log('//SUCCESS// \n Successfully connected to DB');
    }catch(error){
        console.log('//ERROR// \n error ocured while connecting to DB');
    }
}

module.exports = connectToDB;