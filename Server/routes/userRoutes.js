// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Sign up
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: 'User already exists' });

        // Hash the password before saving:
        const hashed = await bcrypt.hash(password, 10);

        const newUser = new User({ email, password: hashed });
        const saved = await newUser.save();

        return res.status(201).json({ message: 'User created', user: saved });
    } catch (error) {
        console.error('Signup error:', error);
        return res.status(500).json({ message: 'Server error during signup' });
    }
});


// Login
// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Optional: password check
        // const isMatch = await bcrypt.compare(password, user.password);
        // if (!isMatch) {
        //     return res.status(400).json({ message: 'Invalid email or password' });
        // }

        const token = jwt.sign({ id: user._id }, 'SECRET', { expiresIn: '1h' });

        return res.status(200).json({ message: 'Login successful', user, token });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Server error during login' });
    }
});



// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching users' });
    }
});

// Delete user by email
router.delete('/:email', async (req, res) => {
    try {
        const deleted = await User.findOneAndDelete({ email: req.params.email });

        if (!deleted)
            return res.status(404).json({ message: 'User not found' });

        res.json({ message: 'User deleted', deleted });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting user' });
    }
});

module.exports = router;
