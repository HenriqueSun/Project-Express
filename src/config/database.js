const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://henriquecasagrandeoficial_db_user:KyN4WwLacA50AxFH@ac-oskuhjb-shard-00-00.wbn7cd0.mongodb.net:27017,ac-oskuhjb-shard-00-01.wbn7cd0.mongodb.net:27017,ac-oskuhjb-shard-00-02.wbn7cd0.mongodb.net:27017/?ssl=true&replicaSet=atlas-kr7zd7-shard-0&authSource=admin&appName=Cluster0';

async function connectDatabase(){
    await mongoose.connect(MONGO_URI);
    console.log('Conectou o banco!')
}

module.exports = connectDatabase;