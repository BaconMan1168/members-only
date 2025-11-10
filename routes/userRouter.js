const userController = require('../controllers/userController')
const { Router } = require('express');

const userRouter = Router();

userRouter.get('/sign-up', userController.getSignUpForm);
userRouter.post('/sign-up', userController.registerUser);
userRouter.get('/login', userController.getLoginForm);
userRouter.post('/login', userController.loginUser);
userRouter.get('/member-form', userController.getMemberForm);
userRouter.post('/member-form', userController.makeUserMember);
userRouter.get('/admin-form', userController.getAdminForm);
userRouter.post('/admin-form', userController.makeUserAdmin);
userRouter.get('/login-success', userController.getLoginSuccess);
userRouter.get('/login-failure', userController.getLoginFail);

module.exports = userRouter;