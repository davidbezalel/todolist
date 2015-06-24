var mysql = require('mysql'),
	pool  = mysql.createPool({
		host: 'localhost',
		user: 'root',
		password: "",
		database: "todolistdb",
		connectionLimit: 10,
		supportBigNumbers: true
	});

exports.DisplayList = function (sinyal, callback) {
	var query = "SELECT * FROM todolisttable WHERE ?;",
		sinyal = sinyal || 1;

	queryDatabase(query, [sinyal], callback);
};

exports.AddList = function (task, callback) {
    var query = "INSERT INTO todolisttable (`task`) VALUES (?);",
        task  = task;

    queryDatabase(query, [task], callback);
};

exports.DeleteList = function (task, callback) {
    var query = 'DELETE FROM todolisttable tt WHERE tt.task like ?;',
        task  = task;

    queryDatabase(query, [task], callback);
};

function queryDatabase(query, data, callback) {
    pool.getConnection(function (poolErr, connection) {
        if (poolErr) {
            console.log(poolErr);
            callback(poolErr);
            return;
        }

        connection.query(query, data, function (connErr, results) {
            connection.release();
            if (connErr) {
                console.log(connErr);
                callback(connErr);
                return;
            }

            callback(false, results);
        });
    });
};
