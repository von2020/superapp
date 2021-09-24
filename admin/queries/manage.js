const { getResponse, getResponse_get, getResponse_request, putResponse, postResponse_request, getResponse_getT } = require('../../utils/query_util');

class admin_manage_queries {


    //Get list of the users that can approve members
    static async getUsers(token) {
        const url = 'accounts/all_active';
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('error', err)
        }
    };

    static async dashboard_total_reports(token) {
        const url = 'core/driver_admin_totals';
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('error', err)
        }
    };

    static async dashboard_total_subsidiary_request_type(token) {
        const url = 'core/total_subsidiary_request_type';
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('error', err)
        }
    };

    static async dashboard_trip_range(token) {
        const url = 'core/trip_range';
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('error', err)
        }
    };

    static async dashboard_vehicle(token) {
        const url = 'vehicle/vehicle';
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('error', err)
        }
    };

    static async dashboard_admin_totals(token) {
        const url = 'accounts/totals';
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('error', err)
        }
    };

    static async dashboard_vehicle_repair_report(token) {
        const url = 'vehicle/vehicle_repair_report';
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('error', err)
        }
    };


    static async gen_servicingCompany(token) {
        const url = 'generator/servicing_company';
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('error', err)
        }
    };

    static async dashboard_admin_request_subsidiaries(token) {
        const url = 'core/total_vrequest_subsidiaries';
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('error', err)
        }
    };

    static async dashboard_admin_all_requests(token) {
        const url = 'core/vrequest/all_requests';
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('error', err)
        }
    };

    static async send_dashboard_admin_all_requests(body, token) {
        const url = 'core/vrequest/all_requests';
        try {
            const {result, resbody} = await postResponse_request(body, url, token)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async dashboard_admin_total_subsidiary_trip(token) {
        const url = 'core/total_subsidiary_trip';
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('error', err)
        }
    };

    static async dashboard_admin_total_subsidiary_trip(token) {
        const url = 'core/total_subsidiary_trip';
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('error', err)
        }
    };

    static async admin_power_bill_report(body, token) {
        const url = 'power/bill_report';
        try {
            const {result, resbody} = await postResponse_request(body, url, token)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async filter_admin_power_bill_report(token) {
        const url = 'power/bill_report';
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('error', err)
        }
    };

    static async genServiceRequest(body, token) {
        const url = 'generator/servicing_request';
        try {
            const {result, resbody} = await postResponse_request(body, url, token)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async viewGenServiceRequest(token, id) {
        const url = `generator/servicing_request/${id}`;
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async recommendCarTechRequest(token, id) {
        const url = `vehicle/recommend_quotation_approved_tech/${id}`;
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async recommendServiceCompany(token, id) {
        const url = `generator/recommended_servicing_companies/${id}`;
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };
    
    static async updateRecommendServiceCompany(query, token, id) {
        const url = `generator/servicing_request/${id}`;
        try {
            const { result, resbody } = await putResponse(query, url, token)
            return { result, resbody };

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async sendGenServicePayment(query, token) {
        const url = 'generator/servicing_payment';
        try {
            const { result, resbody } = await postResponse_request(query, url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async genServicePaymentList(token) {
        const url = 'generator/servicing_payment';
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('error', err)
        }
    };

    static async viewGenServicePayment(token, id) {
        const url = `generator/servicing_payment/${id}`;
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async updateGenServicePayment(query, token, id) {
        const url = `generator/servicing_payment/${id}`;
        try {
            const { result, resbody } = await putResponse(query, url, token)
            return { result, resbody };

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async sendGenServiceStatus(query, token) {
        const url = 'generator/servicing_status';
        try {
            const { result, resbody } = await postResponse_request(query, url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async genServiceStatusList(token) {
        const url = 'generator/servicing_status';
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('error', err)
        }
    };

    static async viewGenServiceStatus(token, id) {
        const url = `generator/servicing_status/${id}`;
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async updateGenServiceStatusSignOff(query,id,token) {
        console.log('id', id);
        console.log('token', token);
        const url = `generator/servicing_status/${id}/upload`;
        try {
            const { result, resbody } = await putResponse(query, url, token)
            return { result, resbody };

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async admin_all_daily_maintenance(token) {
        const url = 'generator/all_daily_maintenance';
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async send_admin_all_daily_maintenance(query, token) {
        const url = 'generator/all_daily_maintenance';
        try {
            const { result, resbody } = await postResponse_request(query, url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async admin_generator_repair_report(token) {
        const url = 'generator/generator_repair_report';
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async admin_diesel_bi_report(body, token) {
        const url = 'diesel/diesel_bi_report';
        try {
            const {result, resbody} = await postResponse_request(body, url, token)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async admin_filter_diesel_bi_report(token) {
        const url = 'diesel/diesel_bi_report';
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async getInactiveUsers(token) {
        const url = 'accounts/inactive_users';
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async listVehicle(token) {
        const url = 'vehicle/available';
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody };

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async carRequests_admin(token) {
        const url = 'core/vrequest';
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async carRequests(token) {
        const url = 'core/vrequest/all_requests';
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };


    static async uplinequery(query, token, id) {
        const url = `core/vrequest/${id}`;
        try {
            const { result, resbody } = await putResponse(query, url, token)
            return { result, resbody };

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };


    //update the account of a user
    static async updateUsers(query, token, user_id) {
        const url = `accounts/user/${user_id}`;
        try {
            const { result, resbody } = await putResponse(query, url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async bulkUpload(query, token) {
        const url = 'accounts/bulk_upload';
        try {
            const { result, resbody } = await postResponse_request(query, url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async singleUpload(query) {
        const url = 'accounts/register';
        try {
            const { result, resbody } = await getResponse(query, url)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };
    static async getSubs(token) {
        const url = 'accounts/subsidiaries';

        try {
            const { result, resbody } = await getResponse_getT(url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async getSubs_createusers() {
        const url = 'accounts/account_subsidiary';

        try {
            const { result, resbody } = await getResponse_get(url)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };
    //Get list of the roles
    static async getRole(token) {
        const url = 'accounts/roles';

        try {
            const { result, resbody } = await getResponse_getT(url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async getRoles(token) {
        const url = 'accounts/registration_roles';

        try {
            const { result, resbody } = await getResponse_getT(url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    //Get list of the upline
    static async getUpline() {
        const url = 'accounts/uplines';

        try {
            const { result, resbody } = await getResponse_get(url)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async viewUpline(id, token) {
        const url = `accounts/uplines/${id}`;

        try {
            const { result, resbody } = await getResponse_get(url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async getUpline_edit(id) {
        const url = `accounts/uplines/${id}`;

        try {
            const { result, resbody } = await getResponse_get(url)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async getDept() {
        const url = 'accounts/departments';

        try {
            const { result, resbody } = await getResponse_get(url)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async viewDept(id, token) {
        const url = `accounts/account_department/${id}`;

        try {
            const { result, resbody } = await getResponse_getT(url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };
    static async uploadServiceBalanceInvoice(body,id, token) {
        const url = `vehicle/servicing_queue/${id}/upload`;

        try {
            const { result, resbody } = await putResponse(body,url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async uploadRepairBalanceInvoice(body,id, token) {
        const url = `vehicle/queue_repair/${id}/upload`;

        try {
            const { result, resbody } = await putResponse(body,url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async uploadBillOfMaterialInvoice(body,id, token) {
        const url = `vehicle/bill_of_material/${id}/upload`;

        try {
            const { result, resbody } = await putResponse(body,url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async uploadPhcnBill(body,id, token) {
        const url = `power/billing/${id}/upload`;

        try {
            const { result, resbody } = await putResponse(body,url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async uploadPurchaseOrder(body,id, token) {
        const url = `diesel/purchase_order/${id}/upload`;

        try {
            const { result, resbody } = await putResponse(body,url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async quotation_driverAdmin(body, token) {
        const url = 'vehicle/recommend_quotation';
        try {
            const {result, resbody} = await postResponse_request(body, url, token)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async request_quotation(body, token) {
        const url = 'diesel/request_quotations';
        try {
            const {result, resbody} = await postResponse_request(body, url, token)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async paid_repair(body, token) {
        const url = 'generator/paid_repair';
        try {
            const {result, resbody} = await postResponse_request(body, url, token)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };


    static async viewSub(id, token) {
        const url = `accounts/subsidiary/${id}`;

        try {
            const { result, resbody } = await getResponse_getT(url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async editDepartment(query, token, id) {
        const url = `accounts/department/${id}`;
        try {
            const { result, resbody } = await putResponse(query, url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async editSubsidiary(query, token, id) {
        const url = `accounts/subsidiary/${id}`;
        try {
            const { result, resbody } = await putResponse(query, url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async addDepartment(query, token) {
        const url = 'accounts/departments';
        try {
            const { result, resbody } = await postResponse_request(query, url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async addSubsidiary(query, token) {
        const url = 'accounts/subsidiaries';
        try {
            const { result, resbody } = await postResponse_request(query, url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async getBillOfMaterials(token) {
        const url = 'vehicle/bill_of_materials';
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody };

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async viewBillOfMaterials(token, id) {
        const url = `vehicle/bill_of_material/${id}`;
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody };

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async updateBillOfMaterials(query, token, id) {
        const url = `vehicle/bill_of_material/${id}`;
        try {
            const { result, resbody } = await putResponse(query, url, token)
            return { result, resbody };

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };


    static async quotationList(token) {
        const url = `vehicle/recommend_quotation`;
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody };

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async viewQuotation(token, id) {
        const url = `vehicle/recommend_quotation/${id}`;
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody };

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async updateQuotation(query, token, id) {
        const url = `vehicle/recommend_quotation/${id}`;
        try {
            const { result, resbody } = await putResponse(query, url, token)
            return { result, resbody };

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async allGenerator(token) {
        const url = 'generator/generator';
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody };

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async sendGenerator(query, token) {
        const url = 'generator/generator';
        try {
            const { result, resbody } = await postResponse_request(query, url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async sendGenServiceRequest(query, token) {
        const url = 'generator/servicing_request';
        try {
            const { result, resbody } = await postResponse_request(query, url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async genServiceRequestList(token) {
        const url = 'generator/servicing_request';
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody };

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async sendRequestFiles(query, token) {
        const url = 'generator/request_files';
        try {
            const { result, resbody } = await postResponse_request(query, url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async RequestFiles(token) {
        const url = 'generator/request_files';
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody };

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async genDueServiceList(token) {
        const url = 'generator/due_servicing';
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody };

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async genServicing(query, token) {
        const url = 'generator/servicing';
        try {
            const { result, resbody } = await postResponse_request(query, url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async genServiceList(token) {
        const url = 'generator/servicing';
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody };

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async viewGenService(token, id) {
        const url = `generator/servicing/${id}`;
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody };

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async updateGenService(query, token, id) {
        const url = `generator/servicing/${id}`;
        try {
            const { result, resbody } = await putResponse(query, url, token)
            return { result, resbody };

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async sendMaintenance(query, token) {
        const url = 'generator/maintenance';
        try {
            const { result, resbody } = await postResponse_request(query, url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async genMaintenanceList(token) {
        const url = 'generator/maintenance';
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody };

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async genDailyMaintenanceList(token) {
        const url = '/generator/all_daily_maintenance';
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody };

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async sendGenDailyMaintenance(query, token) {
        const url = 'generator/daily_maintenance';
        try {
            const { result, resbody } = await postResponse_request(query, url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async sendGenServiceCompany(query, token) {
        const url = 'generator/servicing_company';
        try {
            const { result, resbody } = await postResponse_request(query, url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async sendGenFaults(query, token) {
        const url = 'generator/report_faults';
        try {
            const { result, resbody } = await postResponse_request(query, url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async sendGenSla(query, token) {
        const url = 'generator/slas';
        try {
            const { result, resbody } = await postResponse_request(query, url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async sendPhcnBill(query, token) {
        const url = 'power/billings';
        try {
            const { result, resbody } = await postResponse_request(query, url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async sendPhcnBillPayment(query, token) {
        const url = 'power/payments';
        try {
            const { result, resbody } = await postResponse_request(query, url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async sendPhcnDailyMeterReading(query, token) {
        const url = 'power/daily_reading';
        try {
            const { result, resbody } = await postResponse_request(query, url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async viewGenRepairStatus(token, id) {
        const url = `generator/repair_status/${id}`;
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody };

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };


    static async phcnDailyReadingList(token) {
        const url = 'power/daily_reading';
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody };

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async phcnBillList(token) {
        const url = 'power/billings';
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody };

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async phcnBillPaymentList(token) {
        const url = 'power/payments';
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody };

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async viewPhcnBill(token, id) {
        const url = `power/billing/${id}`;
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody };

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async updatePhcnBill(query, token, id) {
        const url = `power/billing/${id}`;
        try {
            const { result, resbody } = await putResponse(query, url, token)
            return { result, resbody };

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async viewPhcnBillPayment(token, id) {
        const url = `power/payment/${id}`;
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody };

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async updatePhcnBillPayment(query, token, id) {
        const url = `power/payment/${id}`;
        try {
            const { result, resbody } = await putResponse(query, url, token)
            return { result, resbody };

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async genSlaList(token) {
        const url = 'generator/slas';
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody };

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async updateSLA(token, id) {
        const url = `generator/sla/${id}`;
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody };

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async paid_repairList(token) {
        const url = `generator/paid_repair`;
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody };

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };


    static async viewPaid_repair(token, id) {
        const url = `generator/paid_repair/${id}`;
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody };

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async updatePaidRepair(query, token, id) {
        const url = `generator/paid_repair/${id}`;
        try {
            const { result, resbody } = await putResponse(query, url, token)
            return { result, resbody };

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async updatePaidRepairInvoice(query, token, id) {
        const url = `generator/paid_repair/${id}/upload`;
        try {
            const { result, resbody } = await putResponse(query, url, token)
            return { result, resbody };

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async genFaultList(token) {
        const url = 'generator/report_faults';
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody };

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async viewGenRepair(token, id) {
        const url = `generator/repair/${id}`;
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody };

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async sendGenRepair(query, token) {
        const url = 'generator/repair';
        try {
            const { result, resbody } = await postResponse_request(query, url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async sendGenRepairStatus(query, token) {
        const url = 'generator/repair_status';
        try {
            const { result, resbody } = await postResponse_request(query, url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async genRepairStatusList(token) {
        const url = `generator/repair_status`;
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody };

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };


    static async gen_repairList(token) {
        const url = 'generator/repair';
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody };

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async genServiceCompanyList(token) {
        const url = 'generator/servicing_company';
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody };

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async carTechnicianList(token) {
        const url = 'vehicle/technicians';
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody };

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async dieselVendorList(token) {
        const url = 'diesel/vendors';
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody };

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async approved_dieselVendorList(token, id) {
        const url = `diesel/vendor_selected_list/${id}`;
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody };

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async dieselRequestQuotationList(token) {
        const url = 'diesel/request_quotations';
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody };

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async viewDieselRequestQuotation(token, id) {
        const url = `diesel/request_quotation/${id}`;
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody };

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async updateDieselRequestQuotation(query, token, id) {
        const url = `diesel/request_quotation/${id}`;
        try {
            const { result, resbody } = await putResponse(query, url, token)
            return { result, resbody };

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async handlePurchaseOrder(query, token) {
        const url = 'diesel/purchase_order';
        try {
            const { result, resbody } = await postResponse_request(query, url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async purchaseOrderList(token) {
        const url = 'diesel/purchase_order';
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody };

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async viewPurchaseOrder(token, id) {
        const url = `diesel/purchase_order/${id}`;
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody };

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async updatePurchaseOrder(query, token, id) {
        const url = `diesel/purchase_order/${id}`;
        try {
            const { result, resbody } = await putResponse(query, url, token)
            return { result, resbody };

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async dieselUsageList(token) {
        const url = 'diesel/usage';
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody };

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

};

module.exports = admin_manage_queries