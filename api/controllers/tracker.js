exports.getIndex = (req, res, next) => {
    res.render('tracker', {
        data: '',
        pageTitle: 'Dashboard',
        path: '/'
    })
}