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
    viewSub,
    getSubs_createusers,
    getDept,
    viewDept,
    editDepartment,
    editSubsidiary,
    addDepartment,
    addSubsidiary,
    carRequests_admin,
    getUpline,
    getUpline_edit,
    getBillOfMaterials,
    viewBillOfMaterials,
    updateBillOfMaterials,
    quotationList,
    viewQuotation,
    updateQuotation,
    dieselVendorList,
    dieselRequestQuotationList,
    viewDieselRequestQuotation,
    updateDieselRequestQuotation,
    handlePurchaseOrder,
    purchaseOrderList,
    viewPurchaseOrder,
    updatePurchaseOrder,
    dieselUsageList,
    sendGenerator,
    sendGenServiceRequest,
    genServiceRequestList,
    sendRequestFiles,
    RequestFiles,
    genDueServiceList,
    genServicing,
    genServiceList,
    viewGenService,
    updateGenService,
    allGenerator,
    sendMaintenance,
    genMaintenanceList,
    genDailyMaintenanceList,
    sendGenDailyMaintenance,
    sendGenServiceCompany,
    genServiceCompanyList,
    sendGenFaults,
    genFaultList,
    sendGenSla,
    genSlaList,
    updateSLA,
    sendGenRepair,
    viewGenRepair,
    sendGenRepairStatus,
    genRepairStatusList,
    viewGenRepairStatus,
    gen_repairList,
    paid_repairList,
    phcnBillList,
    phcnBillPaymentList,
    viewPhcnBill,
    updatePhcnBill,
    viewPhcnBillPayment,
    updatePhcnBillPayment,
    sendPhcnBillPayment,
    phcnDailyReadingList,
    getInactiveUsers
} = admin_manage_queries;

class admin_manage_controllers {

    static async getAllDepartments (req, res) {
        const userDetails = req.session.userDetails
        const token = userDetails.token
        console.log('token', token)

        try{
            const {result, resbody} = await getDept();
            const data = resbody;
            req.session.users = resbody;
            console.log("data", data)
            if (result.statusCode == '200') {
                res.render('admin/all_departments' , {userDetails, data});
            } else {
                resMessageRedirect(res, req, 'error_msg', `${data.detail}`,'/admin/dashboard')
            }
        } catch(err){
            if (err) console.log('error', err)
            resMessageRedirect(res, req, 'error_msg', `${data.detail}`,'/admin/dashboard')
        }
    }

    static async getAllSubsidiaries (req, res) {
        const userDetails = req.session.userDetails
        const token = userDetails.token
        console.log('token', token)

        try{
            const {result, resbody} = await getSubs(token);
            const data = resbody;
            req.session.users = resbody;
            console.log("data", data)
            if (result.statusCode == '200') {
                res.render('admin/all-subsidiaries' , {userDetails, data});
            } else {
                resMessageRedirect(res, req, 'error_msg', `${data.detail}`,'/admin/dashboard')
            }
        } catch(err){
            if (err) console.log('error', err)
        }
    }

    
    static async viewDepartment (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.query.id;

        console.log('id', id)
        // req.session.user_id = user_id;
        // const users = req.session.users;
        try{
            
            const depts = await viewDept(id, token);

            // var user = users.filter(function (user) {
            //     return user.id == user_id
            // });
            // user = user[0]
            
            console.log("depts", depts.resbody)
            
            res.render('admin/viewDepartment', {userDetails, depts: depts.resbody})
        } catch(err){
            if (err) console.log('error', err)
        }
  
    };

    static async viewSubsidiary (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.query.id;

        console.log('id', id)
        // req.session.user_id = user_id;
        // const users = req.session.users;
        try{
            
            const subs = await viewSub(id, token);

            // var user = users.filter(function (user) {
            //     return user.id == user_id
            // });
            // user = user[0]
            
            console.log("depts", subs.resbody)
            
            res.render('admin/view-subsidiary', {userDetails, subs: subs.resbody})
        } catch(err){
            if (err) console.log('error', err)
        }
  
    };

    static async editSubsidiary (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.query.id;

        console.log('id', id)
        // req.session.user_id = user_id;
        // const users = req.session.users;
        try{
            
            const subs = await viewSub(id, token);

            // var user = users.filter(function (user) {
            //     return user.id == user_id
            // });
            // user = user[0]
            
            console.log("subs", subs.resbody)
            
            res.render('admin/edit-subsidiary', {userDetails, subs: subs.resbody})
        } catch(err){
            if (err) console.log('error', err)
        }
  
    };

    static async handleEditSubsidiary (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.body.id

        const query = {
            name: req.body.name,
            short_name: req.body.short_name,
            
        }

        console.log('query', query)
        console.log('id', id)
        console.log('token', token)
        try{
            const {result, resbody} = await editSubsidiary(query, token, id);
            console.log("resbody", resbody)
            if (result.statusCode == '200') {
                resMessageRedirect(res, req, 'success_msg', `You have succesfully edited ${query.name }`,'/admin/manage/all-subsidiaries')
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${resbody.response}  ${query.name}`,'/admin/manage/all-subsidiaries')
            }
        } catch(err){
            if (err) console.log('error', err)
            resMessageRedirect(res, req, 'error_msg', ` ${resbody.response}  ${query.name}`,'/admin/manage/all-subsidiaries')
        }
    }

    static async addSubsidiary (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        // const id = req.query.id;

        // console.log('id', id)
        // req.session.user_id = user_id;
        // const users = req.session.users;
        try{
            
            // const depts = await viewDept(id, token);

            // var user = users.filter(function (user) {
            //     return user.id == user_id
            // });
            // user = user[0]
            
            // console.log("depts", depts.resbody)
            
            res.render('admin/add-subsidiary', {userDetails})
        } catch(err){
            if (err) console.log('error', err)
        }
  
    };

    static async handleAddSubsidiary (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        // req.session.user_id = user_id;
        // const users = req.session.users;
        const query = {
            name: req.body.name,
            short_name: req.body.short_name,
            
        }

        console.log('query', query)
        console.log('token', token)
        try{
            
            const {result, resbody} = await addSubsidiary(query, token);
            const response = resbody
            console.log("response", response)
            if (result.statusCode == '200') {
                resMessageRedirect(res, req, 'success_msg', `You have succesfully added ${query.name }`,'/admin/manage/all-subsidiaries')
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${response.response} `,'/admin/manage/all-subsidiaries')
            }
        } catch(err){
            if (err) console.log('error', err)
            resMessageRedirect(res, req, 'error_msg', `${response}`,'/admin/manage/all-subsidiaries')
        }
            // var user = users.filter(function (user) {
            //     return user.id == user_id
            // });
            // user = user[0]
            
            
            
            
  
    };

    static async editDepartment (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.query.id;

        console.log('id', id)
        // req.session.user_id = user_id;
        // const users = req.session.users;
        try{
            
            const depts = await viewDept(id, token);

            // var user = users.filter(function (user) {
            //     return user.id == user_id
            // });
            // user = user[0]
            
            console.log("depts", depts.resbody)
            
            res.render('admin/edit-department', {userDetails, depts: depts.resbody})
        } catch(err){
            if (err) console.log('error', err)
        }
  
    };

    static async handleEditDepartment (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.body.id

        const query = {
            name: req.body.name,
            subsidiary_name: req.body.subsidiary_name,
            short_name: req.body.short_name,
            
        }

        console.log('query', query)
        console.log('id', id)
        console.log('token', token)
        try{
            const {result, resbody} = await editDepartment(query, token, id);
            console.log("resbody", resbody)
            if (result.statusCode == '200') {
                resMessageRedirect(res, req, 'success_msg', `You have succesfully edited ${query.name }`,'/admin/manage/all-departments')
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${resbody.response}  ${query.name}`,'/admin/manage/all-departments')
            }
        } catch(err){
            if (err) console.log('error', err)
        }
    }

    static async addDepartment (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        try{
            
            
            
            res.render('admin/add_department', {userDetails})
        } catch(err){
            if (err) console.log('error', err)
        }
  
    };

    static async handleAddDepartment (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        
        const query = {
            name: req.body.name,
            subsidiary: req.body.subsidiary_id,
            
        }

        console.log('query', query)
        console.log('token', token)
        try{
            
            const {result, resbody} = await addDepartment(query, token);
            const response = resbody
            console.log("response", response)
            if (result.statusCode == '200') {
                resMessageRedirect(res, req, 'success_msg', `You have succesfully added ${query.name }`,'/admin/manage/all-departments')
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${response}  ${query.name}`,'/admin/manage/all-departments')
            }
        } catch(err){
            if (err) console.log('error', err)
            resMessageRedirect(res, req, 'error_msg', `${response}`,'/admin/manage/all-departments')
        }
            // var user = users.filter(function (user) {
            //     return user.id == user_id
            // });
            // user = user[0]
            
            
            
            
  
    };

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
            resMessageRedirect(res, req, 'error_msg', 'Something went wrong','/admin/manage/getInActiveUsers')
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
            const data = resbody;

            // var dataApproved = data_request.filter(function (dataApproved){
            //     return dataApproved.upline_approval == 'APPROVED'
            // });
            // var data = dataApproved.filter (function (data) {
            //     return data.driver_admin_approval == 'PENDING'
            // });
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
            
            const subs = await getSubs(token);

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
            
            const subs = await getSubs(token);

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
            const subs = await getSubs(token);
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

    // static async createUsers (req, res) {
    //     const userDetails = req.session.userDetails
    //     const token = userDetails.token
    //     try{
    //         const {result, resbody} = await getUsers(token);
    //         const users = resbody;
    //         req.session.users = resbody;
    //         if (result.statusCode == '200') {
    //             res.render('admin/userUpload' , {userDetails, users});
    //         } else {
    //             resMessageRedirect(res, req, 'error_msg', 'Something went wrong','/admin/manage/createUsers')
    //         }
    //     } catch(err){
    //         if (err) console.log('error', err)
    //     }
  
    // };

    static async createUsers (req, res) {
        const userDetails = req.session.userDetails
        const token = userDetails.token
        try{
            res.render('admin/userUpload' , {userDetails});
            
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
            const subs = await getSubs_createusers();

            console.log('response',subs.resbody)

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

    static async billOfMaterialList (req, res) {
        var userDetails = req.session.userDetails
        const token = userDetails.token;
        
        
        try {

            const {result, resbody} = await getBillOfMaterials(token);
            const materials = resbody
            console.log('materials', materials)
            if (result.statusCode == 200) {
                res.render('admin/billOfMaterialList', {userDetails, materials});
            } else if (result.statusCode == 401){
                req.flash('error_msg', resbody.detail);
                res.redirect('/dashboard')
            }
        }catch(err) {
            if (err) return console.error('Error', err);
            req.flash('error_msg', resbody.detail);
            res.redirect('/dashboard')
        }
         
        };

    static async viewBillOfMaterialList (req, res) {
        var userDetails = req.session.userDetails
        const token = userDetails.token;
        const id = req.query.id;
        console.log('id', id)
        
        try {

            const {result, resbody} = await viewBillOfMaterials(token, id);
            const materials = resbody
            console.log('materials', materials)
            if (result.statusCode == 200) {
                res.render('admin/viewBillOfMaterial', {userDetails, materials});
            } else if (result.statusCode == 401){
                req.flash('error_msg', resbody.detail);
                res.redirect('/dashboard')
            }
        }catch(err) {
            if (err) return console.error('Error', err);
            req.flash('error_msg', resbody.detail);
            res.redirect('/dashboard')
        }
         
        };

    static async updateBillOfMaterials (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.body.id;
        var stringValue = req.body.button;
        var boolValue = stringValue.toLowerCase() == 'true' ? 'APPROVED' : 'DENIED';   //returns true

        const query = {
            name: req.body.name,
            vehicle: req.body.vehicle,
            technician: req.body.technician,
            bu_head_approval: boolValue,
            bu_head_comment: req.body.bu_head_comment,
            bu_head_name: req.body.bu_head_name,
            
        }

        console.log('query', query)
        console.log('id', id)
        console.log('token', token)
        try{
            const {result, resbody} = await updateBillOfMaterials(query, token, id);
            console.log("resbody", resbody)
            if (result.statusCode == '200') {
                if(resbody.bu_head_approval == 'APPROVED') {
                    req.flash('success_msg', 'You have successfully approved a request')
                    res.redirect('/admin/manage/billOfMaterialList');
                } else {
                    req.flash('success_msg', 'You have successfully rejected a request')
                    res.redirect('/admin/manage/billOfMaterialList');
                }
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${resbody.response}  ${query.name}`,'/admin/manage/billOfMaterialList')
            }
        } catch(err){
            if (err) console.log('error', err)
        }
    }


    static async quotationList (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        try {
            const {result, resbody} = await quotationList(token);
            const faults = resbody
            console.log('faults', faults)
            if (result.statusCode == 200) {
                res.render('admin/quotationList', {userDetails, faults});
            } else if (result.statusCode == 401){
                req.flash('error_msg', resbody.detail);
                res.redirect('/admin/dashboard')
            }
        }catch(err) {
            if (err) return console.error('Error', err);
            req.flash('error_msg', resbody.detail);
            res.redirect('/admin/dashboard')
        }

    };

    static async viewQuotation (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.query.id;
        console.log('id', id)
        
        try {
            console.log('id', id)
            const {result, resbody} = await viewQuotation(token, id);
            const materials = resbody
            console.log('materials', materials)
            if (result.statusCode == 200) {
                res.render('admin/viewQuotation', {userDetails, materials});
            } else if (result.statusCode == 401){
                req.flash('error_msg', resbody.detail);
                res.redirect('/admin/dashboard')
            }
        }catch(err) {
            if (err) return console.error('Error', err);
            req.flash('error_msg', resbody.detail);
            res.redirect('/admin/dashboard')
        }

    };

    static async updateQuotation (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.body.id;
        var stringValue = req.body.button;
        var boolValue = stringValue.toLowerCase() == 'true' ? 'APPROVED' : 'DENIED';   //returns true

        const query = {
            fault: req.body.fault,
            payment_type: req.body.payment_type,
            bu_head_approval: boolValue,
            bu_head_comment: req.body.bu_head_comment,
            bu_head_name: req.body.bu_head_name,
            
        }

        console.log('query', query)
        console.log('id', id)
        console.log('token', token)
        try{
            const {result, resbody} = await updateQuotation(query, token, id);
            console.log("resbody", resbody)
            if (result.statusCode == '200') {
                if(resbody.bu_head_approval == 'APPROVED') {
                    req.flash('success_msg', 'You have successfully approved a request')
                    res.redirect('/admin/manage/quotationList');
                } else {
                    req.flash('success_msg', 'You have successfully rejected a request')
                    res.redirect('/admin/manage/quotationList');
                }
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${resbody.response}  ${query.name}`,'/admin/manage/quotationList')
            }
        } catch(err){
            if (err) console.log('error', err)
        }
    }

    static async dieselVendorList (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        try {
            const {result, resbody} = await dieselVendorList(token);
            const diesel = resbody
            console.log('diesel', diesel)
            if (result.statusCode == 200) {
                res.render('admin/dieselVendorList', {userDetails, diesel});
            } else if (result.statusCode == 401){
                req.flash('error_msg', resbody.detail);
                res.redirect('/admin/dashboard')
            }
        }catch(err) {
            if (err) return console.error('Error', err);
            req.flash('error_msg', resbody.detail);
            res.redirect('/admin/dashboard')
        }

    };

    static async dieselRequestQuotationList (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        try {
            const {result, resbody} = await dieselRequestQuotationList(token);
            const diesel = resbody
            console.log('diesel', diesel)
            if (result.statusCode == 200) {
                res.render('admin/dieselRequestQuotationList', {userDetails, diesel});
            } else if (result.statusCode == 401){
                req.flash('error_msg', resbody.detail);
                res.redirect('/admin/dashboard')
            }
        }catch(err) {
            if (err) return console.error('Error', err);
            req.flash('error_msg', resbody.detail);
            res.redirect('/admin/dashboard')
        }

    };

    static async viewDieselRequestQuotation(req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.query.id;
        console.log('id', id)
        
        try {

            const {result, resbody} = await viewDieselRequestQuotation(token, id);
            const diesel = resbody
            console.log('diesel', diesel)
            if (result.statusCode == 200) {
                res.render('admin/viewDieselRequestQuotation', {userDetails, diesel});
            } else if (result.statusCode == 401){
                req.flash('error_msg', resbody.detail);
                res.redirect('/admin/dashboard')
            }
        }catch(err) {
            if (err) return console.error('Error', err);
            req.flash('error_msg', resbody.detail);
            res.redirect('/admin/dashboard')
        }

    };

    static async handleDieselRequestQuotation (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.body.dieselQuotation;

        console.log("id", id)
        
        const query = {
            purpose: req.body.purpose,
            approved_vendor: req.body.approved_vendor,
            admin_status: req.body.admin_status,
            approved_vendor_reason: req.body.approved_vendor_reason,
            admin_name: req.body.admin_name,
            
        }

        console.log('query', query)
        console.log('token', token)
        try{
            
            const {result, resbody} = await updateDieselRequestQuotation(query, token, id);
            const response = resbody
            console.log("response", response)
            if (result.statusCode == '200') {
                resMessageRedirect(res, req, 'success_msg', `You have succesfully updated diesel request quotation`,'/admin/manage/dieselRequestQuotationList')
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${response}  ${query.vehicle}`,'/admin/manage/dieselRequestQuotationList')
            }
        } catch(err){
            if (err) console.log('error', err)
            resMessageRedirect(res, req, 'error_msg', `${response}`,'/admin/dashboard')
        }
            
    };

    static async addGenTechnician (req, res) {
        var userDetails = req.session.userDetails
        res.render('admin/addGenTechnician', {userDetails}) 
        };

    static async handleAddGenTechnician (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        
        const query = {
            company_name: req.body.company_name,
            specialty: req.body.specialty,
            address: req.body.address,
            email: req.body.email,
            registration_number: req.body.registration_number,
            official_phone: req.body.official_phone,
            years_of_experience: req.body.years_of_experience,
            contact_person: req.body.contact_person,
            contact_person_phone: req.body.contact_person_phone,
            
        }

        console.log('query', query)
        console.log('token', token)
        try{
            
            const {result, resbody} = await sendGenServiceCompany(query, token);
            const response = resbody
            console.log("response", response)
            if (result.statusCode == '201') {
                resMessageRedirect(res, req, 'success_msg', `You have succesfully added ${query.company_name }`,'/admin/manage/genTechnicianList')
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${response}  ${query.company_name}`,'/admin/manage/addGenTechnician')
            }
        } catch(err){
            if (err) console.log('error', err)
            resMessageRedirect(res, req, 'error_msg', `${response}`,'/admin/dashboard')
        }
            
    };

    static async addGenerator (req, res) {
        var userDetails = req.session.userDetails
        res.render('admin/addGenerator', {userDetails}) 
        };

    static async handleAddGenerator (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        
        const query = {
            serial_number: req.body.serial_number,
            gen_maker: req.body.gen_maker,
            gen_model: req.body.gen_model,
            location: req.body.location,
            kilowatt_electrical_rating: req.body.kilowatt_electrical_rating,
            kilovoltamp_electrical_rating: req.body.kilovoltamp_electrical_rating,
            installation_date: req.body.installation_date,
            next_servicing: req.body.next_servicing,
            
        }

        console.log('query', query)
        console.log('token', token)
        try{
            
            const {result, resbody} = await sendGenerator(query, token);
            const response = resbody
            console.log("response", response)
            if (result.statusCode == '201') {
                resMessageRedirect(res, req, 'success_msg', `You have succesfully added ${query.gen_maker } ${query.gen_model }`,'/admin/manage/generatorList')
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${response.error}  ${query.gen_maker} ${query.gen_model }`,'/admin/manage/addGenerator')
            }
        } catch(err){
            if (err) console.log('error', err)
            resMessageRedirect(res, req, 'error_msg', `${response.error}`,'/admin/dashboard')
        }
            
    };

    static async generatorList (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        
        try {

            const {result, resbody} = await allGenerator(token);
            const generators = resbody
            console.log('generators', generators)
            if (result.statusCode == 200) {
                res.render('admin/generatorList', {userDetails, generators});
            } else if (result.statusCode == 401){
                req.flash('error_msg', resbody.error);
                res.redirect('/admin/dashboard')
            }
        }catch(err) {
            if (err) return console.error('Error', err);
            req.flash('error_msg', resbody.detail);
            res.redirect('/admin/dashboard')
        }

    };

    static async generatorList_fault (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        
        try {

            const {result, resbody} = await allGenerator(token);
            const generators = resbody
            console.log('generators', generators)
            if (result.statusCode == 200) {
                res.render('admin/generatorList_fault', {userDetails, generators});
            } else if (result.statusCode == 401){
                req.flash('error_msg', resbody.detail);
                res.redirect('/admin/dashboard')
            }
        }catch(err) {
            if (err) return console.error('Error', err);
            req.flash('error_msg', resbody.detail);
            res.redirect('/admin/dashboard')
        }

    };

    static async generator_report (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        
        try {

            
                res.render('admin/generator', {userDetails});
            
        }catch(err) {
            if (err) return console.error('Error', err);
            req.flash('error_msg', resbody.detail);
            res.redirect('/admin/dashboard')
        }

    };

    static async servicingList (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        
        try {

            const {result, resbody} = await vehiclesServicing(token);
            const vehicles = resbody
            console.log('vehicles', vehicles)
            if (result.statusCode == 200) {
                res.render('admin/vehiclesServicing', {userDetails, vehicles});
            } else if (result.statusCode == 401){
                req.flash('error_msg', resbody.detail);
                res.redirect('/admin/dashboard')
            }
        }catch(err) {
            if (err) return console.error('Error', err);
            req.flash('error_msg', resbody.detail);
            res.redirect('/admin/dashboard')
        }

    };

    static async genServiceRequests (req, res) {
        var userDetails = req.session.userDetails
        const token = userDetails.token;
        const id = userDetails.first_name;

        console.log('id',id)
        console.log('token', token)

        try {
            const gens = await allGenerator(token);

            console.log('response',gens.resbody)
            console.log('token',token)

            res.render('admin/genServiceRequest', {userDetails, gens: gens.resbody}); 
        } catch (err) {
            if (err) return console.error('display page details error', err)
        };
         
        };

    static async handleGenServiceRequests (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        
        const query = {
            servicing_reason: req.body.servicing_reason,
            servicing_cost: req.body.servicing_cost,
            generator: req.body.generator,
            servicing_company: req.body.servicing_company,
            requester: req.body.requester,
       }

        console.log('query', query)
        console.log('token', token)
        try{
            
            const {result, resbody} = await sendGenServiceRequest(query, token);
            const response = resbody
            console.log("response", response)
            if (result.statusCode == '200') {
                resMessageRedirect(res, req, 'success_msg', `You have succesfully added a new gen service request, now upload request file`,`/admin/manage/genRequestFiles?id=${response.id}`)
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${response} `,'/admin/manage/genServiceRequests')
            }
        } catch(err){
            if (err) console.log('error', err)
            resMessageRedirect(res, req, 'error_msg', `${response}`,'/admin/dashboard')
        }
            
    };

    static async genServiceRequestList (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        
        try {

            const {result, resbody} = await genServiceRequestList(token);
            const materials = resbody
            console.log('materials', materials)
            if (result.statusCode == 200) {
                res.render('admin/genServiceRequestList', {userDetails, materials});
            } else if (result.statusCode == 401){
                req.flash('error_msg', resbody.detail);
                res.redirect('/admin/dashboard')
            }
        }catch(err) {
            if (err) return console.error('Error', err);
            req.flash('error_msg', resbody.detail);
            res.redirect('/admin/dashboard')
        }

    };


    static async genRequestFiles (req, res) {
        var userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.query.id;

        console.log('id',id)
        console.log('token', token)

        try {
            // const gens = await allGenerator(token);

            // console.log('response',gens.resbody)
            // console.log('token',token)

            res.render('admin/request_files', {userDetails, id}); 
        } catch (err) {
            if (err) return console.error('display page details error', err)
        };
         
        };

    static async handleGenRequestFiles (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        
        
        const query = {
            request_id: req.body.request_id,
            file_name: req.body.file_name,
            description: req.body.description,
            type: req.body.type,
            content: req.body.content,
       }

        console.log('query', query)
        console.log('token', token)
        try{
            
            const {result, resbody} = await sendRequestFiles(query, token);
            const response = resbody
            console.log("response", response)
            if (result.statusCode == '201') {
                resMessageRedirect(res, req, 'success_msg', `You have succesfully added a new gen service request file`,'/admin/manage/genRequestFiles')
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${response} `,'/admin/manage/genRequestFiles')
            }
        } catch(err){
            if (err) console.log('error', err)
            resMessageRedirect(res, req, 'error_msg', `${response}`,'/admin/dashboard')
        }
            
    };

    static async requestFilesList (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        
        try {

            const {result, resbody} = await RequestFiles(token);
            const materials = resbody
            console.log('materials', materials)
            if (result.statusCode == 200) {
                res.render('admin/requestFilesList', {userDetails, materials});
            } else if (result.statusCode == 401){
                req.flash('error_msg', resbody.detail);
                res.redirect('/admin/dashboard')
            }
        }catch(err) {
            if (err) return console.error('Error', err);
            req.flash('error_msg', resbody.detail);
            res.redirect('/admin/dashboard')
        }

    };

    static async genDueServicingList (req, res) {
        var userDetails = req.session.userDetails
        const token = userDetails.token;
        const id = userDetails.first_name;

        console.log('id',id)
        console.log('token', token)

        try {
            const gens = await genDueServiceList(token);

            console.log('response',gens.resbody)
            console.log('token',token)

            res.render('admin/genDueServiceList', {userDetails, gens: gens.resbody}); 
        } catch (err) {
            if (err) return console.error('display page details error', err)
        };
         
        };

    

    static async genServicing (req, res) {
        var userDetails = req.session.userDetails
        const token = userDetails.token;
        const id = userDetails.first_name;

        console.log('id',id)
        console.log('token', token)

        try {
            const gens = await allGenerator(token);

            console.log('response',gens.resbody)
            console.log('token',token)

            res.render('admin/genServicing_facility', {userDetails, gens: gens.resbody}); 
        } catch (err) {
            if (err) return console.error('display page details error', err)
        };
         
        };

    static async handleGenServicing (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        
        
        const query = {
            generator: req.body.generator,
            purpose: req.body.purpose,
            created_by: req.body.created_by,
            servicing_company: req.body.servicing_company,
            servicing_date: req.body.servicing_date,
       }

        console.log('query', query)
        console.log('token', token)
        try{
            
            const {result, resbody} = await genServicing(query, token);
            const response = resbody
            console.log("response", response)
            if (result.statusCode == '201') {
                resMessageRedirect(res, req, 'success_msg', `You have succesfully registered a generator for servicing`,'/admin/manage/genServicing_facility')
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${response} `,'/admin/manage/genServicing_facility')
            }
        } catch(err){
            if (err) console.log('error', err)
            resMessageRedirect(res, req, 'error_msg', `${response}`,'/admin/dashboard')
        }
            
    };

    static async genServicingList (req, res) {
        var userDetails = req.session.userDetails
        const token = userDetails.token;
        const id = userDetails.first_name;

        console.log('id',id)
        console.log('token', token)

        try {
            const gens = await genServiceList(token);

            console.log('response',gens.resbody)
            console.log('token',token)

            res.render('admin/genServiceList', {userDetails, gens: gens.resbody}); 
        } catch (err) {
            if (err) return console.error('display page details error', err)
        };
         
        };

        static async genServiceCompanyList (req, res) {
            const userDetails = req.session.userDetails;
            const token = userDetails.token;
            
            
            try {
    
                const {result, resbody} = await genServiceCompanyList(token);
                const gen_tech = resbody
                console.log('gen_tech', gen_tech)
                if (result.statusCode == 200) {
                    res.render('admin/genServiceCompany', {userDetails, gen_tech});
                } else if (result.statusCode == 401){
                    req.flash('error_msg', resbody.detail);
                    res.redirect('/admin/dashboard')
                }
            }catch(err) {
                if (err) return console.error('Error', err);
                req.flash('error_msg', resbody.detail);
                res.redirect('/admin/dashboard')
            }
    
        };
    
        static async genServiceCompanyList_sla (req, res) {
            const userDetails = req.session.userDetails;
            const token = userDetails.token;
            
            
            try {
    
                const {result, resbody} = await genServiceCompanyList(token);
                const gen_tech = resbody
                console.log('gen_tech', gen_tech)
                if (result.statusCode == 200) {
                    res.render('admin/genServiceCompany_sla', {userDetails, gen_tech});
                } else if (result.statusCode == 401){
                    req.flash('error_msg', resbody.detail);
                    res.redirect('/admin/dashboard')
                }
            }catch(err) {
                if (err) return console.error('Error', err);
                req.flash('error_msg', resbody.detail);
                res.redirect('/dashboard')
            }
    
        };
    
        static async genDailyTotalConsumption (req, res) {
            var userDetails = req.session.userDetails
            res.render('admin/genDailyConsumption', {userDetails}) 
            };
    
        static async genDailyMaintenance (req, res) {
            var userDetails = req.session.userDetails
            
    
            const generator = req.query.id;
                req.session.generator = generator;
                console.log('generator', req.session.generator)
    
            res.render('admin/genDailyMaintenance', {userDetails}) 
            };
    
        static async handleGenDailyMaintenance (req, res) {
            var userDetails = req.session.userDetails
            const token = userDetails.token;
            const generator = req.session.generator;
            
            
            const query = {
                generator: generator,
                gen_time_on: req.body.gen_time_on,
                gen_time_off: req.body.gen_time_off,
                phcn_time_on: req.body.phcn_time_on,
                phcn_time_off: req.body.phcn_time_off,
                
            }
    
            console.log('query', query)
            console.log('token', token)
            try{
                
                
                const {result, resbody} = await sendGenDailyMaintenance(query, token);
                const response = resbody
                console.log("response", response)
                if (result.statusCode == '201') {
                    resMessageRedirect(res, req, 'success_msg', `You have succesfully added to the generator daily maintenance`,'/admin/manage/genDailyMaintenance')
                } else {
                    resMessageRedirect(res, req, 'error_msg', ` error, contact`,'/admin/manage/genDailyMaintenance')
                }
            } catch(err){
                if (err) console.log('error', err)
                resMessageRedirect(res, req, 'error_msg', `${response}`,'/admin/dashboard')
            }
        };

    static async genFaultReport (req, res) {
        var userDetails = req.session.userDetails
        

        const generator = req.query.id;
            req.session.generator = generator;
            console.log('generator', req.session.generator)

        res.render('admin/genFaultReport', {userDetails}) 
        };

    static async handleGenFaultReport (req, res) {
        var userDetails = req.session.userDetails
        const token = userDetails.token;
        const generator = req.session.generator;
        
        
        const query = {
            generator: generator,
            faulty_part: req.body.faulty_part,
            reason: req.body.reason,
            description: req.body.description,
            created_by: req.body.created_by,
            
            
        }

        console.log('query', query)
        console.log('token', token)
        try{
            
            
            const {result, resbody} = await sendGenFaults(query, token);
            const response = resbody
            console.log("response", response)
            if (result.statusCode == '201') {
                resMessageRedirect(res, req, 'success_msg', `You have succesfully submitted a generator fault`,'/admin/manage/genFaultList')
            } else {
                resMessageRedirect(res, req, 'error_msg', ` error, contact`,'/admin/manage/genFaultReport')
            }
        } catch(err){
            if (err) console.log('error', err)
            resMessageRedirect(res, req, 'error_msg', `${response}`,'/admin/dashboard')
        }
    };

    static async genFaultList (req, res) {
        var userDetails = req.session.userDetails
        const token = userDetails.token;

        try {
            const gens = await genFaultList(token);

            console.log('response',gens.resbody)
            console.log('token',token)

            res.render('admin/genFaultList', {userDetails, gens: gens.resbody}); 
        } catch (err) {
            if (err) return console.error('display page details error', err)
        };
          
        };

    static async gen_repairs (req, res) {
        var userDetails = req.session.userDetails
        const token = userDetails.token;
        const id = req.query.id;

        try {
            const slas = await genSlaList(token);

            console.log('response',slas.resbody)
            console.log('token',token)

            res.render('admin/gen_repairs', {userDetails, slas: slas.resbody, id}); 
        } catch (err) {
            if (err) return console.error('display page details error', err)
        };
         
        };

        static async genSLA (req, res) {
            var userDetails = req.session.userDetails;
            const token = userDetails.token;
            const id = req.query.id;
    
            console.log('id',id)
            console.log('token', token)
    
            try {
                // const gens = await allGenerator(token);
    
                // console.log('response',gens.resbody)
                // console.log('token',token)
    
                res.render('admin/sLA', {userDetails, id}); 
            } catch (err) {
                if (err) return console.error('display page details error', err)
            };
             
            };

        static async phcn (req, res) {
            var userDetails = req.session.userDetails;
            const token = userDetails.token;
            const id = req.query.id;
    
            console.log('id',id)
            console.log('token', token)
    
            try {
                // const gens = await allGenerator(token);
    
                // console.log('response',gens.resbody)
                // console.log('token',token)
    
                res.render('admin/phcn', {userDetails, id}); 
            } catch (err) {
                if (err) return console.error('display page details error', err)
            };
             
            };

        static async diesel (req, res) {
            var userDetails = req.session.userDetails;
            const token = userDetails.token;
            const id = req.query.id;
    
            console.log('id',id)
            console.log('token', token)
    
            try {
                // const gens = await allGenerator(token);
    
                // console.log('response',gens.resbody)
                // console.log('token',token)
    
                res.render('admin/diesel', {userDetails, id}); 
            } catch (err) {
                if (err) return console.error('display page details error', err)
            };
             
            };

        static async gen_repair_report (req, res) {
            var userDetails = req.session.userDetails;
            const token = userDetails.token;
            const id = req.query.id;
    
            console.log('id',id)
            console.log('token', token)
    
            try {
                // const gens = await allGenerator(token);
    
                // console.log('response',gens.resbody)
                // console.log('token',token)
    
                res.render('admin/generators_repair_report', {userDetails, id}); 
            } catch (err) {
                if (err) return console.error('display page details error', err)
            };
             
            };

        static async gen_daily_maintenance (req, res) {
            var userDetails = req.session.userDetails;
            const token = userDetails.token;
            const id = req.query.id;
    
            console.log('id',id)
            console.log('token', token)
    
            try {
                // const gens = await allGenerator(token);
    
                // console.log('response',gens.resbody)
                // console.log('token',token)
    
                res.render('admin/generator_daily_maintenance', {userDetails, id}); 
            } catch (err) {
                if (err) return console.error('display page details error', err)
            };
             
            };
    
        static async handleGenSLA (req, res) {
            const userDetails = req.session.userDetails;
            const token = userDetails.token;
            
            
            const query = {
                company: req.body.company,
                description: req.body.description,
                hq_sla_in_hrs: req.body.hq_sla_in_hrs,
                opening_time: req.body.opening_time,
                closing_time: req.body.closing_time,
                weekend_opening_time: req.body.weekend_opening_time,
                weekend_closing_time: req.body.weekend_closing_time,
                others_sla_in_hrs: req.body.others_sla_in_hrs,
                status: req.body.status,
                weekend_support_active: req.body.weekend_support_active,
                is_public_holiday: req.body.is_public_holiday,
                amount: req.body.amount,
                duration: req.body.duration,
                expiration: req.body.expiration,
                created_by: req.body.created_by,
                
                
            }
    
            console.log('query', query)
            console.log('token', token)
            try{
                
                const {result, resbody} = await sendGenSla(query, token);
                const response = resbody
                console.log("response", response)
                if (result.statusCode == '201') {
                    resMessageRedirect(res, req, 'success_msg', `You have succesfully added sla, pls upload sla document`,`/admin/manage/genSLA_file?id=${response.id}`)
                } else {
                    resMessageRedirect(res, req, 'error_msg', ` ${response.company}`,'/admin/manage/genSLA')
                }
            } catch(err){
                if (err) console.log('error', err)
                resMessageRedirect(res, req, 'error_msg', `${response}`,'/admin/dashboard')
            }
                
        };
    
        static async genSLA_list (req, res) {
            const userDetails = req.session.userDetails;
            const token = userDetails.token;
            
            
            try {
    
                const {result, resbody} = await genSlaList(token);
                const materials = resbody
                console.log('materials', materials)
                if (result.statusCode == 200) {
                    res.render('admin/sLA_list', {userDetails, materials});
                } else if (result.statusCode == 401){
                    req.flash('error_msg', resbody.detail);
                    res.redirect('/admin/dashboard')
                }
            }catch(err) {
                if (err) return console.error('Error', err);
                req.flash('error_msg', resbody.detail);
                res.redirect('/admin/dashboard')
            }
    
        };

        static async genSLA_file (req, res) {
            const userDetails = req.session.userDetails;
            const token = userDetails.token;
            const id = req.query.id;
            
            
            try {
    
                const {result, resbody} = await updateSLA(token, id);
                const slas = resbody
                console.log('slas', slas)
                if (result.statusCode == 200) {
                    res.render('admin/sLA_file', {userDetails, slas});
                } else if (result.statusCode == 401){
                    req.flash('error_msg', resbody.detail);
                    res.redirect('/admin/dashboard')
                }
            }catch(err) {
                if (err) return console.error('Error', err);
                req.flash('error_msg', resbody.detail);
                res.redirect('/admin/dashboard')
            }
    
        };

    static async handleGen_repairs (req, res) {
        var userDetails = req.session.userDetails
        const token = userDetails.token;
        
        var query 
        if (req.body.within_sla == 'true') { 
            query = {
                fault: req.body.fault,
                severity: req.body.severity,
                servicing_company: req.body.servicing_company,
                within_sla: req.body.within_sla,
                sla: req.body.sla,
                created_by: req.body.created_by,
            
            
        }

        

        console.log('query', query)
        console.log('token', token)
        try{
            
            
            const {result, resbody} = await sendGenRepair(query, token);
            const response = resbody
            console.log("response", response)
            if (result.statusCode == '201') {
                resMessageRedirect(res, req, 'success_msg', `You have succesfully updated fault, now create gen repair status`,`/admin/manage/gen_repairStatus?id=${response.id}`)
            } else {
                resMessageRedirect(res, req, 'error_msg', ` error, contact`,'/admin/manage/gen_repairList')
            }
        } catch(err){
            if (err) console.log('error', err)
            resMessageRedirect(res, req, 'error_msg', `${response}`,'/admin/dashboard')
        }

    } else{
        query = {
            fault: req.body.fault,
            severity: req.body.severity,
            servicing_company: req.body.servicing_company,
            within_sla: req.body.within_sla,
            created_by: req.body.created_by,
        
        
    }
    
    console.log('query', query)
        console.log('token', token)
        try{
            
            
            const {result, resbody} = await sendGenRepair(query, token);
            const response = resbody
            console.log("response", response)
            if (result.statusCode == '201') {
                resMessageRedirect(res, req, 'success_msg', `You have succesfully updated repair, pls upload paid repair document`,`/admin/manage/gen_paidRepair?id=${response.id}`)
            } else {
                resMessageRedirect(res, req, 'error_msg', ` error, contact`,'/admin/manage/gen_repair')
            }
        } catch(err){
            if (err) console.log('error', err)
            resMessageRedirect(res, req, 'error_msg', `${response}`,'/admin/dashboard')
        }

    }
    };



    static async gen_repairList (req, res) {
        var userDetails = req.session.userDetails
        const token = userDetails.token;

        try {
            const gens = await gen_repairList(token);

            console.log('response',gens.resbody)
            console.log('token',token)

            res.render('admin/gen_repairList', {userDetails, gens: gens.resbody}); 
        } catch (err) {
            if (err) return console.error('display page details error', err)
        };
          
        };

    static async genPaidRepair (req, res) {
        var userDetails = req.session.userDetails
        var token = userDetails.token
        var id = req.query.id
        
        try{
            const {result, resbody} = await viewGenRepair(token, id);
            const repairs = resbody
            const repair = req.query.id;            
            console.log('repair', req.query.id)
            console.log('repairs', repairs)
            if (result.statusCode == 200) {
                res.render('admin/paid_repair', {userDetails, repairs,repair});
            } else if (result.statusCode == 401){
                req.flash('error_msg', resbody.detail);
                res.redirect('/admin/dashboard')
            }
        }catch(err) {
            if (err) return console.error('Error', err);
            req.flash('error_msg', resbody.detail);
            res.redirect('/admin/dashboard')
        } 
        };

        static async paidRepair_list (req, res) {
            const userDetails = req.session.userDetails;
            const token = userDetails.token;
            
            
            try {
    
                const {result, resbody} = await paid_repairList(token);
                const materials = resbody
                console.log('materials', materials)
                if (result.statusCode == 200) {
                    res.render('admin/paid_repairList', {userDetails, materials});
                } else if (result.statusCode == 401){
                    req.flash('error_msg', resbody.detail);
                    res.redirect('/admin/dashboard')
                }
            }catch(err) {
                if (err) return console.error('Error', err);
                req.flash('error_msg', resbody.detail);
                res.redirect('/admin/dashboard')
            }
    
        };

    static async genRepairStatus (req, res) {
        var userDetails = req.session.userDetails
        var token = userDetails.token
        var id = req.query.id
         
            try{
                const {result, resbody} = await viewGenRepair(token, id);
                const repairs = resbody
                const repair = req.query.id;            
                console.log('repair', req.query.id)
                console.log('repairs', repairs)
                if (result.statusCode == 200) {
                    res.render('admin/genRepairStatus', {userDetails,repairs,repair});
                } else if (result.statusCode == 401){
                    req.flash('error_msg', resbody.detail);
                    res.redirect('/admin/dashboard')
                }
            }catch(err) {
                if (err) return console.error('Error', err);
                req.flash('error_msg', resbody.detail);
                res.redirect('/admin/dashboard')
            }
 
        };

    static async handleGenRepairStatus (req, res) {
        var userDetails = req.session.userDetails
        const token = userDetails.token;
        
        
        
        const query = {
            repair: req.body.repair,
            generator_condition: req.body.generator_condition,
            status_comment: req.body.status_comment,
            created_by: req.body.created_by,
            
            
        }

        console.log('query', query)
        console.log('token', token)
        try{
            
            
            const {result, resbody} = await sendGenRepairStatus(query, token);
            const response = resbody
            console.log("response", response)
            if (result.statusCode == '201') {
                resMessageRedirect(res, req, 'success_msg', `You have succesfully submitted a generator repair status`,'/admin/manage/gen_repairList')
            } else {
                resMessageRedirect(res, req, 'error_msg', ` error, contact`,'/admin/manage/gen_repairList')
            }
        } catch(err){
            if (err) console.log('error', err)
            resMessageRedirect(res, req, 'error_msg', `${response}`,'/admin/dashboard')
        }
    };

    static async genRepairStatusList (req, res) {
        var userDetails = req.session.userDetails
        const token = userDetails.token;

        try {
            const gens = await genRepairStatusList(token);

            console.log('response',gens.resbody)
            console.log('token',token)

            res.render('admin/genRepairStatusList', {userDetails, gens: gens.resbody}); 
        } catch (err) {
            if (err) return console.error('display page details error', err)
        };
          
    };

    static async viewGenRepairStatus (req, res) {
        var userDetails = req.session.userDetails
        var token = userDetails.token
        var id = req.query.id
         
            try{
                const {result, resbody} = await viewGenRepairStatus(token, id);
                const repairs = resbody
                const repair = req.query.id;            
                console.log('repair', req.query.id)
                console.log('repairs', repairs)
                if (result.statusCode == 200) {
                    res.render('admin/viewGenRepairStatus', {userDetails,repairs,repair});
                } else if (result.statusCode == 401){
                    req.flash('error_msg', resbody.detail);
                    res.redirect('/admin/dashboard')
                }
            }catch(err) {
                if (err) return console.error('Error', err);
                req.flash('error_msg', resbody.detail);
                res.redirect('/admin/dashboard')
            }
 
        };

    static async genMaintenance (req, res) {
        var userDetails = req.session.userDetails
        

        const generator = req.query.id;
            req.session.generator = generator;
            console.log('generator', req.session.generator)

        res.render('admin/genMaintenance', {userDetails}) 
        };

    static async handleGenMaintenance (req, res) {
        var userDetails = req.session.userDetails
        const token = userDetails.token;
        const generator = req.session.generator;
        
        
        const query = {
            generator: parseInt(generator),
            check_switch_breaker_position: req.body.check_switch_breaker_position,
            fuel_level: req.body.fuel_level,
            oil_level: req.body.oil_level,
            coolant_level: req.body.coolant_level,
            air_filter: req.body.air_filter,
            battery_voltage_physical_condition: req.body.battery_voltage_physical_condition,
            fan_belt: req.body.fan_belt,
            battery_resistance: req.body.battery_resistance,
            cleaning_unit_exterior: req.body.cleaning_unit_exterior,
            fuel_cleaning: req.body.fuel_cleaning,
            oil_change: req.body.oil_change,
            
        }

        console.log('query', query)
        console.log('token', token)
        try{
            
            
            const {result, resbody} = await sendMaintenance(query, token);
            const response = resbody
            console.log("response", response)
            if (result.statusCode == '201') {
                resMessageRedirect(res, req, 'success_msg', `You have succesfully added to the generator daily maintenance`,'/admin/manage/genMaintenanceList')
            } else {
                resMessageRedirect(res, req, 'error_msg', ` error, contact`,'/admin/manage/genMaintenance')
            }
        } catch(err){
            if (err) console.log('error', err)
            resMessageRedirect(res, req, 'error_msg', `${response}`,'/admin/dashboard')
        }
    };

    static async allGenMaintenanceList (req, res) {
        var userDetails = req.session.userDetails
        const token = userDetails.token;

        try {
            const gens = await genMaintenanceList(token);

            console.log('response',gens.resbody)
            console.log('token',token)

            res.render('admin/genMaintenanceList', {userDetails, gens: gens.resbody}); 
        } catch (err) {
            if (err) return console.error('display page details error', err)
        };
          
        };

    static async allGenDailyMaintenanceList (req, res) {
        var userDetails = req.session.userDetails
        const token = userDetails.token;

        try {
            const gens = await genDailyMaintenanceList(token);

            console.log('response',gens.resbody)
            console.log('token',token)

            res.render('admin/genDailyMaintenanceList', {userDetails, gens: gens.resbody}); 
        } catch (err) {
            if (err) return console.error('display page details error', err)
        };
          
        };

    static async viewPurchaseOrder(req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.query.id;
        console.log('id', id)
        
        try {

            const {result, resbody} = await viewDieselRequestQuotation(token, id);
            const diesel = resbody
            console.log('diesel', diesel)
            if (result.statusCode == 200) {
                res.render('admin/purchaseOrder', {userDetails, diesel});
            } else if (result.statusCode == 401){
                req.flash('error_msg', resbody.detail);
                res.redirect('/admin/dashboard')
            }
        }catch(err) {
            if (err) return console.error('Error', err);
            req.flash('error_msg', resbody.detail);
            res.redirect('/admin/dashboard')
        }

    };

    static async handlePurchaseOrder (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.body.request_quotation;

        console.log("id", id)
        
        const query = {
            request_quotation: parseInt(req.body.request_quotation),
            liters: parseInt(req.body.liters),
            created_by: req.body.created_by,
            delivery_date: req.body.delivery_date,
            delivery_destination: req.body.delivery_destination,
           
            
        }

        console.log('query', query)
        console.log('token', token)
        try{
            
            const {result, resbody} = await handlePurchaseOrder(query, token);
            const response = resbody
            console.log("response", response)
            var response_id = response.id
            if (result.statusCode == '201') {
                resMessageRedirect(res, req, 'success_msg', `You have succesfully created a purchase order, upload document next`,`/admin/manage/purchaseOrderFile?id=${response_id}`)
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${response.request_quotation} `,'/admin/manage/dieselRequestQuotationList')
            }
        } catch(err){
            if (err) console.log('error', err)
            resMessageRedirect(res, req, 'error_msg', `${response}`,'/admin/dashboard')
        }
            
    };

    static async purchaseOrderList (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        try {
            const {result, resbody} = await purchaseOrderList(token);
            const purchase = resbody
            console.log('purchase', purchase)
            if (result.statusCode == 200) {
                res.render('admin/purchaseOrderList', {userDetails, purchase});
            } else if (result.statusCode == 401){
                req.flash('error_msg', resbody.detail);
                res.redirect('/admin/dashboard')
            }
        }catch(err) {
            if (err) return console.error('Error', err);
            req.flash('error_msg', resbody.detail);
            res.redirect('/admin/dashboard')
        }

    };

    static async viewPurchaseOrderFile(req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.query.id;
        console.log('id', id)
        
        try {

            const {result, resbody} = await viewPurchaseOrder(token, id);
            const purchase = resbody
            console.log('purchase', purchase)
            if (result.statusCode == 200) {
                res.render('admin/purchaseOrderFile', {userDetails, purchase});
            } else if (result.statusCode == 401){
                req.flash('error_msg', resbody.detail);
                res.redirect('/admin/dashboard')
            }
        }catch(err) {
            if (err) return console.error('Error', err);
            req.flash('error_msg', resbody.detail);
            res.redirect('/admin/dashboard')
        }

    };
    static async dieselUsageList (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        try {
            const {result, resbody} = await dieselUsageList(token);
            const diesel = resbody
            console.log('diesel', diesel)
            if (result.statusCode == 200) {
                res.render('admin/dieselUsageList', {userDetails, diesel});
            } else if (result.statusCode == 401){
                req.flash('error_msg', resbody.detail);
                res.redirect('/admin/dashboard')
            }
        }catch(err) {
            if (err) return console.error('Error', err);
            req.flash('error_msg', resbody.detail);
            res.redirect('/admin/dashboard')
        }

    };

    static async AllPhcnBill (req, res) {
        var userDetails = req.session.userDetails
        const token = userDetails.token;

        try {
            const {result, resbody} = await phcnBillList(token);
            const gen = resbody
            console.log('phcn', gen)
            console.log('token',token)

            var gens = gen.filter(function (data) {
                return data.admin_approval != 'DENIED' // need to come back to this to populate the feilds with the data about the users
            });

            res.render('admin/phcnBillList', {userDetails, gens}); 
        } catch (err) {
            if (err) return console.error('display page details error', err)
        };
          
        };

    static async viewPhcnBill (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.query.id;
        console.log('id', id)
        
        try {

            const {result, resbody} = await viewPhcnBill(token, id);
            const phcn = resbody
            console.log('phcn', phcn)
            if (result.statusCode == 200) {
                res.render('admin/viewPhcnBill', {userDetails, phcn});
            } else if (result.statusCode == 401){
                req.flash('error_msg', resbody.detail);
                res.redirect('/admin/dashboard')
            }
        }catch(err) {
            if (err) return console.error('Error', err);
            req.flash('error_msg', resbody.detail);
            res.redirect('/admin/dashboard')
        }

    };

    static async updatePhcnBill (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.query.id;
        console.log('id', id)
        
        try {

            const {result, resbody} = await viewPhcnBill(token, id);
            const phcn = resbody
            console.log("phcn", phcn)
            if (result.statusCode == 200) {
                res.render('admin/updateBill_driverAdmin', {userDetails, phcn});
            } else if (result.statusCode == 401){
                req.flash('error_msg', resbody.detail);
                res.redirect('/admin/dashboard')
            }
        }catch(err) {
            if (err) return console.error('Error', err);
            req.flash('error_msg', resbody.detail);
            res.redirect('/admin/dashboard')
        }

    };

    static async handlePhcnBill_driverAdmin (req, res) {
        var userDetails = req.session.userDetails
        const token = userDetails.token;
        const id = req.body.id;
        var stringValue = req.body.button;
        var boolValue = stringValue.toLowerCase() == 'true' ? 'APPROVED' : 'DENIED';   //returns true
        
        
        const query = {
            vat: req.body.vat,
            unit_consumed: req.body.unit_consumed,
            amount_due: req.body.amount_due,
            consumption_rate: req.body.consumption_rate,
            admin_approval: boolValue,
            admin_comment: req.body.admin_comment,
            admin_name: req.body.admin_name,
            
        }

        console.log('query', query)
        console.log('token', token)
        try{
            
            
            const {result, resbody} = await updatePhcnBill(query, token, id);
            const response = resbody
            console.log('status', result.statusCode)
            console.log("response", response)
            if (result.statusCode == '200') {
                if(resbody.admin_approval == 'APPROVED') {
                    req.flash('success_msg', `You have successfully approved phcn bill`)
                    res.redirect('/admin/manage/phcnBillList');
                } else {
                    req.flash('success_msg', 'You have successfully rejected bill payment')
                    res.redirect('/admin/manage/phcnBillList');
                }
                
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${response.bill}`,'/admin/manage/phcnBillList')
            }
        } catch(err){
            if (err) console.log('error', err)
            resMessageRedirect(res, req, 'error_msg', `${response.error}`,'/admin/dashboard')
        }
    };


    static async phcnBill_driverAdmin (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.query.id;
        console.log('id', id)
        
        try {

            const {result, resbody} = await viewPhcnBill(token, id);
            const phcn = resbody
            console.log('phcn', phcn)
            if (result.statusCode == 200) {
                res.render('admin/phcnPayments_driverAdmin.ejs', {userDetails, phcn});
            } else if (result.statusCode == 401){
                req.flash('error_msg', resbody.detail);
                res.redirect('/admin/dashboard')
            }
        }catch(err) {
            if (err) return console.error('Error', err);
            req.flash('error_msg', resbody.detail);
            res.redirect('/admin/dashboard')
        }

    };

    static async handlePhcnBillPayment_driverAdmin (req, res) {
        var userDetails = req.session.userDetails
        const token = userDetails.token;
        
        
        
        const query = {
            bill: req.body.bill,
            created_by: req.body.created_by,
             
            
        }

        console.log('query', query)
        console.log('token', token)
        try{
            
            
            const {result, resbody} = await sendPhcnBillPayment(query, token);
            const response = resbody
            
            if (result.statusCode == '201') {
                resMessageRedirect(res, req, 'success_msg', `You have successfully created payment slip`,'/admin/manage/AllPhcnBillPayment')
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${response.bill}`,'/admin/manage/phcnBillList')
            }
        } catch(err){
            if (err) console.log('error', err)
            resMessageRedirect(res, req, 'error_msg', `${response.error}`,'/admin/dashboard')
        }
    };

    static async AllPhcnBillPayment (req, res) {
        var userDetails = req.session.userDetails
        const token = userDetails.token;

        try {
            const gens = await phcnBillPaymentList(token);

            
            console.log('token',token)

            res.render('admin/phcnBillPaymentList_driverAdmin', {userDetails, gens: gens.resbody}); 
        } catch (err) {
            if (err) return console.error('display page details error', err)
        };
          
        };

    static async viewBillPayment_driverAdmin (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.query.id;
        console.log('id', id)
        
        try {

            const {result, resbody} = await viewPhcnBillPayment(token, id);
            const phcn = resbody
            console.log('phcn', phcn)
            if (result.statusCode == 200) {
                res.render('admin/billPaymentApproval_driverAdmin', {userDetails, phcn});
            } else if (result.statusCode == 401){
                req.flash('error_msg', resbody.detail);
                res.redirect('/admin/dashboard')
            }
        }catch(err) {
            if (err) return console.error('Error', err);
            req.flash('error_msg', resbody.detail);
            res.redirect('/admin/dashboard')
        }

    };

    static async updateViewBillPayment_driverAdmin (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.body.id;
        var stringValue = req.body.button;
        var boolValue = stringValue.toLowerCase() == 'true' ? 'APPROVED' : 'DENIED';   //returns true

        const query = {
            bill: req.body.bill,
            admin_approval: boolValue,
            admin_comment: req.body.admin_comment,
            admin_name: req.body.admin_name,
            
            
        }

        console.log('query', query)
        console.log('id', id)
        console.log('token', token)
        try{
            const {result, resbody} = await updatePhcnBillPayment(query, token, id);
            console.log("resbody", resbody)
            if (result.statusCode == '200') {
                if(resbody.admin_approval == 'APPROVED') {
                    req.flash('success_msg', 'You have successfully approved bill payment...awaiting auditor and finance approval')
                    res.redirect('/admin/manage/AllPhcnBillPayment');
                } else {
                    req.flash('success_msg', 'You have successfully rejected bill payment')
                    res.redirect('/admin/manage/AllPhcnBillPayment');
                }
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${resbody.error} `,'/admin/manage/AllPhcnBillPayment')
            }
        } catch(err){
            if (err) console.log('error', err)
        }
    }

    static async allPhcnDailyReading_driverAdmin (req, res) {
        var userDetails = req.session.userDetails
        const token = userDetails.token;

        try {
            const gens = await phcnDailyReadingList(token);

            
            console.log('token',token)

            res.render('admin/phcnDailyReadingList_driverAdmin', {userDetails, gens: gens.resbody}); 
        } catch (err) {
            if (err) return console.error('display page details error', err)
        };
          
        };
}

module.exports = admin_manage_controllers