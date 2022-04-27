const { Router } = require('express');
const { Temperament, Dog } = require('../db.js');
const axios = require('axios');

require('dotenv').config();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { API_KEY } = process.env;
const { apiInfo, dbInfo, allInfo, chargeTemp, allTemps } = require('./control')
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

chargeTemp();

router.get('/dogs', async (req, res, next) => {
    const { name } = req.query;
    try {
        let allDogs = await allInfo();
        allDogs = allDogs.map(d => {
            return { id: d.id, name: d.name, img: d.image, temperaments: d.temperaments, weight: d.weight }
        });
        if (name) {
            let dogsNames = allDogs.filter(dogs => dogs.name.toLowerCase().includes(name.toLowerCase()))
            return dogsNames ? res.json(dogsNames) : res.status(404).send(`Dog breed not found`);
        }
        return res.send(allDogs);
    } catch (e) {
        next(e)
    }
});

router.get('/dogs/:idRaza', async (req, res, next) => {
    const { idRaza } = req.params;

    try {
        let specificDog = await allInfo();
        specificDog = specificDog.find(s => s.id.toString() === idRaza);
        return specificDog ? res.json(specificDog) : res.status(404).send('Dog breed not found');
    } catch (e) {
        next(e)
    }
});

router.get('/temperament', async (req, res, next) => {
    try {
        let allTempers = await allTemps();
        allTempers = allTempers.map(t => {
            return (t.name)
        })
        res.json(allTempers)
    } catch (e) {
        next(e);
    }
});

router.post('/dog', async (req, res, next) => {
    const { name, image, height, weight, temperaments, life_span, bred_for, origin } = req.body
    try {
        if (!name || !weight || !height) return res.status(417).send('Required fields are missing');
        // let dogsName= await allInfo();
        // dogsName = dogsName.find(s => s.name.toLowerCase() === name.toLowerCase());
        let dogCreated = await Dog.findOrCreate({
            where: { name: name },
            defaults: {
                name,
                image,
                height,
                weight,
                life_span,
                bred_for,
                origin
            }

        });
        
        if (temperaments && dogCreated[1]) {
            temperaments.forEach(async (t) => {
                let tempAdded = await Temperament.findOne({
                    where: { name: t }
                })
                dogCreated[0].addTemperament(tempAdded)
            })
        }
        return dogCreated[1] === true ? 
        res.json({msg: 'Dog Breed created succesfully', Dog: dogCreated[0]}) :
        res.send({msg: 'Dog Breed already exist', Dog: dogCreated[0]})
    } catch (e) {
        next(e);
    }

})

module.exports = router;
