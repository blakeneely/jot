const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config')

const app = express();

// Middleware
app.use(express.json());

// MongoDB config
const db = config.get('mongoURI');

// Connect to MongoDB
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
app.use('/api/notes', require('./routes/api/notes'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

// Prepare static assests for production
if(process.env.NODE_ENV === 'production') {
    // Set build folder static
    app.use(express.static('client/build'));
    // Catch all for not pre-defined html requests to load index.html
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// Set up port for Heroku deployment
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));