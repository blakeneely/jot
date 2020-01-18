const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// User Model
const User = require('../../models/User');

// POST /api/auth route to authenticate user
router.post('/', (req, res) => {
    const { email, password }= req.body

    // Validation
    if(!email || !password) {
        // Bad request response (user info was incorrect)
        return res.status(400).json({ msg: 'Please enter all fields correctly' })
    }

    // Check for existing user
    User.findOne({ email })
        .then(user => {
            if(!user) {
                return res.status(400).json({ msg: 'User does not exist' })
            }

            // Validate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({ msg: 'Invalid creditials' });

                    jwt.sign(
                        { id: user.id },
                        config.get('jwtSecret'),
                        { expiresIn: 3600 }, 
                        (err, token) => {
                            if(err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            });
                        }
                    )
                })
        })
});

// GET api/auth/user route to validate user with token
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
});


module.exports = router;