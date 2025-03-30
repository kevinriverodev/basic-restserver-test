const express = require('express');
const cors = require('cors');
const { connectDB } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        
        this.userPath = '/usuarios';
        this.authPath = '/auth'

        this.getDBConnection();
        //Midlewares
        this.middlewares();

        //Routes
        this.routes();
    }

    async getDBConnection () {
        await connectDB();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.userPath, require('../routes/user'));
        this.app.use(this.authPath, require('../routes/auth'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;