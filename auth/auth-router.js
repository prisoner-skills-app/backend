const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Centers = require('../centers/centers-model.js');
const secrets = require('../config/secrets.js');

router.post('/register', (req, res) => {
    let admin = req.body;
    const hash = bcrypt.hashSync(admin.password, 12);
    admin.password = hash;
    //console.log(admin);

    Centers.addCenter(admin)
        .then(savedAdmin => {
            //console.log('saved admin:', savedAdmin);
            if (savedAdmin) {
                const token = generateToken(savedAdmin)
                res.status(200).json({ 
                    id: savedAdmin.id,
                    email: savedAdmin.email,
                    profileComplete: savedAdmin.profileComplete,
                    token 
                });
            } else {
                res.status(401).json({ message: 'Please provide valid credentials.' });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'There was a problem logging in the admin.' })
        });
});

router.post('/login', (req, res) => {
    let {email, password} = req.body;
    Centers.findCenterBy({ email })
    .first()
    .then(admin => {
        if (admin && bcrypt.compareSync(password, admin.password)) {
            const token = generateToken(admin)
            res.status(200).json({ 
                id: admin.id,
                email: admin.email,
                profileComplete: admin.profileComplete,
                token 
            });
        } else {
            res.status(401).json({ message: 'Please provide valid credentials.' });
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: 'There was a problem logging in the admin.' });
    });
});

function generateToken(admin) {
    const payload = {
        sub: admin.id,
        email: admin.email
    };

    const options = {
        expiresIn: '1d'
    };

    return jwt.sign(payload, secrets.jwtSecret, options)
};


module.exports = router;