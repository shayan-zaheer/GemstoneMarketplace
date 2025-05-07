function ensureAuthenticated(request, response, next) {
    if (request.isAuthenticated()) return next();
    response.redirect("/login");
}

function redirectIfAuthenticated(request, response, next) {
    if (request.isAuthenticated()) return response.redirect("/");
    next();
}

module.exports = { ensureAuthenticated, redirectIfAuthenticated };