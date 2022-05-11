const { Router } = require('express');
const { Temperament, Dog } = require('../db.js');
const axios = require('axios');

require('dotenv').config();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { API_KEY } = process.env;
const { apiInfo, dbInfo, allInfo, chargeTemp, allTemps, deleteDog } = require('./control')
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

chargeTemp();

router.get('/dogs', async (req, res, next) => {
    const { name } = req.query;
    try {
        let allDogs = await allInfo();
        allDogs = allDogs.map(d => {
            return { id: d.id, name: d.name, image: d.image, temperaments: d.temperaments, weight: d.weight, fromDb: d.fromDb }
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
    const { name, image, height, weight, temperaments, life_span, bred_for, origin, fromDb } = req.body;
    try {
        if (!name || !weight || !height) return res.status(417).json({msg: 'Required fields are missing'});
        let allDogs = await allInfo();
        let thisDog = allDogs.find(d => d.name === name)
        if (thisDog !== undefined) {
            return res.json({msg: 'Dog Breed name already exist', Dog: thisDog})
        }
        let dogCreated = await Dog.create({
            // where: { name: name },
            // defaults: {
                name,
                image,
                height,
                weight,
                life_span,
                bred_for,
                origin
            // }
        });
        
        if (temperaments) {
            temperaments.forEach(async (t) => {
                let tempAdded = await Temperament.findOne({
                    where: { name: t }
                })
                dogCreated.addTemperament(tempAdded)
            })
        }
        
        res.json({msg: 'Dog Breed created succesfully', Dog: dogCreated, temperaments: temperaments?.join(', ')})

        // return dogCreated[1] === true ? 
        // res.json({msg: 'Dog Breed created succesfully', Dog: dogCreated[0]}) 
        // : res.json({msg: 'Dog Breed name already exist', Dog: dogCreated[0]})
    } catch (e) {
        next(e);
    }

});
router.delete('/dogs/:idRaza', async (req, res, next) => {
    const { idRaza } = req.params;
    try{
        let dogToDelete = await deleteDog(idRaza);
        if (!dogToDelete) return res.status(404).json({msg: 'Dog breed not found'}) 
        if (!/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/.test(idRaza)){
            return res.status(417).json({msg:"Predefined breeds can't be deleted"})
        }
        
        await Dog.destroy({
            where: {id: idRaza}
        });
        return res.status(200).json({msg: 'Dog breed deleted'})   
    } catch (e) {
        next (e)
    }
});

module.exports = router;
