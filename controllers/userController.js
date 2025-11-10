const db = require ('../models/queries')
const bcrypt = require('bcryptjs')
const { validationResult, matchedData } = require("express-validator")
const { validateRegister, validateLogin } = require('../validator')
const passport = require('passport')
const isAuth = require('../authMiddleware').isAuth

function getSignUpForm(req, res){
    res.render('sign-up');
}

function getLoginForm(req, res){
    res.render('login');
}

function getLoginSuccess(req, res){
    res.render('loginSuccess');
}

function getLoginFail(req, res){
    res.render('loginFailure')
}

const getMemberForm = [
    isAuth,
    (req, res) => res.render('memberForm')
]

const getAdminForm = [
    isAuth,
    (req, res) => res.render('adminForm')
]




const registerUser = [
    validateRegister,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(404).render('errorPage', {
                message: "Error in form submission"
            }) 
        }

        const user = matchedData(req);
        
        try {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;
            await db.createUser(user);
        }
        catch (err){
            console.error(err);
            return res.status(500).render('errorPage', {
                message: "Error in creating user"
            });
        }
        res.redirect('/users/login')
    }
]

const loginUser = [
    validateLogin,
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(404).render('errorPage', {
                message: "Error in form submission"
            }) 
        }
        next();
    },
    passport.authenticate('local', { failureRedirect: '/users/login-failure', successRedirect: '/users/login-success' })
]

async function makeUserMember(req, res){
    const { memberPassword } = req.body;
    const username = req.user.username;

    if (memberPassword != process.env.MEMBER_PASSWORD){
        res.render('errorPage', { message: "Wrong Member Password" })
    }
    else {
        await db.makeMember(username);
        res.redirect('/');
    }
}

async function makeUserAdmin(req, res){
    const { adminPassword } = req.body;
    const username = req.user.username

    if (adminPassword != process.env.ADMIN_PASSWORD){
        res.render('errorPage', { message: "Wrong Admin Password" })
    }
    else {
        await db.makeAdmin(username);
        res.redirect('/');
    }
}



module.exports = {
    getSignUpForm,
    getLoginForm,
    getMemberForm,
    getAdminForm,
    registerUser,
    loginUser,
    makeUserAdmin,
    makeUserMember,
    getLoginFail,
    getLoginSuccess
}





