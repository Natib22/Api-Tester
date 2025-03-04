const tabsController = require("../controllers/tabsController");
const { Router } = require('express');
const router = Router();

router.get('/tabs', tabsController.getTabs);
router.post('/tabs', tabsController.createTab);

module.exports = router;