import bcrypt from 'bcrypt';

const controller = {};

controller.login = (req, res) => {
    const { correo, pass } = req.body;
    console.log('Login attempt:', { correo, pass });
    
    req.getConnection((err, connection) => {
        if (err) {
            console.error('Connection error:', err);
            return res.status(500).send(err);
        }

        connection.query('SELECT * FROM usuarios WHERE correo = ?', [correo], (err, results) => {
            if (err) {
                console.error('Query error:', err);
                return res.status(501).send(err);
            }
            if (results.length === 0) {
                console.error('Email not found:', correo);
                return res.status(404).send('Email not found');
            }

            const user = results[0];
            bcrypt.compare(pass, user.pass, (err, isMatch) => {
                if (err) {
                    console.error('Bcrypt compare error:', err);
                    return res.status(500).send(err);
                }
                if (isMatch) {
                    res.redirect('/dashboard');
                } else {
                    res.status(401).send('Incorrect password');
                }
            });
        });
    });
};

controller.register = (req, res) => {
    const { nombre, correo, pass } = req.body;

    console.log('Received data:', { nombre, correo, pass });

    if (!nombre || !correo || !pass) {
        return res.status(400).send('All fields are required');
    }

    bcrypt.hash(pass, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Bcrypt hash error:', err);
            return res.status(500).send(err);
        }

        req.getConnection((err, connection) => {
            if (err) {
                console.error('Connection error:', err);
                return res.status(500).send(err);
            }

            const newUser = { nombre, correo, pass: hashedPassword };

            connection.query('INSERT INTO usuarios SET ?', newUser, (err, results) => {
                if (err) {
                    console.error('Query error:', err);
                    return res.status(500).send('Error registering user');
                }
                console.log('User registered successfully:', results);
                res.redirect('/login?message=Registration successful, please log in');
            });
        });
    });
};

controller.save = (req, res) => {
    console.log(req.body);
    res.send(req.body);
};

export default controller;


/*
const controller = {};

controller.login = (req, res) => {
    const { email, password } = req.body;
    req.getConnection((err, connection) => {
        if (err) return res.status(500).send(err);

        connection.query('SELECT * FROM usuarios WHERE correo = ?', [email], (err, results) => {
            if (err) return res.status(501).send(err);
            if (results.length === 0) {
                return res.status(404).send('Email not found');
            }

            const user = results[0];

            console.log(user.pass);
            console.log(password);
            if (password === user.pass) {
                // Si el correo y la contraseña coinciden, puedes iniciar la sesión del usuario aquí
                res.redirect('/dashboard');
            } else {
                res.status(401).send('Incorrect password');
            }
            
        });
    });
};


controller.register = (req, res) => {
    const { nombre, correo, pass } = req.body;

    // Encriptar la contraseña antes de almacenarla
    bcrypt.hash(contrasena, 10, (err, hashedPassword) => {
        if (err) return res.status(500).send(err);

        req.getConnection((err, connection) => {
            if (err) return res.status(500).send(err);

            const newBeneficiary = {
                nombre,
                correo,
                pass
            };

            connection.query('INSERT INTO usuarios SET ?', newBeneficiary, (err, results) => {
                if (err) return res.status(500).send(err);
                res.send('Beneficiario agregado exitosamente');
            });
        });
    });
};

controller.save = (req, res) => {
    console.log(req.body);
    res.send(req.body);
};

export default controller;

*/