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
                console.error('Error from the validation logic', error) //use winston here
                return res.redirect('/register');
                
            } else {
                const {result, resbody} = await updatePassword(query, id);
                console.log(result.statusCode)
                console.log(resbody)
                if ( result.statusCode == 200 ) {
                    req.flash('success_msg', 'Account Now Active');
                    return res.redirect('/login')          
                }
                // there should be a logic here for the 400 error.   
                else  {
                    req.flash('error_msg', 'Something went wrong, contact admin');
                    return res.redirect('/register')
                }  
            }
        }

        catch (err){
             if (err) return console.error('registration err', err)
        }

    
    };


    static async displayLogin (req, res) {
        res.render('index');
    };

    static async handleLogin (req, res) {
        const {error, value} = validateLogin(req.body);

        if (error) {
            req.flash('error_msg', 'This email does not match the standard email format')
            res.redirect('/login')
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
                    return res.redirect ('/admin/login')
                }
                req.session.userDetails = resbody
                console.log(req.session.userDetails)
                res.redirect('/dashboard')
                return;
            }
            else if (result.statusCode == 400) {
                req.flash('error', 'Bad request');
                res.redirect('/login');
                return;
            }
            else {
                req.flash('error_msg', 'Something went wrong contact IT support');
                res.redirect('/login');
                return; 
            }
            
        }
        catch(err) {
            if (err) return console.log(err)
        }
    }

    static async displayDashboard (req, res) {
        var userDetails = req.session.userDetails
        if (userDetails.role == 'Staff') {
            res.render('dashboard_staff', {userDetails}) 
        } else if (userDetails.role == 'Driver') {
            res.render('dashboard_driver', {userDetails})
        } else{
            res.render('dashboard', {userDetails})
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
          res.redirect('/login')
    }
    

}

module.exports = auth_controllers