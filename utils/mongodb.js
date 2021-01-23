const mongoose = require('mongoose');
const chalk = require('chalk');

async function connectMongoDB() {
  try {
    const mongoConnection = await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    });

    console.info(
      chalk.green(`MongoDB Connected: ${mongoConnection.connection.host}`)
    );
  } catch (error) {
    throw new Error(
      'Failed to connect MongoDB. Please make sure MongoDB setup is done correctly.'
    );
  }
}

module.exports = connectMongoDB;
