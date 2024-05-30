import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import mysql from 'mysql';
import myConnection from 'express-myconnection';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './routers/customer.mjs';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'dabit',
    password: 'MEGALOVANIA666',
    port: 3306,
    database: 'banco_alimentos'
}, 'single'));

app.use(session({
    secret: 'tu_secreto',
    resave: false,
    saveUninitialized: true
}));

app.use(express.urlencoded({ extended: true }));  // Asegúrate de tener este middleware para analizar cuerpos de solicitud
app.use(express.json());  // Agregar para analizar cuerpos de solicitud JSON
app.use('/', router);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('login');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


/*
import express from 'express';
import session from 'express-session';  // Importar express-session
import morgan from 'morgan';
import mysql from 'mysql';
import myConnection from 'express-myconnection';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './routers/customer.mjs'; // Asegúrate de que la extensión del archivo es .mjs

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar el motor de plantillas EJS
const viewsPath = path.join(fileURLToPath(import.meta.url), '..', 'views');
app.set('views', viewsPath);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'dabit',
    password: 'MEGALOVANIA666',
    port: 3306,
    database: 'banco_alimentos'
    }, 'single'));

// Configurar las sesiones
app.use(session({
    secret: 'tu_secreto', // Cambia 'tu_secreto' por una cadena segura
    resave: false,
    saveUninitialized: true
}));

// Middlewares
app.use(express.urlencoded({ extended: true }));
// Usar el enrutador de páginas
app.use('/', router);

// Rutas estáticas
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('login');
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

*/

/*
import express from 'express';
import session from 'express-session';  // Importar express-session
import morgan from 'morgan';
import mysql from 'mysql';
import myConnection from 'express-myconnection';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './routers/customer.mjs'; // Asegúrate de que la extensión del archivo es .mjs

const app = express();
const port = 3005;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar el motor de plantillas EJS
const viewsPath = path.join(fileURLToPath(import.meta.url), '..', 'views');
app.set('views', viewsPath);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'dabit',
    password: 'MEGALOVANIA666',
    port: 3306,
    database: 'banco_alimentos'
    }, 'single'));

// Configurar las sesiones
app.use(session({
    secret: 'tu_secreto', // Cambia 'tu_secreto' por una cadena segura
    resave: false,
    saveUninitialized: true
}));

// Middlewares
app.use(express.urlencoded({ extended: true }));
// Usar el enrutador de páginas
app.use('/', router);

// Rutas estáticas
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('login');
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
*/

/*
import express from 'express';
import morgan from 'morgan';
import mysql from 'mysql';
import myConnection from 'express-myconnection';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './routers/customer.mjs'; // Asegúrate de que la extensión del archivo es .mjs


const app = express();
const port = 3005;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar el motor de plantillas EJS
const viewsPath = path.join(fileURLToPath(import.meta.url), '..', 'views');
app.set('views', viewsPath);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'dabit',
    password: 'MEGALOVANIA666',
    port: 3306,
    database: 'banco_alimentos'
    }, 'single'));
// Middlewares
app.use(express.urlencoded({ extended: true }));
// Usar el enrutador de páginas
app.use('/', router);

// Rutas estáticas
app.use(express.static(path.join(__dirname, 'public')));


// Routes
app.get('/', (req, res) => {
    res.render('login');
});


// Iniciar servidor
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

*/
