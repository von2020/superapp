const express = require('express');
const router = express.Router();
const { forwardAuthenticate, checkSession, checkSessionAccount} = require('../middlewares/checksession');


//require the controllers from the controllers route
const { auth_controllers} = require('../controllers/index');


//define all the controllers in this route.
const {
    displayRegister,
    handleRegister,
    displayLogin,
    handleLogin,
    displayDashboard,
    staffDashboard,
    supervisorDashboard,
    procurementDashboard,
    facilityDashboard,
    auditorDashboard,
    financeDashboard,
    directorDashboard,
    driverAdminDashboard,
    driverDashboard,
    logout,
    authorization,
    resetPassword,
    handleResetPassword,
    resetPasswordConfirm,
    handleResetPasswordConfirm,
    displayPrivacyPolicy,
    handleDeps
} = auth_controllers;

router.get('/register', displayRegister);
router.post('/register', handleRegister);

// this was an attempt to use this route to get the values in ajax in the request page.
// router.get('/departments', handleDeps)
router.get('/privacy-policy',  displayPrivacyPolicy);

router.get('/reset-password', resetPassword);
router.post('/reset-password', handleResetPassword);

router.get('/reset-password-confirm', resetPasswordConfirm);
router.post('/reset-password-confirm', handleResetPasswordConfirm);

router.get('/', forwardAuthenticate, displayLogin);
router.post('/', handleLogin);

router.get('/dashboard', checkSession, displayDashboard);

router.get('/staff_dashboard', checkSession, staffDashboard);
router.get('/driver_dashboard', checkSession, driverDashboard);
router.get('/supervisor_dashboard', checkSession, supervisorDashboard);
router.get('/procurement_dashboard', checkSession, procurementDashboard);
router.get('/facility_dashboard', checkSession, facilityDashboard);
router.get('/auditor_dashboard', checkSession, auditorDashboard);
router.get('/finance_dashboard', checkSession, financeDashboard);
router.get('/director_dashboard', checkSession, directorDashboard);
router.get('/driver_admin_dashboard', checkSession, driverAdminDashboard);

router.get('/authorization', authorization);

router.get('/logout', logout);


module.exports = router;