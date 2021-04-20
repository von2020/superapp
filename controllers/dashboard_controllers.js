const { dashboard_queries } = require('../queries/index');
const { } = require('../utils/query_util');
const { resMessageRedirect, getDate, checkRequest, multipleRequestPosition } = require('../utils/reusables');

//store the list of the queries
const {
    getUpline,
    updateUsers
    
} = dashboard_queries;

class Dashboard {

static async displayProfile (req, res) {
    var userDetails = req.session.userDetails
    res.render('profile', {userDetails}) 
    };



static async editProfile (req, res) {
    const userDetails = req.session.userDetails;
    const token = userDetails.token;
    const user_id = userDetails.id;
    // const user_id = req.query.id;
    // req.session.user_id = user_id;
    const id = userDetails.subsidiary_id;
    // req.session.department = id;

    console.log("id", id);
    console.log("userDetails", userDetails);
    console.log("user_id", user_id)

    try{
        const ups = await getUpline(id);
        // var user = req.session.user;

            
        // user = user[0]
        console.log('uplines', ups);
        res.render('edit-profile', {userDetails,  ups: ups.resbody})
    } catch(err){
        if (err) console.log('error', err)
    }
  
    };
    static async handleEditProfile (req, res) {
        const userDetails = req.session.userDetails;
        const token = userDetails.token;
        const user_id = userDetails.id;

        const query = {
            email: req.body.email,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone: req.body.phone,
            title: req.body.title,
            upline: req.body.upline ,
            
        }

        console.log('query', query)
        console.log('id', user_id)
        console.log('token', token)
        try{
            const {result, resbody} = await updateUsers(query, token, user_id);
            console.log("resbody", resbody)
            if (result.statusCode == '200') {
                resMessageRedirect(res, req, 'success_msg', `You have succesfully updated the profile of ${query.first_name + ' '+ query.last_name}`,'/dashboard/edit_profile')
            } else {
                resMessageRedirect(res, req, 'error_msg', ` ${resbody.response}  ${query.first_name + ' '+ query.last_name}`,'/dashboard/edit_profile')
            }
        } catch(err){
            if (err) console.log('error', err)
        }
    }

    static async directorReports (req, res) {
        var userDetails = req.session.userDetails
        res.render('dashboard_director', {userDetails}) 
        };

    static async driverAdminReports (req, res) {
        var userDetails = req.session.userDetails
        res.render('dashboard_driver_admin', {userDetails}) 
        };

};

module.exports = Dashboard