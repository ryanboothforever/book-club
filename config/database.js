const mongoose = require("mongoose");

// store the database connection into a variable
const connectDB = async () => {
  try {
    // create the connection variable and fill it with the mongoose connection
    const conn = await mongoose.connect(process.env.DB_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    // report that all is well and the name of the database cluster etc.
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    // if stuff broke, console some hints for debugging
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
