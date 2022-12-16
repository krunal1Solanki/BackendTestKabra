const mongoose = require("mongoose");
//const { MONGO_URI } = process.env;
//"mongodb+srv://krunal:idkmypassword1%40A@cluster0.za1dsrh.mongodb.net/todolistDB"
exports.connect = () => {
  mongoose
    .connect("mongodb://0.0.0.0:27017", {
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=> console.log("DB is connected successfully!"))
    .catch((err) => {
      console.log(`DB connection failed ${err}`);
      process.exit(1);
    });
};