let express = require( 'express' );
let mongoose = require('mongoose');
let expressMongoDb = require('express-mongo-db');
let app = express();
let cors = require('cors');
let bodyParser = require('body-parser');
let apiRoute = require('./routes/routes');
let config = require('./config');


mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://'+process.env.dbUser+':'+process.env.dbPassword+'@'+process.env.dbHost+'/'+process.env.dbName, {
    useMongoClient: true
});

let port = 3000;
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.Promise = Promise;
let conn = mongoose.connection;
conn.once('open', function ()
{
    console.log('db ok');
});

function setupCORS(req, res, next) {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-type,Accept,X-Access-Token,X-Key');
    res.header('Access-Control-Allow-Origin', '*'); if (req.method === 'OPTIONS') {
        res.status(200).end(); } else {
        next(); }
}
app.all('/*', setupCORS);
app.use(bodyParser.json());
app.use('/users', apiRoute);

app.use(expressMongoDb('mongodb://localhost/test'));

app.listen(port, function () {

    console.log('Express server listening on port %d in %s mode', port, app.settings.env);
});