let express = require('express');
let router = express.Router();
let ctrl = require('../controllers/controller');

router.post('/add',ctrl.new);
router.get('/all',ctrl.all);


module.exports = router;