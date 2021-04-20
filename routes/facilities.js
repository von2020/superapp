const express = require('express');
const router = express.Router();

const { checkSession} = require('../middlewares/checksession');
const {driverAuthorize, supervisorAuthorize, carDriverAuthorize, auditorAuthorize, financeAuthorize, facilityAuthorize} = require('../middlewares/authorization')

// require the list of request controllers
const {failities_controllers} = require('../controllers/index')

// the list of the controllers
const {
    addVehicle,
    handleAddVehicle,
    vehicleList,
    faultRepair,
    addTechician,
    carFaultList,
    quotationList,
    viewQuotation,
    handleQuotation,
    handleAddTechnician,
    carTechnicianList,
    servicingList,
    genServiceRequests,
    handleGenServiceRequests,
    AllGenMaintenanceList,
    addGenerator,
    signOff,
    handleAddGenerator,
    generatorList,
    generatorList_fault,
    genRequestFiles,
    handleGenRequestFiles,
    requestFilesList,
    addGenTechnician,
    handleAddGenTechnician,
    genServiceCompanyList,
    genDailyTotalConsumption,
    listFaults,
    updateFault,
    quotation_driverAdmin,
    viewQuotation_addToQueue,
    handleQuotation_addToQueue,
    repairQueueList,
    viewRepairQueue,
    viewAdvanceInvoice_driverAdmin,
    viewBalanceInvoice_driverAdmin,
    repairQueueList_auditor,
    viewRepairQueueAdvance_auditor,
    viewRepairQueueBalance_auditor,
    updaterepairQueueAdvanceAuditor,
    updateBalanceRepairQueueAuditor,
    repairQueueList_finance,
    viewRepairAdvanceQueue_finance,
    viewRepairQueueBalance_finance,
    updateBalanceCarRepairQueueFinance,
    updateRepairAdvanceQueue_finance,
    handleUpdateFault,
    genDailyMaintenance,
    genMaintenance,
    handleGenMaintenance,
    handleGenDailyMaintenance,
    genDueServicingList,
    genServiceRequestList,
    genServiceCompanyList_sla,
    genFaultReport,
    handleGenFaultReport,
    genFaultList,
    genPaidRepair,
    genRepairStatus,
    handleGenRepairStatus,
    quotationCar,
    queueRepair,
    statusRepair,
    car_servicing_report,
    servicingQueue,
    servicingQueueList,
    servicingQueueList_Auditor,
    updateservicingQueueAuditor,
    viewservicingQueue,
    viewservicingQueueAuditor,
    viewBalanceServicingQueueAuditor,
    updateBalanceServicingQueueAuditor,
    viewBalanceServicingQueueFinance,
    servicingQueueList_Finance,
    viewservicingQueueFinance,
    updateservicingQueueFinance,
    updateBalanceServicingQueueFinance,
    updateServicingQueue_driveradmin,
    handleUpdateservicingQueue_driverAdmin,
    serviceStatus,
    tripDistanceList,
    vehicleDistanceList,
    viewServicingStatus_driver,
    carServiceStatusList,
    carServiceStatusList_driver,
    updateViewServicingStatus_driver,
    handleServiceStatus,
    addBillOfMaterial,
    allBillOfMaterials,
    viewBillOfMaterials,
    handleAddBillOfMaterial,
    viewServicingInvoice,
    viewAdvanceServicingInvoice,
    handleServicingInvoice,
    recommendTechnician,
    genSLA,
    handleGenSLA,
    genSLA_list,
    paidRepair_listAuditor,
    paidRepair_listFinance,
    paidRepair_listDriverAdmin,
    viewPaidRepairAuditor,
    viewPaidRepairFinance,
    updatePaidRepairAuditor,
    updatePaidRepairFinance,
    genSLA_file,
    gen_repairs,
    handleGen_repairs,
    gen_repairList,
    dieselRequest,
    dieselSensorReading,
    dieselTanker,
    genRepair,
    genServicing,
    handleGenServicing,
    genServicingList,
    viewGenServicing,
    genServicingList_driverAdmin,
    viewGenServicing_diverAdmin,
    handleGenServicing_facility,
    viewGenServicingSignOff,
    phcnBilling,
    handlePhcnBilling,
    AllPhcnBill,
    AllPhcnBill_facility,
    viewPhcnBill,
    phcnBill_driverAdmin,
    phcnDailyReading,
    phcnPayment,
    handlePhcnBillPayment_driverAdmin,
    viewBillPayment_driverAdmin,
    AllPhcnBillPayment,
    updateViewBillPayment_driverAdmin,
    AllPhcnBillPayment_auditor,
    allPhcnDailyReading_facility,
    allPhcnDailyReading_driverAdmin,
    handlePhcnDailyReading,
    viewBillPayment_auditor,
    updateViewBillPayment_auditor,
    AllPhcnBillPayment_finance,
    viewBillPayment_finance,
    updateViewBillPayment_finance,
    handleFaultRepair
} = failities_controllers;

// handles the addition of vehicles to the database
router.get('/addVehicle', [checkSession, driverAuthorize], addVehicle),
router.post('/addVehicle', [checkSession, driverAuthorize], handleAddVehicle)

router.get('/vehicleList', [checkSession, driverAuthorize], vehicleList),
router.get('/tripDistanceList', [checkSession, driverAuthorize], tripDistanceList),
router.get('/vehicleDistanceList', [checkSession, driverAuthorize], vehicleDistanceList),

router.get('/servicingQueueDriverAdmin', [checkSession, driverAuthorize], servicingQueueList),

router.get('/updateServicingQueue_driveradmin', [checkSession, driverAuthorize], updateServicingQueue_driveradmin),
router.post('/updateServicingQueue_driveradmin', [checkSession, driverAuthorize], handleUpdateservicingQueue_driverAdmin)

router.get('/car_servicing_report', [checkSession, driverAuthorize], car_servicing_report),

router.get('/genRequestFiles', [checkSession, driverAuthorize], genRequestFiles),
router.post('/genRequestFiles', [checkSession, driverAuthorize], handleGenRequestFiles),

router.get('/gen_repair', [checkSession, driverAuthorize], gen_repairs),
router.post('/gen_repair', [checkSession, driverAuthorize], handleGen_repairs),

router.get('/gen_repairList', [checkSession, driverAuthorize], gen_repairList),

router.get('/gen_paidRepair', [checkSession, driverAuthorize], genPaidRepair),

router.get('/gen_repairStatus', [checkSession, driverAuthorize], genRepairStatus),
router.post('/gen_repairStatus', [checkSession, driverAuthorize], handleGenRepairStatus),

router.get('/requestFilesList', [checkSession, driverAuthorize], requestFilesList),

router.get('/viewServicingStatus', [checkSession, carDriverAuthorize], viewServicingStatus_driver),
router.post('/viewServicingStatus', [checkSession, carDriverAuthorize], updateViewServicingStatus_driver),

router.get('/viewservicingQueue', [checkSession, driverAuthorize], viewservicingQueue),
router.post('/servicingQueue', [checkSession, driverAuthorize], servicingQueue),

router.get('/serviceStatus', [checkSession, driverAuthorize], serviceStatus),
router.post('/serviceStatus', [checkSession, driverAuthorize], handleServiceStatus),

router.get('/genSLA', [checkSession, driverAuthorize], genSLA),
router.post('/genSLA', [checkSession, driverAuthorize], handleGenSLA),

router.get('/genSLA_list', [checkSession, driverAuthorize], genSLA_list),

router.get('/genSLA_file', [checkSession, driverAuthorize], genSLA_file),

router.get('/paidRepair_listAuditor', [checkSession, auditorAuthorize], paidRepair_listAuditor),

router.get('/viewPaidRepairAuditor', [checkSession, auditorAuthorize], viewPaidRepairAuditor),
router.post('/viewPaidRepairAuditor', [checkSession, auditorAuthorize], updatePaidRepairAuditor),

router.get('/paidRepair_listFinance', [checkSession, financeAuthorize], paidRepair_listFinance),

router.get('/viewPaidRepairFinance', [checkSession, financeAuthorize], viewPaidRepairFinance),
router.post('/viewPaidRepairFinance', [checkSession, financeAuthorize], updatePaidRepairFinance),

router.get('/paidRepair_listDriverAdmin', [checkSession, driverAuthorize], paidRepair_listDriverAdmin),

router.get('/carServiceStatusList', [checkSession, driverAuthorize], carServiceStatusList),

router.get('/carServiceStatusList_driver', [checkSession, carDriverAuthorize], carServiceStatusList_driver),

router.get('/servicingQueueAuditor', [checkSession, auditorAuthorize], servicingQueueList_Auditor),

router.get('/viewservicingQueueAuditor_advance', [checkSession, auditorAuthorize], viewservicingQueueAuditor),
router.post('/viewservicingQueueAuditor_advance', [checkSession, auditorAuthorize], updateservicingQueueAuditor),

router.get('/viewservicingQueueAuditor_balance', [checkSession, auditorAuthorize], viewBalanceServicingQueueAuditor),
router.post('/viewservicingQueueAuditor_balance', [checkSession, auditorAuthorize], updateBalanceServicingQueueAuditor),

router.get('/servicingQueueFinance', [checkSession, financeAuthorize], servicingQueueList_Finance),

router.get('/viewadvanceservicingQueueFinance', [checkSession, financeAuthorize], viewservicingQueueFinance),
router.post('/viewadvanceservicingQueueFinance', [checkSession, financeAuthorize], updateservicingQueueFinance),

router.get('/viewbalanceservicingQueueFinance', [checkSession, financeAuthorize], viewBalanceServicingQueueFinance),
router.post('/viewbalanceservicingQueueFinance', [checkSession, financeAuthorize], updateBalanceServicingQueueFinance),

router.get('/carFaultList', [checkSession, driverAuthorize], carFaultList),

router.get('/quotationList', [checkSession, driverAuthorize], quotationList),

router.get('/viewQuotation', [checkSession, driverAuthorize], viewQuotation),
router.post('/viewQuotation', [checkSession, driverAuthorize], handleQuotation),

router.get('/viewQuotation_addToQueue', [checkSession, driverAuthorize], viewQuotation_addToQueue),
router.post('/viewQuotation_addToQueue', [checkSession, driverAuthorize], handleQuotation_addToQueue),

router.get('/quotation_driverAdmin', [checkSession, driverAuthorize], quotation_driverAdmin),

router.get('/repairQueueList', [checkSession, driverAuthorize], repairQueueList),
router.get('/viewRepairQueue', [checkSession, driverAuthorize], viewRepairQueue),

router.get('/viewAdvanceInvoice_driverAdmin', [checkSession, driverAuthorize], viewAdvanceInvoice_driverAdmin),
router.get('/viewBalanceInvoice_driverAdmin', [checkSession, driverAuthorize], viewBalanceInvoice_driverAdmin),

router.get('/repairQueueList_auditor', [checkSession, auditorAuthorize], repairQueueList_auditor),
router.get('/viewRepairQueue_auditor', [checkSession, auditorAuthorize], viewRepairQueueAdvance_auditor),
router.post('/viewRepairQueue_auditor', [checkSession, auditorAuthorize], updaterepairQueueAdvanceAuditor),
router.get('/viewRepairQueueBalance_auditor', [checkSession, auditorAuthorize], viewRepairQueueBalance_auditor),
router.post('/viewRepairQueueBalance_auditor', [checkSession, auditorAuthorize], updateBalanceRepairQueueAuditor),

router.get('/repairQueueList_finance', [checkSession, financeAuthorize], repairQueueList_finance),
router.get('/viewRepairQueue_finance', [checkSession, financeAuthorize], viewRepairAdvanceQueue_finance),
router.post('/viewRepairQueue_finance', [checkSession, financeAuthorize], updateRepairAdvanceQueue_finance),
router.get('/viewRepairQueueBalance_finance', [checkSession, financeAuthorize], viewRepairQueueBalance_finance),
router.post('/viewRepairQueueBalance_auditor', [checkSession, financeAuthorize], updateBalanceCarRepairQueueFinance),

router.get('/servicingList', [checkSession, driverAuthorize], servicingList),

router.get('/updateFault', [checkSession, driverAuthorize], updateFault),
router.post('/updateFault', [checkSession, driverAuthorize], handleUpdateFault),

router.get('/addBillOfMaterial', [checkSession, driverAuthorize], addBillOfMaterial),
router.post('/addBillOfMaterial', [checkSession, driverAuthorize], handleAddBillOfMaterial),

router.get('/viewServicingInvoice', [checkSession, driverAuthorize], viewServicingInvoice),

// router.post('/viewServicingInvoice', [checkSession, driverAuthorize], handleServicingInvoice),

router.get('/viewAdvanceServicingInvoice', [checkSession, driverAuthorize], viewAdvanceServicingInvoice),

router.get('/allBillOfMaterials', [checkSession, driverAuthorize], allBillOfMaterials),

router.get('/viewBillOfMaterials', [checkSession, driverAuthorize], viewBillOfMaterials),

router.get('/faultList', [checkSession, driverAuthorize], listFaults)

router.get('/quotationCar', [checkSession, driverAuthorize], quotationCar)

router.get('/queueRepair', [checkSession, driverAuthorize], queueRepair)

router.get('/statusRepair', [checkSession, driverAuthorize], statusRepair)

router.get('/faults_report', [checkSession, carDriverAuthorize], faultRepair),
router.post('/faults_report', [checkSession, carDriverAuthorize], handleFaultRepair),


router.get('/add_technician', [checkSession, driverAuthorize], addTechician),
router.post('/add_technician', [checkSession, driverAuthorize], handleAddTechnician),

router.get('/carTechnicianList', [checkSession, driverAuthorize], carTechnicianList),

router.get('/recommendTechnician', [checkSession, driverAuthorize], recommendTechnician),

router.get('/genDueServicingList', [checkSession, driverAuthorize], genDueServicingList),

router.get('/genServicing_facility', [checkSession, facilityAuthorize], genServicing),
router.post('/genServicing_facility', [checkSession, facilityAuthorize], handleGenServicing),

router.get('/genServicingList_facility', [checkSession, facilityAuthorize], genServicingList),
router.get('/viewGenServicing_facility', [checkSession, facilityAuthorize], viewGenServicing),
router.post('/viewGenServicing_facility', [checkSession, facilityAuthorize], handleGenServicing_facility),

router.get('/viewGenServicingSignOff', [checkSession, facilityAuthorize], viewGenServicingSignOff),

router.get('/genServicingList_driverAdmin', [checkSession, driverAuthorize], genServicingList_driverAdmin),
router.get('/viewGenServicing_diverAdmin', [checkSession, driverAuthorize], viewGenServicing_diverAdmin),

router.get('/genServiceRequests', [checkSession, driverAuthorize], genServiceRequests),
router.post('/genServiceRequests', [checkSession, driverAuthorize], handleGenServiceRequests),

router.get('/genServiceRequestList', [checkSession, driverAuthorize], genServiceRequestList),


router.get('/genFaultReport', [checkSession, driverAuthorize], genFaultReport),
router.post('/genFaultReport', [checkSession, driverAuthorize], handleGenFaultReport),

router.get('/genFaultList', [checkSession, driverAuthorize], genFaultList),

router.get('/signOff', [checkSession, driverAuthorize], signOff),


router.get('/genMaintenanceList', [checkSession, driverAuthorize], AllGenMaintenanceList),

router.get('/addGenerator', [checkSession, driverAuthorize], addGenerator),
router.post('/addGenerator', [checkSession, driverAuthorize], handleAddGenerator),

router.get('/generatorList', [checkSession, driverAuthorize], generatorList),

router.get('/generatorList_fault', [checkSession, driverAuthorize], generatorList_fault),

router.get('/addGenTechnician', [checkSession, driverAuthorize], addGenTechnician),
router.post('/addGenTechnician', [checkSession, driverAuthorize], handleAddGenTechnician),

router.get('/genTechnicianList', [checkSession, driverAuthorize], genServiceCompanyList),

router.get('/genServiceCompanyList_sla', [checkSession, driverAuthorize], genServiceCompanyList_sla),

router.get('/genDailyTotalConsumption', [checkSession, driverAuthorize], genDailyTotalConsumption),

router.get('/genDailyMaintenance', [checkSession, driverAuthorize], genDailyMaintenance),
router.post('/genDailyMaintenance', [checkSession, driverAuthorize], handleGenDailyMaintenance),

router.get('/genMaintenance', [checkSession, driverAuthorize], genMaintenance),
router.post('/genMaintenance', [checkSession, driverAuthorize], handleGenMaintenance),

router.get('/dieselRequest', [checkSession, driverAuthorize], dieselRequest),
router.get('/dieselSensorReading', [checkSession, driverAuthorize], dieselSensorReading),
router.get('/dieselTanker', [checkSession, driverAuthorize], dieselTanker),

router.get('/genRepair', [checkSession, driverAuthorize], genRepair),

router.get('/phcnBilling', [checkSession, facilityAuthorize], phcnBilling),
router.post('/phcnBilling', [checkSession, facilityAuthorize], handlePhcnBilling),

router.get('/phcnBillList_facility', [checkSession, facilityAuthorize], AllPhcnBill_facility),
router.get('/viewPhcnBill', [checkSession, facilityAuthorize], viewPhcnBill),

router.get('/phcnBillList', [checkSession,driverAuthorize], AllPhcnBill),
router.get('/phcnBillPayment_driverAdmin', [checkSession, driverAuthorize], phcnBill_driverAdmin),
router.post('/phcnBillPayment_driverAdmin', [checkSession, driverAuthorize], handlePhcnBillPayment_driverAdmin),

router.get('/AllPhcnBillPayment', [checkSession, driverAuthorize], AllPhcnBillPayment),
router.get('/billPayment_driverAdmin', [checkSession, driverAuthorize], viewBillPayment_driverAdmin),
router.post('/billPayment_driverAdmin', [checkSession, driverAuthorize], updateViewBillPayment_driverAdmin),

router.get('/AllPhcnBillPayment_auditor', [checkSession, auditorAuthorize], AllPhcnBillPayment_auditor),
router.get('/billPayment_auditor', [checkSession, auditorAuthorize], viewBillPayment_auditor),
router.post('/billPayment_auditor', [checkSession, auditorAuthorize], updateViewBillPayment_auditor),

router.get('/AllPhcnBillPayment_finance', [checkSession, financeAuthorize], AllPhcnBillPayment_finance),
router.get('/billPayment_finance', [checkSession, financeAuthorize], viewBillPayment_finance),
router.post('/billPayment_finance', [checkSession, financeAuthorize], updateViewBillPayment_finance),

router.get('/phcnDailyReading', [checkSession, facilityAuthorize], phcnDailyReading),
router.post('/phcnDailyReading', [checkSession, facilityAuthorize], handlePhcnDailyReading),

router.get('/allPhcnDailyReading_facility', [checkSession, facilityAuthorize], allPhcnDailyReading_facility),
router.get('/allPhcnDailyReading_driverAdmin', [checkSession, driverAuthorize], allPhcnDailyReading_driverAdmin),

router.get('/phcnPayment', [checkSession, driverAuthorize], phcnPayment),

module.exports = router;