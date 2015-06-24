var express = require('express'),
	app     = express(),
	bodyParser = require('body-parser'),
	router  = express.Router(),
	db      = require('./src/database/database.js');


app.use(express.static('./src/static'));
app.use(bodyParser());


app.set('view engine', 'jade');
app.set('views', './src/views');

app.get('/', function (req, res) {
	loadData(req, res);
});


app.get('/tambahlist', function (req, res) {
	loadData(req, res);
});

app.get('/hapuslist', function (req, res) {
	loadData(req, res);
});

app.post('/tambahlist', function (req, res) {
	var task = req.body['task'];

	db.AddList(task, function (err, results) {
		if (err) {
			console.log(err);
			res.status(500).send("Query gagal dijalankan.");
			return;
		}

		loadData(req, res);

	});
});

app.post('/hapuslist', function (req, res) {
	var task = req.body['list.task'];

	console.log(task);

	db.DeteleList(task, function (err, results) {
		if (err) {
			console.log(err);
			res.status(500).send("Query gagal dijalankan.");
			return;
		}

		loadData(req, res);
	});
});



function loadData (req, res) {
	db.DisplayList(1, function (err, results) {
		if (err) {
			console.log(err);
			res.status(500).send("Query gagal dijalankan.");
			return;
		}

		res.render('index', {lists: results});
	});
};

var server = app.listen(3000, 'localhost', function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log("Your application is running at http://%s:%s", host, port);
});