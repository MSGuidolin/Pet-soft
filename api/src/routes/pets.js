const { Router } = require('express');
const { getAllPets } = require('../controllers/Pets');
const { Pets } = require('../db');

const router = Router();

router.get('/', async (req, res) => {
    const pets = await getAllPets();
    return res.status(200).send(pets);
})

router.post('/', async (req, res) => {
    const {
        name,
        specie,
        race,
        dateBirth,
        weight,
    } = req.body;

    if (!name) return res.status(400).send('Insert a valid name')

    const createPet = await Pets.create({
        name,
        specie,
        race,
        dateBirth,
        weight,
    });

    return res.status(200).send(createPet);

})


module.exports = router;
