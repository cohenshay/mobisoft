const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const dbConfig = require('../config/db.js');
const jwtConfig = require('../config/jwt.json');
const passwordHash = require('password-hash')
mongoose.connect(
    // "mongodb+srv://cohenshay:Pakobig1!@blogdb-tdiqu.mongodb.net/blogApp?retryWrites=true",
    dbConfig.DB,
    { useMongoClient: true }
);

require('../models/user');
const User = mongoose.model("users");

let controller = {
    signup: (req, res) => {
        console.log("password",req.body.password);
        var hashedPassword = passwordHash.generate(req.body.password);
        console.log("hashedPassword",hashedPassword);
        const { fname, lname, address, email, username } = req.body;
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            fname,
            lname,
            address,
            email,
            username,
            password: hashedPassword
        });
        user.save().then(function (result) {
            res.status(200).json({
                success: 'New user has been created'
            });
        }).catch(error => {
            res.status(500).json({
                error
            });
        });
    },
    signin: (req, res) => {


        User.findOne({ email: req.body.email })
            .exec()
            .then(function (user) {
                if (passwordHash.verify(req.body.password, user.password)) {
                    const JWTToken = jwt.sign({ _id: user._id }, jwtConfig.secret, { expiresIn: '2h' });
                    res.cookie('jwt', JWTToken);
                    return res.status(200).json({
                        success: 'success',
                        token: JWTToken,
                        user
                    });
                }
                else {
                    return res.status(401).json({
                        failed: 'Unauthorized Access'
                    });
                }
            })
            .catch(error => {
                console.log("signin error: " + error);
                res.status(500).json({
                    error
                });
            });;
    }
}


module.exports = controller;