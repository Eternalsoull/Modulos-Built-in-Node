const express = require("express");

const authRouter = express.Router();
const { models } = require("../libs/sequelize");
const passport = require("passport");

//RUTAS
authRouter.route("/signup").get((req, res) => {
 res.render("auth/signup");
})
.post( async(req, res) => {
    //TODO: Crear usuario en BD
    const user = await models.User.create(req.body);
    console.log(user)
    //TODO: Autenticar
    req.login(user, ()=>{ 
        res.redirect('/pinturas'); 
    })

    //res.redirect('/pinturas');
    });

    authRouter.route('/signin')
    .get((req, res) => {
        res.render('auth/signin');
    })
    .post(
        passport.authenticate('local', {
            successRedirect: '/pinturas',
            failureRedirect: '/auth/signin',
            keepSessionAlive: true
        })
    )


module.exports = authRouter; 