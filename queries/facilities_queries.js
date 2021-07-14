const {getResponse_request, postResponse_request, putResponse, postResponse, getResponse_get}  = require('../utils/query_util');

class vehicle_queries {

    static async sendRequest(query, token) {
        const url = 'vehicle/vehicle';
        try {
            const {result, resbody} = await postResponse_request(query, url, token)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async sendFaults(query, token) {
        const url = 'vehicle/report_fault';
        try {
            const {result, resbody} = await postResponse_request(query, url, token)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async carFaultList_driver(token) {
        const url = 'vehicle/report_fault';
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async carFaultList(token) {
        const url = 'vehicle/faults';
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async sendTechnician(query, token) {
        const url = 'vehicle/technicians';
        try {
            const {result, resbody} = await postResponse_request(query, url, token)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async sendGenerator(query, token) {
        const url = 'generator/generator';
        try {
            const {result, resbody} = await postResponse_request(query, url, token)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async sendGenServiceRequest(query, token) {
        const url = 'generator/servicing_request';
        try {
            const {result, resbody} = await postResponse_request(query, url, token)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async genServiceRequestList(token) {
        const url = 'generator/servicing_request';
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async sendRequestFiles(query, token) {
        const url = 'generator/request_files';
        try {
            const {result, resbody} = await postResponse_request(query, url, token)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async RequestFiles(token) {
        const url = 'generator/request_files';
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async genDueServiceList(token) {
        const url = 'generator/due_servicing';
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async genServicing(query, token) {
        const url = 'generator/servicing';
        try {
            const {result, resbody} = await postResponse_request(query, url, token)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async genServiceList(token) {
        const url = 'generator/servicing';
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async viewGenService(token, id) {
        const url = `generator/servicing/${id}`;
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async updateGenService(query, token, id) {
        const url = `generator/servicing/${id}`;
        try {
            const {result, resbody} = await putResponse(query, url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async sendMaintenance(query, token) {
        const url = 'generator/maintenance';
        try {
            const {result, resbody} = await postResponse_request(query, url, token)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async genMaintenanceList(token) {
        const url = 'generator/maintenance';
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async genDailyMaintenanceList(token) {
        const url = '/generator/all_daily_maintenance';
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async sendGenDailyMaintenance(query, token) {
        const url = 'generator/daily_maintenance';
        try {
            const {result, resbody} = await postResponse_request(query, url, token)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async sendGenServiceCompany(query, token) {
        const url = 'generator/servicing_company';
        try {
            const {result, resbody} = await postResponse_request(query, url, token)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async sendGenFaults(query, token) {
        const url = 'generator/report_faults';
        try {
            const {result, resbody} = await postResponse_request(query, url, token)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async sendGenSla(query, token) {
        const url = 'generator/slas';
        try {
            const {result, resbody} = await postResponse_request(query, url, token)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async sendPhcnBill(query, token) {
        const url = 'power/billings';
        try {
            const {result, resbody} = await postResponse_request(query, url, token)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async sendPhcnBillPayment(query, token) {
        const url = 'power/payments';
        try {
            const {result, resbody} = await postResponse_request(query, url, token)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async sendPhcnDailyMeterReading(query, token) {
        const url = 'power/daily_reading';
        try {
            const {result, resbody} = await postResponse_request(query, url, token)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };


    static async phcnDailyReadingList(token) {
        const url = 'power/daily_reading';
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async phcnBillList(token) {
        const url = 'power/billings';
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async phcnBillPaymentList(token) {
        const url = 'power/payments';
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async viewPhcnBill(token, id) {
        const url = `power/billing/${id}`;
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async updatePhcnBill(query, token, id) {
        const url = `power/billing/${id}`;
        try {
            const {result, resbody} = await putResponse(query, url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async viewPhcnBillPayment(token, id) {
        const url = `power/payment/${id}`;
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async updatePhcnBillPayment(query, token, id) {
        const url = `power/payment/${id}`;
        try {
            const {result, resbody} = await putResponse(query, url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async genSlaList(token) {
        const url = 'generator/slas';
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async updateSLA(token, id) {
        const url = `generator/sla/${id}`;
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async paid_repairList(token) {
        const url = `generator/paid_repair`;
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async genRepairStatusList(token) {
        const url = `generator/repair_status`;
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async updateGenRepairStatus(query, token, id) {
        const url = `generator/repair_status/${id}`;
        try {
            const {result, resbody} = await putResponse(query, url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async viewGenRepairStatus(token, id) {
        const url = `generator/repair_status/${id}`;
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async viewPaid_repair(token, id) {
        const url = `generator/paid_repair/${id}`;
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async updatePaidRepair(query, token, id) {
        const url = `generator/paid_repair/${id}`;
        try {
            const {result, resbody} = await putResponse(query, url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async genFaultList(token) {
        const url = 'generator/report_faults';
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async sendGenRepair(query, token) {
        const url = 'generator/repair';
        try {
            const {result, resbody} = await postResponse_request(query, url, token)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async sendGenRepairStatus(query, token) {
        const url = 'generator/repair_status';
        try {
            const {result, resbody} = await postResponse_request(query, url, token)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    


    static async gen_repairList(token) {
        const url = 'generator/repair';
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async genServiceCompanyList(token) {
        const url = 'generator/servicing_company';
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async carTechnicianList(token) {
        const url = 'vehicle/technicians';
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };


    

    static async updateFault(token, id) {
        const url = `vehicle/fault/${id}`;
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async quotationList(token) {
        const url = 'vehicle/recommend_quotation';
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async repairQueueList(token) {
        const url = 'vehicle/queue_repairs';
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };


    static async viewQuotation(token, id) {
        const url = `vehicle/recommend_quotation/${id}`;
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async updateQuotation(query, token, id) {
        const url = `vehicle/recommend_quotation/${id}`;
        try {
            const {result, resbody} = await putResponse(query, url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async repairQueue(query, token) {
        const url = 'vehicle/queue_repairs';
        try {
            const {result, resbody} = await postResponse_request(query, url, token)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };


    static async viewRepairQueue(token, id) {
        const url = `vehicle/queue_repair/${id}`;
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };


    static async updateRepairQueue(query, token, id) {
        const url = `vehicle/queue_repair/${id}`;
        try {
            const {result, resbody} = await putResponse(query, url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async repairStatus(query, token) {
        const url = 'vehicle/repair_status';
        try {
            const {result, resbody} = await postResponse_request(query, url, token)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async repairStatusList(token) {
        const url = 'vehicle/repair_status';
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async viewDieselRequestQuotation(token, id) {
        const url = `diesel/request_quotation/${id}`;
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async updateDieselRequestQuotation(query, token, id) {
        const url = `diesel/request_quotation/${id}`;
        try {
            const {result, resbody} = await putResponse(query, url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async handlePurchaseOrder(query, token) {
        const url = 'diesel/purchase_order';
        try {
            const {result, resbody} = await postResponse_request(query, url, token)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async purchaseOrderList(token) {
        const url = 'diesel/purchase_order';
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async viewPurchaseOrder(token, id) {
        const url = `diesel/purchase_order/${id}`;
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async updatePurchaseOrder(query, token, id) {
        const url = `diesel/purchase_order/${id}`;
        try {
            const {result, resbody} = await putResponse(query, url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async handleDieselVendor(query, token) {
        const url = 'diesel/vendors';
        try {
            const {result, resbody} = await postResponse_request(query, url, token)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async dieselVendorList(token) {
        const url = 'diesel/vendors';
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async dieselRequestQuotationList(token) {
        const url = 'diesel/request_quotations';
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    

    static async viewRepairStatus(token, id) {
        const url = `vehicle/repair_status/${id}`;
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async updateRepairStatus_driver(query, token, id) {
        const url = `vehicle/repair_status/${id}`;
        try {
            const {result, resbody} = await putResponse(query, url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async updateCarFault(query, token, id) {
        const url = `vehicle/fault/${id}`;
        try {
            const {result, resbody} = await putResponse(query, url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async tripDistance(token) {
        const url = 'vehicle/trip_distance';
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async vehicleDistance(token) {
        const url = 'vehicle/vehicle_distance';
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async vehiclesServicing(token) {
        const url = 'vehicle/due_servicing';
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async sendBillOfMaterial(query, token) {
        const url = 'vehicle/bill_of_materials';
        try {
            const {result, resbody} = await postResponse_request(query, url, token)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async servicingQueue(query, token) {
        const url = 'vehicle/servicing_queues';
        try {
            const {result, resbody} = await postResponse_request(query, url, token)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async servicingStatus(query, token) {
        const url = 'vehicle/servicing_status';
        try {
            const {result, resbody} = await postResponse_request(query, url, token)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async viewServicingStatus(token, id) {
        const url = `vehicle/servicing_status/${id}`;
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async updateServicingStatus(query, token, id) {
        const url = `vehicle/servicing_status/${id}`;
        try {
            const {result, resbody} = await putResponse(query, url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async carServiceStatusList(token) {
        const url = 'vehicle/servicing_status';
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async servicingQueueList(token) {
        const url = 'vehicle/servicing_queues';
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };
    static async viewservicingQueue(token, id) {
        const url = `vehicle/servicing_queue/${id}`;
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    // static async viewservicingQueueUpload(token, id) {
    //     const url = `vehicle/servicing_queue/${id}`;
    //     try {
    //         const {result, resbody} = await getResponse_request(url, token)
    //         return {result, resbody};
            
    //     }catch(err){
    //         if (err) console.log('login error', err)
    //     }
    // };

    static async updateServicingQueue(query, token, id) {
        const url = `vehicle/servicing_queue/${id}`;
        try {
            const {result, resbody} = await putResponse(query, url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async getBillOfMaterials(token) {
        const url = 'vehicle/bill_of_materials';
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async viewBillOfMaterials(token, id) {
        const url = `vehicle/bill_of_material/${id}`;
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async allGenerator(token) {
        const url = 'generator/generator';
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    

    static async getDrivers() {
        const url = 'accounts/drivers';
        try {
            const {result, resbody} = await getResponse_get(url)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async listVehicle(token) {
        const url = 'vehicle/available';
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async allVehicle(token) {
        const url = 'vehicle/vehicle';
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async viewVehicle(token, id) {
        const url = `vehicle/vehicle/${id}`;
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async updateVehicle(query, token, id) {
        const url = `vehicle/vehicle/${id}`;
        try {
            const {result, resbody} = await putResponse(query, url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async tripList(token) {
        const url = 'core/driver_trip';
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async driverInfo(token) {
        const url = 'vehicle/driver_info';
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };
};

module.exports =  vehicle_queries;