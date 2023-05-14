exports.getIndex = (req, res, next) => {
    res.render('tracker', {
        data: '',
        pageTitle: 'Dashboard',
        path: '/'
    })
}

exports.getDashboardTest = (req, res, next) => {
    res.render('dashboard-test', {
        data: '',
        pageTitle: 'Dashboard test',
        path: '/dashboard-test'
    })
}