const app = require('express');
const router = app.Router();

const { register,
        registerValiations,
        login,
        loginValiations,
        forgotPassword,
        validateForgotPassword,
        postOTP,
        getUsers,
        DeleteUser,
       }  = require('../Controller/user_controller');

       //1
router.post('/register',registerValiations,register);
router.post('/login',loginValiations,login);
router.post('/forgotPassword',validateForgotPassword,forgotPassword);
router.post('/postOTP', postOTP);
router.get('/getUsers',getUsers);
router.delete('/deleteUser/:id',DeleteUser);

module.exports = router;

