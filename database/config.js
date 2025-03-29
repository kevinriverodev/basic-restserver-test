const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN);
        console.log('Conexion establecida con la base de datos');
    } catch (error) {
        console.log(error);
        if(error) throw new Error(error);
    }
} 

module.exports = {
    connectDB
}