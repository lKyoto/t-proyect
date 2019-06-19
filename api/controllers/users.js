const mongoose = require('mongoose')
const objUser = require('../models/users')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

process.env.SECRET_KEY = 'secret'

exports.register = (req, res, next) => {
    const today = new Date()
    const userData = {
        _id: new mongoose.Types.ObjectId(),
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        created: today
    }
    objUser.findOne({
        email: req.body.email
    })
    .then(user => {
        if(!user){
            bcrypt.hash(req.body.password, 10 , (err, hash)=> {
                userData.password = hash
                objUser.create(userData)
                .then(user => {
                    res.json({status: user.email + ' registered'})
                })
                .catch(err => {
                    res.send('error: '+ err)
                })
            })
        } else {
            res.json({error: 'User already exists'})
        }
    })
    .catch(err => {
        res.send('error: '+ err) 
    })
}

exports.login = (req, res, next) => {
    objUser.findOne({
        email: req.body.email
    })
    .then(user => {
        if(user){
            if(bcrypt.compareSync(req.body.password, user.password)){
                const payload = {
                    _id: user._id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email
                }
                let token = jwt.sign(payload, process.env.SECRET_KEY, {
                    expiresIn: 1440
                })
                res.send(token)
            }else {
                res.json({error: 'User does not exists'})
            }
        }else {
            res.json({error: 'User does not exists'})
        }
    })
    .catch(err =>{
        res.send('error: '+ err)
    })
}


/*
exports.signup =  (req, res, next) => {
    objUser.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({ message: 'Mail exist' })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({ error: err })
                    } else {
                        const user = new objUser({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        })
                        user
                            .save()
                            .then(result => {
                                console.log(result)
                                res.status(201).json({ message: 'User created' })
                            })
                            .catch(err => {
                                console.log(err)
                                res.status(500).json({
                                    error: err
                                })
                            })
                    }
                })
            }
        })
}

exports.login = (req, res, next) => {
    objUser.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                res.status(401).json({ message: 'Auth faild' })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) res.status(401).json({ message: 'Auth faild' })
                if (result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        userID: user[0]._id
                    }, process.env.JWT_KEY, {expiresIn: "1h"})
                    return res.status(200).json({
                        message: 'Auth successful',
                        Token: token
                    })
                } else { 
                    res.status(401).json({ message: 'Auth faild' })
                }
            })
        })
        .catch()
}

exports.user_delete_id = (req, res, next) => {
    objUser.remove({ _id: req.params.userID })
        .exec()
        .then(result => {
            res.status(200).json({ message: 'User deleted' })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}
*/