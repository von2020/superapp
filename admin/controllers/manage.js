const  {admin_manage_queries} = require('../queries/index');
const {resMessageRedirect} = require('../../utils/reusables')

const {
    getUsers,
    updateUsers,
    uplinequery,
    carRequests,
    listVehicle,
    bulkUpload,
    singleUpload,
    getSubs,
    getDept,
    carRequests_admin,
    getUpline,
    getUpline_edit,
    getInactiveUsers
} = admin_manage_queries;

class admin_manage_controllers {

    static async getAllDepartments (req, res) {
        const userDetails = req.session.userDetails
        const token = userDetails.token

        try{
            const {result, resbody} = await getDept(token);
            const data = resbody;
            req.session.users = resbody;
            console.log("data", data)
            if (result.statusCode == '200') {
                res.render('admin/all_departments' , {userDetails, data});
            } else {
                resMessageRedirect(res, req, 'error_msg', 'Something went wrong','/admin/manage/getInActiveUsers')
            }
        } catch(err){
            if (err) console.log('error', err)
        }
    }

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

    

    static async viewRequest (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;

        try{
            const {result, resbody} = await carRequests_admin(token);
            const data_request = resbody;
            console.log('vehicle request', resbody)

            var data = data_request.filter(function (data) {
                return data.upline_approval == 'PENDING' // need to come back to this to populate the feilds with the data about the users
            });

            var driver = data_request.filter(function (data) {
                return data.driver_admin_approval == 'DENIED' // need to come back to this to populate the feilds with the data about the users
            });

            driver = driver[0];
            if (!driver) {
                data = data
            } else {
                data.push(driver)
            }
            
            console.log(driver)
            console.log('the data complete', data)
            req.session.carRequests = resbody
            if (result.statusCode == 200) {
                res.render('admin/request_list',{userDetails, data})
            } else {
                req.flash('error_msg', 'The request could not be made');
                res.redirect('/admin/manage/view_request')
            }
        }catch(err){
            if (err) return console.error('Error', error)
        }
    };

    static async memberRequest (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.query.id;

        try{
            // you will need to come back to this logic
            // const {result, resbody} = await indRequests(token, id);
            // console.log('result', result.statusCode);
            // console.log('resbody', resbody)

            const car_requests = req.session.carRequests;
            

            var car_request =  car_requests.filter(function(car_request) {
                return car_request.id == req.query.id;
                
              });
              car_request = car_request[0];
              req.session.car_request = car_request;
              res.render('admin/indCarRequest', {data:car_request, userDetails});
        }catch(err){
            if (err) return console.error('Error', error)
        }
    };

    static async viewmanageRequest (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;

        try{
            const {result, resbody} = await carRequests(token);
            const data_request = resbody;

            var dataApproved = data_request.filter(function (dataApproved){
                return dataApproved.upline_approval == 'APPROVED'
            });
            var data = dataApproved.filter (function (data) {
                return data.driver_admin_approval == 'PENDING'
            });
            req.session.managecarRequests = resbody
            if (result.statusCode == 200) {
                res.render('admin/manageRequest',{userDetails, data})
            } else {
                req.flash('error_msg', 'The request could not be made');
                res.redirect('/requests/manage_request')
            }
        }catch(err){
            if (err) return console.error('Error', err)
        }
    };

    static async manageMemberRequest (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.query.id;

        try{

            const car_requests = req.session.managecarRequests;
            

            var car_request =  car_requests.filter(function(car_request) {
                return car_request.id == req.query.id;
                
              });
              car_request = car_request[0];
              req.session.managecar_request = car_request;;

              res.render('admin/manageindCarRequest', {data:car_request, userDetails});
        }catch(err){
            if (err) return console.error('Error', error)
        }
    };

    static async manageUplineApprove (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const car_request = req.session.managecar_request;
        const id = car_request.id; // you need to come back to all of this.
        console.log("id", id)
        var stringValue = req.body.button;
        var boolValue = stringValue.toLowerCase() == 'true' ? 'APPROVED' : 'DENIED'   //returns true
        
        const query = {
            requester: car_request.requester,
            trip_type:  car_request.trip_type,
            request_type: car_request.request_type,
            priority: car_request.priority,
            destination: car_request.destination,
            purpose: car_request.purpose,
            upline: userDetails.upline_id,//car_request.upline, // this was taking out to see 
            driver_admin_approval: boolValue,
            driver_admin_reason: req.body.driver_admin_reason,
            trip_duration:  car_request.trip_duration 
        };

        console.log("query", query)

        
        try{

            const {result, resbody} = await uplinequery(query, token, id);
            const data = resbody;
            console.log("resbody", resbody)
            if (result.statusCode == 200) {
                if (resbody.driver_admin_status == 'APPROVED'){
                    req.session.approved = resbody

                    res.redirect('/admin/manage/vehicle_list')
                    // here it will not route back because the driver admin approval value is not here.
                } else {
                    req.flash('success_msg', 'You have succesfully rejected  a request')
                    res.redirect('/admin/manage/viewmanage_request');
                    return
                }

            } else {
                req.flash('error_msg', 'The request could not be approved');
                res.redirect('/admin/manage/viewmanage_request');
            }
            
        }catch(err){
            if (err) return console.error('Error', err);
        }
    }

    static async assignVehicle (req, res) {
        const userDetails = req.session.userDetails;
        const request = req.session.approved;
        const token = userDetails.token;
        const car_request = req.session.managecar_request
        
        try {
            const {result, resbody} = await listVehicle(token);
            const vehicles = resbody
            console.log(resbody)
            if (result.statusCode == 200) {
                if (typeof(vehicles[0])=='undefined' ) { // this should include the prioriity as well  &&
                    return res.redirect('/admin/manage/reassign')
                } 
                res.render('admin/assignVehicle', {userDetails, request, vehicles});
            } else if (result.statusCode == 401){
                req.flash('error_msg', resbody.response);
                res.redirect('/admin/dashboard')
            }
        }catch(err) {
            if (err) return console.error('Error', err);
        }

    };

    static async handleAssignVehicle (req, res) {
        const userDetails = req.session.userDetails;
        const approved = req.session.approved;
        const car_request = req.session.managecar_request;
        const token = userDetails.token;

        const query = {
            "vehicle_request": car_request.id,
            "vehicle": parseInt(req.query.id),
            "assigner": userDetails.id,
        };
        try {
            const {result, resbody} = await vehicleAssign(query, token)
            if (result.statusCode == 201) {
                req.flash('success_msg', 'A vehicle has been assigned')
                res.redirect('/admin/manage/viewmanage_request')
            } else if (result.statusCode == 401){
                req.flash('error_msg', resbody.detail);
                res.redirect('/admin/manage/viewmanage_request')
            } else {
                req.flash('error_msg', 'Something went wrong contact IT');
                res.redirect('/admin/manage/viewmanage_request');      
            }
        } catch (err){
            if (err) return console.error('Error', err);
        }
    };

    static async renderReassign (req, res) {
        const userDetails = req.session.userDetails;
        const request = req.session.approved;
        const token = userDetails.token;
        
        try {
            res.render('admin/reassignPriority', {userDetails})
        }catch(err) {
            if (err) return console.error('Error', err);
        }

    };

    static async uplineApprove (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const car_request = req.session.car_request;
        const id = car_request.id; // you need to come back to all of this.

        var stringValue = req.body.button;
        var boolValue = stringValue.toLowerCase() == 'true' ? 'APPROVED' : 'DENIED';   //returns true

        const query = {
            requester: car_request.requester,
            trip_type:  car_request.trip_type,
            request_type: car_request.request_type,
            priority: parseInt(req.body.priority),
            destination: car_request.destination,
            purpose: car_request.purpose,
            upline: userDetails.id,
            upline_approval: boolValue,
            upline_reason: req.body.upline_reason,
            trip_duration:  car_request.trip_duration
        };
        console.log('the query is ', query)
        
        try{

            const {result, resbody} = await uplinequery(query, token, id);
            const data = resbody;
            console.log(result.statusCode)
            console.log(data)
            if (result.statusCode == 200) {
                if(data.upline_approval_status == 'APPROVED') {
                    req.flash('success_msg', 'You have successfully accepted a request')
                    res.redirect('/admin/manage/view_request');
                } else {
                    req.flash('success_msg', 'You have successfully rejected a request')
                    res.redirect('/admin/manage/view_request');
                }

            } else {
                req.flash('error_msg', 'The request could not be approved');
                res.redirect('/admin/manage/view_request');
            }
            
        }catch(err){
            if (err) return console.error('Error', err);
        }
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

    static async editProfile (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const user_id = userDetails.id;
        // const user_id = req.query.id;
        // req.session.user_id = user_id;
        const id = userDetails.subsidiary_id;
        // req.session.department = id;

        console.log("id", id);
        console.log("userDetails", userDetails);
        console.log("user_id", user_id)

        try{
            const ups = await getUpline_edit(id);
            // var user = req.session.user;

            
            // user = user[0]
            console.log('uplines', ups);
            res.render('admin/admin-edit-profile', {userDetails,  ups: ups.resbody})
        } catch(err){
            if (err) console.log('error', err)
        }
  
    };
    static async handleEditProfile (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const user_id = userDetails.id;

        const query = {
            email: req.body.email,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone: req.body.phone,
            title: req.body.title,
            upline: req.body.upline ,
            
        }

        console.log('query', query)
        console.log('id', user_id)
        console.log('token', token)
        try{
            const {result, resbody} = await updateUsers(query, token, user_id);
            console.log("resbody", resbody)
            if (result.statusCode == '200') {
                resMessageRedirect(res, req, 'success_msg', `You have succesfully updated the profile of ${query.first_name + ' '+ query.last_name}`,'/admin/manage/edit-profile')
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${resbody.response}  ${query.first_name + ' '+ query.last_name}`,'/admin/manage/edit-profile')
            }
        } catch(err){
            if (err) console.log('error', err)
        }
    }

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