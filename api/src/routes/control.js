const { Temperament, Dog } = require('../db.js');
const axios = require('axios');

require('dotenv').config();
const { API_KEY } = process.env;


const apiInfo = async () => {
    const api = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    const info = api.data.map(info => {
        let weight = info.weight?.metric.split( ' - ')
        weight = weight?.filter(w => !w.includes('NaN'))
        let weightC = ''
        if (weight.length >1) {
            weightC = weight.join(' - ')
        } else if (weight.length === 1) {
            weightC = weight.toString();
        } else {
            weightC = 'no info'
        }          
        // let weightC = weight.lenght > 1 ? weight.join(' - ') : weight.toString()
        return {
            id: info.id,
            image: info.image?.url,
            name: info.name,
            temperaments: info.temperament,
            weight: weightC,
            height: info.height?.metric,
            life_span: info.life_span,
            origin: info.origin,
            bred_for: info.bred_for,
        };
    });
    return info;
};

const dbInfo = async () => {
    let dbTemp = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        },
    });
    return dbTemp.map(d => {
        return {
            ...d.dataValues,
            temperaments: d.temperaments?.map(temps => temps.name).join(', ')
        }
    })
};

const allInfo = async () => {
    const apinfo = await apiInfo();
    const dbinfor = await dbInfo();
    
    return apinfo.concat(dbinfor)
};

const chargeTemp = async (showme) => {
    let apiTemps = await apiInfo();
    apiTemps = apiTemps.map(b => b.temperaments ? b.temperaments.split(', ') : null);
    apiTemps = apiTemps.flat()
    //console.log(apiTemps)
    apiTemps.forEach(async (temps) => {
        if (temps !== null) {
            await Temperament.findOrCreate({
                where: {
                    name: temps
                },
            });
        }
    });
    if (showme) return apiTemps;
};


const allTemps = async () => {
    return await Temperament.findAll({
        order: [
            ['name', 'ASC']
        ]
    });
};

module.exports = {
    apiInfo,
    dbInfo,
    allInfo,
    chargeTemp,
    allTemps
}