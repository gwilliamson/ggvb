/**
 * Created by gwilliamson on 11/16/14.
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Simple Budget API' });
});

module.exports = router;
