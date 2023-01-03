const { Router } = require('express');
const {Temp, Dog, conn} = require('../db.js')
const axios = require('axios');
const { Op } = require('sequelize');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/dogs', async (req, res) => {
    try {
        const { name } = await req.query;
        if (name) {
            let dogs = await Dog.findAll({
                where: {
                    name: {
                        [Op.like]: `%${name}%`
                    }
                },
                include: [
                    {
                        model: Temp
                    }
                ]
            });
            const result = dogs.map(dog => { return { id: `${dog.id}db`, name: dog.name, weight: { metric: `${JSON.parse(dog.weight).min} - ${JSON.parse(dog.weight).max}` }, temperament: [...dog.temps].map(t => { return t.name }).toString().replace(',', ', ')} });
            result[0] ? res.json(result).status(200) : res.json('Raza no encontrada').status(404)
        }
        else {
            const dogs = await Dog.findAll({
                include: [
                    {
                        model: Temp
                    }
                ]
            });
            if (dogs[0]) {
                const result = dogs.map(dog => { return { id: `${dog.id}db`, image: { url: dog.image }, name: dog.name, weight: { metric: `${JSON.parse(dog.weight).min} - ${JSON.parse(dog.weight).max}` }, temperament: [...dog.temps].map(t => { return t.name }).toString().replace(',', ', ')} });
                return res.json(result).status(200)
            }
            else {
                return res.json(dogs).status(404)
            }
        }
    } catch (error) {
        console.error(error)
    }
})

router.get('/dogs/:id', async (req, res) => {
    try {
        const { id } = req.params
        function hasNumber(string) {
            return /\d/.test(string);
          }
        if (!hasNumber(id)) {
            res.json('El ID ingresado tiene que ser un número')
        }
        const dogTemp = await Dog.findAll({
            where: {
                id: id
            },
            include: [
                {
                    model: Temp
                }
            ]
        })
       if (dogTemp[0]) {
        const temps = dogTemp[0].temps.map(temp => { return temp.name })
        const dogs = dogTemp.map(dog => { return { id: `${dog.id}db`, image: { url: dog.image }, name: dog.name, age: dog.age, height: { metric: `${JSON.parse(dog.height).min} - ${JSON.parse(dog.height).max}` }, weight: { metric: `${JSON.parse(dog.weight).min} - ${JSON.parse(dog.weight).max}` }, temperament: temps.toString().replace(',', ', ')} });
        res.json(dogs).status(200)
       }
       else {
        res.json('Raza no encontrada...').status(204)
       }
    } catch (error) {
        
    }
})

router.get('/temperaments', async (req, res) => {
    const temps = await Temp.findAll();
    res.json(temps).status(200)
})

router.post('/dogs', async (req, res) => {
    try {
        const { image, name, temperament, height, weight, age } = req.body;

        function hasNumber(string) {
            return /\d/.test(string);
          }
        
        function isURL(url) {
            var r = /^(ftp|http|https):\/\/[^ "]+$/;
            return r.test(url)
        }

        if (image && name && temperament && height && weight && age) {
            if (!isURL(image)) {
                return res.json("Error en los datos recibidos: 'image' no es válido como URL").status(203)
            }
            if (hasNumber(name)) {
                return res.json("Error en los datos recibidos: 'name' contiene booleanos").status(203)
            }
            else if (hasNumber(temperament)) {
                return res.json("Error en los datos recibidos: 'temperament' contiene booleanos").status(203)
            }
            else if (height.min * 2 === NaN || height.max * 2 === NaN) {
                return res.json("Error en los datos recibidos: 'height' es string").status(203)
            }
            else if (weight.min * 2 === NaN || weight.max * 2 === NaN) {
                return res.json("Error en los datos recibidos: 'weight' es string").status(203)
            }
            else if (age * 2 === NaN) {
                return res.json("Error en los datos recibidos: 'age' es string").status(203)
            }
            else {
                const dog = await Dog.create({
                    image: image,
                    name: name,
                    height: JSON.stringify(height),
                    weight: JSON.stringify(weight),
                    age: age,
                });
                for (let i = 0; i < temperament.length; i++) {
                    const temp = await Temp.findAll({
                        where: {
                            name: {
                                [Op.like]: `%${temperament[i]}%`
                            }
                        }
                    });
                    await dog.addTemp(temp, { through: 'Dog_Temps' });
                }
                res.json('¡Raza creada con éxito!').status(201);
            }
        }
        else {
            return res.json('Error en los datos recibidos: faltan datos').status(203)
        }
    } catch (error) {
        console.error(error)
    }
})

module.exports = router;
