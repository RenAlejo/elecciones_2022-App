const express = require('express');
const cors = require('cors');
var corsWhiteList = ['http://testigoselectorales.com', 'http://localhost']

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';
        this.departamentosPath = '/api/departamentos'
        this.municipiosPath = '/api/municipios'
        this.votosPath = '/api/votos'
        /**
         * Middlewares
        */
        this.middlewares();

        /**
         * Rutas
        */

        this.routes();
    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura del Body
        this.app.use( express.json() );

        /**
         * @params Carpeta de Directorio Público
        */
        this.app.use(express.static('public'));
        
    }


    routes() {

        this.app.use(this.usersPath, require('../routes/users.routes'))
        this.app.use(this.departamentosPath, require('../routes/departamentos.routes'))
        this.app.use(this.municipiosPath, require('../routes/municipios.routes'))
        this.app.use(this.votosPath, require('../routes/votos.routes'))

    }

    listen() {
        this.app.listen(this.port , () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}


module.exports = Server;