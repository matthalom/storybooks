const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const connectDB = require('./config/db');

const app = express();

// Load config file
dotenv.config({ path: './config/config.env' });

// Passport Configuration
require('./config/passport')(passport);

// Setting up our morgan logging system
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

connectDB();

// Session Middleware
app.use(
    session({
        secret: 'Maybe someday I will learn to code',
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection })
    })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Setting up our Handlebars Templating Enging
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

// static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./routes/index.js'));
app.use('/auth', require('./routes/auth.js'));

// App is set up and we can begin listening
const PORT = process.env.PORT || 5000;
app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);
