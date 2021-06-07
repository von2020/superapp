const  {facilities_queries} = require('../queries/index');
const {} = require('../utils/query_util');
const {resMessageRedirect} = require('../utils/reusables');
// var FormData = require('form-data');
// var fs = require('fs')

//store the list of the queries
const {
    sendRequest,
    getDrivers,
    allVehicle,
    updateVehicle,
    tripList,
    sendFaults,
    sendTechnician,
    vehiclesServicing,
    sendGenerator,
    sendGenRepair,
    allGenerator,
    driverInfo,
    genServiceCompanyList,
    sendGenServiceCompany,
    sendGenServiceRequest,
    genServiceRequestList,
    sendGenFaults,
    genFaultList,
    genSlaList,
    updateSLA,
    sendMaintenance,
    genMaintenanceList,
    sendRequestFiles,
    RequestFiles,
    genDueServiceList,
    genServicing,
    genServiceList,
    viewGenService,
    updateGenService,
    updatePhcnBill,
    sendPhcnBill,
    phcnBillList,
    sendPhcnBillPayment,
    viewPhcnBill,
    phcnBillPaymentList,
    viewPhcnBillPayment,
    updatePhcnBillPayment,
    sendPhcnDailyMeterReading,
    phcnDailyReadingList,
    carTechnicianList,
    updateFault,
    updateCarFault,
    quotationList,
    viewQuotation,
    updateQuotation,
    repairQueue,
    repairStatus,
    viewRepairQueue,
    repairQueueList,
    updateRepairQueue,
    updateRepairStatus_driver,
    genRepairStatusList,
    dieselUsageList,
    handleDieselVendor,
    dieselVendorList,
    dieselRequestQuotationList,
    viewDieselRequestQuotation,
    updateDieselRequestQuotation,
    handlePurchaseOrder,
    purchaseOrderList,
    viewPurchaseOrder,
    updatePurchaseOrder,
    sendBillOfMaterial,
    getBillOfMaterials,
    viewBillOfMaterials,
    servicingQueue,
    servicingStatus,
    sendGenSla,
    gen_repairList,
    paid_repairList,
    viewPaid_repair,
    updatePaidRepair,
    sendGenRepairStatus,
    repairStatusList,
    updateGenRepairStatus,
    viewGenRepairStatus,
    carServiceStatusList,
    viewServicingStatus,
    updateServicingStatus,
    viewRepairStatus,
    servicingQueueList,
    tripDistance,
    vehicleDistance,
    viewVehicle,
    viewservicingQueue,
    updateServicingQueue,
    carFaultList,
    carFaultList_driver,
    sendGenDailyMaintenance,
    genDailyMaintenanceList,
    listVehicle
} = facilities_queries;

class Facilities {

    //this is to render the page to add a vehicle
    static async addVehicle (req, res) {
        const userDetails = req.session.userDetails
        // come back to think about this cause there's no where else to redirect this thing to
        try{
            const {result, resbody} = await getDrivers();
            if (result.statusCode == '200') {
                const drivers = resbody
                res.render('addVehicle', {userDetails, drivers})
            } else {
                console.log('Not getting drivers')
            }
        } catch(err){
            if (err) console.log('error', err)
        }
    };

    static async servicingQueue (req, res) {
        const userDetails = req.session.userDetails
        const token = userDetails.token;
        
        var query;
        if (req.body.payment_type == 'yes') {
        query = {
            bill_of_material: req.body.bill_of_material,
            location: req.body.location,
            created_by: req.body.created_by,
            servicing_date: req.body.servicing_date,
            
        }
    

        console.log('query', query)
        console.log('token', token)
        try{
            
            const {result, resbody} = await servicingQueue(query, token);
            const response = resbody
            // console.log("response", response)
            if (result.statusCode == '201') {
                resMessageRedirect(res, req, 'success_msg', `You have succesfully added vehicle to servicing queue, you need to upload invoice`,`/facilities/viewAdvanceServicingInvoice?id=${response.id}`)
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${response}  `,'/facilities/allBillOfMaterials')
            }
        } catch(err){
            if (err) console.log('error', err)
            resMessageRedirect(res, req, 'error_msg', `${response}`,'/dashboard')
        }
    } else{
        query = {
            bill_of_material: req.body.bill_of_material,
            location: req.body.location,
            created_by: req.body.created_by,
            servicing_date: req.body.servicing_date,
            
        }
    

        console.log('query', query)
        console.log('token', token)
        try{
            
            const {result, resbody} = await servicingQueue(query, token);
            const response = resbody
            // console.log("response", response)
            if (result.statusCode == '201') {
                resMessageRedirect(res, req, 'success_msg', `You have succesfully added vehicle to servicing queue, you need to upload invoice`,`/facilities/viewServicingInvoice?id=${response.id}`)
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${response}  `,'/facilities/allBillOfMaterials')
            }
        } catch(err){
            if (err) console.log('error', err)
            resMessageRedirect(res, req, 'error_msg', `${response}`,'/dashboard')
        }
    }
    };

    static async servicingQueueList (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        try {
            const {result, resbody} = await servicingQueueList(token);
            const vehicles = resbody
            
            if (result.statusCode == 200) {
                res.render('queueList_driverAdmin', {userDetails, vehicles});
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

    static async servicingQueueList_Auditor (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        try {
            const {result, resbody} = await servicingQueueList(token);
            const vehicle = resbody
            // console.log('vehicles', vehicle)

            var vehicles = vehicle.filter(function (data) {
                return data.auditor_advance_approval != 'DENIED' && data.auditor_balance_approval != 'DENIED' // need to come back to this to populate the feilds with the data about the users
            });
            

            if (result.statusCode == 200) {
                res.render('queueServiceList_Auditor', {userDetails, vehicles});
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

    static async tripDistanceList (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        try {
            const {result, resbody} = await tripDistance(token);
            const vehicles = resbody
            console.log('vehicles', vehicles)
            if (result.statusCode == 200) {
                res.render('tripDistanceList', {userDetails, vehicles});
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

    static async vehicleDistanceList (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        try {
            const {result, resbody} = await vehicleDistance(token);
            const vehicles = resbody
            console.log('vehicles', vehicles)
            if (result.statusCode == 200) {
                res.render('vehicleDistanceList', {userDetails, vehicles});
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

    static async viewservicingQueue (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.query.id;
        console.log('id', id)
        
        try {

            const {result, resbody} = await viewservicingQueue(token, id);
            const queues = resbody
            console.log('queues', queues)
            if (result.statusCode == 200) {
                res.render('viewServiceQueue_driverAdmin', {userDetails, queues});
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

    static async updateServicingQueue_driveradmin (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.query.id;
        console.log('id', id)
        
        try {

            const {result, resbody} = await viewservicingQueue(token, id);
            const queues = resbody
            console.log('queues', queues)
            if (result.statusCode == 200) {
                res.render('updateServicingQueue_driverAdmin', {userDetails, queues, id});
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

    static async handleUpdateservicingQueue_driverAdmin (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.body.id;
        

        const query = {
            bill_of_material: req.body.bill_of_material,
            payment_type: req.body.payment_type,
            balance_amount: req.body.balance_amount,
            
        }

        console.log('query', query)
        console.log('id', id)
        console.log('token', token)
        try{
            const {result, resbody} = await updateServicingQueue(query, token, id);
            console.log("resbody", resbody)
            if (result.statusCode == '200') {
                
                resMessageRedirect(res, req, 'success_msg', 'You have successfully updated vehicle details, you need to upload invoice','/facilities/servicingQueueDriverAdmin')
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${resbody.error} `,'/facilities/servicingQueueDriverAdmin')
            }
        } catch(err){
            if (err) console.log('error', err)
        }
    }

    static async updateRepairQueue_driveradmin (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.query.id;
        console.log('id', id)
        
        try {

            const {result, resbody} = await viewRepairQueue(token, id);
            const queues = resbody
            console.log('queues', queues)
            if (result.statusCode == 200) {
                res.render('updateRepairQueue_driverAdmin', {userDetails, queues, id});
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

    static async handleUpdateRepairQueue_driverAdmin (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.body.id;
        

        const query = {
            bill_of_material: req.body.bill_of_material,
            payment_type: req.body.payment_type,
            balance_amount: req.body.balance_amount,
            recommended: req.body.recommended,
        }

        console.log('query', query)
        console.log('id', id)
        console.log('token', token)
        try{
            const {result, resbody} = await updateRepairQueue(query, token, id);
            console.log("resbody", resbody)
            if (result.statusCode == '200') {
                
                resMessageRedirect(res, req, 'success_msg', 'You have successfully updated vehicle details, you need to upload invoice','/facilities/repairQueueList')
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${resbody.error} `,'/facilities/repairQueueList')
            }
        } catch(err){
            if (err) console.log('error', err)
        }
    }

    static async viewservicingQueueAuditor (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.query.id;
        console.log('id', id)
        
        try {

            const {result, resbody} = await viewservicingQueue(token, id);
            const materials = resbody
            console.log('materials', materials)
            if (result.statusCode == 200) {
                res.render('viewAdvanceServiceQueue_auditor', {userDetails, materials});
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

    static async updateservicingQueueAuditor (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.body.id;
        var stringValue = req.body.button;
        var boolValue = stringValue.toLowerCase() == 'true' ? 'APPROVED' : 'DENIED';   //returns true

        const query = {
            bill_of_material: req.body.bill_of_material,
            location: req.body.location,
            created_by: req.body.created_by,
            auditor_advance_approval: boolValue,
            auditor_comment: req.body.auditor_comment,
            auditor_name: req.body.auditor_name,
            
        }

        console.log('query', query)
        console.log('id', id)
        console.log('token', token)
        try{
            const {result, resbody} = await updateServicingQueue(query, token, id);
            console.log("resbody", resbody)
            if (result.statusCode == '200') {
                if(resbody.auditor_advance_approval == 'APPROVED') {
                    req.flash('success_msg', 'You have successfully approved invoice')
                    res.redirect('/facilities/servicingQueueAuditor');
                } else {
                    req.flash('success_msg', 'You have successfully rejected invoice')
                    res.redirect('/facilities/servicingQueueAuditor');
                }
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${resbody.error} `,'/facilities/servicingQueueAuditor')
            }
        } catch(err){
            if (err) console.log('error', err)
        }
    }

    static async viewBalanceServicingQueueAuditor (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.query.id;
        console.log('id', id)
        
        try {

            const {result, resbody} = await viewservicingQueue(token, id);
            const materials = resbody
            console.log('materials', materials)
            if (result.statusCode == 200) {
                res.render('viewBalanceServiceQueue_auditor', {userDetails, materials});
            } else if (result.statusCode == 401){
                req.flash('error_msg', resbody.error);
                res.redirect('/dashboard')
            }
        }catch(err) {
            if (err) return console.error('Error', err);
            req.flash('error_msg', err);
            res.redirect('/dashboard')
        }

    };

    static async updateBalanceServicingQueueAuditor (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.body.id;
        var stringValue = req.body.button;
        var boolValue = stringValue.toLowerCase() == 'true' ? 'APPROVED' : 'DENIED';   //returns true

        const query = {
            bill_of_material: req.body.bill_of_material,
            location: req.body.location,
            servicing_date: req.body.servicing_date,
            created_by: req.body.created_by,
            auditor_balance_approval: boolValue,
            auditor_comment: req.body.auditor_comment,
            auditor_name: req.body.auditor_name,
            
        }

        console.log('query', query)
        console.log('id', id)
        console.log('token', token)
        try{
            const {result, resbody} = await updateServicingQueue(query, token, id);
            console.log("resbody", resbody)
            if (result.statusCode == '200') {
                if(resbody.auditor_balance_approval == 'APPROVED') {
                    req.flash('success_msg', 'You have successfully approved balance invioce, awaiting finance')
                    res.redirect('/facilities/servicingQueueAuditor');
                } else {
                    req.flash('success_msg', 'You have successfully rejected balance invoice')
                    res.redirect('/facilities/servicingQueueAuditor');
                }
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${resbody.error} `,'/facilities/servicingQueueAuditor')
            }
        } catch(err){
            if (err) console.log('error', err)
        }
    }

    static async servicingQueueList_Finance (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        try {
            const {result, resbody} = await servicingQueueList(token);
            const vehicles  = resbody;
            
            // console.log('vehicles', vehicles)
            
            if (result.statusCode == 200) {
                res.render('queueList_finance', {userDetails, vehicles});
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

    static async viewservicingQueueFinance (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.query.id;
        console.log('id', id)
        
        try {

            const {result, resbody} = await viewservicingQueue(token, id);
            const materials = resbody
            console.log('materials', materials)
            if (result.statusCode == 200) {
                res.render('viewAdvanceServiceQueue_finance', {userDetails, materials});
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

    static async viewBalanceServicingQueueFinance (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.query.id;
        console.log('id', id)
        
        try {

            const {result, resbody} = await viewservicingQueue(token, id);
            const materials = resbody
            console.log('materials', materials)
            if (result.statusCode == 200) {
                res.render('viewBalanceServiceQueue_finance', {userDetails, materials});
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

    static async updateservicingQueueFinance (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.body.id;
        var stringValue = req.body.button;
        var boolValue = stringValue.toLowerCase() == 'true' ? 'APPROVED' : 'DENIED';   //returns true

        const query = {
            bill_of_material: req.body.bill_of_material,
            location: req.body.location,
            created_by: req.body.created_by,
            finance_advance_approval: boolValue,
            finance_comment: req.body.finance_comment,
            finance_personnel: req.body.finance_personnel,
            
        }

        console.log('query', query)
        console.log('id', id)
        console.log('token', token)
        try{
            const {result, resbody} = await updateServicingQueue(query, token, id);
            console.log("resbody", resbody)
            if (result.statusCode == '200') {
                if(resbody.finance_advance_approval == 'APPROVED') {
                    req.flash('success_msg', 'You have successfully approved invoice')
                    res.redirect('/facilities/servicingQueueFinance');
                } else {
                    req.flash('success_msg', 'You have successfully rejected invoice')
                    res.redirect('/facilities/servicingQueueFinance');
                }
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${resbody.response}  ${query.name}`,'/facilities/servicingQueueFinance')
            }
        } catch(err){
            if (err) console.log('error', err)
        }
    }

    static async updateBalanceServicingQueueFinance (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.body.id;
        var stringValue = req.body.button;
        var boolValue = stringValue.toLowerCase() == 'true' ? 'APPROVED' : 'DENIED';   //returns true

        const query = {
            bill_of_material: req.body.bill_of_material,
            location: req.body.location,
            servicing_date: req.body.servicing_date,
            created_by: req.body.created_by,
            finance_balance_approval: boolValue,
            finance_comment: req.body.finance_comment,
            finance_personnel: req.body.finance_personnel,
            
        }

        console.log('query', query)
        console.log('id', id)
        console.log('token', token)
        try{
            const {result, resbody} = await updateServicingQueue(query, token, id);
            console.log("resbody", resbody)
            if (result.statusCode == '200') {
                if(resbody.finance_balance_approval == 'APPROVED') {
                    req.flash('success_msg', 'You have successfully approved balance invoice, ')
                    res.redirect('/facilities/servicingQueueFinance');
                } else {
                    req.flash('success_msg', 'You have successfully rejected balance invoice')
                    res.redirect('/facilities/servicingQueueFinance');
                }
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${resbody.response}  ${query.name}`,'/facilities/servicingQueueFinance')
            }
        } catch(err){
            if (err) console.log('error', err)
        }
    }

    static async serviceStatus (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.query.id;
        console.log('id', id)
        
        try {

            const {result, resbody} = await viewservicingQueue(token, id);
            const queues = resbody
            console.log('queues', queues)
            if (result.statusCode == 200) {
                res.render('servicing_status', {userDetails, queues});
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

    static async handleServiceStatus (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        
        const query = {
            servicing_queue: req.body.id,
            report_by: req.body.report_by,
            
            
        }

        console.log('query', query)
        console.log('token', token)
        try{
            
            const {result, resbody} = await servicingStatus(query, token);
            const response = resbody
            console.log("response", response)
            if (result.statusCode == '201') {
                resMessageRedirect(res, req, 'success_msg', `You have succesfully created vehicle servicing status`,'/facilities/carServiceStatusList')
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${response.servicing_queue}  `,'/facilities/carServiceStatusList')
            }
        } catch(err){
            if (err) console.log('error', err)
            resMessageRedirect(res, req, 'error_msg', `${response}`,'/dashboard')
        }
            
    };

    static async carServiceStatusList (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        try {
            const {result, resbody} = await carServiceStatusList(token);
            const vehicles = resbody
            console.log('vehicles', vehicles)
            if (result.statusCode == 200) {
                res.render('allVehicleStatus', {userDetails, vehicles});
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


    static async carServiceStatusList_driver (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        try {
            const {result, resbody} = await carServiceStatusList(token);
            const vehicles = resbody
            console.log('vehicles', vehicles)
            if (result.statusCode == 200) {
                res.render('allVehicleServiceStatus_driver', {userDetails, vehicles});
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


    static async viewServicingStatus_driver(req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.query.id;
        console.log('id', id)
        
        try {

            const {result, resbody} = await viewServicingStatus(token, id);
            const queues = resbody
            console.log('queues', queues)
            if (result.statusCode == 200) {
                res.render('viewServicingStatus_driver', {userDetails, queues});
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

    static async updateViewServicingStatus_driver (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.body.id;
        

        const query = {
            servicing_queue: req.body.servicing_queue,
            vehicle_condition: req.body.vehicle_condition,
            condition_comment: req.body.condition_comment,
            technician_revisit: req.body.technician_revisit,
            driver_name: req.body.driver_name,
            
            
        }

        console.log('query', query)
        console.log('id', id)
        console.log('token', token)
        try{
            const {result, resbody} = await updateServicingStatus(query, token, id);
            console.log("resbody", resbody)
            if (result.statusCode == '200') {
                
                    req.flash('success_msg', 'You have successfully updated Vehicle Servicing Status')
                    res.redirect('/facilities/carServiceStatusList_driver');
                
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${resbody.error} `,'/facilities/carServiceStatusList_driver')
            }
        } catch(err){
            if (err) console.log('error', err)
        }
    }

    static async viewServicingStatus_driverAdmin(req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.query.id;
        console.log('id', id)
        
        try {

            const {result, resbody} = await viewServicingStatus(token, id);
            const queues = resbody
            console.log('queues', queues)
            if (result.statusCode == 200) {
                res.render('serviceStatusConfirm', {userDetails, queues});
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

    static async updateViewServicingStatus_driverAdmin (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.body.id;
        

        const query = {
            servicing_queue: req.body.servicing_queue,
            admin_check: req.body.admin_check,
            admin_comment: req.body.admin_comment,
            technician_revisit: req.body.technician_revisit,
            
            
            
        }

        console.log('query', query)
        console.log('id', id)
        console.log('token', token)
        try{
            const {result, resbody} = await updateServicingStatus(query, token, id);
            console.log("resbody", resbody)
            if (result.statusCode == '200') {
                
                    req.flash('success_msg', 'You have successfully updated Vehicle Servicing Status')
                    res.redirect('/facilities/carServiceStatusList');
                
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${resbody.error} `,'/facilities/carServiceStatusList')
            }
        } catch(err){
            if (err) console.log('error', err)
        }
    }
    // this is to post the data from the table to the database
    static async handleAddVehicle (req, res) {
        const userDetails = req.session.userDetails
        const token = userDetails.token

        const query = {
            "plate": req.body.plate,
            "type": req.body.type,
            "chasis": req.body.chasis,
            "vin": req.body.vin,
            "vmake": req.body.vmake,
            "vmodel": req.body.vmodel,
            "vcolor": req.body.vcolor,
            "fuel_type": req.body.fuel_type,
            "purchase_date": req.body.purchase_date,
            "next_servicing_date": req.body.next_servicing_date,
            "driver": req.body.driver
        };

        console.log('The car request query', query);

        try{

            // you may need to add logic for the 200 response because it hs some messages that is worth seen
            const {result, resbody} = await sendRequest(query, token);
            console.log(resbody);
            if (result.statusCode == 201) {
                console.log('hi')
                resMessageRedirect(res, req, 'success_msg', 'You have succesfully added a new vehicle', '/facilities/addVehicle' )
            } else if (result.statusCode == 401) {
                resMessageRedirect(res, req, 'error_msg', 'You have failed to add a new vehicle', '/facilities/addVehicle' )
            } else {
                resMessageRedirect(res, req, 'error_msg', `${resbody.chasis}`, '/facilities/addVehicle' )
            };
            
        } catch (err) {
            if (err) console.log('Error', err)
        }
    };

    static async vehicleList (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        try {
            const {result, resbody} = await allVehicle(token);
            const vehicles = resbody
            console.log('vehicles', vehicles)
            if (result.statusCode == 200) {
                res.render('assignVehicleShow', {userDetails, vehicles});
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

    static async viewVehicle (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.query.id;
        console.log('id', id)
        
        try {
            const {result, resbody} = await viewVehicle(token, id);
            const materials = resbody
            console.log('materials', materials)
            if (result.statusCode == 200) {
                res.render('viewVehicle', {userDetails, materials});
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

    static async handleUpdateVehicle (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.body.id

        console.log("id", id)
        
        const query = {
            driver_name: req.body.driver_name,
            vcolour: req.body.vcolour,
            
                    
        }

        console.log('query', query)
        console.log('token', token)
        try{
            
            const {result, resbody} = await updateVehicle(query, token, id);
            const response = resbody
            console.log("response", response)
            if (result.statusCode == '200') {
                resMessageRedirect(res, req, 'success_msg', `You have succesfully updated Vehicle`,'/facilities/quotationList')
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${response.detail} `,'/facilities/quotationList')
            }
        } catch(err){
            if (err) console.log('error', err)
            resMessageRedirect(res, req, 'error_msg', `${response}`,'/dashboard')
        }
            
    };

    static async carFaultList_driver (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        try {
            const {result, resbody} = await carFaultList_driver(token);
            const faults = resbody
            console.log('faults', faults)
            if (result.statusCode == 200) {
                res.render('faultList_driver', {userDetails, faults});
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

    static async carFaultList (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        try {
            const {result, resbody} = await carFaultList(token);
            const faults = resbody
            console.log('faults', faults)
            if (result.statusCode == 200) {
                res.render('faults_list', {userDetails, faults});
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

    static async quotationList (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        try {
            const {result, resbody} = await quotationList(token);
            const faults = resbody
            console.log('faults', faults)
            if (result.statusCode == 200) {
                res.render('quotationList', {userDetails, faults});
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

    static async viewQuotation (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.query.id;
        console.log('id', id)
        
        try {
            const {result, resbody} = await viewQuotation(token, id);
            const materials = resbody
            console.log('materials', materials)
            if (result.statusCode == 200) {
                res.render('viewQuotation', {userDetails, materials});
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

    static async handleQuotation (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.body.quotation

        console.log("id", id)
        
        const query = {
            fault: req.body.fault,
            approved_technician: req.body.approved_technician,
            approved_technician_reason: req.body.approved_technician_reason,
                       
        }

        console.log('query', query)
        console.log('token', token)
        try{
            
            const {result, resbody} = await updateQuotation(query, token, id);
            const response = resbody
            console.log("response", response)
            if (result.statusCode == '200') {
                resMessageRedirect(res, req, 'success_msg', `You have succesfully updated Quotation`,'/facilities/quotationList')
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${response} `,'/facilities/quotationList')
            }
        } catch(err){
            if (err) console.log('error', err)
            resMessageRedirect(res, req, 'error_msg', `${response}`,'/dashboard')
        }
            
    };

    static async viewQuotation_addToQueue (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.query.id;
        console.log('id', id)
        
        try {
            const {result, resbody} = await viewQuotation(token, id);
            const materials = resbody
            console.log('materials', materials)
            if (result.statusCode == 200) {
                res.render('carRepairAddToQueue', {userDetails, materials});
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

    static async handleQuotation_addToQueue (req, res) {
        const userDetails = req.session.userDetails
        const token = userDetails.token;
        
        var query;
        if (req.body.payment_type == 'advance') {
        query = {
            recommended: Number(req.body.quotation),
            repair_date: req.body.repair_date,
            created_by: req.body.created_by,
            
        }
        console.log('query', query)
        console.log('token', token)
        try{
            
            const {result, resbody} = await repairQueue(query, token);
            const response = resbody
            console.log("response", response)
            if (result.statusCode == '201') {
                resMessageRedirect(res, req, 'success_msg', `You have succesfully added vehicle to repair queue`,`/facilities/viewAdvanceInvoice_driverAdmin?id=${response.id}`)
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${response.recommended}  `,'/facilities/quotationList')
            }
        } catch(err){
            if (err) console.log('error', err)
            resMessageRedirect(res, req, 'error_msg', `${response}`,'/dashboard')
        }

    } else{
        query = {
            recommended: Number(req.body.quotation),
            repair_date: req.body.repair_date,
            payment_type: req.body.payment_type,
            balance_amount: req.body.balance_amount,
            created_by: req.body.created_by,       
        }
        console.log('query', query)
        console.log('token', token)
        try{
            
            const {result, resbody} = await repairQueue(query, token);
            const response = resbody
            console.log("response", response)
            if (result.statusCode == '201') {
                resMessageRedirect(res, req, 'success_msg', `You have succesfully updated vehicle repair`,`/facilities/viewBalanceInvoice_driverAdmin?id=${response.id}`)
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${response.recommended}  `,'/facilities/quotationList')
            }
        } catch(err){
            if (err) console.log('error', err)
            resMessageRedirect(res, req, 'error_msg', `${response}`,'/dashboard')
        }
    } 
    };

    static async repairQueueList (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        try {
            const {result, resbody} = await repairQueueList(token);
            const vehicles = resbody
            console.log('vehicles', vehicles)
            if (result.statusCode == 200) {
                res.render('repairQueueList.ejs', {userDetails, vehicles});
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

    static async viewAdvanceInvoice_driverAdmin (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.query.id;
        console.log('id', id)
        
        try {
            const {result, resbody} = await viewRepairQueue(token, id);
            const queues = resbody
            console.log('queues', queues)
            if (result.statusCode == 200) {
                res.render('repairAdvanceInvoice', {userDetails, queues});
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

    static async viewBalanceInvoice_driverAdmin (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.query.id;
        console.log('id', id)
        
        try {
            const {result, resbody} = await viewRepairQueue(token, id);
            const queues = resbody
            console.log('queues', queues)
            if (result.statusCode == 200) {
                res.render('repairBalanceInvoice', {userDetails, queues});
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

    static async viewRepairQueue (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.query.id;
        console.log('id', id)
        
        try {
            const {result, resbody} = await viewRepairQueue(token, id);
            const queues = resbody
            console.log('queues', queues)
            if (result.statusCode == 200) {
                res.render('viewRepairQueue', {userDetails, queues});
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

    static async repairQueueList_auditor (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        try {
            const {result, resbody} = await repairQueueList(token);
            const vehicle = resbody
            console.log('vehicles', vehicle)

            var vehicles = vehicle.filter(function (data) {
                return data.auditor_advance_approval != 'DENIED' && data.auditor_balance_approval != 'DENIED' // need to come back to this to populate the feilds with the data about the users
            });

            if (result.statusCode == 200) {
                res.render('repairQueueList_auditor.ejs', {userDetails, vehicles});
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

    static async viewRepairQueueAdvance_auditor (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.query.id;
        console.log('id', id)
        
        try {
            const {result, resbody} = await viewRepairQueue(token, id);
            const queues = resbody
            console.log('queues', queues)
            if (result.statusCode == 200) {
                res.render('repairQueueApproval_auditor', {userDetails, queues});
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

    static async updaterepairQueueAdvanceAuditor (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.body.id;
        var stringValue = req.body.button;
        var boolValue = stringValue.toLowerCase() == 'true' ? 'APPROVED' : 'DENIED';   //returns true

        const query = {
            recommended: req.body.recommended,
            auditor_advance_approval: boolValue,
            auditor_comment: req.body.auditor_comment,
            auditor_name: req.body.auditor_name,
            
        }

        console.log('query', query)
        console.log('id', id)
        console.log('token', token)
        try{
            const {result, resbody} = await updateRepairQueue(query, token, id);
            console.log("resbody", resbody)
            if (result.statusCode == '200') {
                if(resbody.auditor_advance_approval == 'APPROVED') {
                    req.flash('success_msg', 'You have successfully approved advance invoice')
                    res.redirect('/facilities/repairQueueList_auditor');
                } else {
                    req.flash('success_msg', 'You have successfully rejected advance invoice')
                    res.redirect('/facilities/repairQueueList_auditor');
                }
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${resbody.error} `,'/facilities/repairQueueList_auditor')
            }
        } catch(err){
            if (err) console.log('error', err)
        }
    }

    static async viewRepairQueueBalance_auditor (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.query.id;
        console.log('id', id)
        
        try {
            const {result, resbody} = await viewRepairQueue(token, id);
            const queues = resbody
            console.log('queues', queues)
            if (result.statusCode == 200) {
                res.render('repairQueueBalance_auditor', {userDetails, queues});
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

    static async updateBalanceRepairQueueAuditor (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.body.id;
        var stringValue = req.body.button;
        var boolValue = stringValue.toLowerCase() == 'true' ? 'APPROVED' : 'DENIED';   //returns true

        const query = {
            recommended: req.body.recommended,
            auditor_balance_approval: boolValue,
            auditor_comment: req.body.auditor_comment,
            auditor_name: req.body.auditor_name,
            
        }

        console.log('query', query)
        console.log('id', id)
        console.log('token', token)
        try{
            const {result, resbody} = await updateRepairQueue(query, token, id);
            console.log("resbody", resbody)
            if (result.statusCode == '200') {
                if(resbody.auditor_balance_approval == 'APPROVED') {
                    req.flash('success_msg', 'You have successfully approved balance invioce')
                    res.redirect('/facilities/repairQueueList_auditor');
                } else {
                    req.flash('success_msg', 'You have successfully rejected balance invoice')
                    res.redirect('/facilities/repairQueueList_auditor');
                }
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${resbody.error} `,'/facilities/repairQueueList_auditor')
            }
        } catch(err){
            if (err) console.log('error', err)
        }
    }

    static async repairQueueList_finance (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        

        try {
            const {result, resbody} = await repairQueueList(token);
            const vehicles = resbody
            // console.log('vehicles', vehicles)
            
            
            if (result.statusCode == 200) {
                res.render('repairQueueList_finance.ejs', {userDetails, vehicles});
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

    static async viewRepairAdvanceQueue_finance (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.query.id;
        console.log('id', id)
        
        try {
            const {result, resbody} = await viewRepairQueue(token, id);
            const queues = resbody
            console.log('queues', queues)
            if (result.statusCode == 200) {
                res.render('repairQueueApproval_finance', {userDetails, queues});
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

    static async updateRepairAdvanceQueue_finance (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.body.id;
        var stringValue = req.body.button;
        var boolValue = stringValue.toLowerCase() == 'true' ? 'APPROVED' : 'DENIED';   //returns true

        const query = {
            recommended: req.body.recommended,
            finance_advance_approval: boolValue,
            finance_comment: req.body.finance_comment,
            finance_name: req.body.finance_name,
            
        }

        console.log('query', query)
        console.log('id', id)
        console.log('token', token)
        try{
            const {result, resbody} = await updateRepairQueue(query, token, id);
            console.log("resbody", resbody)
            if (result.statusCode == '200') {
                if(resbody.finance_advance_approval == 'APPROVED') {
                    req.flash('success_msg', 'You have successfully approved vehicle repair')
                    res.redirect('/facilities/repairQueueList_finance');
                } else {
                    req.flash('success_msg', 'You have successfully rejected Vehicle')
                    res.redirect('/facilities/repairQueueList_finance');
                }
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${resbody.error} `,'/facilities/repairQueueList_finance')
            }
        } catch(err){
            if (err) console.log('error', err)
        }
    }

    static async viewRepairQueueBalance_finance (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.query.id;
        console.log('id', id)
        
        try {
            const {result, resbody} = await viewRepairQueue(token, id);
            const queues = resbody
            console.log('queues', queues)
            if (result.statusCode == 200) {
                res.render('repairQueueBalance_finance', {userDetails, queues});
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

    static async updateBalanceCarRepairQueueFinance (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.body.id;
        var stringValue = req.body.button;
        var boolValue = stringValue.toLowerCase() == 'true' ? 'APPROVED' : 'DENIED';   //returns true

        const query = {
            recommended: req.body.recommended,
            finance_balance_approval: boolValue,
            finance_comment: req.body.finance_comment,
            finance_name: req.body.finance_name,
            
        }

        console.log('query', query)
        console.log('id', id)
        console.log('token', token)
        try{
            const {result, resbody} = await updateRepairQueue(query, token, id);
            console.log("resbody", resbody)
            if (result.statusCode == '200') {
                if(resbody.finance_balance_approval == 'APPROVED') {
                    req.flash('success_msg', 'You have successfully approved balance invioce')
                    res.redirect('/facilities/repairQueueList_finance');
                } else {
                    req.flash('success_msg', 'You have successfully rejected balance invoice')
                    res.redirect('/facilities/repairQueueList_finance');
                }
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${resbody.error} `,'/facilities/repairQueueList_finance')
            }
        } catch(err){
            if (err) console.log('error', err)
        }
    }

    static async repairStatus (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.query.id;
        console.log('id', id)
        
        try {

            const {result, resbody} = await viewRepairQueue(token, id);
            const queues = resbody
            console.log('queues', queues)
            if (result.statusCode == 200) {
                res.render('carRepairStatus_driverAdmin', {userDetails, queues});
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

    static async handleRepairStatus (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        
        const query = {
            queue_repair: req.body.id,
            created_by: req.body.created_by,
            
            
        }

        console.log('query', query)
        console.log('token', token)
        try{
            
            const {result, resbody} = await repairStatus(query, token);
            const response = resbody
            console.log("response", response)
            if (result.statusCode == '201') {
                resMessageRedirect(res, req, 'success_msg', `You have succesfully created vehicle repair status for vehicle`,'/facilities/carRepairStatusList_driverAdmin')
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${response.repair_queue}  `,'/facilities/carRepairStatusList_driverAdmin')
            }
        } catch(err){
            if (err) console.log('error', err)
            resMessageRedirect(res, req, 'error_msg', `${response}`,'/dashboard')
        }
            
    };

    static async carRepairStatusList_driver (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        try {
            const {result, resbody} = await repairStatusList(token);
            const vehicles = resbody
            console.log('vehicles', vehicles)
            if (result.statusCode == 200) {
                res.render('repairStatusList_driver', {userDetails, vehicles});
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


    static async viewRepairStatus_driver(req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.query.id;
        console.log('id', id)
        
        try {

            const {result, resbody} = await viewRepairStatus(token, id);
            const queues = resbody
            console.log('queues', queues)
            if (result.statusCode == 200) {
                res.render('viewRepairStatus_driver', {userDetails, queues});
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

    static async updateViewRepairStatus_driver (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.body.id;
        

        const query = {
            queue_repair: req.body.id,
            vehicle_condition: req.body.vehicle_condition,
            condition_comment: req.body.condition_comment,
            technician_revisit: req.body.technician_revisit,
            driver_name: req.body.driver_name,
            
            
        }

        console.log('query', query)
        console.log('id', id)
        console.log('token', token)
        try{
            const {result, resbody} = await updateRepairStatus_driver(query, token, id);
            console.log("resbody", resbody)
            if (result.statusCode == '200') {
                
                    req.flash('success_msg', 'You have successfully updated Vehicle Repairing Status')
                    res.redirect('/facilities/carRepairStatusList_driver');
                
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${resbody.queue_repair} `,'/facilities/carRepairStatusList_driver')
            }
        } catch(err){
            if (err) console.log('error', err)
        }
    }

    static async carRepairStatusList_driverAdmin (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        try {
            const {result, resbody} = await repairStatusList(token);
            const vehicles = resbody
            console.log('vehicles', vehicles)
            if (result.statusCode == 200) {
                res.render('carRepairStatusList', {userDetails, vehicles});
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

    static async viewRepairStatus_driverAdmin(req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.query.id;
        console.log('id', id)
        
        try {

            const {result, resbody} = await viewRepairStatus(token, id);
            const queues = resbody
            console.log('queues', queues)
            if (result.statusCode == 200) {
                res.render('viewRepairStatus_driverAdmin', {userDetails, queues});
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


    

    static async dieselVendor (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        try {
            
                res.render('dieselVendor', {userDetails});

        }catch(err) {
            if (err) return console.error('Error', err);
            req.flash('error_msg', resbody.detail);
            res.redirect('/dashboard')
        }

    };

    static async handleDieselVendor (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        
        const query = {
            name: req.body.name,
            address: req.body.address,
            email: req.body.email,
            reg_number: req.body.reg_number,
            phone: req.body.phone,
            contact_person: req.body.contact_person,
            contact_person_phone: req.body.contact_person_phone,
            
        }

        console.log('query', query)
        console.log('token', token)
        try{
            
            const {result, resbody} = await handleDieselVendor(query, token);
            const response = resbody
            console.log("response", response)
            if (result.statusCode == '201') {
                resMessageRedirect(res, req, 'success_msg', `You have succesfully added ${query.name }`,'/facilities/dieselVendorList')
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${response}  ${query.name}`,'/facilities/dieselVendor')
            }
        } catch(err){
            if (err) console.log('error', err)
            resMessageRedirect(res, req, 'error_msg', `${response}`,'/dashboard')
        }
            
    };

    static async dieselVendorList (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        try {
            const {result, resbody} = await dieselVendorList(token);
            const diesel = resbody
            console.log('diesel', diesel)
            if (result.statusCode == 200) {
                res.render('dieselVendorList', {userDetails, diesel});
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

    

    static async dieselRequestQuotationList_procurement (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        try {
            const {result, resbody} = await dieselRequestQuotationList(token);
            const diesel = resbody
            console.log('diesel', diesel)
            if (result.statusCode == 200) {
                res.render('dieselRequestQuotationList_procurement', {userDetails, diesel});
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

    static async dieselRequestQuotation (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        try {
            const {result, resbody} = await dieselVendorList(token);
            const diesel = resbody
            console.log('diesel', diesel)
            if (result.statusCode == 200) {
                res.render('dieselRequestQuotation', {userDetails, diesel});
            } else if (result.statusCode == 401){
                req.flash('error_msg', resbody.error);
                res.redirect('/dashboard')
            }
        }catch(err) {
            if (err) return console.error('Error', err);
            req.flash('error_msg', resbody.error);
            res.redirect('/dashboard')
        }

    };

    

    static async viewDieselRequestQuotation_procurement(req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.query.id;
        console.log('id', id)
        
        try {

            const {result, resbody} = await viewDieselRequestQuotation(token, id);
            const diesel = resbody
            console.log('diesel', diesel)
            if (result.statusCode == 200) {
                res.render('dieselProcurementStatus', {userDetails, diesel});
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

    static async handleDieselRequestQuotation_procurement (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.body.dieselQuotation;

        console.log("id", id)
        
        const query = {
            delivery_status: req.body.delivery_status,
            purpose: req.body.purpose,
            confirm_delivery_name: req.body.confirm_delivery_name,
            
        }

        console.log('query', query)
        console.log('token', token)
        try{
            
            const {result, resbody} = await updateDieselRequestQuotation(query, token, id);
            const response = resbody
            console.log("response", response)
            if (result.statusCode == '200') {
                resMessageRedirect(res, req, 'success_msg', `You have succesfully updated diesel request quotation with delivery status`,'/facilities/dieselRequestQuotationList_procurement')
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${response}  ${query.vehicle}`,'/facilities/dieselRequestQuotationList_procurement')
            }
        } catch(err){
            if (err) console.log('error', err)
            resMessageRedirect(res, req, 'error_msg', `${response}`,'/dashboard')
        }
            
    };

    

    static async purchaseOrderlist_auditor (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        
        try {

            const {result, resbody} = await purchaseOrderList(token);
            const material = resbody

            console.log('materials', material)
            var materials = material.filter(function (data) {
                return data.auditor_approval != 'DENIED'
            });

            if (result.statusCode == 200) {
                res.render('purchaseOrderList_auditor', {userDetails, materials});
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

    static async viewPurchaseOrderAuditor (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.query.id;
        
        
        try {

            const {result, resbody} = await viewPurchaseOrder(token, id);
            const materials = resbody
            console.log('materials', materials)
            if (result.statusCode == 200) {
                res.render('viewPurchaseOrder_auditor', {userDetails, materials});
            } else if (result.statusCode == 401){
                req.flash('error_msg', resbody.repair);
                res.redirect('/dashboard')
            }
        }catch(err) {
            if (err) return console.error('Error', err);
            req.flash('error_msg', resbody.detail);
            res.redirect('/dashboard')
        }

    };

    static async updatePurchaseOrderAuditor (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.body.id;
        var stringValue = req.body.button;
        var boolValue = stringValue.toLowerCase() == 'true' ? 'APPROVED' : 'DENIED';   //returns true

        const query = {
            purpose: req.body.purpose,
            auditor_approval: boolValue,
            auditor_comment: req.body.auditor_comment,
            auditor_name: req.body.auditor_name,
            request_quotation: req.body.request_quotation,
        }

        console.log('query', query)
        console.log('id', id)
        console.log('token', token)
        try{
            const {result, resbody} = await updatePurchaseOrder(query, token, id);
            console.log("resbody", resbody)
            if (result.statusCode == '200') {
                if(resbody.auditor_approval == 'APPROVED') {
                    req.flash('success_msg', 'You have successfully approved purchase approval, awaiting finance approval')
                    res.redirect('/facilities/purchaseOrderlist_auditor');
                } else {
                    req.flash('success_msg', 'You have successfully rejected paid repair')
                    res.redirect('/facilities/purchaseOrderlist_auditor');
                }
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${resbody.repair} `,'/facilities/paidRepair_listAuditor')
            }
        } catch(err){
            if (err) console.log('error', err)
        }
    }

    static async purchaseOrderlist_finance (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        
        try {

            const {result, resbody} = await purchaseOrderList(token);
            const material = resbody

            console.log('materials', material)
            var materials = material.filter(function (data) {
                return data.auditor_approval == 'APPROVED' && data.finance_approval != 'DENIED'
            });

            if (result.statusCode == 200) {
                res.render('purchaseOrderList_finance', {userDetails, materials});
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

    static async viewPurchaseOrderFinance (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.query.id;
        
        
        try {

            const {result, resbody} = await viewPurchaseOrder(token, id);
            const materials = resbody
            console.log('materials', materials)
            if (result.statusCode == 200) {
                res.render('viewPurchaseOrder_finance', {userDetails, materials});
            } else if (result.statusCode == 401){
                req.flash('error_msg', resbody.repair);
                res.redirect('/dashboard')
            }
        }catch(err) {
            if (err) return console.error('Error', err);
            req.flash('error_msg', resbody.detail);
            res.redirect('/dashboard')
        }

    };

    static async updatePurchaseOrderFinance (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.body.id;
        var stringValue = req.body.button;
        var boolValue = stringValue.toLowerCase() == 'true' ? 'APPROVED' : 'DENIED';   //returns true

        const query = {
            repair: req.body.id,
            finance_approval: boolValue,
            finance_comment: req.body.finance_comment,
            finance_name: req.body.finance_name,
            request_quotation: req.body.request_quotation,
        }

        console.log('query', query)
        console.log('id', id)
        console.log('token', token)
        try{
            const {result, resbody} = await updatePurchaseOrder(query, token, id);
            console.log("resbody", resbody)
            if (result.statusCode == '200') {
                if(resbody.finance_approval == 'APPROVED') {
                    req.flash('success_msg', 'You have successfully approved purchase order')
                    res.redirect('/facilities/purchaseOrderlist_finance');
                } else {
                    req.flash('success_msg', 'You have successfully rejected paid repair')
                    res.redirect('/facilities/purchaseOrderlist_finance');
                }
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${resbody.repair} `,'/facilities/paidRepair_listAuditor')
            }
        } catch(err){
            if (err) console.log('error', err)
        }
    }

    static async updateFault (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.query.id;
        console.log('id', id)
        
        try {
            const {result, resbody} = await updateFault(token, id);
            const faults = resbody
            console.log('faults', faults)
            if (result.statusCode == 200) {
                res.render('updateFault', {userDetails, faults});
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

    static async quotation_driverAdmin (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.query.id;
        console.log('id', id)
        
        try {
            const {result, resbody} = await updateFault(token, id);
            const faults = resbody
            console.log('faults', faults)
            if (result.statusCode == 200) {
                res.render('quotation_driverAdmin', {userDetails, faults});
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

    static async handleUpdateFault (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.body.fault

        console.log("id", id)
        
        const query = {
            vehicle: req.body.vehicle,
            driver: req.body.driver,
            fault_date: req.body.fault_date,
            rectifiable: req.body.rectifiable,
            rectifiable_comment: req.body.rectifiable_comment,
            
            
        }

        console.log('query', query)
        console.log('token', token)
        try{
            
            const {result, resbody} = await updateCarFault(query, token, id);
            const response = resbody
            console.log("response", response)
            if (result.statusCode == '200') {
                resMessageRedirect(res, req, 'success_msg', `You have succesfully updated vehicle ${response.vehicle_info} with plate number ${response.vehicle_plate} fault`,'/facilities/carFaultList')
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${response}  ${query.vehicle}`,'/facilities/carFaultList')
            }
        } catch(err){
            if (err) console.log('error', err)
            resMessageRedirect(res, req, 'error_msg', `${response}`,'/dashboard')
        }
            
    };

    static async faultRepair (req, res) {
        const userDetails = req.session.userDetails
        const token = userDetails.token;
        console.log("driver_id", userDetails.id)
        // come back to think about this cause there's no where else to redirect this thing to
        try{
            const {result, resbody} = await driverInfo(token);
            
            if (result.statusCode == '200') {
                const details = resbody
                console.log("response", details)
                console.log("vehicle_id", details.vehicle_id)
                console.log("driver_id", details.driver_id)
                res.render('report_faults', {userDetails, details})
            } else {
                console.log('Not getting faults')
                resMessageRedirect(res, req, 'error_msg', 'You are not authorized to view this page', '/dashboard')
            }
        } catch(err){
            if (err) console.log('error', err)
        } 
    };

    static async handleFaultRepair(req, res) {
        const userDetails = req.session.userDetails
        const token = userDetails.token
        
        // console.log('the trip order', req.body.destination)

        // for(let i=0; i < trip_info.length; i++){
        //     console.log("trip_info[i].driver_status",trip_info[i].driver_status)
            
        //     if(trip_info[i].driver_status == 'REQUESTED'){


        // var fault_set = trip_info.filter(function (item) {
        //     return item.location == req.body.destination
        // });

        var query 
            if (req.body.fault_type == 'single') {
                

        var fault_set = []


        fault_set = [
            {
                faulty_part: req.body.faulty_part,
                description: req.body.description,
                severity: req.body.severity
            }
        ]

        query = {
            vehicle: req.body.vehicle_id,
            driver: req.body.driver_id,
            vehicle_location: req.body.vehicle_location,
            fault_date: req.body.fault_date,
            fault_set: fault_set
        }
    } else{
        query = {
            vehicle: req.body.vehicle_id,
            driver: req.body.driver_id,
            vehicle_location: req.body.vehicle_location,
            fault_date: req.body.fault_date,
            fault_set: JSON.parse(req.body.random)
        }
    }

        console.log('the query', query)

        try {
            const { result, resbody } = await sendFaults(query, token);;
            const details = resbody
            console.log(details)
            // may need to come back here and include the validation logic to check the states of these things

            if (result.statusCode == '201') {
                resMessageRedirect(res, req, 'success_msg', 'You have succesfully added a new vehicle fault', '/facilities/carFaultList_driver' )
                // res.redirect('/facilities/faults_report');
            } else if (result.statusCode == '401') {
                resMessageRedirect(res, req, 'error_msg', 'You are not authorized to view this page', '/facilities/faults_report')
                // you may need to add a middleware to make sure only the right personal can see this.
            } else {
                resMessageRedirect(res, req, 'error_msg', `${details.vehicle}`, '/facilities/faults_report')
            }
        } catch (err) {
            if (err) console.log('error', err)
        }
        

    };

    

    static async addTechician (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        try{
            
            
            
            res.render('add-technician', {userDetails})
        } catch(err){
            if (err) console.log('error', err)
        }
  
    };

    static async handleAddTechnician (req, res) {
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
            
            const {result, resbody} = await sendTechnician(query, token);
            const response = resbody
            console.log("response", response)
            if (result.statusCode == '201') {
                resMessageRedirect(res, req, 'success_msg', `You have succesfully added ${query.company_name }`,'/facilities/add_technician')
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${response}  ${query.company_name}`,'/facilities/add_technician')
            }
        } catch(err){
            if (err) console.log('error', err)
            resMessageRedirect(res, req, 'error_msg', `${response}`,'/dashboard')
        }
            
    };


    static async carTechnicianList (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        
        try {

            const {result, resbody} = await carTechnicianList(token);
            const car_tech = resbody
            console.log('car_tech', car_tech)
            if (result.statusCode == 200) {
                res.render('all-technicians', {userDetails, car_tech});
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

    static async generatorList (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        
        try {

            const {result, resbody} = await allGenerator(token);
            const generators = resbody
            console.log('generators', generators)
            if (result.statusCode == 200) {
                res.render('generatorList', {userDetails, generators});
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

    static async generatorList_fault (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        
        try {

            const {result, resbody} = await allGenerator(token);
            const generators = resbody
            console.log('generators', generators)
            if (result.statusCode == 200) {
                res.render('generatorList_fault', {userDetails, generators});
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

    static async generator_report (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        
        try {

            
                res.render('generator', {userDetails});
            
        }catch(err) {
            if (err) return console.error('Error', err);
            req.flash('error_msg', resbody.detail);
            res.redirect('/dashboard')
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
                res.render('vehiclesServicing', {userDetails, vehicles});
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

            res.render('genServiceRequest', {userDetails, gens: gens.resbody}); 
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
                resMessageRedirect(res, req, 'success_msg', `You have succesfully added a new gen service request`,'/facilities/genServiceRequestList')
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${response} `,'/facilities/genServiceRequests')
            }
        } catch(err){
            if (err) console.log('error', err)
            resMessageRedirect(res, req, 'error_msg', `${response}`,'/dashboard')
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
                res.render('genServiceRequestList', {userDetails, materials});
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

            res.render('request_files', {userDetails, id}); 
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
                resMessageRedirect(res, req, 'success_msg', `You have succesfully added a new gen service request file`,'/facilities/genRequestFiles')
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${response} `,'/facilities/genRequestFiles')
            }
        } catch(err){
            if (err) console.log('error', err)
            resMessageRedirect(res, req, 'error_msg', `${response}`,'/dashboard')
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

            res.render('genDueServiceList', {userDetails, gens: gens.resbody}); 
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

            res.render('genServicing_facility', {userDetails, gens: gens.resbody}); 
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
                resMessageRedirect(res, req, 'success_msg', `You have succesfully registered a generator for servicing, pls update before uploading signof document`,`/facilities/viewGenServicing_facility?id=${response.id}`)
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${response} `,'/facilities/genServicing_facility')
            }
        } catch(err){
            if (err) console.log('error', err)
            resMessageRedirect(res, req, 'error_msg', `${response}`,'/dashboard')
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

            res.render('genServiceList', {userDetails, gens: gens.resbody}); 
        } catch (err) {
            if (err) return console.error('display page details error', err)
        };
         
        };

    static async viewGenServicing (req, res) {
        var userDetails = req.session.userDetails
        const token = userDetails.token;
        const id = req.query.id;

        console.log('id',id)
        console.log('token', token)

        try {
            const gens = await viewGenService(token, id);

            console.log('response',gens.resbody)
            console.log('token',token)

            res.render('viewGenServicing_facility', {userDetails, gens: gens.resbody, id}); 
        } catch (err) {
            if (err) return console.error('display page details error', err)
        };
         
        };

    static async handleGenServicing_facility (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.body.id;
        

        const query = {
            generator: req.body.generator,
            servicing_company: req.body.servicing_company,
            servicing_status: req.body.servicing_status,
            status_reason: req.body.status_reason,
            internal_sign_off: req.body.internal_sign_off,
            external_sign_off: req.body.external_sign_off,
            
        }

        console.log('query', query)
        console.log('id', id)
        console.log('token', token)
        try{
            const {result, resbody} = await updateGenService(query, token, id);
            const response = resbody
            console.log("response", response)
            
            if (result.statusCode == '200') {
                
                resMessageRedirect(res, req, 'success_msg', 'You have successfully updated generator servicing,pls upload signoff document', `/facilities/viewGenServicingSignOff?id=${response.id}`)
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${resbody.error} `,'/facilities/genServicingList_facility')
            }
        } catch(err){
            if (err) console.log('error', err)
            resMessageRedirect(res, req, 'error_msg', ` ${resbody.error} `,'/facilities/genServicingList_facility')
        }
    }

    static async viewGenServicingSignOff (req, res) {
        var userDetails = req.session.userDetails
        const token = userDetails.token;
        const id = req.query.id;

        console.log('id',id)
        console.log('token', token)

        try {
            const gens = await viewGenService(token, id);

            console.log('response',gens.resbody)
            console.log('token',token)

            res.render('genServiceSignOffDocUpload', {userDetails, gens: gens.resbody, id}); 
        } catch (err) {
            if (err) return console.error('display page details error', err)
        };
         
        };


    static async genServicingList_driverAdmin (req, res) {
        var userDetails = req.session.userDetails
        const token = userDetails.token;
        const id = userDetails.first_name;

        console.log('id',id)
        console.log('token', token)

        try {
            const gens = await genServiceList(token);

            console.log('response',gens.resbody)
            console.log('token',token)

            res.render('genServiceList_driverAdmin', {userDetails, gens: gens.resbody}); 
        } catch (err) {
            if (err) return console.error('display page details error', err)
        };
         
        };

static async viewGenServicing_diverAdmin (req, res) {
        var userDetails = req.session.userDetails
        const token = userDetails.token;
        const id = req.query.id;

        console.log('id',id)
        console.log('token', token)

        try {
            const gens = await viewGenService(token, id);

            console.log('response',gens.resbody)
            console.log('token',token)

            res.render('viewGenServicing_facility', {userDetails, gens: gens.resbody}); 
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

            res.render('sLA', {userDetails, id}); 
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
                resMessageRedirect(res, req, 'success_msg', `You have succesfully added sla`,'/facilities/genSLA')
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${response}  ${query.gen_maker} ${query.gen_model }`,'/facilities/genSLA')
            }
        } catch(err){
            if (err) console.log('error', err)
            resMessageRedirect(res, req, 'error_msg', `${response}`,'/dashboard')
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
                res.render('sLA_list', {userDetails, materials});
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

    static async paidRepair_listAuditor (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        
        try {

            const {result, resbody} = await paid_repairList(token);
            const material = resbody

            console.log('materials', material)
            var materials = material.filter(function (data) {
                return data.auditor_approval != 'DENIED'
            });

            if (result.statusCode == 200) {
                res.render('paidRepair_listAuditor', {userDetails, materials});
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

    static async viewPaidRepairAuditor (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.query.id;
        
        
        try {

            const {result, resbody} = await viewPaid_repair(token, id);
            const materials = resbody
            console.log('materials', materials)
            if (result.statusCode == 200) {
                res.render('viewPaidRepair_auditor', {userDetails, materials});
            } else if (result.statusCode == 401){
                req.flash('error_msg', resbody.repair);
                res.redirect('/dashboard')
            }
        }catch(err) {
            if (err) return console.error('Error', err);
            req.flash('error_msg', resbody.detail);
            res.redirect('/dashboard')
        }

    };

    static async updatePaidRepairAuditor (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.body.id;
        var stringValue = req.body.button;
        var boolValue = stringValue.toLowerCase() == 'true' ? 'APPROVED' : 'DENIED';   //returns true

        const query = {
            repair: req.body.id,
            auditor_approval: boolValue,
            auditor_comment: req.body.auditor_comment,
            auditor_name: req.body.auditor_name,
            
        }

        console.log('query', query)
        console.log('id', id)
        console.log('token', token)
        try{
            const {result, resbody} = await updatePaidRepair(query, token, id);
            console.log("resbody", resbody)
            if (result.statusCode == '200') {
                if(resbody.auditor_approval == 'APPROVED') {
                    req.flash('success_msg', 'You have successfully approved paid repair, awaiting finance approval')
                    res.redirect('/facilities/paidRepair_listAuditor');
                } else {
                    req.flash('success_msg', 'You have successfully rejected paid repair')
                    res.redirect('/facilities/paidRepair_listAuditor');
                }
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${resbody.repair} `,'/facilities/paidRepair_listAuditor')
            }
        } catch(err){
            if (err) console.log('error', err)
        }
    }

    static async paidRepair_listFinance (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        
        try {

            const {result, resbody} = await paid_repairList(token);
            const material = resbody
            console.log('materials', material)
            var materials = material.filter(function (data) {
                return data.finance_approval != 'DENIED' && data.auditor_approval == 'APPROVED'
            });
            if (result.statusCode == 200) {
                res.render('paidRepair_listFinance', {userDetails, materials});
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

    static async viewPaidRepairFinance (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.query.id;
        
        
        try {

            const {result, resbody} = await viewPaid_repair(token, id);
            const materials = resbody
            console.log('materials', materials)
            if (result.statusCode == 200) {
                res.render('viewPaidRepair_finance', {userDetails, materials});
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

    static async updatePaidRepairFinance (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.body.id;
        var stringValue = req.body.button;
        var boolValue = stringValue.toLowerCase() == 'true' ? 'APPROVED' : 'DENIED';   //returns true

        const query = {
            repair: req.body.id,
            finance_approval: boolValue,
            finance_comment: req.body.finance_comment,
            finance_name: req.body.finance_name,
            
        }

        console.log('query', query)
        console.log('id', id)
        console.log('token', token)
        try{
            const {result, resbody} = await updatePaidRepair(query, token, id);
            console.log("resbody", resbody)
            if (result.statusCode == '200') {
                if(resbody.finance_approval == 'APPROVED') {
                    req.flash('success_msg', 'You have successfully approved paid repair')
                    res.redirect('/facilities/paidRepair_listFinance');
                } else {
                    req.flash('success_msg', 'You have successfully rejected paid repair')
                    res.redirect('/facilities/paidRepair_listFinance');
                }
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${resbody.error} `,'/facilities/paidRepair_listFinance')
            }
        } catch(err){
            if (err) console.log('error', err)
        }
    }

    static async paidRepair_listDriverAdmin (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        
        try {

            const {result, resbody} = await paid_repairList(token);
            const materials = resbody
            console.log('materials', materials)
            if (result.statusCode == 200) {
                res.render('paidRepair_listDriverAdmin', {userDetails, materials});
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

    static async genSLA_file (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.query.id;
        
        
        try {

            const {result, resbody} = await updateSLA(token, id);
            const slas = resbody
            console.log('slas', slas)
            if (result.statusCode == 200) {
                res.render('sLA_file', {userDetails, slas});
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

    static async requestFilesList (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        
        try {

            const {result, resbody} = await RequestFiles(token);
            const materials = resbody
            console.log('materials', materials)
            if (result.statusCode == 200) {
                res.render('requestFilesList', {userDetails, materials});
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

    static async signOff (req, res) {
        var userDetails = req.session.userDetails
        res.render('signoff', {userDetails}) 
        };

    static async addGenerator (req, res) {
        var userDetails = req.session.userDetails
        res.render('addGenerator', {userDetails}) 
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
                resMessageRedirect(res, req, 'success_msg', `You have succesfully added ${query.gen_maker } ${query.gen_model }`,'/facilities/addGenerator')
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${response}  ${query.gen_maker} ${query.gen_model }`,'/facilities/addGenerator')
            }
        } catch(err){
            if (err) console.log('error', err)
            resMessageRedirect(res, req, 'error_msg', `${response}`,'/dashboard')
        }
            
    };

    

    static async addBillOfMaterial (req, res) {
        var userDetails = req.session.userDetails
        const token = userDetails.token;

        try {
            const vehs = await allVehicle(token);

            console.log('response',vehs.resbody)
            console.log('token',token)

            res.render('billOfMaterial', {userDetails, vehs: vehs.resbody}); 
        } catch (err) {
            if (err) return console.error('display page details error', err)
        };
         
        };

    static async handleAddBillOfMaterial(req, res) {
        const userDetails = req.session.userDetails
        const token = userDetails.token

            
        var query 
        if (req.body.bill_type == 'single') {
            var bill_set = []
    
    
            bill_set = [
                {
                    description: req.body.description,
                    unit_price: req.body.unit_price,
                    quantity: req.body.quantity
                }
            ]
             query = {
                bill_set: bill_set,
                name: req.body.name,
                created_by: req.body.created_by,
                vehicle: req.body.vehicle,
                technician: req.body.technician,
                technician_workmanship: req.body.technician_workmanship,
                advance_payment: req.body.advance_payment
                
            }

        } else{
             query = {
                bill_set: JSON.parse(req.body.random),
                name: req.body.name,
                created_by: req.body.created_by,
                vehicle: req.body.vehicle,
                technician: req.body.technician,
                technician_workmanship: req.body.technician_workmanship,
            }
        }
    
            console.log('the query is', query)
    
            try {
                const { result, resbody } = await sendBillOfMaterial(query, token);
                const details = resbody
                console.log('details',details)
                
    
                if (result.statusCode == '201') {
                    resMessageRedirect(res, req, 'success_msg', 'You have succesfully created a new bill of material, awaiting approval from BU Head', '/facilities/allBillOfMaterials')
                    // req.flash('success_msg', 'You have succesfully created a new vehicle request');
                    // res.redirect('/dashboard');
                } else if (result.statusCode == '200') {
                    resMessageRedirect(res, req, 'error_msg', `${details.info}`, '/facilities/addBillOfMaterial')
                    // you may need to add a middleware to make sure only the right personal can see this.
                } else {
                    resMessageRedirect(res, req, 'error_msg', `${details.info}`, '/facilities/addBillOfMaterial')
                }
            } catch (err) {
                if (err) console.log('error', err)
            }
            
    
        };

    static async allBillOfMaterials (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        
        try {

            const {result, resbody} = await getBillOfMaterials(token);
            const materials = resbody
            console.log('materials', materials)
            if (result.statusCode == 200) {
                res.render('billOfMaterialList', {userDetails, materials});
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

    static async viewBillOfMaterials (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.query.id;
        console.log('id', id)
        
        try {

            const {result, resbody} = await viewBillOfMaterials(token, id);
            const materials = resbody
            console.log('materials', materials)
            if (result.statusCode == 200) {
                res.render('viewBillOfMaterial', {userDetails, materials});
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

    static async viewServicingInvoice (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.query.id;
        console.log('id', id)
        
        try {

            const {result, resbody} = await viewservicingQueue(token, id);
            const queues = resbody
            console.log('queues', queues)
            if (result.statusCode == 200) {
                res.render('servicingInvoice', {userDetails, queues});
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

    static async viewAdvanceServicingInvoice (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.query.id;
        console.log('id', id)
        
        try {

            const {result, resbody} = await viewservicingQueue(token, id);
            const queues = resbody
            console.log('queues', queues)
            if (result.statusCode == 200) {
                res.render('serviceAdvanceInvoice', {userDetails, queues});
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

    static async handleServicingInvoice (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.body.id;
        const reader = req.body.data;
        
        console.log("see", req.body.data)
        
        const query = JSON.parse(req.body.data);


        console.log('query', query)
        console.log('token', token)
        console.log('id', id)

        try{
            
            const {result, resbody} = await updateServicingQueue(query, token, id);
            const response = resbody
            console.log("response", response)
            if (result.statusCode == '201') {
                resMessageRedirect(res, req, 'success_msg', `You have succesfully uploaded an invoice`,'/facilities/viewServicingInvoice')
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${response}  `,'/facilities/viewServicingInvoice')
            }
        } catch(err){
            if (err) console.log('error', err)
            resMessageRedirect(res, req, 'error_msg', `${response}`,'/dashboard')
        }
    };

    static async addGenTechnician (req, res) {
        var userDetails = req.session.userDetails
        res.render('addGenTechnician', {userDetails}) 
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
                resMessageRedirect(res, req, 'success_msg', `You have succesfully added ${query.company_name }`,'/facilities/addGenTechnician')
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${response}  ${query.company_name}`,'/facilities/addGenTechnician')
            }
        } catch(err){
            if (err) console.log('error', err)
            resMessageRedirect(res, req, 'error_msg', `${response}`,'/dashboard')
        }
            
    };
    static async genServiceCompanyList (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        
        try {

            const {result, resbody} = await genServiceCompanyList(token);
            const gen_tech = resbody
            console.log('gen_tech', gen_tech)
            if (result.statusCode == 200) {
                res.render('genServiceCompany', {userDetails, gen_tech});
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

    static async genServiceCompanyList_sla (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        
        try {

            const {result, resbody} = await genServiceCompanyList(token);
            const gen_tech = resbody
            console.log('gen_tech', gen_tech)
            if (result.statusCode == 200) {
                res.render('genServiceCompany_sla', {userDetails, gen_tech});
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

    static async genDailyTotalConsumption (req, res) {
        var userDetails = req.session.userDetails
        res.render('genDailyConsumption', {userDetails}) 
        };

    static async genDailyMaintenance (req, res) {
        var userDetails = req.session.userDetails
        

        const generator = req.query.id;
            req.session.generator = generator;
            console.log('generator', req.session.generator)

        res.render('genDailyMaintenance', {userDetails}) 
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
                resMessageRedirect(res, req, 'success_msg', `You have succesfully added to the generator daily maintenance`,'/facilities/genDailyMaintenance')
            } else {
                resMessageRedirect(res, req, 'error_msg', ` error, contact`,'/facilities/genDailyMaintenance')
            }
        } catch(err){
            if (err) console.log('error', err)
            resMessageRedirect(res, req, 'error_msg', `${response}`,'/dashboard')
        }
    };


    static async genFaultReport (req, res) {
        var userDetails = req.session.userDetails
        const token = userDetails.token;
        const generator = req.query.id;
            req.session.generator = generator;
            console.log('generator', req.session.generator)

        try {
            const gens = await allGenerator(token);

            console.log('response',gens.resbody)
            console.log('token',token)

                res.render('genFaultReport', {userDetails, gens: gens.resbody}) 
        } catch (err) {
            if (err) return console.error('display page details error', err)
        };
     
    };

    static async handleGenFaultReport (req, res) {
        var userDetails = req.session.userDetails
        const token = userDetails.token;
        const generator = req.session.generator;
        
        
        const query = {
            generator: req.body.generator,
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
                resMessageRedirect(res, req, 'success_msg', `You have succesfully submitted a generator fault`,'/facilities/genFaultList')
            } else {
                resMessageRedirect(res, req, 'error_msg', ` error, contact`,'/facilities/genFaultReport')
            }
        } catch(err){
            if (err) console.log('error', err)
            resMessageRedirect(res, req, 'error_msg', `${response}`,'/dashboard')
        }
    };

    static async genFaultList (req, res) {
        var userDetails = req.session.userDetails
        const token = userDetails.token;

        try {
            const gens = await genFaultList(token);

            console.log('response',gens.resbody)
            console.log('token',token)

            res.render('genFaultList', {userDetails, gens: gens.resbody}); 
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

            res.render('gen_repairs', {userDetails, slas: slas.resbody, id}); 
        } catch (err) {
            if (err) return console.error('display page details error', err)
        };
         
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
                resMessageRedirect(res, req, 'success_msg', `You have succesfully updated repair`,'/facilities/genSLA_list')
            } else {
                resMessageRedirect(res, req, 'error_msg', ` error, contact`,'/facilities/genSLA_list')
            }
        } catch(err){
            if (err) console.log('error', err)
            resMessageRedirect(res, req, 'error_msg', `${response}`,'/dashboard')
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
                resMessageRedirect(res, req, 'success_msg', `You have succesfully updated repair`,'/facilities/gen_repairList')
            } else {
                resMessageRedirect(res, req, 'error_msg', ` error, contact`,'/facilities/gen_repairList')
            }
        } catch(err){
            if (err) console.log('error', err)
            resMessageRedirect(res, req, 'error_msg', `${response}`,'/dashboard')
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

            res.render('gen_repairList', {userDetails, gens: gens.resbody}); 
        } catch (err) {
            if (err) return console.error('display page details error', err)
        };
          
        };

        static async gen_repairListProcurement (req, res) {
            var userDetails = req.session.userDetails
            const token = userDetails.token;
    
            try {
                const gens = await gen_repairList(token);
    
                console.log('response',gens.resbody)
                console.log('token',token)
    
                res.render('genRepairList_procurement', {userDetails, gens: gens.resbody}); 
            } catch (err) {
                if (err) return console.error('display page details error', err)
            };
              
            };

    static async genRepairStatusList (req, res) {
        var userDetails = req.session.userDetails
        const token = userDetails.token;

        try {
            const gens = await genRepairStatusList(token);

            console.log('response',gens.resbody)
            console.log('token',token)

            res.render('genRepairStatusList', {userDetails, gens: gens.resbody}); 
        } catch (err) {
            if (err) return console.error('display page details error', err)
        };
          
        };

    static async genPaidRepair (req, res) {
        var userDetails = req.session.userDetails
        

        const repair = req.query.id;
            
            console.log('repair', req.query.id)

        res.render('paid_repair', {userDetails, repair}) 
        };

    static async genRepairStatus (req, res) {
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
                    res.render('genRepairStatus', {userDetails,repairs,repair});
                } else if (result.statusCode == 401){
                    req.flash('error_msg', resbody.detail);
                    res.redirect('/dashboard')
                }
            }catch(err) {
                if (err) return console.error('Error', err);
                req.flash('error_msg', resbody.detail);
                res.redirect('/dashboard')
            }

        // res.render('genRepairStatus', {userDetails, repair}) 
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
            
            
            const {result, resbody} = await updateGenRepairStatus(query, token);
            const response = resbody
            console.log("response", response)
            if (result.statusCode == '201') {
                resMessageRedirect(res, req, 'success_msg', `You have succesfully submitted a generator repair status`,'/facilities/gen_repairStatus')
            } else {
                resMessageRedirect(res, req, 'error_msg', ` error, contact`,'/facilities/gen_repairStatus')
            }
        } catch(err){
            if (err) console.log('error', err)
            resMessageRedirect(res, req, 'error_msg', `${response}`,'/dashboard')
        }
    };

    static async genMaintenance (req, res) {
        var userDetails = req.session.userDetails
        

        const generator = req.query.id;
            req.session.generator = generator;
            console.log('generator', req.session.generator)

        res.render('genMaintenance', {userDetails}) 
        };

    static async handleGenMaintenance (req, res) {
        var userDetails = req.session.userDetails
        const token = userDetails.token;
        const generator = req.session.generator;
        
        
        const query = {
            generator: generator,
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
                resMessageRedirect(res, req, 'success_msg', `You have succesfully added to the generator daily maintenance`,'/facilities/genMaintenance')
            } else {
                resMessageRedirect(res, req, 'error_msg', ` error, contact`,'/facilities/genMaintenance')
            }
        } catch(err){
            if (err) console.log('error', err)
            resMessageRedirect(res, req, 'error_msg', `${response}`,'/dashboard')
        }
    };

    static async allGenMaintenanceList (req, res) {
        var userDetails = req.session.userDetails
        const token = userDetails.token;

        try {
            const gens = await genMaintenanceList(token);

            console.log('response',gens.resbody)
            console.log('token',token)

            res.render('genMaintenanceList', {userDetails, gens: gens.resbody}); 
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

            res.render('genDailyMaintenanceList', {userDetails, gens: gens.resbody}); 
        } catch (err) {
            if (err) return console.error('display page details error', err)
        };
          
        };

    static async car_servicing_report (req, res) {
        var userDetails = req.session.userDetails
        
        res.render('driver_admin_car_servicing', {userDetails}) 
        };

    static async listFaults (req, res) {
        var userDetails = req.session.userDetails
        
        res.render('listFaults', {userDetails}) 
        };

    static async recommendTechnician (req, res) {
        var userDetails = req.session.userDetails
        res.render('recommendCarTech', {userDetails}) 
        };

    static async quotationCar (req, res) {
        var userDetails = req.session.userDetails
        res.render('quotationCar', {userDetails}) 
        };

    static async queueRepair (req, res) {
        var userDetails = req.session.userDetails
        res.render('queueRepair', {userDetails}) 
        };

    static async statusRepair (req, res) {
        var userDetails = req.session.userDetails
        res.render('repairStatus', {userDetails}) 
        };

    static async dieselRequest (req, res) {
        var userDetails = req.session.userDetails
        res.render('dieselRequest', {userDetails}) 
        };

    static async dieselSensorReading (req, res) {
        var userDetails = req.session.userDetails
        res.render('dieselSensorReading', {userDetails}) 
        };

    static async dieselTanker (req, res) {
        var userDetails = req.session.userDetails
        res.render('dieselTanker', {userDetails}) 
        };

    static async genRepair (req, res) {
        var userDetails = req.session.userDetails
        res.render('genRepair', {userDetails}) 
        };

    // phcn module

    static async phcnBilling (req, res) {
        var userDetails = req.session.userDetails
        const token = userDetails.token;
        
            console.log('token', token)
    
            try {
                
    
                res.render('phcnBilling', {userDetails}); 
            } catch (err) {
                if (err) return console.error('display page details error', err)
            };
             
        };
         
      
    static async handlePhcnBilling (req, res) {
        var userDetails = req.session.userDetails
        const token = userDetails.token;
        
        
        
        const query = {
            vat: req.body.vat,
            unit_consumed: req.body.unit_consumed,
            consumption_rate: req.body.consumption_rate,
            comment: req.body.comment,
            created_by: req.body.created_by,
            
        }

        console.log('query', query)
        console.log('token', token)
        try{
            
            
            const {result, resbody} = await sendPhcnBill(query, token);
            const response = resbody
            console.log("response", response)
            if (result.statusCode == '201') {
                resMessageRedirect(res, req, 'success_msg', `You have succesfully submitted a phcn bill`,'/facilities/phcnBilling')
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${response.watt_consumed} ${response.unit_consumed}`,'/facilities/phcnBilling')
            }
        } catch(err){
            if (err) console.log('error', err)
            resMessageRedirect(res, req, 'error_msg', `${response.error}`,'/dashboard')
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

            res.render('phcnBillList', {userDetails, gens}); 
        } catch (err) {
            if (err) return console.error('display page details error', err)
        };
          
        };

    static async AllPhcnBill_facility (req, res) {
        var userDetails = req.session.userDetails
        const token = userDetails.token;

        try {
            const gens = await phcnBillList(token);
            console.log('phcn', gens)
            
            console.log('token',token)

            res.render('phcnBillList_facility', {userDetails, gens: gens.resbody}); 
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
                res.render('viewPhcnBill', {userDetails, phcn});
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
                res.render('updateBill_driverAdmin', {userDetails, phcn});
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

    static async handlePhcnBill_driverAdmin (req, res) {
        var userDetails = req.session.userDetails
        const token = userDetails.token;
        const id = req.body.id;
        var stringValue = req.body.button;
        var boolValue = stringValue.toLowerCase() == 'true' ? 'APPROVED' : 'DENIED';   //returns true
        
        
        const query = {
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
                    res.redirect('/facilities/phcnBillList');
                } else {
                    req.flash('success_msg', 'You have successfully rejected bill payment')
                    res.redirect('/facilities/phcnBillList');
                }
                
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${response.bill}`,'/facilities/phcnBillList')
            }
        } catch(err){
            if (err) console.log('error', err)
            resMessageRedirect(res, req, 'error_msg', `${response.error}`,'/dashboard')
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
                res.render('phcnPayments_driverAdmin.ejs', {userDetails, phcn});
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
                resMessageRedirect(res, req, 'success_msg', `You have successfully created payment slip`,'/facilities/AllPhcnBillPayment')
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${response.bill}`,'/facilities/phcnBillList')
            }
        } catch(err){
            if (err) console.log('error', err)
            resMessageRedirect(res, req, 'error_msg', `${response.error}`,'/dashboard')
        }
    };

    static async AllPhcnBillPayment (req, res) {
        var userDetails = req.session.userDetails
        const token = userDetails.token;

        try {
            const gens = await phcnBillPaymentList(token);

            
            console.log('token',token)

            res.render('phcnBillPaymentList_driverAdmin', {userDetails, gens: gens.resbody}); 
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
                res.render('billPaymentApproval_driverAdmin', {userDetails, phcn});
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
                    res.redirect('/facilities/AllPhcnBillPayment');
                } else {
                    req.flash('success_msg', 'You have successfully rejected bill payment')
                    res.redirect('/facilities/AllPhcnBillPayment');
                }
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${resbody.error} `,'/facilities/AllPhcnBillPayment')
            }
        } catch(err){
            if (err) console.log('error', err)
        }
    }

    static async AllPhcnBillPayment_auditor (req, res) {
        var userDetails = req.session.userDetails
        const token = userDetails.token;

        try {
            
            const {result, resbody} = await phcnBillPaymentList(token);
            const gen = resbody
            console.log('phcn', gen)

            
            console.log('token',token)

            var gens = gen.filter(function (data) {
                return data.auditor_approval != 'DENIED' && data.finance_approval != 'DENIED' // need to come back to this to populate the feilds with the data about the users
            });

            res.render('phcnBillPaymentList_auditor', {userDetails, gens}); 
        } catch (err) {
            if (err) return console.error('display page details error', err)
        };
          
        };

    static async viewBillPayment_auditor (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.query.id;
        console.log('id', id)
        
        try {

            const {result, resbody} = await viewPhcnBillPayment(token, id);
            const materials = resbody
            
            if (result.statusCode == 200) {
                res.render('billPaymentApproval_auditor', {userDetails, materials});
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

    static async updateViewBillPayment_auditor (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.body.id;
        var stringValue = req.body.button;
        var boolValue = stringValue.toLowerCase() == 'true' ? 'APPROVED' : 'DENIED';   //returns true

        const query = {
            bill: req.body.bill,
            auditor_approval: boolValue,
            auditor_comment: req.body.auditor_comment,
            auditor_name: req.body.auditor_name,
            
            
        }

        console.log('query', query)
        console.log('id', id)
        console.log('token', token)
        try{
            const {result, resbody} = await updatePhcnBillPayment(query, token, id);
            console.log("resbody", resbody)
            if (result.statusCode == '200') {
                if(resbody.auditor_approval == 'APPROVED') {
                    req.flash('success_msg', 'You have successfully approved bill payment, awaiting finance approval')
                    res.redirect('/facilities/AllPhcnBillPayment_auditor');
                } else {
                    req.flash('success_msg', 'You have successfully rejected bill payment')
                    res.redirect('/facilities/AllPhcnBillPayment_auditor');
                }
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${resbody.error} `,'/facilities/AllPhcnBillPayment_auditor')
            }
        } catch(err){
            if (err) console.log('error', err)
        }
    }

    static async AllPhcnBillPayment_finance (req, res) {
        var userDetails = req.session.userDetails
        const token = userDetails.token;

        try {
            const {result, resbody} = await phcnBillPaymentList(token);
            const gen = resbody
            console.log('phcn', gen)

            
            console.log('token',token)

            var gens = gen.filter(function (data) {
                return data.finance_approval != 'DENIED' && data.auditor_approval == 'APPROVED' // need to come back to this to populate the feilds with the data about the users
            });

            res.render('phcnBillPaymentList_finance', {userDetails, gens}); 
        } catch (err) {
            if (err) return console.error('display page details error', err)
        };
          
        };

    static async viewBillPayment_finance (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.query.id;
        console.log('id', id)
        
        try {

            const {result, resbody} = await viewPhcnBillPayment(token, id);
            const materials = resbody
            
            if (result.statusCode == 200) {
                res.render('billPaymentApproval_finance', {userDetails, materials});
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

    static async updateViewBillPayment_finance (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const id = req.body.id;
        var stringValue = req.body.button;
        var boolValue = stringValue.toLowerCase() == 'true' ? 'APPROVED' : 'DENIED';   //returns true

        const query = {
            bill: req.body.bill,
            finance_approval: boolValue,
            finance_comment: req.body.finance_comment,
            finance_name: req.body.finance_name,
            
            
        }

        console.log('query', query)
        console.log('id', id)
        console.log('token', token)
        try{
            const {result, resbody} = await updatePhcnBillPayment(query, token, id);
            console.log("resbody", resbody)
            if (result.statusCode == '200') {
                if(resbody.finance_approval == 'APPROVED') {
                    req.flash('success_msg', 'You have successfully approved bill payment')
                    res.redirect('/facilities/AllPhcnBillPayment_finance');
                } else {
                    req.flash('success_msg', 'You have successfully rejected bill payment')
                    res.redirect('/facilities/AllPhcnBillPayment_finance');
                }
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${resbody.error} `,'/facilities/AllPhcnBillPayment_finance')
            }
        } catch(err){
            if (err) console.log('error', err)
        }
    }

    static async phcnDailyReading (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        
        try {
            
                res.render('phcnDailyReading', {userDetails});
            
        }catch(err) {
            if (err) return console.error('Error', err);
            req.flash('error_msg', resbody.detail);
            res.redirect('/dashboard')
        }

    };

    static async diesel (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        
        try {
            
                res.render('diesel', {userDetails});
            
        }catch(err) {
            if (err) return console.error('Error', err);
            req.flash('error_msg', resbody.detail);
            res.redirect('/dashboard')
        }

    };

    static async phcn (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        
        
        try {
            
                res.render('phcn', {userDetails});
            
        }catch(err) {
            if (err) return console.error('Error', err);
            req.flash('error_msg', resbody.detail);
            res.redirect('/dashboard')
        }

    };

    static async handlePhcnDailyReading (req, res) {
        var userDetails = req.session.userDetails
        const token = userDetails.token;
        
        
        
        const query = {
            meter_number: req.body.meter_number,
            meter_type: req.body.meter_type,
            status: req.body.status,
            
        }

        console.log('query', query)
        console.log('token', token)
        try{
            
            
            const {result, resbody} = await sendPhcnDailyMeterReading(query, token);
            const response = resbody
            console.log("response", response)
            if (result.statusCode == '201') {
                resMessageRedirect(res, req, 'success_msg', `You have successfully updated daily meter reading`,'/facilities/allPhcnDailyReading_facility')
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${response}`,'/facilities/allPhcnDailyReading_facility')
            }
        } catch(err){
            if (err) console.log('error', err)
            resMessageRedirect(res, req, 'error_msg', `${response.error}`,'/dashboard')
        }
    };

    static async allPhcnDailyReading_facility (req, res) {
        var userDetails = req.session.userDetails
        const token = userDetails.token;

        try {
            const gens = await phcnDailyReadingList(token);

            
            console.log('token',token)

            res.render('phcnDailyReadingList_facility', {userDetails, gens: gens.resbody}); 
        } catch (err) {
            if (err) return console.error('display page details error', err)
        };
          
        };

    static async allPhcnDailyReading_driverAdmin (req, res) {
        var userDetails = req.session.userDetails
        const token = userDetails.token;

        try {
            const gens = await phcnDailyReadingList(token);

            
            console.log('token',token)

            res.render('phcnDailyReadingList_facility', {userDetails, gens: gens.resbody}); 
        } catch (err) {
            if (err) return console.error('display page details error', err)
        };
          
        };

    static async phcnPayment (req, res) {
        var userDetails = req.session.userDetails
        res.render('phcnPayment', {userDetails}) 
        };
};

module.exports = Facilities