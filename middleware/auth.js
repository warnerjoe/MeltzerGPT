module.exports = {
  ensureAuth: function (req, res, next) {
      if (req.isAuthenticated()) {
          return next();
      } else {
          res.redirect('/');
      }
  },
  adminAuth: function (req, res, next) {
    // Check if user is authenticated and isAdmin is true
    if (req.isAuthenticated() && req.user.isAdmin) {
        // User is authenticated and is an admin, proceed to the next middleware/route handler
        return next();
    } else {
        // User is not authenticated or is not an admin, redirect to the home page or display an error message
        res.redirect('/');
    }
  }
};