const mongoose = require('mongoose');

mongoose.connect(
    "mongodb+srv://root:root@cluster0.fmgyw.mongodb.net/reservation-fb?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    },(err) => {
        if (!err)
            console.log('MongoDB connection succeeded.');
        else
            console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2));
    
    });

module.exports = mongoose;