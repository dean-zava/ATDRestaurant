const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

//Rest modle
const Restaurant = require('../../models/Restaurant');


//@route    Get api/items/
//@desc     Get a restaurant     
//@access   Public
router.get('/', (req, res) => {
    Restaurant.find()
    .sort({_id: -1})
    .then(restaurant => res.json(restaurant))
});

//@route    POST api/items/:id
//@desc     Post a restaurant     
//@access   Private
router.post('/', auth, (req, res) => {
    const newRest = new Restaurant({
        name: req.body.name,
        location: req.body.location
    });
    newRest.save().then(restaurant => res.json(restaurant));
});

//@route    DELETE api/items/:id
//@desc     Delete a post restaurant     
//@access   Private
router.delete('/:id', auth, (req, res) => {
    Restaurant.findById(req.params.id)
    .then(restaurant => restaurant.remove().then(() => res.json({ success: true})))
    .catch(err => res.status(404).json({success: false})); 
});

router.post('/add_review', (req) => {
    
    const {bathroom_raiting, staff_kindness, cleanliness, food_quality, username, id} = req.body
    const newReview = {
        username,
        bathroom_raiting,
        staff_kindness,
        cleanliness,
        food_quality
    }

    Restaurant.updateOne( {_id: id}, {
           $push: {reviews: newReview}
        },
        () => {}  
        )
});

router.post('/delete_review', (req) => {
    const {username, bathroom_raiting, staff_kindness, cleanliness, food_quality} = req.body.review
    let del_once = false
    function removeOne(rev) {
        if (del_once) {
            return true
        }
        else if (rev.username == username && rev.bathroom_raiting == bathroom_raiting && rev.staff_kindness == staff_kindness && 
            rev.cleanliness==cleanliness && rev.food_quality==food_quality) {
                del_once = true
                return false
            }
        else 
            return true    
      }

    Restaurant.findOne( ({name: req.body.rest_name}))
    .then( function(rest) {
     let matches = rest.reviews.filter(rev => removeOne(rev))
     rest.reviews = matches
     Restaurant.updateOne ( ({name: req.body.rest_name}) , {
        reviews: matches
     }).then(del_once = false)
    })

})

module.exports = router;