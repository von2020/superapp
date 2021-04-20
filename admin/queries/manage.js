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
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async carRequests_admin(token) {
        const url = 'core/vrequest';
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async carRequests(token) {
        const url = 'core/vrequest/all_requests';
        try {
            const {result, resbody} = await getResponse_request(url, token)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };


    static async uplinequery(query, token, id) {
        const url = `core/vrequest/${id}`;
        try {
            const {result, resbody} = await putResponse(query, url, token)
            return {result, resbody};
            
        }catch(err){
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
    static async getSubs (token) {
        const url = 'accounts/subsidiaries';

        try {
            const {result, resbody} = await getResponse_getT(url, token)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };
    
    static async getSubs_createusers () {
        const url = 'accounts/account_subsidiary';

        try {
            const {result, resbody} = await getResponse_get(url)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };
    //Get list of the roles
    static async getRole () {
        const url = 'accounts/roles';

        try {
            const {result, resbody} = await getResponse_get(url)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    //Get list of the upline
    static async getUpline () {
        const url = 'accounts/uplines';

        try {
            const {result, resbody} = await getResponse_get(url)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async getUpline_edit (id) {
        const url = `accounts/uplines/${id}`;

        try {
            const {result, resbody} = await getResponse_get(url)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async getDept () {
        const url = 'accounts/departments';

        try {
            const {result, resbody} = await getResponse_get(url)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async viewDept (id, token) {
        const url = `accounts/department/${id}`;

        try {
            const {result, resbody} = await getResponse_getT(url, token)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async viewSub (id, token) {
        const url = `accounts/subsidiary/${id}`;

        try {
            const {result, resbody} = await getResponse_getT(url, token)
            return {result, resbody}
            
        }catch(err){
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

    static async updateBillOfMaterials(query, token, id) {
        const url = `vehicle/bill_of_material/${id}`;
        try {
            const {result, resbody} = await putResponse(query, url, token)
            return {result, resbody};
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };


    static async quotationList(token) {
        const url = `vehicle/recommend_quotation`;
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

};

module.exports = admin_manage_queries