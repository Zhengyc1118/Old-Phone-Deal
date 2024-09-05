/**
 * The file to start a server
 *
 */

var express = require("express");
var path = require("path");
var cors = require("cors");


var phoneRoutes = require('./routes/phone.server.routes');
var userRoutes = require('./routes/user.server.routes');

var app = express();
app.use(cors());

app.set('views', path.join(__dirname,'/views'));

app.use('/phone', phoneRoutes);
app.use('/user', userRoutes);
app.listen(3001, function () {
	console.log('OldPhoneDeals app listening on port 3001!')
});
	
module.exports = app;