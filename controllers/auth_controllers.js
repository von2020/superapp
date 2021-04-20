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
    getStaffCount,
    getDirectorCount,
    getSupervisorCount,
    getDriverAdminCount,
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
         console.log(req.query)
            const id = req.query.token;

            // req.session.user_reg_id = id
            
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
        // const {error, value} = validateLogin(req.body);
        

        // if (error) {
        //     req.flash('error_msg', `${error}`)
        //     res.redirect('/')
        //     return console.error('login error', error)
        // } 
        
        const query = {
            username: req.body.username,
            password: req.body.password
        }
        try{
            const {result, resbody} = await loginRequest(query)
            console.log("response", resbody)
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
                console.log("resbody", resbody)
                req.flash('error', resbody.error);
                res.redirect('/');
                return;
            }
            else {
                console.log("resbody", resbody)
                req.flash('error_msg', resbody.error);
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
                    res.redirect('/staff_dashboard') 
                } else if (userDetails.role == 'Driver') {
                    res.redirect('/driver_dashboard')
                    // res.render('dashboard_driver_admin', {userDetails, totals})
                } else if (userDetails.role == 'Supervisor') {
                    res.redirect('/supervisor_dashboard')
                } else if (userDetails.role == 'Auditor') {
                    res.redirect('/auditor_dashboard')
                } else if (userDetails.role == 'Finance') {
                    res.redirect('/finance_dashboard')
                } else if (userDetails.role == 'Facility Officer') {
                    res.redirect('/facility_dashboard')
                } else if (userDetails.role == 'Driver Admin') {
                    res.redirect('/driver_admin_dashboard')
                    // res.render('dashboard_driver_admin', {userDetails, totals})
                } else if (userDetails.role == 'Director') {
                    res.redirect('/director_dashboard')
                    // res.render('dashboard_director', {userDetails, totals})
                } else if (userDetails.role == 'Group Managing Director') {
                    res.redirect('/director_dashboard')
                } else{
                    res.redirect('/staff_dashboard')
                }
            } else {
                resMessageRedirect(res, req, 'error_msg', 'Something went wrong','/')
            }
        } catch(err){
            if (err) console.log('error', err)
        }
        
    };

    static async staffDashboard (req, res) {
        var userDetails = req.session.userDetails
        const token = userDetails.token

        try{
            const {result, resbody} = await getStaffCount(token);
            const totals = resbody;
            req.session.totals = resbody;
            console.log("totals", totals)
            if (result.statusCode == '200') {
                
                    res.render('dashboard_staff', {userDetails, totals})
                } 
                else {
                    resMessageRedirect(res, req, 'error_msg', 'Something went wrong','/')
                }
        } catch(err){
                if (err) console.log('error', err)
            }
        };

    static async driverDashboard (req, res) {
        var userDetails = req.session.userDetails
        const token = userDetails.token

        try{
            const {result, resbody} = await getTotals(token);
            const totals = resbody;
            req.session.totals = resbody;
            console.log("totals", totals)
            if (result.statusCode == '200') {
                
                    res.render('dashboard_driver', {userDetails, totals})
                } 
                else {
                    resMessageRedirect(res, req, 'error_msg', 'Something went wrong','/')
                }
        } catch(err){
                if (err) console.log('error', err)
            }
        };

    static async supervisorDashboard (req, res) {
        var userDetails = req.session.userDetails
        const token = userDetails.token
    
            try{
                const {result, resbody} = await getSupervisorCount(token);
                const totals = resbody;
                req.session.totals = resbody;
                console.log("totals", totals)
                if (result.statusCode == '200') {
                    
                        res.render('dashboard_sup', {userDetails, totals})
                    } 
                    else {
                        resMessageRedirect(res, req, 'error_msg', 'Something went wrong','/')
                    }
            } catch(err){
                    if (err) console.log('error', err)
                }
        };

    static async procurementDashboard (req, res) {
        var userDetails = req.session.userDetails
        const token = userDetails.token
    
            try{
                const {result, resbody} = await getSupervisorCount(token);
                const totals = resbody;
                req.session.totals = resbody;
                console.log("totals", totals)
                if (result.statusCode == '200') {
                    
                        res.render('dashboard_procurement', {userDetails, totals})
                    } 
                    else {
                        resMessageRedirect(res, req, 'error_msg', 'Something went wrong','/')
                    }
            } catch(err){
                    if (err) console.log('error', err)
                }
        };

    static async facilityDashboard (req, res) {
        var userDetails = req.session.userDetails
        const token = userDetails.token
    
            try{
                const {result, resbody} = await getSupervisorCount(token);
                const totals = resbody;
                req.session.totals = resbody;
                console.log("totals", totals)
                if (result.statusCode == '200') {
                    
                        res.render('dashboard_facility', {userDetails, totals})
                    } 
                    else {
                        resMessageRedirect(res, req, 'error_msg', 'Something went wrong','/')
                    }
            } catch(err){
                    if (err) console.log('error', err)
                }
        };

    static async auditorDashboard (req, res) {
        var userDetails = req.session.userDetails
        const token = userDetails.token
        
            try{
                const {result, resbody} = await getSupervisorCount(token);
                const totals = resbody;
                req.session.totals = resbody;
                console.log("totals", totals)
                if (result.statusCode == '200') {
                        
                        res.render('dashboard_auditor', {userDetails, totals})
                    } 
                    else {
                        resMessageRedirect(res, req, 'error_msg', 'Something went wrong','/')
                    }
                } catch(err){
                        if (err) console.log('error', err)
                    }
            };

    static async financeDashboard (req, res) {
        var userDetails = req.session.userDetails
        const token = userDetails.token
    
            try{
                const {result, resbody} = await getSupervisorCount(token);
                const totals = resbody;
                req.session.totals = resbody;
                console.log("totals", totals)
                if (result.statusCode == '200') {
                    
                        res.render('dashboard_finance', {userDetails, totals})
                    } 
                    else {
                        resMessageRedirect(res, req, 'error_msg', 'Something went wrong','/')
                    }
            } catch(err){
                    if (err) console.log('error', err)
                }
        };

    static async directorDashboard (req, res) {
        var userDetails = req.session.userDetails
        const token = userDetails.token
    
            try{
                const {result, resbody} = await getDirectorCount(token);
                const totals = resbody;
                req.session.totals = resbody;
                console.log("totals", totals)
                if (result.statusCode == '200') {
                    
                        res.render('dashboard_director_old', {userDetails, totals})
                    } 
                    else {
                        resMessageRedirect(res, req, 'error_msg', 'Something went wrong','/')
                    }
            } catch(err){
                    if (err) console.log('error', err)
                }
            };

    static async driverAdminDashboard (req, res) {
        var userDetails = req.session.userDetails
        const token = userDetails.token
        
            try{
                const {result, resbody} = await getDriverAdminCount(token);
                const totals = resbody;
                req.session.totals = resbody;
                console.log("totals", totals)
                if (result.statusCode == '200') {
                        
                    res.render('driver_admin_dashboard', {userDetails, totals})
                } 
                else {
                    resMessageRedirect(res, req, 'error_msg', 'Something went wrong','/')
                    }
                } catch(err){
                        if (err) console.log('error', err)
                    }
        };
    
    static async displayPrivacyPolicy (req, res) {
        var userDetails = req.session.userDetails
        res.render('privacy_policy', {userDetails}) 
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