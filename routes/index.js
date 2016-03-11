var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db_config = require('../model/zipdoc_db_config');
var pool = mysql.createPool(db_config);

/* GET home page. */
var select_sql = 'select * from zipdoc_estimate';
router.get('/', function(req, res, next) {
  pool.getConnection(function(err,conn){
    if(err) console.error(err);
    console.log('conn',db_config);
    conn.query(select_sql, function(err, rows){
      if(err) console.err('err:'+err);
      console.log('rows:' + JSON.stringify(rows));
      res.render('index', { title: 'Express' });
      conn.release();
    });
  });
});

module.exports = router;
