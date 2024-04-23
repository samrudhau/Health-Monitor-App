
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

const express = require('express');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const MongoClient = require('mongodb').MongoClient;  // Assuming you use MongoDB

// Replace with your MongoDB connection details
const uri = "mongodb+srv://samrudhau0:KYQqX0bMT99iIu0a@healthapp.7jykien.mongodb.net/?retryWrites=true&w=majority&appName=Healthapp";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());  // Parse incoming JSON data

// Function to connect to MongoDB
async function connectToDb() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

connectToDb();  // Connect to MongoDB on startup

// Function to fetch data from MongoDB
async function get_data() {
  const database = client.db("test");
  const collection = database.collection("users");

  try {
    const data = await collection.find({}).toArray();
    return data;
  } catch (err) {
    console.error('Error fetching data:', err);
    return [];  // Handle errors gracefully, e.g., return an empty list
  }
}

// Function to broadcast data updates to connected clients
function emitDataUpdate(data) {
  io.emit('data_update', data);
}

// Route (optional) to trigger data updates on demand (e.g., from a button click)
app.get('/update', async (req, res) => {
  const data = await get_data();
  emitDataUpdate(data);
  res.send({ message: 'Data update triggered' });
});

// Route to handle database updates (replace with your actual logic)
app.post('/tables/Update', async (req, res) => {
  const updatedData = req.body;
  // ... (your logic to update data in MongoDB)
  res.send({ message: 'Data updated successfully' });
  emitDataUpdate(updatedData);  // Emit update after successful update
});

http.listen(3000, () => {
  console.log('Server listening on port 3000');
});