var http = require('http');
var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var busboyBodyParser = require('busboy-body-parser');

module.exports = function() {

    var app = express();

    app.set('port', 3000);

    //middleware
    app.use(express.static('./public'));
    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(require('method-override')());
    app.use(busboyBodyParser());
    load('models', { cwd: 'app' })
        .then('controllers')
        .then('routes')
        .into(app);

    return app;
}