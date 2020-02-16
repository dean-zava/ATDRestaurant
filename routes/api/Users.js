const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
var cors = require('cors');
var multer = require('multer')

//User modle
const User = require('../../models/User');

router.use(cors())
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})
var upload = multer({ storage: storage }).single('file')

router.post('/upload_pic',function(req, res) {
    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
      return res.status(200).send(req.file)

    })
});

router.get('/get_users', (req, res) => {
    Users.find()
    .sort({_id: -1})
    .then(restaurant => res.json(restaurant))
});

router.get('/get_pic', (req, res) => {
    Users.findOne({name: req.query.user}).
        then(user => res.json({file: user.file}));
})

router.get('/update_user', (req) => {
    User.updateOne( {name: req.query.current_username},
        {
            name: req.query.username,
            location: req.query.location
        },
        () => {}
        ) 
})

//@route    POST api/Users
//@desc     Register new user     
//@access   Public
router.post('/', (req, res) => {
    const { name, password, file, location } = req.body;

    if(!name || !password) {
        return res.status(400).json( { msg: 'Please enter all fields' } );
    }

    User.findOne({ name })
        .then(user => {
            if(user) {
                return res.status(400).json( { msg: 'User already exists' } );
            }

            console.log(`the file is ${file}`)

            const newUser = new User({
                name,
                password,
                file,
                location
            });

            // console.log(`new user is ${newUser}`)

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {

                            jwt.sign(
                                { id: user.id },
                                config.get('jwtSecret'),
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if(err) throw err;
                                    res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            name: user.name,
                                            file: user.file,
                                            location: user.location
                                        }
                                    });
                                });
                                }
                            )


                })
            })
        })
});

router.post('/query', (req, res) => {
    const { name } = req.body;

    User.findOne({ name })
    .then(user => {
        if(user) {
            return res.status(400).json( { msg: 'User already exists' } );
        }
        else {
            return res.json( { msg: 'User doesnt exists' } );
        }
    });
})
module.exports = router;