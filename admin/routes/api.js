const express = require('express');
const { viewDept, uploadServiceBalanceInvoice } = require('../queries/manage');
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
   else{
       res.json('hello')
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
module.exports = router;