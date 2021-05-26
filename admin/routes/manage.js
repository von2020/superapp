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
    addGenerator,
    handleAddGenerator,
    generatorList,
    generatorList_fault,
    generator_report,
    servicingList,
    genServiceRequests,
    handleGenServiceRequests,
    genServiceRequestList,
    genRequestFiles,
    handleGenRequestFiles,
    requestFilesList,
    genDueServicingList,
    genServicing,
    genDailyMaintenance,
    handleGenServicing,
    genServicingList,
    genMaintenance,
    allGenMaintenanceList,
    allGenDailyMaintenanceList,
    handleGenDailyMaintenance,
    handleGenMaintenance,
    genServiceCompanyList,
    genServiceCompanyList_sla,
    addGenTechnician,
    handleAddGenTechnician,
    genFaultReport,
    handleGenFaultReport,
    genFaultList,
    gen_repairs,
    handleGen_repairs,
    gen_repairList,
    genPaidRepair,
    paidRepair_list,
    genSLA,
    handleGenSLA,
    genSLA_list,
    genSLA_file,
    genRepairStatus,
    handleGenRepairStatus,
    genRepairStatusList,
    viewGenRepairStatus,
    AllPhcnBill,
    viewPhcnBill,
    updatePhcnBill,
    handlePhcnBill_driverAdmin,
    phcnBill_driverAdmin,
    handlePhcnBillPayment_driverAdmin,
    AllPhcnBillPayment,
    viewBillPayment_driverAdmin,
    updateViewBillPayment_driverAdmin,
    allPhcnDailyReading_driverAdmin,
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

router.get('/addGenerator', [adminCheckSession, superAdminAuthorize], addGenerator),
router.post('/addGenerator', [adminCheckSession, superAdminAuthorize], handleAddGenerator),

router.get('/generatorList', [adminCheckSession, superAdminAuthorize], generatorList),

router.get('/genDueServicingList', [adminCheckSession, superAdminAuthorize], genDueServicingList),

router.get('/generator_report', [adminCheckSession, superAdminAuthorize], generator_report),

router.get('/generatorList_fault', [adminCheckSession, superAdminAuthorize], generatorList_fault),

router.get('/addGenTechnician', [adminCheckSession, superAdminAuthorize], addGenTechnician),
router.post('/addGenTechnician', [adminCheckSession, superAdminAuthorize], handleAddGenTechnician),

router.get('/genTechnicianList', [adminCheckSession, superAdminAuthorize], genServiceCompanyList),

router.get('/genServiceCompanyList_sla', [adminCheckSession, superAdminAuthorize], genServiceCompanyList_sla),

// router.get('/genDailyTotalConsumption', [adminCheckSession, superAdminAuthorize], genDailyTotalConsumption),

router.get('/genDailyMaintenance', [adminCheckSession, superAdminAuthorize], genDailyMaintenance),
router.post('/genDailyMaintenance', [adminCheckSession, superAdminAuthorize], handleGenDailyMaintenance),

router.get('/genMaintenanceList', [adminCheckSession, superAdminAuthorize], allGenMaintenanceList),
router.get('/genDailyMaintenanceList', [adminCheckSession, superAdminAuthorize], allGenDailyMaintenanceList),

router.get('/genMaintenance', [adminCheckSession, superAdminAuthorize], genMaintenance),
router.post('/genMaintenance', [adminCheckSession, superAdminAuthorize], handleGenMaintenance),

router.get('/genServiceRequests', [adminCheckSession, superAdminAuthorize], genServiceRequests),
router.post('/genServiceRequests', [adminCheckSession, superAdminAuthorize], handleGenServiceRequests),

router.get('/genServiceRequestList', [adminCheckSession, superAdminAuthorize], genServiceRequestList),

router.get('/requestFilesList', [adminCheckSession, superAdminAuthorize], requestFilesList),

router.get('/genRequestFiles', [adminCheckSession, superAdminAuthorize], genRequestFiles),
router.post('/genRequestFiles', [adminCheckSession, superAdminAuthorize], handleGenRequestFiles),

router.get('/genFaultReport', [adminCheckSession, superAdminAuthorize], genFaultReport),
router.post('/genFaultReport', [adminCheckSession, superAdminAuthorize], handleGenFaultReport),

router.get('/genFaultList', [adminCheckSession, superAdminAuthorize], genFaultList),

router.get('/gen_repair', [adminCheckSession, superAdminAuthorize], gen_repairs),
router.post('/gen_repair', [adminCheckSession, superAdminAuthorize], handleGen_repairs),

router.get('/gen_repairList', [adminCheckSession, superAdminAuthorize], gen_repairList),

router.get('/gen_paidRepair', [adminCheckSession, superAdminAuthorize], genPaidRepair),

router.get('/paidRepair_list', [adminCheckSession, superAdminAuthorize], paidRepair_list),

router.get('/genSLA', [adminCheckSession, superAdminAuthorize], genSLA),
router.post('/genSLA', [adminCheckSession, superAdminAuthorize], handleGenSLA),

router.get('/genSLA_list', [adminCheckSession, superAdminAuthorize], genSLA_list),

router.get('/genSLA_file', [adminCheckSession, superAdminAuthorize], genSLA_file),

router.get('/gen_repairStatus', [adminCheckSession, superAdminAuthorize], genRepairStatus),
router.post('/gen_repairStatus', [adminCheckSession, superAdminAuthorize], handleGenRepairStatus),

router.get('/genRepairStatusList', [adminCheckSession, superAdminAuthorize], genRepairStatusList),

router.get('/phcnBillList', [adminCheckSession, superAdminAuthorize], AllPhcnBill),
router.get('/phcnBillPayment_driverAdmin', [adminCheckSession, superAdminAuthorize], phcnBill_driverAdmin),
router.post('/phcnBillPayment_driverAdmin', [adminCheckSession, superAdminAuthorize], handlePhcnBillPayment_driverAdmin),

router.get('/AllPhcnBillPayment', [adminCheckSession, superAdminAuthorize], AllPhcnBillPayment),
router.get('/billPayment_driverAdmin', [adminCheckSession, superAdminAuthorize], viewBillPayment_driverAdmin),
router.post('/billPayment_driverAdmin', [adminCheckSession, superAdminAuthorize], updateViewBillPayment_driverAdmin),

router.get('/viewGenRepairStatus', [adminCheckSession, superAdminAuthorize], viewGenRepairStatus),

router.get('/updatePhcnBilling', [adminCheckSession, superAdminAuthorize], updatePhcnBill),
router.post('/updatePhcnBilling', [adminCheckSession, superAdminAuthorize], handlePhcnBill_driverAdmin),

router.get('/allPhcnDailyReading_driverAdmin', [adminCheckSession, superAdminAuthorize], allPhcnDailyReading_driverAdmin),

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