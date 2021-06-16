const {Router} = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.send('hola')
})

router.post('/', function(req, res){
    
})

module.exports = router;
