const { Router } = require('express');
const pets = require('./pets')
const veterinaries = require('./veterinaries')

const router = Router();

router.use('/pets', pets)
router.use('/veterinaries', veterinaries)

module.exports = router;