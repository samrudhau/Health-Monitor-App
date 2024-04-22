
const mongourl = 'mongodb+srv://samrudhau0:KYQqX0bMT99iIu0a@healthapp.7jykien.mongodb.net/?retryWrites=true&w=majority&appName=Healthapp';
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const expressLayouts = require('express-ejs-layouts');
const path = require("path")

const store = new MongoDBStore({
    uri: mongourl,
    collection: 'sessions'
})

const indexRoute = require('./routes/index');
const registerRoute = require('./routes/register');
const forgotPasswordRoute = require('./routes/forgotPassword');
const securityQuestionRoute = require('./routes/securityQuestion');
const resetPasswordRoute = require('./routes/resetPassword');
const resetSuccessRoute = require('./routes/resetSuccess');
const tablesRoute = require('./routes/tables');
const data = require('./routes/data');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }))
app.use(session({
    secret: 'bao123456789',
    resave: false,
    saveUninitialized: false,
    store: store
}));
app.use(flash());
app.use('/index', indexRoute);
app.use('/register', registerRoute);
app.use('/tables', tablesRoute);
app.use('/forgotPassword', forgotPasswordRoute);
app.use('/securityQuestion', securityQuestionRoute);
app.use('/resetPassword', resetPasswordRoute);
app.use('/resetSuccess', resetSuccessRoute);
app.use('/data', data);

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/vendor'));

// Connect to MongoDB
mongoose.connect(mongourl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connection success");
}).catch(err => {
    console.error('ERROR CRASHING', err);
});

const server = app.listen(PORT, () => console.log(`Express server listening on port ${PORT}`));