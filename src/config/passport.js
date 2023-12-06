const passport = require('passport');
require('./strategies/local.strategy');

module.exports = function setUpPassport (app) {
    app.use(passport.initialize()); 
    app.use(passport.session());
}

passport.serializeUser((user, done) => { 
    console.log('serialize User');
    done(null, user);
    });
  
  passport.deserializeUser((user, done) =>{ 
    console.log('deserialize User');
    done(null, user);
  });