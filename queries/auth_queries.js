const {getResponse, getResponse_get, putResponseparam, postResponse,postResponse_reset, getResponse_request, putResponse} = require('../utils/query_util');

class auth_queries {


    //Get list of the users that can approve members
    static async getUsers () {
        const url = 'accounts/all_users';

        try {
            const {result, resbody} = await getResponse_get(url)
            return {result, resbody}

        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    //Get list of the subsidiaries
    static async getSubs () {
        const url = 'accounts/subsidiaries';

        try {
            const {result, resbody} = await getResponse_get(url)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };   
    static async carRequests(token) {
        const url = 'core/vrequest';
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

    //Get list of the departments
    static async getDeb () {
        const url = 'accounts/departments';

        try {
            const {result, resbody} = await getResponse_get(url)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    // static async getDeb1 (id) {
    //     const url = `accounts/department/${id}`;

    //     try {
    //         const {result, resbody} = await getResponse_get(url)
    //         return {result, resbody}
            
    //     }catch(err){
    //         if (err) console.log('login error', err)
    //     }
    // };

    //create a new member.
    static async createRegister(query) {
        const url = 'accounts/register'
        try {
            const {result, resbody} = await getResponse(query, url);
            return {result, resbody};
        }catch(err){
            if (err) return console.log(error)
        }

    };

    static async getTotals(token) {
        const url = 'accounts/dashboard_total';
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async getTotalTrips(token) {
        const url = 'core/driver_dashboard_info';
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async getStaffCount(token) {
        const url = 'core/user_count';
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async getDriverCount(token) {
        const url = 'vehicle/driver_info';
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async staffDashboard(token) {
        const url = 'core/user_dashboard';
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async getDirectorCount(token) {
        const url = 'core/director_count';
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async getSupervisorCount(token) {
        const url = 'core/supervisor_count';
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async getDriverAdminCount(token) {
        const url = 'core/driver_admin_count';
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async getDriverAdminDashboard(token) {
        const url = 'core/driver_admin_dashboard';
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };

    static async loginRequest (query) {
        const url = 'accounts/login';

        try {

            const {result, resbody} = await getResponse(query, url);
            return {result, resbody}
        } catch(err){
            if (err) console.log('login error', err)
        }
    }

    static async reset_password(query, token) {
        const url = 'https://telnetsupperapp.com.ng:8443/api/password_reset/';
        try {
            const {result, resbody} = await postResponse_reset(query, url)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('error', err)
        }
    };

    static async reset_password_confirm(query, token) {
        const url = 'https://telnetsupperapp.com.ng:8443/api/password_reset/confirm/';
        try {
            const {result, resbody} = await postResponse_reset(query, url)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('error', err)
        }
    };

    static async updatePassword(query, id) {
        const url = `accounts/change_password?param=${id}`
        console.log('this is the url ', url)
        try {
            const {result, resbody} = await putResponseparam(query, url);
            return {result, resbody};
        }catch(err){
            if (err) return console.log(error)
        }

    };
};

module.exports = auth_queries