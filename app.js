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

app.use(function(req, res, next) {
    res.locals.user = req.user || null;
    next();
});

// Body Parser Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Handlebars Helper
const { formatDate, stripTags, truncate, editIcon } = require('./helpers/hbs');
// static folder
app.use(express.static(path.join(__dirname, 'public')));

// Handlebars Templating Enging
app.engine(
    '.hbs',
    exphbs({
        defaultLayout: 'main',
        extname: '.hbs',
        helpers: { formatDate, stripTags, truncate, editIcon }
    })
);
app.set('view engine', '.hbs');

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/stories', require('./routes/stories'));

// App is set up and we can begin listening
const PORT = process.env.PORT || 5000;
app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);
