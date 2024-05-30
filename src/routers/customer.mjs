import express from 'express';
const router = express.Router();
import customerController from '../controllers/customerConstroller.mjs';

router.get('/', (req, res) => {
    res.render('../views/login', { messages: {} });
});

router.get('/login', (req, res) => {
    const message = req.query.message;
    res.render('../views/login', { message: message });
});

router.get('/register', (req, res) => {
    res.render('../views/register', { siteKey: '6Lc-FOopAAAAAO3fAv_3wyUbP2nmHwRpkOJtd2-A' });
});

router.get('/dashboard', (req, res) => {
    req.getConnection((err, connection) => {
        if (err) return res.status(500).send(err);

        connection.query('SELECT AVG(RI) as avgRI, AVG(Na) as avgNa FROM vidrio', (err, avgResults) => {
            if (err) return res.status(501).send(err);

            const avgRI = avgResults[0].avgRI;
            const avgNa = avgResults[0].avgNa;

            connection.query('SELECT * FROM vidrio ORDER BY RI DESC LIMIT 10', (err, rows) => {
                if (err) return res.status(501).send(err);

                connection.query('SELECT Type, COUNT(*) as count, AVG(RI) as avgRI FROM vidrio GROUP BY Type', (err, typeResults) => {
                    if (err) return res.status(501).send(err);

                    res.render('../views/dashboard', {
                        avgRI: avgRI,
                        avgNa: avgNa,
                        glassData: rows,
                        typeData: typeResults
                    });
                });
            });
        });
    });
});

router.post('/add', customerController.register);
router.post('/request', customerController.login); // Asegúrate de que esta ruta existe y está configurada correctamente

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Error al cerrar sesión');
        }
        res.redirect('/login');
    });
});

export default router;


/* 
import express from 'express';
const router = express.Router();
import customerController from '../controllers/customerConstroller.mjs';

router.get('/', (req, res) => {
    res.render('../views/login', { messages: {} });
});

router.get('/login', (req, res) => {
    res.render('../views/login', { messages: {} });
});

router.get('/register', (req, res) => {
    res.render('../views/register', { siteKey: '6Lc-FOopAAAAAO3fAv_3wyUbP2nmHwRpkOJtd2-A' });
});

router.get('/dashboard', (req, res) => {
    req.getConnection((err, connection) => {
        if (err) return res.status(500).send(err);

        // Obtener estadísticas de la tabla vidrio
        connection.query('SELECT AVG(RI) as avgRI, AVG(Na) as avgNa FROM vidrio', (err, avgResults) => {
            if (err) return res.status(501).send(err);

            const avgRI = avgResults[0].avgRI;
            const avgNa = avgResults[0].avgNa;

            // Obtener los datos recientes de la tabla vidrio
            connection.query('SELECT * FROM vidrio ORDER BY RI DESC LIMIT 10', (err, rows) => {
                if (err) return res.status(501).send(err);

                // Obtener el promedio de cada Type
                connection.query('SELECT Type, COUNT(*) as count, AVG(RI) as avgRI FROM vidrio GROUP BY Type', (err, typeResults) => {
                    if (err) return res.status(501).send(err);

                    res.render('../views/dashboard', {
                        avgRI: avgRI,
                        avgNa: avgNa,
                        glassData: rows,
                        typeData: typeResults
                    });
                });
            });
        });
    });
});

router.post('/add', customerController.register);
router.post('/request', customerController.login);

// Nueva ruta para el logout
router.get('/logout', (req, res) => {
    // Destruir la sesión
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Error al cerrar sesión');
        }
        // Redirigir a la página de inicio de sesión
        res.redirect('/login');
    });
});

export default router;

*/


/*
import express from 'express';
const router = express.Router();

import customerController from '../controllers/customerConstroller.mjs';

router.get('/', (req, res) => {
    res.render('../views/login', { messages: {} });
});
router.get('/login', (req, res) => {
    res.render('../views/login', { messages: {} });
});

router.get('/register', (req, res) => {
    res.render('../views/register', { siteKey: '6Lc-FOopAAAAAO3fAv_3wyUbP2nmHwRpkOJtd2-A' });
});

router.get('/dashboard', (req, res) => {
    const filters = {
        Area: req.query.Area || '',
        Item: req.query.Item || '',
        Element: req.query.Element || '',
        Year: req.query.Year || '',
        Unit: req.query.Unit || ''
    };

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;

    let query = 'SELECT * FROM vidrio WHERE 1=1';
    const params = [];

    if (filters.Area) {
        query += ' AND Area = ?';
        params.push(filters.Area);
    }
    if (filters.Item) {
        query += ' AND Item = ?';
        params.push(filters.Item);
    }
    if (filters.Element) {
        query += ' AND Element = ?';
        params.push(filters.Element);
    }
    if (filters.Year) {
        query += ' AND Year = ?';
        params.push(filters.Year);
    }
    if (filters.Unit) {
        query += ' AND Unit = ?';
        params.push(filters.Unit);
    }

    query += ' LIMIT ? OFFSET ?';
    params.push(pageSize, offset);

  req.getConnection((err, connection) => {
        if (err) return res.status(500).send(err);

        connection.query(query, params, (err, rows) => {
            if (err) return res.status(501).send(err);

            // Obtener el total de registros
            let countQuery = 'SELECT COUNT(*) as count FROM vidrio WHERE 1=1';
            const countParams = [];

            if (filters.Area) {
                countQuery += ' AND Area = ?';
                countParams.push(filters.Area);
            }
            if (filters.Item) {
                countQuery += ' AND Item = ?';
                countParams.push(filters.Item);
            }
            if (filters.Element) {
                countQuery += ' AND Element = ?';
                countParams.push(filters.Element);
            }
            if (filters.Year) {
                countQuery += ' AND Year = ?';
                countParams.push(filters.Year);
            }
            if (filters.Unit) {
                countQuery += ' AND Unit = ?';
                countParams.push(filters.Unit);
            }

            connection.query(countQuery, countParams, (err, countResult) => {
                if (err) return res.status(501).send(err);

                const totalRecords = countResult[0].count;
                const totalPages = Math.ceil(totalRecords / pageSize);

                res.render('../views/dashboard', {
                    data: rows,
                    filters,
                    pagination: {
                        page,
                        pageSize,
                        totalPages
                    }
                });
            });
        });
    });
});

router.get('/data', (req, res) => {
    const filters = {
        Area: req.query.Area || '',
        Item: req.query.Item || '',
        Element: req.query.Element || '',
        Year: req.query.Year || '',
        Unit: req.query.Unit || ''
    };

    let query = 'SELECT * FROM vidrio WHERE 1=1';
    const params = [];

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;
    
    if (filters.Area) {
        query += ' AND Area = ?';
        params.push(filters.Area);
    }
    if (filters.Item) {
        query += ' AND Item = ?';
        params.push(filters.Item);
    }
    if (filters.Element) {
        query += ' AND Element = ?';
        params.push(filters.Element);
    }
    if (filters.Year) {
        query += ' AND Year = ?';
        params.push(filters.Year);
    }
    if (filters.Unit) {
        query += ' AND Unit = ?';
        params.push(filters.Unit);
    }

    query += ' LIMIT ? OFFSET ?';
    params.push(pageSize, offset);
    req.getConnection((err, connection) => {
        if (err) return res.status(500).send(err);

        connection.query(query, params, (err, rows) => {
            if (err) return res.status(501).send(err);

            // Obtener el total de registros
            connection.query('SELECT COUNT(*) as count FROM vidrio WHERE 1=1', [], (err, countResult) => {
                if (err) return res.status(501).send(err);

                const totalRecords = countResult[0].count;
                const totalPages = Math.ceil(totalRecords / pageSize);

                res.render('../views/dashboard', {
                    data: rows,
                    filters,
                    pagination: {
                        page,
                        pageSize,
                        totalPages
                    }
                });
            });
        });
    });
});


router.post('/add', customerController.register);
router.post('/request', customerController.login);
export default router;
 
*/