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
    const user_id = req.query.id;
    req.session.user_id = user_id;
    const id = userDetails.department;
    // req.session.department = id;

    console.log("id", id);
    console.log("user_id", user_id)

    try{
        const ups = await getUpline(id);
        var user = req.session.user;

            
        user = user[0]
        console.log('user:', user);
        res.render('dashboard/edit_profile', {userDetails, user, ups: ups.resbody})
    } catch(err){
        if (err) console.log('error', err)
    }
  
    };


};

module.exports = Dashboard