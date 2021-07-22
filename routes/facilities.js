const express = require('express');
const router = express.Router();

const { checkSession} = require('../middlewares/checksession');
const {driverAuthorize, supervisorAuthorize, carDriverAuthorize, auditorAuthorize, financeAuthorize, facilityAuthorize, procurementAuthorize} = require('../middlewares/authorization')

// require the list of request controllers
const {failities_controllers} = require('../controllers/index')

// the list of the controllers
const {
    addVehicle,
    handleAddVehicle,
    vehicleList,
    viewVehicle,
    handleUpdateVehicle,
    addVehiclePart,
    handleAddVehiclePart,
    vehiclePartList,
    faultRepair,
    addTechician,
    carFaultList,
    carFaultList_driver,
    quotationList,
    viewQuotation,
    handleQuotation,
    handleAddTechnician,
    carTechnicianList,
    servicingList,
    genServiceRequests,
    handleGenServiceRequests,
    allGenMaintenanceList,
    allGenDailyMaintenanceList,
    addGenerator,
    signOff,
    handleAddGenerator,
    generatorList,
    generatorList_fault,
    generator_report,
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
    car_repair_report,
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
    updateRepairQueue_driveradmin,
    handleUpdateRepairQueue_driverAdmin,
    serviceStatus,
    tripDistanceList,
    vehicleDistanceList,
    viewServicingStatus_driver,
    carServiceStatusList,
    carServiceStatusList_driver,
    updateViewServicingStatus_driver,
    handleServiceStatus,
    repairStatus,
    handleRepairStatus,
    carRepairStatusList_driver,
    carRepairStatusList_driverAdmin,
    viewRepairStatus_driverAdmin,
    viewRepairStatus_driver,
    updateViewRepairStatus_driver,
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
    genRepairStatusList,
    dieselVendor,
    handleDieselVendor,
    dieselVendorList,
    dieselRequest,
    dieselSensorReading,
    dieselTanker,
    dieselRequestQuotation,
    dieselRequestQuotationList,
    dieselRequestQuotationList_procurement,
    viewDieselRequestQuotation_procurement,
    handleDieselRequestQuotation_procurement,
    viewDieselRequestQuotation,
    handleDieselRequestQuotation,
    diesel,
    phcn,
    handlePurchaseOrder,
    viewPurchaseOrder,
    purchaseOrderList,
    viewPurchaseOrderFile,
    gen_repairListProcurement,
    viewServicingStatus_driverAdmin,
    updateViewServicingStatus_driverAdmin,
    purchaseOrderlist_auditor,
    viewPurchaseOrderAuditor,
    updatePurchaseOrderAuditor,
    purchaseOrderlist_finance,
    viewPurchaseOrderFinance,
    updatePurchaseOrderFinance,
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
    updatePhcnBill,
    handlePhcnBill_driverAdmin,
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
    sendPayment_finance,
    handleSendPayment_finance,
    allPhcnBillPayment_facility,
    receivedPayment_facility,
    handleReceivedPayment_facility,
    handleFaultRepair
} = failities_controllers;

// handles the addition of vehicles to the database
router.get('/addVehicle', [checkSession, driverAuthorize], addVehicle),
router.post('/addVehicle', [checkSession, driverAuthorize], handleAddVehicle)

router.get('/vehicleList', [checkSession, driverAuthorize], vehicleList),
router.get('/viewVehicle', [checkSession, driverAuthorize], viewVehicle),
router.post('/viewVehicle', [checkSession, driverAuthorize], handleUpdateVehicle)

router.get('/addVehiclePart', [checkSession, driverAuthorize], addVehiclePart),
router.post('/addVehiclePart', [checkSession, driverAuthorize], handleAddVehiclePart)

router.get('/vehiclePartList', [checkSession, driverAuthorize], vehiclePartList),


router.get('/tripDistanceList', [checkSession, driverAuthorize], tripDistanceList),
router.get('/vehicleDistanceList', [checkSession, driverAuthorize], vehicleDistanceList),

router.get('/servicingQueueDriverAdmin', [checkSession, driverAuthorize], servicingQueueList),

router.get('/updateServicingQueue_driveradmin', [checkSession, driverAuthorize], updateServicingQueue_driveradmin),
router.post('/updateServicingQueue_driveradmin', [checkSession, driverAuthorize], handleUpdateservicingQueue_driverAdmin),

router.get('/updateRepairQueue_driveradmin', [checkSession, driverAuthorize], updateRepairQueue_driveradmin),
router.post('/updateRepairQueue_driveradmin', [checkSession, driverAuthorize], handleUpdateRepairQueue_driverAdmin)

router.get('/car_servicing_report', [checkSession, driverAuthorize], car_servicing_report),
router.get('/car_repair_report', [checkSession, driverAuthorize], car_repair_report),

router.get('/genRequestFiles', [checkSession, driverAuthorize], genRequestFiles),
router.post('/genRequestFiles', [checkSession, driverAuthorize], handleGenRequestFiles),

router.get('/gen_repair', [checkSession, facilityAuthorize], gen_repairs),
router.post('/gen_repair', [checkSession, facilityAuthorize], handleGen_repairs),

router.get('/gen_repairList', [checkSession, procurementAuthorize], gen_repairList),

router.get('/gen_repairListProcurement', [checkSession, procurementAuthorize], gen_repairListProcurement),

router.get('/gen_paidRepair', [checkSession, procurementAuthorize], genPaidRepair),

router.get('/gen_repairStatus', [checkSession, procurementAuthorize], genRepairStatus),
router.post('/gen_repairStatus', [checkSession, procurementAuthorize], handleGenRepairStatus),

router.get('/genRepairStatusList', [checkSession, procurementAuthorize], genRepairStatusList),

router.get('/requestFilesList', [checkSession, driverAuthorize], requestFilesList),

router.get('/viewServicingStatus', [checkSession, carDriverAuthorize], viewServicingStatus_driver),
router.post('/viewServicingStatus', [checkSession, carDriverAuthorize], updateViewServicingStatus_driver),

router.get('/viewservicingQueue', [checkSession, driverAuthorize], viewservicingQueue),
router.post('/servicingQueue', [checkSession, driverAuthorize], servicingQueue),

router.get('/serviceStatus', [checkSession, driverAuthorize], serviceStatus),
router.post('/serviceStatus', [checkSession, driverAuthorize], handleServiceStatus),

router.get('/viewServicingStatus_driverAdmin', [checkSession, driverAuthorize], viewServicingStatus_driverAdmin),
router.post('/viewServicingStatus_driverAdmin', [checkSession, driverAuthorize], updateViewServicingStatus_driverAdmin),

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
router.get('/carFaultList_driver', [checkSession, carDriverAuthorize], carFaultList_driver),

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
router.post('/viewRepairQueueBalance_finance', [checkSession, financeAuthorize], updateBalanceCarRepairQueueFinance),

router.get('/repairStatus', [checkSession, driverAuthorize], repairStatus),
router.post('/repairStatus', [checkSession, driverAuthorize], handleRepairStatus),

router.get('/carRepairStatusList_driver', [checkSession, carDriverAuthorize], carRepairStatusList_driver),
router.get('/carRepairStatusList_driverAdmin', [checkSession, driverAuthorize], carRepairStatusList_driverAdmin),

router.get('/viewRepairStatus_driverAdmin', [checkSession, driverAuthorize], viewRepairStatus_driverAdmin),

router.get('/viewRepairStatus_driver', [checkSession, carDriverAuthorize], viewRepairStatus_driver),
router.post('/viewRepairStatus_driver', [checkSession, carDriverAuthorize], updateViewRepairStatus_driver),

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


router.get('/genFaultReport', [checkSession, facilityAuthorize], genFaultReport),
router.post('/genFaultReport', [checkSession, facilityAuthorize], handleGenFaultReport),

router.get('/genFaultList', [checkSession, facilityAuthorize], genFaultList),

router.get('/signOff', [checkSession, driverAuthorize], signOff),


router.get('/genMaintenanceList', [checkSession, driverAuthorize], allGenMaintenanceList),
router.get('/genDailyMaintenanceList', [checkSession, driverAuthorize], allGenDailyMaintenanceList),

router.get('/addGenerator', [checkSession, driverAuthorize], addGenerator),
router.post('/addGenerator', [checkSession, driverAuthorize], handleAddGenerator),

router.get('/generatorList', [checkSession, driverAuthorize], generatorList),

router.get('/generator_report', [checkSession, driverAuthorize], generator_report),

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

router.get('/diesel', [checkSession, driverAuthorize], diesel),

router.get('/dieselRequest', [checkSession, driverAuthorize], dieselRequest),
router.get('/dieselSensorReading', [checkSession, driverAuthorize], dieselSensorReading),
router.get('/dieselTanker', [checkSession, driverAuthorize], dieselTanker),

router.get('/dieselVendor', [checkSession, procurementAuthorize], dieselVendor),
router.post('/dieselVendor', [checkSession, procurementAuthorize], handleDieselVendor),

router.get('/dieselVendorList', [checkSession, procurementAuthorize], dieselVendorList),

router.get('/dieselRequestQuotation', [checkSession, procurementAuthorize], dieselRequestQuotation),
router.get('/dieselRequestQuotationList_procurement', [checkSession, procurementAuthorize], dieselRequestQuotationList_procurement),
router.get('/viewDieselRequestQuotation_procurement', [checkSession, procurementAuthorize], viewDieselRequestQuotation_procurement),
router.post('/viewDieselRequestQuotation_procurement', [checkSession, procurementAuthorize], handleDieselRequestQuotation_procurement),





router.get('/purchaseOrderlist_auditor', [checkSession, auditorAuthorize], purchaseOrderlist_auditor),
router.get('/viewPurchaseOrderAuditor', [checkSession, auditorAuthorize], viewPurchaseOrderAuditor),
router.post('/viewPurchaseOrderAuditor', [checkSession, auditorAuthorize], updatePurchaseOrderAuditor),

router.get('/purchaseOrderlist_finance', [checkSession, financeAuthorize], purchaseOrderlist_finance),
router.get('/viewPurchaseOrderFinance', [checkSession, financeAuthorize], viewPurchaseOrderFinance),
router.post('/viewPurchaseOrderFinance', [checkSession, financeAuthorize], updatePurchaseOrderFinance),

router.get('/genRepair', [checkSession, driverAuthorize], genRepair),

router.get('/phcn', [checkSession, driverAuthorize], phcn),
router.get('/phcnBilling', [checkSession, facilityAuthorize], phcnBilling),
router.post('/phcnBilling', [checkSession, facilityAuthorize], handlePhcnBilling),

router.get('/updatePhcnBilling', [checkSession, driverAuthorize], updatePhcnBill),
router.post('/updatePhcnBilling', [checkSession, driverAuthorize], handlePhcnBill_driverAdmin),

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

router.get('/sendPayment_finance', [checkSession, financeAuthorize], sendPayment_finance),
router.post('/sendPayment_finance', [checkSession, financeAuthorize], handleSendPayment_finance),

router.get('/allPhcnBillPayment_facility', [checkSession, facilityAuthorize], allPhcnBillPayment_facility),
router.get('/receivedPayment_facility', [checkSession, facilityAuthorize], receivedPayment_facility),
router.post('/receivedPayment_facility', [checkSession, facilityAuthorize], handleReceivedPayment_facility),

router.get('/phcnDailyReading', [checkSession, facilityAuthorize], phcnDailyReading),
router.post('/phcnDailyReading', [checkSession, facilityAuthorize], handlePhcnDailyReading),

router.get('/allPhcnDailyReading_facility', [checkSession, facilityAuthorize], allPhcnDailyReading_facility),
router.get('/allPhcnDailyReading_driverAdmin', [checkSession, driverAuthorize], allPhcnDailyReading_driverAdmin),

router.get('/phcnPayment', [checkSession, driverAuthorize], phcnPayment),

module.exports = router;