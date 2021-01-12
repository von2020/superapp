const  {admin_manage_queries} = require('../queries/index');
const {resMessageRedirect} = require('../../utils/reusables')

const {
    getUsers,
    updateUsers,
    bulkUpload,
    singleUpload,
    getSubs,
    getInactiveUsers
} = admin_manage_queries;

class admin_manage_controllers {

    static async getActiveUsers (req, res) {
        const userDetails = req.session.userDetails
        const token = userDetails.token

        try{
            const {result, resbody} = await getUsers(token);
            const users = resbody;
            req.session.users = resbody;
            // console.log("users", users)
            if (result.statusCode == '200') {
                res.render('admin/activeUsers' , {userDetails, users});
            } else {
                resMessageRedirect(res, req, 'error_msg', 'Something went wrong','/admin/manage/getInActiveUsers')
            }
        } catch(err){
            if (err) console.log('error', err)
        }
  
    };

    static async adminDisplayPrivacyPolicy (req, res) {
        var userDetails = req.session.userDetails
        res.render('admin/admin_privacy_policy', {userDetails}) 
        };

    static async viewActiveUsers (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const user_id = req.query.id;
        req.session.user_id = user_id;
        const users = req.session.users;
        try{
            
            const subs = await getSubs();

            var user = users.filter(function (user) {
                return user.id == user_id
            });
            user = user[0]
            
            console.log("user", user)
            
            res.render('admin/viewActiveUsers', {userDetails, user, subs: subs.resbody})
        } catch(err){
            if (err) console.log('error', err)
        }
  
    };

    static async handleViewActiveUsers (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const user_id = req.session.user_id;

        const query = {
            email: req.body.email,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone: req.body.phone,
            title: req.body.title,
            upline: req.body.upline ,
            subsidiary: req.body.subsidiary,
            department: req.body.department,
            role: req.body.role
        }

        console.log('query', query)
        try{
            const {result, resbody} = await updateUsers(query, token, user_id);

            if (result.statusCode == '200') {
                resMessageRedirect(res, req, 'success_msg', `You have succesfully updated the profile of ${query.first_name + ' '+ query.last_name}`,'/admin/manage/getActiveUsers')
            } else {
                resMessageRedirect(res, req, 'error_msg', `Updates could not be made on the profile of  ${query.first_name + ' '+ query.last_name}`,'/admin/manage/getActiveUsers')
            }
        } catch(err){
            if (err) console.log('error', err)
        }

    }

    static async activeUsersInactive (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const user_id = req.query.id;
        req.session.user_id = user_id;
        const users = req.session.users;
        try{
            
            const subs = await getSubs();

            var user = users.filter(function (user) {
                return user.id == user_id
            });
            user = user[0]
            console.log("user", user)
            
            
            res.render('admin/activeUsersInactive', {userDetails, user, subs: subs.resbody})
        } catch(err){
            if (err) console.log('error', err)
        }
  
    };

    static async handleActiveUsersInactive (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const user_id = req.session.user_id;

        const query = {
            email: req.body.email,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone: req.body.phone,
            title: req.body.title,
            is_active: false
            
        }

        console.log('query', query)
        try{
            const {result, resbody} = await updateUsers(query, token, user_id);

            if (result.statusCode == '200') {
                resMessageRedirect(res, req, 'success_msg', `You have succesfully made ${query.first_name + ' '+ query.last_name} inactive`,'/admin/manage/getActiveUsers')
            } else {
                resMessageRedirect(res, req, 'error_msg', `Updates could not be made on the profile of  ${query.first_name + ' '+ query.last_name}`,'/admin/manage/getActiveUsers')
            }
        } catch(err){
            if (err) console.log('error', err)
        }

    }

    static async getInActiveUsers (req, res) {
        const userDetails = req.session.userDetails
        const token = userDetails.token

        try{
            const {result, resbody} = await getInactiveUsers(token);
            const users = resbody;
            console.log('users:', users);
            req.session.users = resbody;
            if (result.statusCode == '200') {
                res.render('admin/InactiveUsers' , {userDetails, users});
            } else {
                resMessageRedirect(res, req, 'error_msg', 'Something went wrong start this trip again','/admin/manage/getInActiveUsers')
            }
        } catch(err){
            if (err) console.log('error', err)
        }
  
    };

    static async viewInActiveUsers (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const user_id = req.query.id;
        req.session.user_id = user_id;

        try{
            const subs = await getSubs();
            var users = req.session.users;

            var user = users.filter(function (user) {
                return user.id == user_id
            });
            user = user[0]
            console.log('user:', user);
            res.render('admin/viewInActiveUsers', {userDetails, user, subs: subs.resbody})
        } catch(err){
            if (err) console.log('error', err)
        }
  
    };

    static async handleViewInActiveUsers (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const user_id = req.session.user_id;

        const query = {
            email: req.body.email,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone: req.body.phone,
            title: req.body.title,
            upline: parseInt(req.body.upline) ,
            subsidiary: parseInt(req.body.subsidiary),
            department: parseInt(req.body.department),
            role: parseInt(req.body.role)
        }

        console.log('query', query)
        try{
            const {result, resbody} = await updateUsers(query, token, user_id);

            if (result.statusCode == '200') {
                resMessageRedirect(res, req, 'success_msg', `You have succesfully updated the profile of ${query.first_name + ' '+ query.last_name}`,'/admin/manage/getInActiveUsers')
            } else {
                resMessageRedirect(res, req, 'error_msg', `Updates could not be made on the profile of  ${query.first_name + ' '+ query.last_name}`,'/admin/manage/getInActiveUsers')
            }
        } catch(err){
            if (err) console.log('error', err)
        }

    }

    static async handleViewInActiveUsers (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const user_id = req.session.user_id;

        const query = {
            email: req.body.email,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone: req.body.phone,
            title: req.body.title,
            upline: parseInt(req.body.upline) ,
            subsidiary: parseInt(req.body.subsidiary),
            department: parseInt(req.body.department),
            role: parseInt(req.body.role)
        }

        console.log('query', query)
        try{
            const {result, resbody} = await updateUsers(query, token, user_id);

            if (result.statusCode == '200') {
                resMessageRedirect(res, req, 'success_msg', `You have succesfully updated the profile of ${query.first_name + ' '+ query.last_name}`,'/admin/manage/getInActiveUsers')
            } else {
                resMessageRedirect(res, req, 'error_msg', `Updates could not be made on the profile of  ${query.first_name + ' '+ query.last_name}`,'/admin/manage/getInActiveUsers')
            }
        } catch(err){
            if (err) console.log('error', err)
        }

    }

    static async createUsers (req, res) {
        const userDetails = req.session.userDetails
        const token = userDetails.token
        try{
            const {result, resbody} = await getUsers(token);
            const users = resbody;
            req.session.users = resbody;
            if (result.statusCode == '200') {
                res.render('admin/userUpload' , {userDetails, users});
            } else {
                resMessageRedirect(res, req, 'error_msg', 'Something went wrong','/admin/manage/createUsers')
            }
        } catch(err){
            if (err) console.log('error', err)
        }
  
    };

    static async handleCreateUsers (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;

        const query = JSON.parse(req.body.data);

        console.log('query here', query)
        try{
            const {result, resbody} = await bulkUpload(query, token);
            req.session.bulk_upload_response = resbody;
            console.log('resbody one',resbody)
            if (result.statusCode == '201') {
                //res.redirect('/admin/manage/createUsersResponse')
                resMessageRedirect(res, req, 'success_msg', 'You have successfully registered users, Check email to confirm registration','/admin/manage/createUsers')
        }  else if (result.statusCode == '400') {
            req.session.failed = resbody
            console.log('the failed users are',resbody)
            resMessageRedirect(res, req, 'error_msg', 'The following users could not be uploaded','/admin/manage/get_failed_users')
        }  else {
                resMessageRedirect(res, req, 'error_msg', 'Something went wrong contact admin','/admin/manage/createUsers')
            }
        } catch(err){
            if (err) console.log('error', err)
        }

    }

    static async createUsersResponse (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const user_response = req.session.bulk_upload_response;

        try{
            res.send(user_response)
        } catch(err){
            if (err) console.log('error', err)
        }

    }
    
    static async createSingleUsers (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        try {
            const subs = await getSubs();
            res.render('admin/singleUserUpload', {userDetails, subs: subs.resbody}); 
        } catch (err) {
            if (err) return console.error('display page details error', err)
        };

    };

    static async handleCreateSingleUsers (req, res) {
        const query = {
            email: req.body.email,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone: req.body.phone,
            title: req.body.title,
            password: '1234',
            confirm_password: '1234',
            upline: parseInt(req.body.upline) ,
            subsidiary: parseInt(req.body.subsidiary),
            department: parseInt(req.body.department),
            role: parseInt(req.body.role)
        }

        console.log('query', query)
        try{
               const {result, resbody} = await singleUpload(query);

                if ( result.statusCode == 201 ) {
                    resMessageRedirect(res, req, 'success_msg', 'You succesfully created a user','/admin/manage/createSingleUsers')         
                }
                // there should be a logic here for the 400 error.   
                else  {
                    resMessageRedirect(res, req, 'error_msg', 'A user could not be created','/admin/manage/createSingleUsers')  
                }      
        }
        catch (err){
             if (err) return console.error('registration err', err)
        }

    
    };

    static async getFailedUsers (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const failedUsers = req.session.failed

        // const query = JSON.parse(req.body.data);
        
        
        try {
            
            const details = failedUsers
            console.log('details', details);
            res.render('admin/listFailedUsers', {userDetails, details}); 
        } catch (err) {
            if (err) return console.error('display page details error', err)
        };

    };

    static async failedUsers (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const user = req.session.failed
        
        try {
            res.render('admin/failedUsers', {userDetails, subs: subs.resbody}); 
        } catch (err) {
            if (err) return console.error('display page details error', err)
        };

    };

    static async displayProfile (req, res) {
        var userDetails = req.session.userDetails
        res.render('admin/admin_profile', {userDetails}) 
        };

    static async handleFailedUsers (req, res) {
        const query = {
            email: req.body.email,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone: req.body.phone,
            title: req.body.title,
            password: req.body.password,
            confirm_password: req.body.password,
            upline: parseInt(req.body.upline) ,
            subsidiary: parseInt(req.body.subsidiary),
            department: parseInt(req.body.department),
            role: parseInt(req.body.role)
        } 

        console.log('query', query)
        try{
               const {result, resbody} = await singleUpload(query);

                if ( result.statusCode == 201 ) {
                    resMessageRedirect(res, req, 'success_msg', 'You succesfully created a user','/admin/manage/createUsers')         
                }
                // there should be a logic here for the 400 error.   
                else  {
                    resMessageRedirect(res, req, 'error_msg', 'A user could not be created','/admin/manage/createUsers')  
                }      
        }
        catch (err){
             if (err) return console.error('registration err', err)
        }

    
    };

}

module.exports = admin_manage_controllers