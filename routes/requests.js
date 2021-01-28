const express = require('express');
const router = express.Router();
const { checkSession} = require('../middlewares/checksession');
const {driverAuthorize, supervisorAuthorize, directorAuthorize,} = require('../middlewares/authorization')

// require the list of request controllers
const {request_controllers} = require('../controllers/index')

// the list of the controllers
const {
    createRequest,
    viewmanageRequest_director,
    handleRequest,
    viewRequest,
    memberRequest,
    myRequest,
    uplineApprove,
    viewmanageRequest,
    manageMemberRequest,
    manageUplineApprove,
    assignVehicle,
    renderReassign,
    handleAssignVehicle
} = request_controllers;

router.get('/create_request',checkSession, createRequest);
router.post('/create_request', handleRequest);

router.get('/view_request', [checkSession], viewRequest);
router.get('/individual_request', [checkSession], memberRequest);

router.post('/individual_request', [checkSession], uplineApprove);

//this is for the driver admin to be able to accept or reject requests;
router.get('/viewmanage_request', [checkSession, driverAuthorize], viewmanageRequest);

router.get('/viewmanage_request_director', [checkSession, directorAuthorize], viewmanageRequest_director);

router.get('/viewindividual_request', [checkSession, driverAuthorize], manageMemberRequest);

router.post('/viewindividual_request', [checkSession, driverAuthorize], manageUplineApprove);

router.get('/reassign', [checkSession, driverAuthorize], renderReassign);

// this is to assign a vehicle to a client once the request has been approved

router.get('/assign_vehicle', [checkSession, driverAuthorize], assignVehicle);
router.get('/handleassign_vehicle', [checkSession, driverAuthorize], handleAssignVehicle)

// get's the list of the request to be managed


// get all the request for the staff
router.get('/my_request', checkSession, myRequest);

module.exports = router;