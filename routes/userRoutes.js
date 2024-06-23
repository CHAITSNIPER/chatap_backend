const {register,login,getUserByID,getAllUsers,forgotPasswordComp,ValidateAdmin} = require("../controllers/usersControllers")
const router = require("express").Router()


router.post('/register',register);
router.post('/login',login);
router.get('/getcred/:username',getUserByID);
router.get('/allusers/:username',getAllUsers);
router.post('/forgotPassword',forgotPasswordComp);
router.get('/validateAdmin/:username',ValidateAdmin);

module.exports = router;
