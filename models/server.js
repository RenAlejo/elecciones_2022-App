
const express = require('express');
const cors = require('cors');
const db = require('../db/connection');
const corsWhiteList = ['http://testigoselectorales.com', 'http://localhost']


class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
         
        this.path = {
            'authPath': '/api/auth',
            'departamentosPath': '/api/departamentos', 
            'municipiosPath': '/api/municipios', 
            'tipologiaPath': '/api/tipologia',
            'votosPath': '/api/form', 
            'usersPath': '/api/users'
        }

        this.dbConnection();
        /**
         * Middlewares
        */
        this.middlewares();

        /**
         * Rutas
        */

        this.routes();
    }

    async dbConnection() {
        try {
            await db.authenticate();
            console.log('Conexión establecida con la base de datos');
        } catch(err){
            throw new Error ( err );
        }
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

        this.app.use(this.path.authPath, require('../routes/auth.routes'));
        this.app.use(this.path.departamentosPath, require('../routes/departamentos.routes'));
        this.app.use(this.path.municipiosPath, require('../routes/municipios.routes'));
        this.app.use(this.path.tipologiaPath, require('../routes/tipologia.routes'));
        this.app.use(this.path.votosPath, require('../routes/form.routes'));
        this.app.use(this.path.usersPath, require('../routes/users.routes'));

    }

    listen() {
        this.app.listen(this.port , () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}


module.exports = Server;