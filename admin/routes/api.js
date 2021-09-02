const express = require('express');
const { 
    viewDept,
    viewUpline,
    getRole,
    quotation_driverAdmin,
    uploadServiceBalanceInvoice, 
    uploadBillOfMaterialInvoice,
    uploadPhcnBill, 
    uploadPurchaseOrder, 
    request_quotation, 
    paid_repair, 
    dashboard_total_reports, 
    dashboard_total_subsidiary_request_type, 
    dashboard_trip_range,
    dashboard_admin_totals, 
    dashboard_admin_request_subsidiaries,
    dashboard_admin_all_requests,
    send_dashboard_admin_all_requests,
    admin_power_bill_report,
    filter_admin_power_bill_report,
    admin_diesel_bi_report,
    admin_filter_diesel_bi_report,
    dashboard_admin_total_subsidiary_trip,
    admin_all_daily_maintenance,
    send_admin_all_daily_maintenance,
    admin_generator_repair_report,
    dashboard_vehicle_repair_report,
    genServiceRequest,
    gen_servicingCompany,
    updateGenServiceStatusSignOff,
    dashboard_vehicle } = require('../queries/manage');
const router = express.Router();

router.get('/ajax', async (req, res) => {
   
    const userDetails = req.session.userDetails;
    const token = userDetails.token;
    const user_id = req.query.id;
    const userType = req.query.type;
    req.session.user_id = user_id;
    const users = req.session.users;
  
   if(userType == 'dept' ){
    try{
        console.log("I don enter")
        const subs = await viewDept(user_id,token);
        // var user = users.filter(function (user) {
        //     return user.id == user_id
        // });
        // user = user[0]

        
        // console.log("user", user)
        console.log("I don enter", subs.resbody)
       res.json( subs.resbody);
    } catch(err){
        if (err) console.log('error', err)
        
        res.status(503).json(err);
        return;
    }
   }
   else if(userType == 'upline' ){
    //    res.json('hello')
       try{
        console.log("I don enter")
        const subs = await viewUpline(user_id,token);
        // var user = users.filter(function (user) {
        //     return user.id == user_id
        // });
        // user = user[0]

        
        // console.log("user", user)
        console.log("I don enter", subs.resbody)
       res.json( subs.resbody);
    } catch(err){
        if (err) console.log('error', err)
        
        res.status(503).json(err);
        return;
    }
    
   }
   else if(userType == 'role' ){
    //    res.json('hello')
       try{
        console.log("I don enter")
        const subs = await getRole(token);
        // var user = users.filter(function (user) {
        //     return user.id == user_id
        // });
        // user = user[0]

        
        // console.log("user", user)
        console.log("I don enter", subs.resbody)
       res.json( subs.resbody);
    } catch(err){
        if (err) console.log('error', err)
        
        res.status(503).json(err);
        return;
    }
}
    
 });
router.post('/upload/balance_invoice', async (req, res)=> {
    let data = res.body;
    let id = req.query.id;
    const userDetails = req.session.userDetails;
    const token = userDetails.token;
    try {
        const subs = await uploadServiceBalanceInvoice(data,id,token);
        res.json( subs.resbody);
    } catch (err) {
        if (err) console.log('error', err)
        
        res.status(503).json(err);
        return;
    }
})

router.post('/upload/bill_of_material_invoice', async (req, res)=> {
    let data = req.body;
    let id = req.query.id;
    const userDetails = req.session.userDetails;
    const token = userDetails.token;
    try {
        const subs = await uploadBillOfMaterialInvoice(data,id,token);
        res.json( subs.resbody);
    } catch (err) {
        if (err) console.log('error', err)
        
        res.status(503).json(err);
        return;
    }
})

router.post('/upload/phcn_bill', async (req, res)=> {
    let data = req.body;
    let id = req.query.id;
    const userDetails = req.session.userDetails;
    const token = userDetails.token;
    console.log('id', id)
    console.log('token', token)
    
    try {
        const subs = await uploadPhcnBill(data,id,token);
        res.json( subs.resbody);
    } catch (err) {
        if (err) console.log('error', err)
        
        res.status(503).json(err);
        return;
    }
})

router.post('/upload/purchase_order', async (req, res)=> {
    let data = req.body;
    let id = req.query.id;
    const userDetails = req.session.userDetails;
    const token = userDetails.token;
    console.log('id', id)
    console.log('token', token)
    
    try {
        const subs = await uploadPurchaseOrder(data,id,token);
        res.json( subs.resbody);
    } catch (err) {
        if (err) console.log('error', err)
        
        res.status(503).json(err);
        return;
    }
})

router.post('/upload/sign_off', async (req, res)=> {
    let data = req.body;
    let id = req.query.id;
    const userDetails = req.session.userDetails;
    const token = userDetails.token;
    console.log('id', id)
    console.log('token', token)
    
    
    try {
        const subs = await updateGenServiceStatusSignOff(data,id,token);
        res.json( subs.resbody);
    } catch (err) {
        if (err) console.log('error', err)
        
        res.status(503).json(err);
        return;
    }
})

router.post('/upload/quotation_driverAdmin', async (req, res)=> {
    let data = req.body;
    let id = req.query.id;
    const userDetails = req.session.userDetails;
    const token = userDetails.token;
    try {
        const subs = await quotation_driverAdmin(data,token);
        res.json( subs.resbody);
    } catch (err) {
        if (err) console.log('error', err)
        
        res.status(503).json(err);
        return;
    }   
})
router.post('/upload/request_quotation', async (req, res)=> {
    let data = req.body;
    let id = req.query.id;
    const userDetails = req.session.userDetails;
    const token = userDetails.token;
    try {
        const subs = await request_quotation(data,token);
        res.json( subs.resbody);
    } catch (err) {
        if (err) console.log('error', err)
        
        res.status(503).json(err);
        return;
    }   
})

router.post('/upload/paid_repair', async (req, res)=> {
    let data = req.body;
    let id = req.query.id;
    const userDetails = req.session.userDetails;
    const token = userDetails.token;
    try {
        const subs = await paid_repair(data,token);
        res.json( subs.resbody);
    } catch (err) {
        if (err) console.log('error', err)
        
        res.status(503).json(err);
        return;
    }   
})

router.post('/ajax/genserviceRequest', async (req, res)=> {
    let data = req.body;
    // let id = req.query.id;
    const userDetails = req.session.userDetails;
    const token = userDetails.token;
    try {
        const subs = await genServiceRequest(data,token);
        res.json( subs.resbody);
    } catch (err) {
        if (err) console.log('error', err)
        
        res.status(503).json(err);
        return;
    }   
})


router.get('/ajax/dashboard_total_reports', async (req, res)=> {
    const userDetails = req.session.userDetails;
    const token = userDetails.token;
    try {
        const subs = await dashboard_total_reports(token);
        res.json( subs.resbody);
    } catch (err) {
        if (err) console.log('error', err)
        
        res.status(503).json(err);
        return;
    }
})

router.get('/ajax/dashboard_total_subsidiary_request_type', async (req, res)=> {
    const userDetails = req.session.userDetails;
    const token = userDetails.token;
    try {
        const subs = await dashboard_total_subsidiary_request_type(token);
        res.json( subs.resbody);
    } catch (err) {
        if (err) console.log('error', err)
        
        res.status(503).json(err);
        return;
    }
})

router.get('/ajax/dashboard_trip_range', async (req, res)=> {
    const userDetails = req.session.userDetails;
    const token = userDetails.token;
    try {
        const subs = await dashboard_trip_range(token);
        res.json( subs.resbody);
    } catch (err) {
        if (err) console.log('error', err)
        
        res.status(503).json(err);
        return;
    }
})

router.get('/ajax/gen_serviceCompany', async (req, res)=> {
    const userDetails = req.session.userDetails;
    const token = userDetails.token;
    try {
        const subs = await gen_servicingCompany(token);
        res.json( subs.resbody);
    } catch (err) {
        if (err) console.log('error', err)
        
        res.status(503).json(err);
        return;
    }
})

router.get('/ajax/dashboard_vehicle', async (req, res)=> {
    const userDetails = req.session.userDetails;
    const token = userDetails.token;
    try {
        const subs = await dashboard_vehicle(token);
        res.json( subs.resbody);
    } catch (err) {
        if (err) console.log('error', err)
        
        res.status(503).json(err);
        return;
    }
})

router.get('/ajax/dashboard_admin_totals', async (req, res)=> {
    const userDetails = req.session.userDetails;
    const token = userDetails.token;
    try {
        const subs = await dashboard_admin_totals(token);
        res.json( subs.resbody);
    } catch (err) {
        if (err) console.log('error', err)
        
        res.status(503).json(err);
        return;
    }
})

router.get('/ajax/dashboard_admin_request_subsidiaries', async (req, res)=> {
    const userDetails = req.session.userDetails;
    const token = userDetails.token;
    try {
        const subs = await dashboard_admin_request_subsidiaries(token);
        res.json( subs.resbody);
    } catch (err) {
        if (err) console.log('error', err)
        
        res.status(503).json(err);
        return;
    }
})

router.get('/ajax/dashboard_admin_all_requests', async (req, res)=> {
    const userDetails = req.session.userDetails;
    const token = userDetails.token;
    try {
        const subs = await dashboard_admin_all_requests(token);
        res.json( subs.resbody);
    } catch (err) {
        if (err) console.log('error', err)
        
        res.status(503).json(err);
        return;
    }
})

router.post('/ajax/dashboard_admin_filter_requests', async (req, res)=> {
    let data = req.body;
    const userDetails = req.session.userDetails;
    const token = userDetails.token;
    try {
        const subs = await send_dashboard_admin_all_requests(data,token);
        res.json( subs.resbody);
    } catch (err) {
        if (err) console.log('error', err)
        
        res.status(503).json(err);
        return;
    }   
})

router.get('/ajax/dashboard_admin_total_subsidiary_trip', async (req, res)=> {
    const userDetails = req.session.userDetails;
    const token = userDetails.token;
    try {
        const subs = await dashboard_admin_total_subsidiary_trip(token);
        res.json( subs.resbody);
    } catch (err) {
        if (err) console.log('error', err)
        
        res.status(503).json(err);
        return;
    }
})

router.post('/ajax/admin_power_bill_report', async (req, res)=> {
    let data = req.body;
    const userDetails = req.session.userDetails;
    const token = userDetails.token;
    try {
        const subs = await admin_power_bill_report(data,token);
        res.json( subs.resbody);
    } catch (err) {
        if (err) console.log('error', err)
        
        res.status(503).json(err);
        return;
    }   
})

router.get('/ajax/admin_filter_power_bill_report', async (req, res)=> {
    const userDetails = req.session.userDetails;
    const token = userDetails.token;
    try {
        const subs = await filter_admin_power_bill_report(token);
        res.json( subs.resbody);
    } catch (err) {
        if (err) console.log('error', err)
        
        res.status(503).json(err);
        return;
    }
})

router.get('/ajax/admin_all_daily_maintenance', async (req, res)=> {
    
    const userDetails = req.session.userDetails;
    const token = userDetails.token;
    try {
        const subs = await admin_all_daily_maintenance(token);
        res.json( subs.resbody);
    } catch (err) {
        if (err) console.log('error', err)
        
        res.status(503).json(err);
        return;
    }   
})

router.post('/ajax/admin_filter_all_daily_maintenance', async (req, res)=> {
    let data = req.body;
    const userDetails = req.session.userDetails;
    const token = userDetails.token;
    try {
        const subs = await send_admin_all_daily_maintenance(data,token);
        res.json( subs.resbody);
    } catch (err) {
        if (err) console.log('error', err)
        
        res.status(503).json(err);
        return;
    }   
})


router.get('/ajax/admin_generator_repair_report', async (req, res)=> {
    
    const userDetails = req.session.userDetails;
    const token = userDetails.token;
    try {
        const subs = await admin_generator_repair_report(token);
        res.json( subs.resbody);
    } catch (err) {
        if (err) console.log('error', err)
        
        res.status(503).json(err);
        return;
    }   
})

router.get('/ajax/vehicle_repair_report', async (req, res)=> {
    
    const userDetails = req.session.userDetails;
    const token = userDetails.token;
    try {
        const subs = await dashboard_vehicle_repair_report(token);
        res.json( subs.resbody);
    } catch (err) {
        if (err) console.log('error', err)
        
        res.status(503).json(err);
        return;
    }   
})

router.post('/ajax/admin_diesel_bi_report', async (req, res)=> {
    let data = req.body;
    const userDetails = req.session.userDetails;
    const token = userDetails.token;
    try {
        const subs = await admin_diesel_bi_report(data, token);
        res.json( subs.resbody);
    } catch (err) {
        if (err) console.log('error', err)
        
        res.status(503).json(err);
        return;
    }   
})

router.get('/ajax/admin_filter_diesel_bi_report', async (req, res)=> {
    
    const userDetails = req.session.userDetails;
    const token = userDetails.token;
    try {
        const subs = await admin_filter_diesel_bi_report(token);
        res.json( subs.resbody);
    } catch (err) {
        if (err) console.log('error', err)
        
        res.status(503).json(err);
        return;
    }   
})

module.exports = router;