var express = require('express'),
    compression = require('compression'),
    bodyParser = require('body-parser');

var basketball = require('./basketball.js');
var app = express();

app.set('port', process.env.PORT || 5000);

app.use(bodyParser.json());
app.use(compression());

app.use('/', express.static(_dirname + '/www'));


app.get('/gameresult', basketball.gameResult);



app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send(err);
});

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
