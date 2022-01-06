const { body, validationResult } = require('express-validator');
const User = require('../Model/user_shema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keys = require('../Config/keys');
const Validator = require('validator');
const sendEmail = require('../utils/nodemailer')
require('dotenv').config();


//CREATE TOKEN
const createToken = (user) => {
	return jwt.sign({ user: user },process.env.SECRETJWT, {
		expiresIn: '7d',
	});
};

const isEmpty = value =>
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0);
module.exports = isEmpty;

module.exports.registerValiations = [
	body('name').not().isEmpty().trim().withMessage('Name is required'),
	body('email').not().isEmpty().trim().withMessage('Email is required'),
   body('Role').not().isEmpty().trim().withMessage('Role is required'),
	body('password').isLength({ min: 8 }).withMessage('Password must be 6 characters long'),
];

module.exports.register  = async (req,res)  => {
   const { name, email,Role, password } = req.body;
   const errors = validationResult(req);

   if(!errors.isEmpty()){
     return res.status(400).json({ errors: errors.array() });
   }

   try {
      const checkUser = await User.findOne({email});
      if(checkUser){
         return res.status(400).json({ errors: [{msg: 'Email is already taken'}]});
      }
      //HASH PASSWORD
       //sale aléatoire + password       

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password,salt);
      try {
         //CREATE USER
         const user = User.create({
            name,
            email,
            Role,
            password : hash,
         });
         //CREATE TOKEN
         const token = createToken(user);
         return res.status(200).json({ msg: 'Your account has been created', token });
      } catch (error) {
         return res.status(500).json({ errors: error });
      }
   } catch (error) {
      return res.status(500).json({ errors: errors.array() });
   }
};


module.exports.loginValiations = [
	body('email').not().isEmpty().trim().withMessage('Email is required'),
	body('password').not().isEmpty().withMessage('Password is required'),
];


module.exports.login  = async (req,res) => {

   const errors = validationResult(req);
   if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() });
   }

   const { email, password } = req.body;
   try {
      const user = await User.findOne({ email });
      if(user){
         const matched = await bcrypt.compare(password, user.password);
               if(matched){
                  const token = createToken(user);
                  const payload = { id: user.id, user: user }
                  jwt.sign(
                     payload,
                     keys.secretKey,
                     { expiresIn: 7200 },
                     (err, token) => {
                        res.json({
                           success: true,
                           token: 'Bearer ' + token
                        });
                     }
                  );
                  return res.status(200).json({ msg: 'You have login successfully', token , payload });
               }else{
                  return res.status(401).json({ errors: [{ msg: 'Password is not correct' }] });
               } 
      }else{
         return res.status(404).json({ errors: [{ msg: 'Email not found' }] });
      }
   } catch (error) {
      return res.status(500).json({ errors: error });
   }
};


module.exports.validateForgotPassword = [
	body('email').not().isEmpty().trim().withMessage('Email is required'),
];

module.exports.forgotPassword = async (req, res, next) => {
   try {
       const { email } = req.body
       const user = await User.findOne({ email })
       if (!user) {
           errors.email = "Email Not found, Provide registered email"
           return res.status(400).json(errors)
       }

       function generateOTP() {
           var digits = '0123456789';
           let OTP = '';
           for (let i = 0; i < 6; i++) {
               OTP += digits[Math.floor(Math.random() * 10)];
           }
           return OTP;
       }
       const OTP = await generateOTP()
       user.otp = OTP 
       await user.save()
       await sendEmail(user.email, OTP, "OTP")
       res.status(200).json({ message: "check your registered email for OTP" })
       const helper = async () => {
           user.otp = ""
           await user.save()
       }
       setTimeout(function () {
           helper()
       }, 300000);
   }
   catch (err) {
       return res.status(400).json({ message: `Error in generateOTP${err.message}` })
   }
};



const validateOTP = (data) => {
   let errors = {}
   data.otp = !isEmpty(data.otp) ? data.otp : '';
   data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : '';
   data.confirmNewPassword = !isEmpty(data.confirmNewPassword) ? data.confirmNewPassword : '';


   if (!Validator.isLength(data.newPassword, { min: 6, max: 30 })) {
       errors.newPassword = 'Password must contain at least six character';
   }

   if (!Validator.isLength(data.otp, { min: 6, max: 6 })) {
       errors.otp = 'OTP must contain six character ';
   }

   if (Validator.isEmpty(data.otp)) {
       errors.otp = 'OTP field is required';
   }

   if (Validator.isEmpty(data.newPassword)) {
       errors.newPassword = 'New Password field is required';
   }

   if (Validator.isEmpty(data.confirmNewPassword)) {
       errors.confirmNewPassword = 'Confirm New Password field is required';
   }

   return {
       errors,
       isValid: isEmpty(errors)
   };

}

module.exports.postOTP = async (req, res, next) => {
       try {
          const { errors, isValid } = validateOTP(req.body);
           if (!isValid) {
               return res.status(400).json(errors);
           }
           const { email, otp, newPassword, confirmNewPassword } = req.body
           if (newPassword !== confirmNewPassword) {
               errors.confirmNewPassword = 'Password Mismatch'
               return res.status(400).json(errors);
           }
           const user = await User.findOne({ email });
           if (user.otp === "") {
               errors.otp = "OTP has expired"
               return res.status(400).json(errors)
           }
           if (user.otp !== otp) {
              
               errors.otp = "Invalid OTP, check your email again"
               return res.status(400).json(errors)
           }
           let hashedPassword;
           hashedPassword = await bcrypt.hash(newPassword, 10)
           user.password = hashedPassword;
           await user.save()
           return res.status(200).json({ message: "Password Changed" })
       }
       catch (err) {
           console.log("Error in submitting otp", err.message)
           return res.status(400).json({ message: `Error in postOTP${err.message}` })
       }
   };


module.exports.getUsers = async (req,res) => {
   User.find({}, function(err, users) {
   
      res.send(users);  
    });
}


module.exports.DeleteUser = async (req,res) => {
   const { id } = req.params;
    User.findOneAndDelete({_id: id}, 
    (err, result) => {
    if (err) return res.send(500, err)
    return res.status(200).json({ message: " User has been deleted " })
    });
}


