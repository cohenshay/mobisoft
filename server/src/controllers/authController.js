const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const dbConfig = require('../config/db.js');
const twoFactorAuthConfig = require("../config/2fa.json");
const jwtConfig = require('../config/jwt.json');
const passwordHash = require('password-hash');
const Nexmo = require('nexmo');

mongoose.connect(
    dbConfig.DB,
    { useMongoClient: true }
);
console.log('Connected to Mongo...')

const nexmo = new Nexmo({
    apiKey: twoFactorAuthConfig.apiKey,
    apiSecret: twoFactorAuthConfig.apiSecret
});

require('../models/user');
const User = mongoose.model("users");

let controller = {
    signIn: (req, res) => {
        console.log("signIn", req.body);
        var hashedPassword = passwordHash.generate(req.body.password);
        const { fname, lname, address, email, username, phone } = req.body;
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            fname,
            lname,
            address,
            email,
            username,
            phone,
            password: hashedPassword
        });
        user.save().then(function (result) {
            const JWTToken = jwt.sign({ _id: user._id }, jwtConfig.secret, { expiresIn: '2h' });
            res.cookie('jwt', JWTToken);
            return res.status(200).json({
                success: 'New user has been created',
                token: JWTToken,
                user
            });

        }).catch(error => {
            res.status(500).json({
                error
            });
        });
    },
    login: (req, res) => {
        console.log("login", req.body);

        User.findOne({ email: req.body.email })
            .exec()
            .then(function (user) {
                console.log("user-login", user);
                if (user == null) {
                    res.status(401).send("user not found");
                }
                else if (passwordHash.verify(req.body.password, user.password)) {
                    let phoneNumber = req.body.phone;
                    nexmo.verify.request({ number: phoneNumber, brand: 'NexmoVerifyTest' }, (err,
                        result) => {
                        if (err) {
                            res.sendStatus(500);
                        } else {
                            let requestId = result.request_id;
                            if (result.status == '0') {
                                res.status(200).send({ status: 'success', requestId, user }); // Success! Now, have your user enter the PIN
                            } else {
                                res.status(401).send({"status":"failed",message: result.error_text});
                            }
                        }
                    });

                }
                else {
                    return res.status(401).json({
                        failed: 'Unauthorized Access'
                    });
                }
            })
            .catch(error => {
                console.log("login error: " + error);
                res.status(500).json({
                    error
                });
            });;
    },
    verify: (req, res) => {
        console.log("verify", req.body);

        let pin = req.body.pin;
        let requestId = req.body.requestId;
        let userId = req.body.user._id;

        nexmo.verify.check({ request_id: requestId, code: pin }, (err, result) => {
            if (err) {
                res.status(400).send({ status: 'failed' })
            } else {
                if (result && result.status == '0') { // Success!
                    const JWTToken = jwt.sign({ _id: userId }, jwtConfig.secret, { expiresIn: '2h' });
                    res.cookie('jwt', JWTToken);
                    return res.status(200).json({
                        success: 'verified',
                        token: JWTToken,
                    });
                } else {
                    res.status(400).send({ status: 'wrong pin' })
                }
            }
        });

    }
}

module.exports = controller;