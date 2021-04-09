const express = require('express');
const router = express.Router();

const TaskController = require('../controller/TaskController');
const MacaddressValdation = require('../middlewares/MacaddressValidation');
const TaskValidation = require('../middlewares/TaskValidation');

router.post('/', TaskValidation, TaskController.create);
router.put('/:id', TaskController.update);
router.get('/:id', TaskController.show);
router.delete('/:id', TaskController.delete);
router.get('/filter/all', MacaddressValdation, TaskController.all);
router.put('/:id/:done', TaskController.done);
router.get('/filter/late', MacaddressValdation, TaskController.late);
router.get('/filter/today', MacaddressValdation, TaskController.today);
router.get('/filter/week', MacaddressValdation, TaskController.week);
router.get('/filter/month', MacaddressValdation, TaskController.month);
router.get('/filter/year', MacaddressValdation, TaskController.year);

module.exports = router;