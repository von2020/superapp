class Authorize {

    static driverAuthorize (req, res, next) {
        if (req.session.userDetails.role == 'Driver Admin') {
            return next()
        } else {
            return res.render('authorization')
        };

    };

    static carDriverAuthorize (req, res, next) {
        if (req.session.userDetails.role == 'Driver') {
            return next()
        } else {
            return res.render('authorization')
        };

    };

    static directorAuthorize (req, res, next) {
        if (req.session.userDetails.role == 'Director') {
            return next()
        } else {
            return res.render('authorization')
        };

    };

    static gmdAuthorize (req, res, next) {
        if (req.session.userDetails.role == 'GMD') {
            return next()
        } else {
            return res.render('authorization')
        };

    };

    static auditorAuthorize (req, res, next) {
        if (req.session.userDetails.role == 'Auditor') {
            return next()
        } else {
            return res.render('authorization')
        };

    };

    static financeAuthorize (req, res, next) {
        if (req.session.userDetails.role == 'Finance') {
            return next()
        } else {
            return res.render('authorization')
        };

    };

    static facilityAuthorize (req, res, next) {
        if (req.session.userDetails.role == 'Facility Officer') {
            return next()
        } else {
            return res.render('authorization')
        };

    };

    static supervisorAuthorize (req, res, next) {
        if (req.session.userDetails.role == 'Supervisor') {
            return next()
        } else {

            return res.redirect('/authorization')
        };

    };
    static superAdminAuthorize (req, res, next) {
        if (req.session.userDetails.role == 'Super Admin') {
            return next()
        } else {

            return res.redirect('/authorization')
        };

    };

    static supervisorAuthorize (req, res, next) {
        if (req.session.userDetails.role == 'Supervisor') {
            return next()
        } else {
            return res.redirect('/authorization')
        };

    };

};

module.exports = Authorize