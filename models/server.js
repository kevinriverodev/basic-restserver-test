const express = require('express');
const cors = require('cors');
const { connectDB } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        
        this.paths = {
            user: '/usuarios',
            auth: '/auth',
            category: '/categorias',
            product: '/productos',
            search: '/search'
        }

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
        this.app.use(this.paths.user, require('../routes/user'));
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.category, require('../routes/category'));
        this.app.use(this.paths.product, require('../routes/product'));
        this.app.use(this.paths.search, require('../routes/search'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;