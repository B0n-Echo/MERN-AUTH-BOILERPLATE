const User = require('../models/user');
const jwt = require('jsonwebtoken');
const {sendMailWithNodeMailer} = require('../services/nodeMailerService');

exports.signup =  (req, res) => {
    const {name, email, password} = req.body;

    User.findOne({email}).exec((err, user) => {
        if(!err && user) {
            return res.status(400).json({
                message: 'Email already exists'
            })
        } else if (err){
            return res.status(500).json({
                message: err.message
            })
        }

        const token = jwt.sign(
            { name, email, password},
            process.env.JWT_ACCOUNT_ACTIVATION,
            { expiresIn: "10m" }
         )

         const emailData = {
             from: process.env.MAILER_ID,
             to: email,
            subject: `Account Activation link`,
            html: `
            <h1>Please use the following link to activate your account</h1>
            <p>http://localhost:3000/auth/activate/${token}</p>
            <hr />
            <p>This email may contain sensitive information</p>
            <p>http://localhost:3000</p>
        `,
         };

         sendMailWithNodeMailer(req, res, emailData);

        // let newUser = new User({name, email, password});
        // newUser.save((err, success) => {
        //     if(err) {
        //         console.log(err);
        //         return res.status(500).json({
        //             message: err.message ? err.message : err
        //         })
        //     }

        //     return res.status(200).json({
        //         message: `Sigup Successful, Please sigin`
        //     })
        // })
    })


}

exports.accountActivation = (req, res) => {
    const {token} = req.body;

    if(token) {
        jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, function(err, decodedToken) {
            if(err){
            console.log("🚀 ~ file: auth.js ~ line 64 ~ jwt.verify ~ err", err)
                return res.status(401).json({
                    error: `Expired link. Sign up failed: ${err}`
                })
            }

            const {name, email, password} = jwt.decode(token);

            const newUser = new User({name, email, password})
            newUser.save(function(err, user){
                if(err) {
                console.log("🚀 ~ file: auth.js ~ line 75 ~ newUser.save ~ err", err)
                return res.status(401).json({
                    error: `Sign up failed: ${err}`
                })
                }

                return res.status(200).json({
                    message: `Sign Up successful. Please signin`
                })

            })
        })

    } else {
        return res.status(200).json({
            message: `Something went wrong please try again`
        })
    }
}