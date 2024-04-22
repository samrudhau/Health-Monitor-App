const express = require('express');
const router = express.Router();
const path = require("path"); 
const User = require('../models/user')
router.get('/', (req, res) => {
    const user = req.session.user;

    
    if (user == undefined) //if not logged in, redirect to login page
        return res.redirect('/index');

    res.sendFile(path.join(__dirname + '/../tables.html'));
});
//logout button
router.post('/Logout', (req, res) => {
    req.session.destroy(); 
    
    res.redirect('/index') 
})
router.post('/Report', (req, res) => {
    req.session.save(function() {
        res.redirect('/report');
    });
})

router.post('/Input', (req, res) => {
    let newUserData = req.session.user.userData;
    var enteredDate = Date.parse(req.body.Date);
    if (newUserData.date.length > 0) //the user has data in their account
    {
        var lastIndexDate = Date.parse(newUserData.date[newUserData.date.length-1]);
        
        if (enteredDate >= lastIndexDate)
        {
            newUserData.date.push(req.body.Date);
            newUserData.activity.push(req.body.Activity);
            newUserData.weight.push(req.body.Weight);
            newUserData.minutes.push(req.body.Minutes);
            newUserData.caloriesIn.push(req.body.CaloriesIn);
            newUserData.caloriesOut.push(req.body.CaloriesOut);
        }
        else
        {
            //loop through array until we find the slot it belongs in
            for (var i = 0; i < newUserData.date.length; i++)
            {
                lastIndexDate = Date.parse(newUserData.date[i]);
                if (lastIndexDate >= enteredDate)
                {
                    newUserData.date.splice(i, 0, req.body.Date)
                    newUserData.activity.splice(i, 0, req.body.Activity);
                    newUserData.weight.splice(i, 0, req.body.Weight);
                    newUserData.minutes.splice(i, 0, req.body.Minutes);
                    newUserData.caloriesIn.splice(i, 0, req.body.CaloriesIn);
                    newUserData.caloriesOut.splice(i, 0, req.body.CaloriesOut);
                    break;
                }
            }
        }
    }
    else //user has no data push it in
    {
        newUserData.date.push(req.body.Date);
        newUserData.activity.push(req.body.Activity);
        newUserData.weight.push(req.body.Weight);
        newUserData.minutes.push(req.body.Minutes);
        newUserData.caloriesIn.push(req.body.CaloriesIn);
        newUserData.caloriesOut.push(req.body.CaloriesOut);
    }

    User.findByIdAndUpdate({_id: req.session.user._id}, {userData: newUserData}, {useFindAndModify:true}, function(err, res) {
        if (err)
            console.log('err, ID not found', err);
        else
            console.log('successfully updated id');
    });
    res.redirect('/tables'); 
});


router.post('/Update', (req, res) => {

    let updatedUserData = req.session.user.userData;
    updatedUserData = req.body.userData;
    User.findByIdAndUpdate({_id: req.session.user._id}, {userData: updatedUserData}, {useFindAndModify:false}, function(err, res) {
        if (err)
            console.log('err, ID not found', err);
        else
            console.log('successfully updated id');
    });


    res.redirect('/tables');

});
module.exports = router;
