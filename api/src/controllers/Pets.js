const { Pets } = require('../db');

const getAllPets = async () => {
    return await Pets.findAll();
};

module.exports = {
    getAllPets,
}