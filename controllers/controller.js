let express = require( 'express' );
let mongoose = require('mongoose');
let config = require('../config');
let User = require('../models/userModel');


module.exports = {

new:function (req,res) {

    console.log(req);

    if (!req.body.userName || !req.body.password) {
        return res.status(501).json({status: 'error', message: 'invalid data'});
    }else{

    let newUser = new User();
    newUser.userName = req.body.userName;
    newUser.password = req.body.password;

    newUser.save(function (err, user) {
        if (err) {
            console.log(err);
            return res.status(501).json({status: 'error', message: err});
        } else {
            return res.status(200).json({status: 'success', user: user});
        }
    })

    }
},
all:function (req,res) {

    User.find({},function (err, users){

        if (err) {
            return res.status(501).json({status: 'error', message: err});

        }else if(users.length < 1){

            return res.status(204).json({status: 'error', message: "no data"});
        }
        else {
            console.log(req)
            return res.status(200).json({status: 'success', users: users});
        }

    });


}

};