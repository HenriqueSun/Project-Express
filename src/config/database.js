const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://henriquecasagrandeoficial_db_user:0U1BwjG9bqEnjV9S@cluster0.wbn7cd0.mongodb.net/Projeto?appName=Cluster0';

async function connectDatabase(){
    await mongoose.connect(MONGO_URI);
    console.log('Conectou o banco!')
}

module.exports = connectDatabase;