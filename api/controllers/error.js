exports.get404 = (req, res, next) => {
    res.status(404).render("404", {
        pageTitle: 'Page 404',
        path: '/404'
    })
}
