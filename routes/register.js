const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user')

router.get('/', (req, res) => {
    res.render('register', {
        userAlreadyExists: req.flash('userAlreadyExists'),
        passwordsNotMatching: req.flash('passwordsNotMatching'),
        minLength: req.flash('minLength'),
        minAge: req.flash('minAge'),
        minWeight: req.flash('minWeight'),
    });
});

router.post('/Register', (req, res) => {
    if (User.findOne({username: req.body.username}).then(exists => {
        if (exists)
        {
            req.flash('userAlreadyExists', 'User already exists');
            console.log('user exists');
            req.session.save(function() {
                res.redirect('/register');
            });
        }
        else
        {
            if (req.body.repeatPassword !== req.body.password)
            {
                req.flash('passwordsNotMatching', 'Passwords do not match');
                console.log('passwords do not match');
                req.session.save(function() {
                    res.redirect('/register');
                });
            }
            else if (req.body.password.length < 8)
            {
                req.flash('minLength', 'Password must have 8 characters minimum');
                console.log('must have 8 characters minimum');
                req.session.save(function() {
                    res.redirect('/register');
                });
            }
            else if (req.body.age < 8)
            {
                req.flash('minAge', 'Age must be between 0-100');
                console.log('Age must be between 0-100');
                req.session.save(function() {
                    res.redirect('/register');
                });
            }
            else if (req.body.weight < 8)
            {
                req.flash('minWeight', 'Weight must be between 20-200');
                console.log('Weight must be between 20-200');
                req.session.save(function() {
                    res.redirect('/register');
                });
            }
            else
            {
                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    username: req.body.username,
                    password: req.body.password,
                    securityQuestion: req.body.securityQuestion,
                    securityAnswer: req.body.securityAnswer,
                    age: req.body.age,
                    weight: req.body.weight,
                    gender: req.body.gender,
                });
                user.save()
                .then(() => {
                    console.log('successfully created user');
                    res.redirect('/index');
                })
                .catch(err =>{
                    console.log('err', err);
                    res.sendStatus(500);
                });
            }
        } 
    }));
})

module.exports = router;
