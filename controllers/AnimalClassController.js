//Import the dependencies
const _ = require('lodash')
const express = require('express');
const { AnimalClass, validate } = require('../model/animalClass.model')
//Creating a Router
var router = express.Router();

//get users
router.get('/', async (req, res) => {
    const items = await AnimalClass.find().sort({ name: 1 });

    return res.send(items)
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.send(error.details[0]
        .message).status(400)

    let item = await AnimalClass.findOne({ name: req.body.name })
    if (user) return res.
        send({ error: 'item already registered' }).status(400)

    item = new AnimalClass(_.pick(req.body, ['name', 'description']))
    await item.save()

    return res.send(_.pick(item, ['_id', 'name', 'description'])).status(201)
});

module.exports = router;