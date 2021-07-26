require("dotenv").config();
const mongoose = require('mongoose');
//mongodb://root:root@cluster0.fmgyw.mongodb.net/?retryWrites=true&w=majority
mongoose.connect("mongodb+srv://root:root@cluster0.fmgyw.mongodb.net/bRES?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true
    },(err) => {
        if (!err)
            console.log('MongoDB connection succeeded.');
        else
            console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2));
    
    });

module.exports = mongoose;