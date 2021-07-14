const express = require('express');
const { viewDept,viewUpline,getRole,quotation_driverAdmin, uploadServiceBalanceInvoice, uploadPhcnBill, uploadPurchaseOrder, request_quotation, paid_repair } = require('../queries/manage');
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
        var user = users.filter(function (user) {
            return user.id == user_id
        });
        user = user[0]

        
        console.log("user", user)
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
        var user = users.filter(function (user) {
            return user.id == user_id
        });
        user = user[0]

        
        console.log("user", user)
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
        var user = users.filter(function (user) {
            return user.id == user_id
        });
        user = user[0]

        
        console.log("user", user)
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

module.exports = router;