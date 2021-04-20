const express = require('express');
const router = express.Router();
const validateLogin = require('../../validation/loginSchema');
// requrie the query from the query modules
const {auth_queries} = require('../queries');

const {
    loginRequest,
    getTotals,
} = auth_queries;

class auth_controllers {

    static async displayLogin (req, res) {
        res.render('admin/admin_index');
    };

    static async handleLogin (req, res) {
        // const {error, value} = validateLogin(req.body);

        // if (error) {
        //     req.flash('error_msg', 'This email does not match the standard email format')
        //     res.redirect('/admin')
        //     return console.error('login error', error)
        // } 
        
        const query = {
            username: req.body.username,
            password: req.body.password
        }
        try{
            const {result, resbody} = await loginRequest(query)
            console.log(resbody)
            if (result.statusCode == 200){
                if (resbody.role != 'Super Admin') {
                    req.flash('error', 'Login to the user profile');
                    return res.redirect ('')
                }
                req.session.userDetails = resbody
                console.log(req.session.userDetails)
                res.redirect('/admin/dashboard')
                return;
            }
            else if (result.statusCode == 400) {
                console.log("resbody", resbody)
                req.flash('error', resbody.error);
                res.redirect('/admin');
                return;
            }
            else {
                console.log("resbody", resbody)
                req.flash('error_msg', resbody.error);
                res.redirect('/admin');
                return; 
            }
            
        }
        catch(err) {
            if (err) return console.log(err)
        }
    }

    static async adminDisplayPrivacyPolicy (req, res) {
        var userDetails = req.session.userDetails
        res.render('admin/admin_privacy_policy', {userDetails}) 
        };

    static async displayDashboard (req, res) {
        var userDetails = req.session.userDetails
        const token = userDetails.token

        try{
            const {result, resbody} = await getTotals(token);
            const totals = resbody;
            req.session.totals = resbody;
            console.log("totals", totals)
        res.render('admin/admin_dashboard', {userDetails, totals}) 
    
        }catch(err){
            if (err) console.log('error', err)
        }
    };

    static async authorization (req, res) {
        var userDetails = req.session.userDetails
        res.render('authorization', {userDetails})
    }

    static async logout (req, res) {
        req.session.destroy(function(err) {
            if (err) return console.log('error',err)
          });
          res.redirect('/admin')
    }
    

}

module.exports = auth_controllers