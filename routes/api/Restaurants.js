const express = require('express');
const router = express.Router();

//Rest modle
const Restaurant = require('../../models/Restaurant');


//@route    Get api/items/
//@desc     Get a restaurant     
//@access   Public
router.get('/', (req, res) => {
    Restaurant.find()
    //.sort({date: -1})
    .then(restaurant => res.json(restaurant))
});

//@route    POST api/items/:id
//@desc     Post a restaurant     
//@access   Public
router.post('/', (req, res) => {
    const newRest = new Restaurant({
        name: req.body.name,
        location: req.body.location
    });
    newRest.save().then(restaurant => res.json(restaurant));
});

//@route    DELETE api/items/:id
//@desc     Delete a post restaurant     
//@access   Public
router.delete('/:id', (req, res) => {
    Restaurant.findById(req.params.id)
    .then(restaurant => restaurant.remove().then(() => res.json({ success: true})))
    .catch(err => res.status(404).json({success: false})); 
});

module.exports = router;