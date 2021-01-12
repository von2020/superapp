const express = require('express');
const router = express.Router();
const { checkSession} = require('../middlewares/checksession');
const {driverAuthorize, supervisorAuthorize} = require('../middlewares/authorization')

// require the list of request controllers
const {dashboard_controllers} = require('../controllers/index')

// the list of the controllers
const {
    displayProfile,
    
    editProfile
    
} = dashboard_controllers;

//you need to change some of these to post requests

// this is used to the get the list of trips for a particular driver.
router.get('/profile', [checkSession], displayProfile);

router.get('/edit_profile', [checkSession], editProfile);




module.exports = router;