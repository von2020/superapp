const express = require('express');
const router = express.Router();
const { adminCheckSession} = require('../../middlewares/checksession');
const {superAdminAuthorize} = require('../../middlewares/authorization')

// require the list of request controllers
const {admin_manage_controllers} = require('../controllers/index')

// the list of the controllers
const {
    getActiveUsers,
    viewActiveUsers,
    handleViewActiveUsers,
    viewRequest,
    memberRequest,
    uplineApprove,
    activeUsersInactive,
    handleActiveUsersInactive,
    getInActiveUsers,
    viewInActiveUsers,
    handleViewInActiveUsers,
    createUsers,
    handleCreateUsers,
    createUsersResponse,
    createSingleUsers,
    handleCreateSingleUsers,
    failedUsers,
    handleFailedUsers,
    displayProfile,
    editProfile,
    viewmanageRequest,
    manageMemberRequest,
    manageUplineApprove,
    renderReassign,
    assignVehicle,
    handleAssignVehicle,
    getAllDepartments,
    viewDepartment,
    viewSubsidiary,
    editSubsidiary,
    editDepartment,
    handleEditDepartment,
    handleEditSubsidiary,
    addDepartment,
    addSubsidiary,
    billOfMaterialList,
    quotationList,
    viewQuotation,
    updateQuotation,
    viewBillOfMaterialList,
    updateBillOfMaterials,
    dieselVendorList,
    dieselRequestQuotationList,
    viewDieselRequestQuotation,
    handleDieselRequestQuotation,
    viewPurchaseOrder,
    handlePurchaseOrder,
    purchaseOrderList,
    viewPurchaseOrderFile,
    dieselUsageList,
    handleAddSubsidiary,
    handleAddDepartment,
    getAllSubsidiaries,
    handleEditProfile,
    getFailedUsers
} = admin_manage_controllers;

router.get('/all-departments', [adminCheckSession, superAdminAuthorize], getAllDepartments);
router.get('/all-subsidiaries', [adminCheckSession, superAdminAuthorize], getAllSubsidiaries);

router.get('/billOfMaterialList', [adminCheckSession, superAdminAuthorize], billOfMaterialList);

router.get('/quotationList', [adminCheckSession, superAdminAuthorize], quotationList);
router.get('/viewQuotation', [adminCheckSession, superAdminAuthorize], viewQuotation);
router.post('/viewQuotation', [adminCheckSession, superAdminAuthorize], updateQuotation);

router.get('/viewBillOfMaterialList', [adminCheckSession, superAdminAuthorize], viewBillOfMaterialList);
router.post('/viewBillOfMaterialList', [adminCheckSession, superAdminAuthorize], updateBillOfMaterials);

router.get('/dieselVendorList', [adminCheckSession, superAdminAuthorize], dieselVendorList);

router.get('/dieselRequestQuotationList', [adminCheckSession, superAdminAuthorize], dieselRequestQuotationList),
router.get('/viewDieselRequestQuotation', [adminCheckSession, superAdminAuthorize], viewDieselRequestQuotation),
router.post('/viewDieselRequestQuotation', [adminCheckSession, superAdminAuthorize], handleDieselRequestQuotation),

router.get('/viewPurchaseOrder', [adminCheckSession, superAdminAuthorize], viewPurchaseOrder),
router.post('/viewPurchaseOrder', [adminCheckSession, superAdminAuthorize], handlePurchaseOrder),

router.get('/purchaseOrderList', [adminCheckSession, superAdminAuthorize], purchaseOrderList),

router.get('/purchaseOrderFile', [adminCheckSession, superAdminAuthorize], viewPurchaseOrderFile),

router.get('/dieselUsageList', [adminCheckSession, superAdminAuthorize], dieselUsageList),

router.get('/view-department', [adminCheckSession, superAdminAuthorize], viewDepartment);
router.get('/view-subsidiary', [adminCheckSession, superAdminAuthorize], viewSubsidiary);

router.get('/edit-department', [adminCheckSession, superAdminAuthorize], editDepartment);
router.post('/edit-department', [adminCheckSession, superAdminAuthorize], handleEditDepartment);

router.get('/edit-subsidiary', [adminCheckSession, superAdminAuthorize], editSubsidiary);
router.post('/edit-subsidiary', [adminCheckSession, superAdminAuthorize], handleEditSubsidiary);


router.get('/add-department', [adminCheckSession, superAdminAuthorize], addDepartment);
router.post('/add-department', [adminCheckSession, superAdminAuthorize], handleAddDepartment);

router.get('/add-subsidiary', [adminCheckSession, superAdminAuthorize], addSubsidiary);
router.post('/add-subsidiary', [adminCheckSession, superAdminAuthorize], handleAddSubsidiary);

router.get('/view_request', [adminCheckSession, superAdminAuthorize], viewRequest);
router.get('/individual_request', [adminCheckSession, superAdminAuthorize], memberRequest);

router.post('/individual_request', [adminCheckSession, superAdminAuthorize], uplineApprove);

//this is for the driver admin to be able to accept or reject requests;
router.get('/viewmanage_request', [adminCheckSession, superAdminAuthorize], viewmanageRequest);

router.get('/viewindividual_request', [adminCheckSession, superAdminAuthorize], manageMemberRequest);

router.post('/viewindividual_request', [adminCheckSession, superAdminAuthorize], manageUplineApprove);

router.get('/reassign', [adminCheckSession, superAdminAuthorize], renderReassign);

// this is to assign a vehicle to a client once the request has been approved

router.get('/vehicle_list', [adminCheckSession, superAdminAuthorize], assignVehicle);
router.get('/handleassign_vehicle', [adminCheckSession, superAdminAuthorize], handleAssignVehicle)


router.get('/profile', [adminCheckSession], displayProfile);

router.get('/edit-profile', [adminCheckSession], editProfile);
router.post('/edit-profile', [adminCheckSession], handleEditProfile);

// this route is used to get the list of all active users
router.get('/getActiveUsers', [adminCheckSession], getActiveUsers);

// this is the route to view all the users
router.get('/viewActiveUsers', [adminCheckSession], viewActiveUsers);
router.post('/viewActiveUsers', [adminCheckSession], handleViewActiveUsers);

router.get('/activeUsersInactive', [adminCheckSession], activeUsersInactive);
router.post('/activeUsersInactive', [adminCheckSession], handleActiveUsersInactive);

// this are the routes for the inactive users 
router.get('/getInActiveUsers', [adminCheckSession], getInActiveUsers);

// this is the route to view all the users
router.get('/viewInActiveUsers', [adminCheckSession], viewInActiveUsers);
router.post('/viewInActiveUsers', [adminCheckSession], handleViewInActiveUsers);

// this part is to add users to the platform.
router.get('/createUsers', [adminCheckSession], createUsers)
router.post('/createUsers', [adminCheckSession], handleCreateUsers)

router.get('/createUsersResponse', adminCheckSession, createUsersResponse) // you have to come back wehn ay sends the new response and then create an avenue to post the request get the token and then post the one then splice the ones that have been completely updated.

// this part is to add individual users to the platform
router.get('/createSingleUsers', [adminCheckSession], createSingleUsers)
router.post('/createSingleUsers', [adminCheckSession], handleCreateSingleUsers)

//for failed users
router.get('/get_failed_users', [adminCheckSession], getFailedUsers)
router.get('/failed_users', [adminCheckSession], failedUsers)
router.post('/failed_users', [adminCheckSession], handleFailedUsers)

module.exports = router;