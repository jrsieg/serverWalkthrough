const router = require('express').Router();
const Pizza = require('../db').import('../models/pizza');

router.get('/', (req, res) => {
    Pizza.findAll()
    .then(pizzas => res.status(200).json(pizzas))
    .catch(err => res.status(500).json({
        error: err
    }));
});

router.post('/', (req,res) => {
    const pizzaFromRequest = {
        nameOfPizza: req.body.name,
        toppings: req.body.toppings,
        numberOfToppings: req.body.numberToppings,
        baseOfPizza: req.body.base,
        isDessertPizza:req.body.dessert,
        pizzaShape: req.body.shape
    }

    Pizza.create(pizzaFromRequest)
        .then(pizza => res.status(200).json(pizza))
        .catch(err => res.status(500).json(err))
})

router.get('/:name', (req, res) => {
    Pizza.findOne({ where: { nameOfPizza: req.params.name }})
        .then(pizza => res.status(200).json(pizza))
        .catch(err => res.status(500).json({ error: err}))
})

router.delete('/:id', (req, res) => {
    Pizza.destroy({ where: { id: req.params.id } })
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json({ error: err }))
})

module.exports = router;