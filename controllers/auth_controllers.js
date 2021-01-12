const express = require('express');
const router = express.Router();
const validateRegister = require('../validation/registrationSchema');
const validateLogin = require('../validation/loginSchema');
// requrie the query from the query modules
const {auth_queries} = require('../queries');

const {
    getUsers,
    getDeb,
    getSubs,
    createRegister,
    loginRequest,
    updatePassword,
    reset_password,
    reset_password_confirm,
    getTotals,
    getDeb1
} = auth_queries;

class auth_controllers {

    static async displayRegister (req, res) {
       

        try {
            // const users = await getUsers();
            // const users = resbody
            //const deps = await getDeb();
            const subs = await getSubs();
            const id = req.query.param

            req.session.user_reg_id = id
            
            console.log('id', id)

            res.render('register_auth', {subs: subs.resbody,  id}); 
            //this was from the old implementation. it is not needed now
            //,users: users.resbody, deps: deps.resbody});
        } catch (err) {
            if (err) return console.error('display page details error', err)
        };

    };


    // static async handleDeps (req, res) {
    //     const id = req.query.id;
    //     console.log('id',id)
    //     //const id = subID

    //     try {
    //         const { error, value} = await getDeb1(id);
    //     } catch (err) {
    //         if (err) return console.error('display page details error', err)
    //     };

    // };

    // Handle the register post request.
    static async handleRegister (req, res) {
        // req.session.destroy(function(err) {
        //     if (err) return console.log('error',err)
        //   });
        const query = {
            old_password : req.body.old_password,
            new_password : req.body.confirm_password,
        }

        
        const id = req.body.email

        
        console.log('id', id)

        

        console.log('query', query)

        let errors = [];
        try{    
            //const { error, value} = validateRegister(query); // i do not think i am responisble for setting up the status numbers so i deleted a code that was here check if this is the case
            if (req.body.password != req.body.confirm_password) {
                
                    errors.push({msg: 'Your passwords do not match '})
                
                req.flash('errors', errors);
                console.error('Error from the validation logic', errors) //use winston here
                return res.redirect('/register');
                
            } else {
                const {result, resbody} = await updatePassword(query, id);
                console.log(result.statusCode)
                console.log(resbody)
                if ( result.statusCode == 200 ) {
                    req.flash('success_msg', resbody.status);
                    return res.redirect('/register')          
                }
                // there should be a logic here for the 400 error.   
                else  {
                    req.flash('error_msg', resbody.old_password);
                    return res.redirect('/register')
                }  
            }
        }

        catch (err){
             if (err) return console.error('registration err', err)
        }

    
    };

    static async resetPassword (req, res) {
        
        res.render('reset_password');
    };

    static async handleResetPassword (req, res) {
        
        const query = {
            email: req.body.email    
        }
        console.log("query", query);
        try{
            const {result, resbody} = await reset_password(query)
            if (result.statusCode == 200){
                
                    req.flash('success_msg', 'Reset Password Mail Sent');
                    return res.redirect ('/reset-password');
                    
                    
            }
                
            else if (result.statusCode == 400) {
                req.session.failed = resbody
                console.log('failed users',resbody)
                req.flash('error', 'Email Not Registered');
                res.redirect('/reset-password');
                return;
            }
            else {
                req.flash('error_msg', 'Something went wrong contact IT support');
                res.redirect('/reset-password');
                return; 
            }
            
        }
        catch(err) {
            if (err) return console.log(err)
        }
    
    }

    static async resetPasswordConfirm (req, res) {
        
            const id = req.query.token

            req.session.user_reg_id = id
            
            console.log('id', id)
        res.render('reset-password-auth', {id});
    };

    static async handleResetPasswordConfirm (req, res) {
        // req.session.destroy(function(err) {
        //     if (err) return console.log('error',err)
        //   });

        // const id = req.query.token

        // req.session.user_reg_id = id
            
        // console.log('id', id)

        const query = {
            password : req.body.confirm_password,
            token    : req.body.token,
        }

        
        

        

        console.log('query', query)

        let errors = [];
        try{    
            //const { error, value} = validateRegister(query); // i do not think i am responisble for setting up the status numbers so i deleted a code that was here check if this is the case
            if (req.body.password != req.body.confirm_password) {
                
                    errors.push({msg: 'Your passwords do not match '})
                
                req.flash('errors', errors);
                console.log('Error from the validation logic', errors) //use winston here
                return res.redirect('/reset-password-confirm');
                
            } else {
                const {result, resbody} = await reset_password_confirm(query);
                console.log("result",result.statusCode)
                const details = resbody;
                console.log("details", resbody)
                if ( result.statusCode == 200 ) {
                    req.flash('success_msg', 'Password Changed Successfully');
                    return res.redirect('/')          
                }
                // there should be a logic here for the 400 error.   
                else  {
                    req.flash('error_msg', details.password);
                    return res.redirect('/reset-password-confirm')
                }  
            }
        }

        catch (err){
             if (err) return console.log('error', err)
        }

    
    };

    static async displayLogin (req, res) {
        res.render('index');
    };

    static async handleLogin (req, res) {
        const {error, value} = validateLogin(req.body);

        if (error) {
            req.flash('error_msg', 'This email does not match the standard email format')
            res.redirect('/')
            return console.error('login error', error)
        } // i dont think i need this tbh
        
        const query = {
            username: req.body.username,
            password: req.body.password
        }
        try{
            const {result, resbody} = await loginRequest(query)
            if (result.statusCode == 200){
                if (resbody.role == 'Super Admin') {
                    req.flash('error', 'Login to the admin profile');
                    return res.redirect ('/admin')
                }
                req.session.userDetails = resbody
                console.log(req.session.userDetails)
                res.redirect('/dashboard')
                return;
            }
            else if (result.statusCode == 400) {
                req.flash('error', 'Bad request');
                res.redirect('/');
                return;
            }
            else {
                req.flash('error_msg', 'Something went wrong contact IT support');
                res.redirect('/');
                return; 
            }
            
        }
        catch(err) {
            if (err) return console.log(err)
        }
    }

    static async displayDashboard (req, res) {
        var userDetails = req.session.userDetails
        const token = userDetails.token

        try{
            const {result, resbody} = await getTotals(token);
            const totals = resbody;
            req.session.totals = resbody;
            console.log("totals", totals)
            if (result.statusCode == '200') {
                if (userDetails.role == 'Staff') {
                    res.render('dashboard_staff', {userDetails, totals}) 
                } else if (userDetails.role == 'Driver') {
                    res.render('dashboard_driver', {userDetails, totals})
                } else{
                    res.render('dashboard', {userDetails, totals})
                }
            } else {
                resMessageRedirect(res, req, 'error_msg', 'Something went wrong','/')
            }
        } catch(err){
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
          res.redirect('/')
    }
    

}

module.exports = auth_controllers