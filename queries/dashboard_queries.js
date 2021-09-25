const { getResponse, getResponse_get, getResponse_request, putResponse, postResponse_request } = require('../utils/query_util');

class Dashboard_queries {
    static async getUpline (id) {
        const url = `accounts/uplines/${id}`;

        try {
            const {result, resbody} = await getResponse_get(url)
            return {result, resbody}
            
        }catch(err){
            if (err) console.log('login error', err)
        }
    };

    static async viewUser(token, user_id) {
        const url = `accounts/user/${user_id}`;
        try {
            const {result, resbody} = await getResponse_request(url, token)
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

    static async getTotals(token) {
        const url = 'accounts/totals';
        try {
            const { result, resbody } = await getResponse_request(url, token)
            return { result, resbody }

        } catch (err) {
            if (err) console.log('login error', err)
        }
    };
    
};

module.exports =  Dashboard_queries;