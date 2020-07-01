const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const exphbs = require('express-handlebars');
const morgan = require('morgan');

const app = express();

// Setting up our morgan logging system
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Setting up our Handlebars Templating Enging
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

// Routes
app.use('/', require('./routes/index.js'));

// Load config
dotenv.config({ path: './config/config.env' });
connectDB();

// App is set up and we can begin listening
const PORT = process.env.PORT || 5000;
app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);
