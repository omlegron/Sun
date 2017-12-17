const functions = require('firebase-functions');
const firebase = require('firebase-admin');
var express = require('express');
var app = express(); 
var port = process.env.PORT || 1111;
var morgan = require('morgan'); 
var mongoose = require('mongoose'); 
var bodyParser = require('body-parser'); 
var router = express.Router(); 
var appRoutes = require('./app/routes/api')(router); 

const firebaseApp = firebase.initializeApp(
	functions.config().firebase
);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', appRoutes);
mongoose.connect('mongodb://omlegron:legron268@ds129153.mlab.com:29153/hommey', function(err) {
    if (err) {
        console.log('Not connected to the database: ' + err); // Log to console if unable to connect to database
    } else {
        console.log('Successfully connected to MongoDB'); // Log to console if able to connect to database
    }
});


app.use(express.static('app'));

app.get('/',function(req,res){
   res.sendFile('index.html',{ root: __dirname });

});

// Start Server
app.listen(port, function() {
    console.log('Running the server on port ' + port);
});
exports.app = functions.https.onRequest(app);